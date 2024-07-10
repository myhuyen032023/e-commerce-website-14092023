const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    thumb: {
        type: String,
        default: 'https://img.freepik.com/free-photo/office-table-with-cup-coffee-keyboard-notepad_1220-4617.jpg'
    },
    author: {
        type: String,
        default: 'Admin'
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);