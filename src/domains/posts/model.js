const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'       
      },   
      category: {
        type: Schema.Types.ObjectId,
        ref: 'category'       
      },   
      source: {
        type: Schema.Types.ObjectId,
        ref: 'source'       
      }, 
    title: {
        type: String,
        required: true,
    },  
    title_EN: {
        type: String,
        required: true,
    },  

    details: {
        type: String,
    }, 
    details_EN: {
        type: String,
    }, 
  
    summary: {
        type: String,
    }, 
    summary_EN: {
        type: String,
    }, 
    verified: {
        type: String,
    }, 
    subscription_type: {
        type: String,
    }, 
 
    category_code: {
        type: String,
    }, 
    writer: {
        type: String,
    }, 
    link: {
        type: String,
    }, 
    sectiontitle: {
        type: String,
    }, 
    hometitle: {
        type: String,
    }, 
    homebody: {
        type: String,
    }, 
    alt: {
        type: String,
    }, 
    keywords: {
        type: String,
    }, 
    pic1: {
        type: String,
    }, 



    source_country: {
        type: String,
    }, 
    source_name: {
        type: String,
    },  
    source_url: {
        type: String,
    }, 
    source_img: {
        type: String,
    }, 
    source_icon: {
        type: String,
    }, 
 
 
    date: {
        type: Date,
        default: Date.now
    },

   
}); 
 
 
 

module.exports = Post = mongoose.model('post', postSchema);