const express = require('express')
 //const enforce = require('express-sslify'); 
require("dotenv").config()
const connectDB = require('./src/config/db');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const routes = require("./src/routes");

 
//Connect Database
connectDB();
  //app.use(enforce.HTTPS({ trustProtoHeader: true }));

// cors
app.use(cors());



//this is allow us to get data in reques.body
app.use(express.json({ extended:false }));


  //registering routes
  app.use(routes)
 
 
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}else{
//registering routes
app.use(routes)

}


app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
  });
  

  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });

module.exports = app;