const express = require('express')
const router = express.Router(); 
const auth = require('../../middleware/auth');

 
require("dotenv").config()
 
const { check, validationResult } = require('express-validator');

// Category model
const Category = require('./model');
const User = require('../users/model');

   
 // @route    POST Method api/categories
// @desc     Create a category
// @access   Private
router.post(
    '/', 
    [
      auth,
    check('category_name', 'Category name is required')
    .not()
    .isEmpty(),
    check('category_code', 'Category code is required')
    .not()
    .isEmpty(),
    ], 
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 
      // const {category_name} = req.body;
      try { 
        // let category1 = await Category.findOne({category_name});
        // if (category1) {
        //   return res
        //     .status(400)
        //     .json({ errors: [{ msg: 'The category you chose already exists...try another' }] });
        // }
 
 
        const newCategory = new Category({
            user: req.user.id,
            category_name: req.body.category_name,
            category_name_EN: req.body.category_name_EN,
            category_code: req.body.category_code,
            category_url: req.body.category_url,
            category_MAIN: req.body.category_MAIN,
            
        });
        const category = await newCategory.save();
        res.json(category);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

        
      }
    }
  );



  
  
// @route    GET api/categories
// @desc     Get all categories
// @access   Private
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({date:-1});
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
 
   
 
// @route    GET api/categories/user
// @desc     Get all categories for the user
// @access   Private
router.get('/authuser',auth, async (req, res) => {
  try {
    // const user = await User.findOne({username:req.user.id});
    const categories = await Category.find({user:req.user.id}).sort({date:-1});
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
   
   

// @route    GET api/categories/byusername/:username
// @desc     Get all categories for the user by url parameter
// @access   Private
router.get('/cat/byusername/:username', async (req, res) => {
  try {
 
    const user = await User.findOne({username:req.params.username});
                            
    const categories = await Category.find({user:user._id});
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

 
 


// @route    DELETE api/categories/:id
// @desc     Delete a category
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
 
   
    await category.deleteOne();

    res.json({ msg: 'Category removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

 



// @route    GET api/posts/id
// @desc     Get  post By id
// @access   Private
router.get('/:id', async (req, res) => {
  try {
 
    const category = await Category.findById(req.params.id).sort({date:-1});
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



  //************************************************************************ */

  router.post('/update/:id',auth, async (req, res) => {
    try {
      const pp = await Category.findById(req.params.id) 
      pp.user = req.user.id;
      pp.category_name = req.body.category_name;
      pp.category_name_EN = req.body.category_name_EN;
      pp.category_url = req.body.category_url;
      pp.category_MAIN = req.body.category_MAIN;
   
      await pp.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  
module.exports = router;