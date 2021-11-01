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

var passportSchema = new mongoose.Schema({}, {strict: false});
Passport = mongoose.model('passport', passportSchema);

// @route    GET api/passports
// @desc     recieve a passport
// @access   public
router.get('/',  async (req, res) => {
    try {
        const passport = await Passport.findOne({});
        res.status(200).json(passport);
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error');
    }
});

module.exports = router;
