const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  
    fullname: {
        type: String,
        required: true,
        unique:true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

   
}); 
 
 
 

module.exports = User = mongoose.model('user', UserSchema);