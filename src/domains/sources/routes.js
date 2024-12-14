const express = require('express')
const router = express.Router(); 
const auth = require('../../middleware/auth');
require("dotenv").config()
const { check, validationResult } = require('express-validator');
// Source model
const Source = require('./model');
const User = require('./model');
 
     
// @route    source Method api/sources
// @desc     Create a source
// @access   Private
router.post(
    '/', 
    [  
      auth,
    check('source_name', 'Source name is required')
    .not()
    .isEmpty(),
    check('source_code', 'Source code is required')
    .not()
    .isEmpty(),
    ], 
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 
      const {source_name} = req.body;
      try { 
        let source1 = await Source.findOne({source_name});
        if (source1) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'The source you chose already exists...try another' }] });
        } 
        const newSource = new Source({
          user: req.user.id,
          source_name: req.body.source_name,
          source_code: req.body.source_code,
          source_img: req.body.source_img,
          source_website: req.body.source_website,
          source_country: req.body.source_country,
          source_country_code: req.body.source_country_code,
        });
        const source = await newSource.save();
        res.json(source);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

        
      }
    }
  );





// @route    GET api/sources
// @desc     Get all sources
// @access   public
router.get('/', async (req, res) => {
  try {
    const source = await Source.find().sort({date:-1});
    res.json(source);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


 

// @route    GET api/sources/user
// @desc     Get all sources for the user
// @access   Private
router.get('/authuser',auth, async (req, res) => {
  try {
    // const user = await User.findOne({username:req.user.id});
    const sources = await Source.find({user:req.user.id}).sort({date:-1});
    res.json(sources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
  
// @route    GET api/sources/byusername/:username
// @desc     Get all sources for the user by url parameter
// @access   Private
router.get('/byusername/:username', async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.username});
    const sources = await Source.find({user:user._id}).sort({date:-1});
    res.json(sources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



// @route    DELETE api/sources/:id
// @desc     Delete a source
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);
    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !source) {
      return res.status(404).json({ msg: 'source not found' });
    }
    await source.deleteOne();
    res.json({ msg: 'source removed'});
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
 
    const source = await Source.findById(req.params.id).sort({date:-1});
    res.json(source);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

    
  
  //************************************************************************ */

  router.post('/update/:id',auth, async (req, res) => {
    try {
      const pp = await Source.findById(req.params.id)
      pp.user = req.user.id;
      pp.source_name = req.body.source_name;
      pp.source_img = req.body.source_img;
      await pp.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



module.exports = router;
 