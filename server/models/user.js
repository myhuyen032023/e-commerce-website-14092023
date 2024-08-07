const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require("crypto");


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
         default: 'user'},   
    cart: [{
        product: {type: mongoose.Types.ObjectId, ref: 'Product'},
        quantity: Number,
        color: String,
        price: Number,
        thumbnail: String,
        title: String,
    }],
    address: {
        type: String
    },
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Product'}],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,

    },
    passwordChangeAt: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: String,
    },
    registerToken: {
        type: String,
    }
}, {
        timestamps: true
});

// Truoc khi luu thong tin user: hash password
userSchema.pre('save', async function(next) {
    //Neu user thay doi thong tin nhung khong thay doi password thi next()
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Dinh nghia ham kiem tra password

userSchema.methods = {
    isCorrectPassword: async function(password) {
        return await bcrypt.compare(password, this.password)
    },

    createPasswordChangedToken: async function()  {
        // Tao token moi 
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000; // het han 15 phut
    
        return resetToken;
    
    }

}

//Export the model
module.exports = mongoose.model('User', userSchema);