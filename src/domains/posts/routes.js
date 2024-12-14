const express = require('express')
const router = express.Router(); 
const auth = require('../../middleware/auth');
require("dotenv").config()
 
const { check, validationResult } = require('express-validator');

// Category model
const Post = require('./model');
const User = require('../users/model');
const Category = require('../categories/model');
const Sources = require('../sources/model');
    
// @route   POST Method api/categories
// @desc     Create a category
// @access   Private
router.post(
    '/', 
    [
      auth,
    check('title', 'title name is required')
    .not()
    .isEmpty(),
    ], 
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 
           
      try { 
        const userID = await User.findById(req.user.id).select('-password');
        const categoryID = await Category.findOne({category_code:req.body.category_code});
        const sourceID = await Sources.findOne({source_code:req.body.source_code});

        

        const newPost = new Post({
        user: userID._id,
        category: categoryID._id,
        source: sourceID._id, 
        title: req.body.title,
        title_EN: req.body.title_EN,
        details: req.body.details,
        details_EN: req.body.details_EN,
        summary: req.body.summary,
        summary_EN: req.body.summary_EN,

        verified: req.body.verified,
        subscription_type: req.body.subscription_type,

        category_code: req.body.category_code,
        source_code: req.body.source_code,
        writer: req.body.writer,
        link: req.body.link,
        sectiontitle: req.body.sectiontitle,
        hometitle: req.body.hometitle,
        homebody: req.body.homebody,
        alt: req.body.alt,
        keywords: req.body.keywords, 
        pic1: req.body.pic1,
        source_img: req.body.source_img,
        source_url: req.body.source_url,
   
        source_country: sourceID.source_country,
        source_name: sourceID.source_name,
        source_icon: sourceID.source_img,

 
        });

        const post = await newPost.save();
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

        
      }
    }
  );



  //************************************************************************ */

router.post('/update/:id', async (req, res) => {
  try {
    const pp = await Post.findById(req.params.id)
    // pp._id = req.body._id;
    pp.title = req.body.title;
    pp.title_EN = req.body.title_EN;
    pp.link = req.body.link;
    await pp.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
  try {
    var populateQuery =
    [
 
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
   ];
    const posts = await Post.find().sort({date:-1}).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




// @route    GET api/posts/authuser
// @desc     Get all posts for the one user
// @access   Private
router.get('/authuser',auth, async (req, res) => {
  try {
    var populateQuery =
    [
 
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
   ];
    const posts = await Post.find({user:req.user.id}).sort({date:-1}).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



 
// @route    GET api/posts/byusername/:username
// @desc     Get all posts for the user by url parameter
// @access   Private
router.get('/byusername/:username', async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.username});
    var populateQuery =
    [
 
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
   ];
    const posts = await Post.find({user:user._id}).sort({date:-1}).populate(populateQuery);
    res.json(posts);
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
    var populateQuery =
    [
 
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
   ];
    const post = await Post.findById(req.params.id).sort({date:-1}).populate(populateQuery);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});






// @route    DELETE api/categories/:id
// @desc     Delete a category
// @access   Private
router.delete('/:id',auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'post not found' });
    }
   
    await post.deleteOne();

    res.json({ msg: 'post removed'});
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

  


router.get('/section/cat/:username/:category_code', async (req, res) => {
  try {

    const user = await User.findOne({username:req.params.username});
    var populateQuery =
    [
 
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
 
   ];


    const posts = await Post.find({user:user._id,category_code:req.params.category_code}).sort({ date:-1 }).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
     

router.get('/section/cat/maintitle/:username/:category_code', async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.username});
    var populateQuery =
    [
 
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
 
   ];

    const posts = await Post.findOne({sectiontitle:'ok',category_code:req.params.category_code,user:user._id}).sort({ date:-1 }).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});





router.get('/slideShow/hometitle/:username', async (req, res) => {
  try {

    const user = await User.findOne({username:req.params.username});
    var populateQuery =
    [
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
   ];
 
    const posts = await Post.find({hometitle:"ok",user:user._id}).limit().sort({ date:-1 }).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});





router.get('/slideShow/hometitleLimit/:username', async (req, res) => {
  try {

     const user = await User.findOne({username:req.params.username});
    var populateQuery =
    [
 
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
 
   ];
 
    const posts = await Post.find({hometitle:"ok",user:user._id}).limit(4).sort({ date:-1 }).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




router.get('/slideShow/:category/:username', async (req, res) => {
  try {

    const user = await User.findOne({username:req.params.username});

    var populateQuery =
    [
    {path:'user', select: 'fullname email password'},
    {path:'category', select: 'category_name  category_code'},
   ];
    const posts = await Post.find({category_code:req.params.category,user:user._id}).limit(4).sort({ date:-1 }).populate(populateQuery);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


 
  
module.exports = router;