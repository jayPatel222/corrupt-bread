const express = require('express');
const router = express.Router();


router.get('/',(req,res) => res.send('profile added'));
// @route  GET Api/posts
// @desc   Test route
// @access  Public
module.exports = router;