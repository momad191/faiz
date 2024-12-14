const express = require('express');
const router = express.Router(); 

const userRoutes = require("../domains/users");
const authRoutes = require("../domains/auth");
const categoyRoutes = require("../domains/categories");
const sourcesRoutes = require("../domains/sources");
const postRoutes = require("../domains/posts");
 

router.use('/api/users',userRoutes);
router.use('/api/auth',authRoutes);
router.use('/api/categories',categoyRoutes);
router.use('/api/sources',sourcesRoutes);
router.use('/api/posts',postRoutes);



module.exports = router;