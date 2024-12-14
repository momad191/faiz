const mongoose = require('mongoose');
//  const config = require('config');
// const db = config.get('mongoURI');
  
 require("dotenv").config()
 
const connectDB = async ()=>{
try{ 
    const db = process.env.mongoURI

    mongoose.set("strictQuery", false);
    await mongoose.connect(db, {
        // useNewUrlParser: true,
        //useCreateIndex: true,
       // useFindAndModify: false,
        // useUnifiedTopology: true,
        
        
    });
    mongoose.set('strictQuery', true);
    console.log('MongoDB Connected...');
  
 
  
} catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
}
};
module.exports = connectDB;