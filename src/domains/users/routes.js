const express = require('express')
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config()
 
const { check, validationResult } = require('express-validator');
   
// User model
const User = require('./model');

router.post('/',
[ 
check('fullname', 'fullname is required')
.not()
.isEmpty(),

check('username', 'username is required')
.not()
.isEmpty(),

check('email', 'Please include a valid email').isEmail(),
check(
  'password',
  'Please enter a password with 6 or more characters'
).isLength({ min: 6 })
],
async(req,res,next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {fullname,email,username,password} = req.body;

  try {
            //see if user exists
            let user = await User.findOne({ email });
            if (user) {
              return res
                .status(400)
                .json({ errors: [{ msg: 'The email you chose already exists...try another' }] });
            }


                     //see if user exists
                     let username1 = await User.findOne({ username });
                     if (username1) {
                       return res
                         .status(400)
                         .json({ errors: [{ msg: 'The username you chose already exists...try another' }] });
                     }

 
          user = new User({
            fullname,
            email,
            username,
            password
          })

          //encrypt password
          const salt = await bcrypt.genSalt(10);

          user.password = await bcrypt.hash(password, salt);

      user.save();
      // res.json(user);
      // res.send('user registerd')



      const payload = {
        user: {
          id: user.id
        }
      };

     
            jwt.sign(
              payload,
              process.env.jwtSecret,
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

})



 
module.exports = router;