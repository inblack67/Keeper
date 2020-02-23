const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



// @desc get all users
// @route GET /api/users
// @access public
router.get('/', async (req,res) => {
  const users = await User.find();
  res.status(200).json({success: true, users});
});


// @desc Create a user
// @route POST /api/users
// @access jwt
router.post('/', [
  
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid Email is required').isEmail(),
  check('password', 'Password must be greater than 6 characters')
  .isLength({min: 6})

], async (req,res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty())
  {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  try {

    let user = await User.findOne({email});

    if(user)
    {
      return res.status(400).json({success: false, msg: 'User already exists'});
    }
  
    user = new User({
      name,
      email,
      password
    });

    // hashing the password
    const salt = await bcrypt.genSalt(10);   // 10(defaul) - number of rounds

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // jwt is here
    const payload = {
      user:{
        id: user.id   // created by mongo
      }
    }

    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000   // seconds
    }, (err, token) => 
    {
      if(err) throw err;
      res.json(token);
    });

  } catch (error) {
    console.error(error.message.red.underline);
    res.status(500).json({success: false, msg: 'Server Error'});
  }

});


module.exports = router;