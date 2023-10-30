const { model } = require('mongoose');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt'); 
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const makeToken = require("uniqid")

// const register = asyncHandler(async(req, res) => {
//     const {email, password, firstname, lastname} = req.body;
//     if (!email || !password || !lastname || !firstname) 
//     return res.status(400).json({
//         success: false,
//         mes: 'Missing inputs'
//     })

//     //Kiem tra xem email da dang ki chua
//     const user = await User.findOne({email});
//     if (user) {
//         throw new Error('User has existed!');
//     } else {
//         const newUser = await User.create(req.body);
//         return res.status(200).json({
//         success: newUser ? true : false,
//         mes: newUser ? 'Register is successfully. Please go into Login' : 'Something went wrong'
//         })
//     }
// })

//Dang ki co xac thuc email
const register = asyncHandler(async(req, res) => {
    const {email, password, firstname, lastname, mobile} = req.body;
    if (!email || !password || !lastname || !firstname || !mobile) 
    return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
    })

    // Kiem tra xem email da dang ki chua
    const user = await User.findOne({email});
    if (user) {
        throw new Error('User has existed!');
    } else {
        const token = makeToken()
        res.cookie('dataregister', {... req.body, token}, {httpOnly: true, maxAge: 15 * 60 * 1000})
        const html = `Vui lòng click vào link dưới đây để hoàn tất quá trình đăng kí. Link sẽ hết hạn trong 15 phút tới. 
        <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`;
        

        await sendMail({email, html, subject: "Hoàn tất đăng kí Digital World"})

        return res.json({
            success: true,
            mes: "Please check your email to activate account"
        })
    }
    
})


const finalRegister = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    const {token} = req.params

    if (!cookie || cookie?.dataregister?.token !== token) {
        res.clearCookie('dataregister')
        return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    } 
    const newUser = await User.create({
        email: cookie?.dataregister.email,
        password: cookie?.dataregister.password,
        mobile: cookie?.dataregister.mobile,
        firstname: cookie?.dataregister.firstname,
        lastname: cookie?.dataregister.lastname,
        
    });
    res.clearCookie('dataregister')
    if (newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
})


const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) 
    return res.status(400).json({
        success: false,
        mes: 'Missing inputs'
    })

    //Xac thuc email password nguoi dung
    const response = await User.findOne({email}); 
    //Dung await nghia la ham do phai chay xong moi thuc hien lenh tiep theo 
    if (response && await response.isCorrectPassword(password)) { //Neu tim thay email va nhap dung password
        const {password, role, refreshToken, ...userData} = response.toObject(); //Khong tra ve password va role 
        //Tao token: refresh token(luu trong cookie) & access token se tra ve cho nguoi dung
        const accessToken = generateAccessToken(response._id, role);
        const newRefreshToken = generateRefreshToken(response._id);
        //Luu refresh token vao database
        await User.findByIdAndUpdate(response._id, {refreshToken: newRefreshToken}, {new : true});
        //Lu refresh token vao cookie
        res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else {
        throw new Error('Invalid credentials!')
    }
    
})

const getCurrentUser = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role') //Khong hien refreshToken password role trong res
    return res.status(200).json({
        success: user ? true: false,
        result: user ? user : 'User not found'
    })
})

// Cap access token moi khi refresh token con hop le
const refreshAccessToken = asyncHandler(async(req, res) => {
    // Lay token tu cookie va kiem tra hop le 
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken ) throw new Error("No refresh token in cookies")

    const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({_id: result._id, refreshToken: cookie.refreshToken});
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched'
    })

})

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new Error("No refresh token in cookies")

    // Xoa refresh token trong db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})

    // Xoa refresh token trong cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })

    return res.status(200).json({
        success: true,
        mes: 'Logout successfully'
    })
})

// Client gui email
// Server check email co hop le hay ko -> Gui email + kem theo link (password change token)
// Client ehck mail => clik link
// Client gui api kem token
// Check token co giong voi token server gui ko 
// Change password

const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.body
    if (!email) throw new Error("Missing email")
    const user = await User.findOne({email})
    if (!user) throw new Error("User not found")
    const resetToken = user.createPasswordChangedToken();
    await user.save();

    const html = `Vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link sẽ hết hạn trong 15 phút tới. 
    <a href=${process.env.CLIENT_URL}/reset-password/${await resetToken.then()}>Click here</a>`;

    const data = {
        email,
        html,
        subject: "Forgot password"
    }

    const result = await sendMail(data);
    res.status(200).json({
        success: result.response?.includes('OK') ? true : false,
        mes: result.response?.includes('OK') ? "Check your mail please" : "Something went wrong. Please try again"
    })
})

const resetPassword = asyncHandler(async(req, res) => {
    const {token, password} = req.body;
    // console.log({token, password})
    if (!token || !password) throw new Error("Missing Inputs")
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}});

    if(!user) throw new Error("Invalid reset token")

    user.password = password;
    user.passwordResetExpires = undefined
    user.passwordResetToken = undefined
    user.passwordChangeAt= Date.now();
    await user.save();

    return res.status(200).json({
        success: user ? true : false,
        mes: user ? "Update password successfully" : "Something went wrong."
    })
})

const getUsers = asyncHandler(async(req, res) => {
    const response = await User.find().select('-refreshToken -password -role');
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async(req, res) => {
    const {_id} = req.query;
    if(!_id) throw new Error('Missing Inputs')
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted` : 'No user deleted'
    })
})

const updateUser = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Missing Inputs')
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select("-password -role -refreshToken");
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something went wrong'
    })
})

const updateUserByAdmin = asyncHandler(async(req, res) => {
    const {uid} = req.params;
    if(Object.keys(req.body).length === 0) throw new Error('Missing Inputs')
    const response = await User.findByIdAndUpdate(uid, req.body, {new: true}).select("-password -role -refreshToken");
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something went wrong'
    })
})

const updateCart  = asyncHandler(async(req, res) => {
    const {_id} = req.user;
    const {pid, quantity, color} = req.body
    if(!pid || !quantity || !color) throw new Error('Missing Inputs')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
    //alreadyProduct da co _id rieng de phan biet product cua user nay voi user khac
    // console.log(alreadyProduct)
    if (alreadyProduct){
        if (alreadyProduct.color === color) {
            // Cung mau thi chi update lai quantity thoi
            // updateOne: update user ma co cart chua element trung voi alreadyProduct -> chi co 1 user dat product do thoi (vi no co _id rieng)
            const response = await User.updateOne({cart: {$elemMatch   : alreadyProduct}}, {$set: {"cart.$.quantity": quantity}}, {new : true})
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Something went wrong'
            })
        } else {
            // Khac mau thi them nhu them san pham moi
            const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, color}}}, {new: true})
            return res.status(200).json({
                success: response ? true : false,
                updatedUser: response ? response : 'Something went wrong'
            })
        }
        
    } else {
        const response = await User.findByIdAndUpdate(_id, {$push: {cart: {product: pid, quantity, color}}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Something went wrong'
        })
    }
    
})


module.exports = {
    register,
    login,
    getCurrentUser,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateCart,
    finalRegister
}


