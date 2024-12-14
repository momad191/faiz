const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'       
      },    
  
    category_name: {
        type: String,
        required: true,
        unique:true
    }, 
    category_name_EN: {
        type: String,
        required: true,
        unique:true
    }, 
    category_code: {
        type: String,
        required: true,
        unique:true
    }, 
    category_MAIN: { 
        type: String,
        required: true,
        unique:true
    }, 

    category_url: {
        type: String,
    }, 
 
    date: {
        type: Date,
        default: Date.now
    },

   
}); 
 
 
 

module.exports = Category = mongoose.model('category', CategorySchema);