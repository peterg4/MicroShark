const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName,lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        firstName,
        lastName,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            token,
            success: true,
            message: "User created!",
            errors: []
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users/insert
// @desc     add scan to user history
// @access   Public
router.post('/insert', async (req, res) => {
  console.log('adding to history');
  try {
    let time = Date.now();
    let obj = {"0": req.body.params.hasPlastics, text: req.body.params.result, name: req.body.params.name, timestamp: time};
    console.log(obj);
    const history = await User.updateOne(
      { email: req.body.params.email },
      { $push: { history: obj } } 
    );
    if(history){
      res.status(200).json(history);
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Server Error');
}
})

module.exports = router;
