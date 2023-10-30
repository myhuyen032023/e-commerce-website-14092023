const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createNewCoupon = asyncHandler(async(req, res) => {
    const {name, discount, expiry} = req.body
    if (!name || !discount || !expiry) throw new Error("Missing Inputs")
    const response = await Coupon.create({
        ...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
        success: response ? true : false,
        createdCoupon: response ? response : 'Cannot create new coupon'
    })
})

const getCoupons = asyncHandler(async(req, res) => {
    const response = await Coupon.find().select("-createAt -updateAt")
    return res.status(200).json({
        success: response ? true : false,
        coupons: response ? response : 'Cannot get coupons'
    })
})

const updateCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    const {expiry} = req.body
    if (Object.keys(req.body).length === 0) throw new Error("Missing Inputs")
    const response = await Coupon.findByIdAndUpdate(cid, 
        {...req.body,
        expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
    }, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedCoupon: response ? response : 'Cannot update coupon'
    })
})

const deleteCoupon = asyncHandler(async(req, res) => {
    const {cid} = req.params
    const response = await Coupon.findByIdAndDelete(cid)
    return res.status(200).json({
        success: response ? true : false,
        deletedCoupon: response ? response : 'Cannot delete coupon'
    })
})

module.exports = {
    createNewCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
}