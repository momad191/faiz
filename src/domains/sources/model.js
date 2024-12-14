const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SourceSchema = new Schema({
       
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'       
      },   

    source_name: {
        type: String,  
        required: true,
        unique:true
    }, 
    source_code: {
        type: String,
        required: true,
        unique:true
    },  
    source_img: {
        type: String,
    }, 
    source_website: {
        type: String,
    }, 
    source_country: {
        type: String,
    }, 
    source_country_code: {
        type: String,
    }, 

    date: {
        type: Date,
        default: Date.now
    },
}); 
 
 
 

module.exports = Source = mongoose.model('source', SourceSchema);