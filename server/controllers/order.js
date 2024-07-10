const Order = require('../models/order')
const User = require('../models/user')
const Product = require('../models/product')

const moment = require('moment');
const asyncHandler = require('express-async-handler')
const sendMail = require("../utils/sendMail");
// Khi nguoi dung bam checkout -> Tao order dua vao cart
const createOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {products, total, address, status } = req.body
    if (address) await User.findByIdAndUpdate(_id, {address, cart: []}, {new: true})
    const result = await Order.create({products, total, orderBy: _id, status})
    for (let i=0; i<products.length; i++) {
        console.log(products[i].quantity)
        await Product.findByIdAndUpdate(products[i].product._id, {$inc:{sold: products[i].quantity}, $inc:{quantity: -products[i].quantity}}, {new: true})
    }
    const html = `Bạn đã hoàn tất thanh toán đơn hàng ${result._id} 
        <a href=${process.env.CLIENT_URL}/member/buy-history/>Xem đơn hàng</a>`;
        
    
    const user = await User.findById(_id)
    const email = user.email
    console.log(email)
    await sendMail({email, html, subject: "Hoàn tất thanh toán Digital World"})
    return res.status(200).json({
        success: result ? true : false,
        createdOrder: result ? result : 'Something went wrong'
    })
})

const updateStatus = asyncHandler(async(req, res) => {
  const {_id} = req.user
    const {oid, status} = req.body
    console.log(req.body)
    if (!status) throw new Error("Missing status")
    const response = await Order.findByIdAndUpdate(oid, {status}, {new: true})

    if (status == "Success") {
      const html = `Đơn hàng ${response._id}  được giao thành công!
        <a href=${process.env.CLIENT_URL}/member/buy-history/>Xem đơn hàng</a>`;
      const user = await User.findById(_id)
      const email = user.email
      console.log(email)
      await sendMail({email, html, subject: "Giao hàng thành công Digital World"})
    }
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : 'Something went wrong'
    })
})

const getUserOrder = asyncHandler(async(req, res) => {
    const {_id} = req.user
    console.log(req.query)
    const response = await Order.find({orderBy: _id}).populate({
        path: 'products',
        populate: {
            path: 'product',
            select: 'title'
        }
    }).sort({createdAt: -1});
    return res.status(200).json({
        success: response ? true : false,
        orders: response ? response : "Something went wrong"
    })
})

const getOrders = asyncHandler(async(req, res) => {
  const {startDate, endDate} = req.query
  console.log({startDate, endDate})
    const response = await Order.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(new Date(endDate).getTime() + 86400000),
      }
    })
    .populate({
        path: 'products',
        populate: {
            path: 'product',
            select: 'title'
        }
    })
    .populate("orderBy", "firstname lastname")
    .sort({createdAt: -1})
    return res.status(200).json({
        success: response ? true : false,
        orders: response ? response : "Something went wrong"
    })
})

const getIncomesInDays = asyncHandler(async(req, res) => {
 // Tháng và năm bạn muốn tính doanh thu
const {year, month} = req.query; // Thay đổi thành năm bạn muốn tính doanh thu

// Ngày đầu tiên của tháng
const startDate = moment({ year, month: month - 1, day: 1 }).startOf('day');

// Ngày cuối cùng của tháng
const endDate = moment(startDate).endOf('month');

// Truy vấn MongoDB để tính toán doanh thu từng ngày của tháng
const results = await Order.aggregate([
  {
    $match: {
      createdAt: {
        $gte: startDate.toDate(),
        $lte: endDate.toDate()
      }
    }
  },
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      totalRevenue: { $sum: "$total" }
    }
  }
]);
console.log(results);
      return res.status(200).json({
        success: results ? true : false,
        incomes: results ? results : "Something went wrong"
    })
})



const getIncomesInMonths = asyncHandler(async(req, res) => {
  // Năm bạn muốn tính toán doanh thu
  const {year} = req.query // Thay đổi thành năm bạn muốn tính doanh thu
console.log(year)
// Truy vấn MongoDB để tính toán doanh thu từng tháng trong năm
const result = await Order.aggregate([
  {
    $match: {
      createdAt: {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31, 23, 59, 59)
      }
    }
  },
  {
    $group: {
      _id: { $month: "$createdAt" },
      totalRevenue: { $sum: "$total" }
    }
  },
  {
    $sort: {
      "_id": 1
    }
  }
])


// In ra mảng kết quả
console.log(result);
       return res.status(200).json({
         success: result ? true : false,
         incomes: result ? result : "Something went wrong"
     })
 })


module.exports = {
    createOrder,
    updateStatus,
    getUserOrder,
    getOrders,
    getIncomesInDays,
    getIncomesInMonths
}