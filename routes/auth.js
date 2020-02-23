const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { validationResult, check } = require('express-validator');


// get logged in user
// @route GET /api/auth
// @access private (logged in)
router.get('/', auth, async (req,res) => {
  try {
    const user = await User.findById(req.user);   // decoded.user = _id
    res.status(200).json({success: true, user});
  }
  catch (error) {
    return res.status(500).json({success:false, msg: 'Server Error'});
  }

});


// let the user log in
// @route POST /api/auth
// @access public (granted)
router.post('/',[

  check('email', 'Valid Email is required').isEmail(),
  check('password', 'Valid Password is required').exists()
],
 async (req,res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty())
  {
    return res.status(404).json({success:false, errors: errors});
  }

  // no validation errors - proceed

  const { email, password } = req.body;

  try {
    
  let user = await User.findOne({email});

  if(!user)
  {
    return res.status(404).json({success:false, msg: 'Invalid Credentials'});
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch)
  {
    return res.status(404).json({success:false, msg: 'Password Incorrect'});
  }

  // password matched

  const payload = {
    user: user.id
  }

  jwt.sign(payload, process.env.JWT_SECRET , {
    expiresIn: 36000
  }, (err, token) => {

    if(err) throw err;
    res.status(200).json({success:true, token});
    
  });

  } catch (error) {
    return res.status(404).json({success:false, error});
  }

});


module.exports = router;