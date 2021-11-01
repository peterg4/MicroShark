const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const mongoose = require('mongoose');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

var productSchema = new mongoose.Schema({}, {strict: false});
Product = mongoose.model('product', productSchema);

// @route    GET api/products
// @desc     check a product for plastics
// @access   public
//

router.get('/',  async (req, res) => {
    console.log(req.query.code);
    try {
        const passport = await Product.findOne({code: req.query.code});
        if(passport){
            res.status(200).json(passport);
        } else {
            res.status(200).json({"_id":{"$oid":"0"},"code":"Unknown","hasPlastics":"2"});
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
});

module.exports = router;
