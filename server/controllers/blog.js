const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async(req, res) => {
    const {title, description} = req.body
    const thumb = req.files?.thumb[0]?.path

    if (!(title && description)) throw new Error("Missing Inputs")
    
    if(thumb) req.body.thumb = thumb

    const newBlog = await Blog.create(req.body)

    return res.status(200).json({
        success: newBlog ? true : false,
        createdBlog: newBlog ? newBlog : "Cannot create new blog"
    })
})

const updateBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const files = req?.files
    if (files?.thumb) req.body.thumb = files?.thumb[0]?.path
    const updatedBlog = await Blog.findByIdAndUpdate(bid, req.body, {new: true});
    return res.status(200).json({
        success: updatedBlog ? true : false,
        updatedBlog: updatedBlog ? updatedBlog : "Cannot update blog"
    })
})

const getBlogs = asyncHandler(async(req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        blogs: response ? response : 'Cannot get blogs'
    })
})

// LIKE (KHI NGUOI DUNG NHAN LIKE)
// Check xem nguoi dung dislike chua -> bo dislike
// Check xem nguoi dung da like chua -> bo like/them like
// const likeBlog = asyncHandler(async(req, res) => {
//     const {_id} = req.user;
//     const {bid} = req.params;
//     if (!bid) throw new Error("Missing inputs")
//     const blog = await Blog.findById(bid);
//     const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id) //Tim xem nguoi nay da dislike chua

//     if (alreadyDisliked) {
//         //Neu nguoi nay da dislike truoc do thi bay gio bo dislike (bo trong dislikes co _id: _id )
//         const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
//         return res.status(200).json({
//             success: response ? true : false,
//             result: response
//         })
//     }

//     //Neu nguoi dung da like truoc do thi bo like
//     const alreadyLiked = blog?.likes?.find(el => el.toString() === _id) 
//     if (alreadyLiked) {
//         const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes:_id}}, {new : true})
//         return res.status(200).json({
//             success: response ? true : false,
//             result: response
//         })
//     } else {
//         //Neu nguoi dung chua like truoc do thi them like
//         const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}, isLiked: true}, {new: true})
//         return res.status(200).json({
//             success: response ? true : false,
//             result: response
//         })
//     }

// })

// // DISLIKE (KHI NGUOI DUNG NHAN LIKE)
// // Check xem nguoi dung like chua -> bo like
// // Check xem nguoi dung da dislike chua -> bo dislike/them dislike
// const dislikeBlog = asyncHandler(async(req, res) => {
//     const {_id} = req.user;
//     const {bid} = req.params;
//     if (!bid) throw new Error("Missing inputs")
//     const blog = await Blog.findById(bid);
//     const alreadyLiked = blog?.likes?.find(el => el.toString() === _id) //Tim xem nguoi nay da like chua

//     if (alreadyLiked) {
//         //Neu nguoi nay da like truoc do thi bay gio bo like (bo trong likes co _id: _id )
//         const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
//         return res.status(200).json({
//             success: response ? true : false,
//             result: response
//         })
//     }

//     //Neu nguoi dung da dislike truoc do thi bo dislike
//     const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id) 
//     if (alreadyDisliked) {
//         const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes:_id}}, {new : true})
//         return res.status(200).json({
//             success: response ? true : false,
//             result: response
//         })
//     } else {
//         //Neu nguoi dung chua dislike truoc do thi them dislike
//         const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})
//         return res.status(200).json({
//             success: response ? true : false,
//             result: response
//         })
//     }

// })

const deleteBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)

    return res.status(200).json({
        success: blog ? true : false,
        deletedBlog: blog ? blog : 'Cannot delete blog'
    })
})

const getBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    // Moi lenh goi api den blog thi se tang numberViews len 1

    const blog = await Blog.findByIdAndUpdate(bid)

    return res.status(200).json({
        success: blog ? true : false,
        blogData: blog ? blog : 'Cannot get blog'
    })
})

const uploadBlogImage = asyncHandler(async(req, res) => {
    const {bid} = req.params
    if (!req.file) throw new Error("Missing Inputs")
    const response = await Blog.findByIdAndUpdate(bid, {image: req.file.path}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : "Cannot upload blog image"
    })
})

module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    getBlog,
    deleteBlog,
    uploadBlogImage
}