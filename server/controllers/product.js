const Product = require("../models/product")
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");


const createProduct = asyncHandler(async(req, res) => {
    const {title, price, description, brand, category, color } = req.body
    const thumb = req.files?.thumb[0]?.path
    const images = req.files?.images?.map(el => el.path)

    if (!(title && price && description && brand && category && color && thumb && images)) throw new Error("Missing Inputs")
    req.body.slug = slugify(title)
    if(thumb) req.body.thumb = thumb
    if (images) req.body.images = images
    const newProduct = await Product.create(req.body)

    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Cannot create new product"
    })
})

// filter sorting pagination

const getProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if (!pid) throw new Error("Missing Inputs")
    const product = await Product.findById(pid).populate({
        path: 'ratings',
        populate: {
            path: 'postedBy',
            select: 'firstname lastname avatar'
        }
    });
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : "Cannot get product"
    })
})

const getProducts = asyncHandler(async(req, res) => {
    const queries = {...req.query};
    //Tach cac truong dac biet khoi queries
    const excludeFields = ["limit", "sort", "page", "fields"]; 
    excludeFields.forEach(el => delete queries[el])


    //Format lai cac operators cho dung cu phap mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, machedEl => `$${machedEl}`)
    const formatedQueries = JSON.parse(queryString);
    let colorQueryObject = {}
    //Filtering
    if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: "i"}
    if (queries?.category) formatedQueries.category = {$regex: queries.category, $options: "i"}
    if (queries?.color) {
        delete formatedQueries.color
        const colorArr = queries.color?.split(",")
        const colorQuery = colorArr.map(el => ({color: { $regex:el, $options: 'i'}}))
        colorQueryObject = {$or: colorQuery}
    }

    let queryObject = {}

    if (queries?.q) {
        delete formatedQueries.q
        queryObject = { $or: [
            {color: { $regex:queries.q, $options: 'i'}},
            {title: { $regex:queries.q, $options: 'i'}},
            {category: { $regex:queries.q, $options: 'i'}},
            {brand: { $regex:queries.q, $options: 'i'}},
            {description: { $regex:queries.q, $options: 'i'}},

        ]}
    }




    const qr = {...colorQueryObject, ...formatedQueries, ...queryObject}



    //
    if (req.query.q) {
        delete formatedQueries.q
        formatedQueries['$or'] = [
            {title : {$regex: req.query.q, $options: "i"}},
            {category : {$regex: req.query.q, $options: "i"}},
            {color: {$regex: req.query.q, $options: "i"}}
        ]
    }
    // console.log(colorQueryObject)
    let queryCommand = Product.find(qr);

    
    //Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        // console.log(sortBy)
        queryCommand = queryCommand.sort(sortBy);
        
    }
    

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields);
    }
    
    // Pagination
    const page = +req.query.page || 1; // page number
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS; //So bai trong 1 trang
    const skip = (page - 1) * limit;  //Tong so bai da bo qua (Tong so bai o truoc trang nay)
    queryCommand.skip(skip).limit(limit);

    

    //Execute command
    queryCommand.exec(async(err, response) => {
        if (err) throw new Error(err.message)
        
        const counts = await Product.find(qr).countDocuments()
    
            return res.status(200).json({
                
                success: response ? true : false,
                counts,
                products: response ? response : "Cannot get products",
                
            })
    })

    

   
    
});

const updateProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    const files = req?.files
    if (files?.thumb) req.body.thumb = files.thumb[0]?.path
    if (files?.images) req.body.images = files?.images?.map(el => el.path)
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true});
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : "Cannot update product"
    })
})

const deleteProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if (!pid) throw new Error("Missing Inputs")
    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product"
    })
})

const ratings = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    const {star, comment, pid} = req.body;
    if (!star || !pid) throw new Error("Missing Input")

    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings.find(el => el.postedBy.toString() === _id)

    // console.log({alreadyRating})
    if (alreadyRating) {
        // update star & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating}
        }, {
            $set: {"ratings.$.star": star, "ratings.$.comment": comment}
        }, {new: true})
    } else {
        // add star & comment
        await Product.findByIdAndUpdate(pid, {
            $push: {ratings: {star, comment, postedBy: _id}}
        }, {new: true})

        // console.log(response)
    }

    //sum ratings
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totolRatings = Math.round(sumRatings * 10 / ratingCount) /10

    return res.status(200).json({
        status: true,
        updatedProduct
    })
})

const uploadProductImage = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if (!req.files) throw new Error("Missing Inputs")
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(el => el.path)}}}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedProduct: response ? response : "Cannot upload product images"
    })
})




module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadProductImage
}
