const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require("../models/coupon")

const asyncHandler = require('express-async-handler')

// Khi nguoi dung bam checkout -> Tao order dua vao cart
const createOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {coupon} = req.body
    
    //Products
    const userCart = await User.findById(_id).select('cart').populate("cart.product", "title price")
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color
    }))
    
    //Total
    let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0)
    let orderData = {products, total, orderBy: _id}
    //Coupon
    if (coupon) {
        const selectedCoupon = await Coupon.findById(coupon)
        total = Math.round(total * (1 - +selectedCoupon?.discount / 100)/100) * 100 || total
        orderData.total = total
        orderData.coupon = coupon
    }
    const result = await Order.create(orderData)
    return res.status(200).json({
        success: result ? true : false,
        createdOrder: result ? result : 'Something went wrong'
    })
})

const updateStatus = asyncHandler(async(req, res) => {
    const {oid} = req.params
    const {status} = req.body
    if (!status) throw new Error("Missing status")
    const response = await Order.findByIdAndUpdate(oid, {status}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong'
    })
})

const getUserOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const response = await Order.find({orderBy: _id})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})

const getOrders = asyncHandler(async(req, res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})

module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getOrders
}