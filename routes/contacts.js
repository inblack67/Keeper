const express = require('express');
const router = express.Router();
const colors = require('colors');
const { validationResult, check } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');


// GET /api/contacts
// get all user's contacts
// privtate
router.get('/', auth, async (req,res) => {

  try {
    const contacts = await Contact.find({user: req.user}).sort({date: -1});
    res.status(200).json({success: true, contacts});

    // as every user (id) is associated with each contact, findByID wont work

  } catch (error) {
    return res.status(500).json({success: false, msg: 'Server Error'});
  }

});

// POST /api/contacts
// add a new contact
// private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty()
]] , async (req,res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty())
  {
    return res.status(400).json({success: false, errors});
  }

  // no errors -> proceed
  const { name, email, type, phone } = req.body;

  try {

    let existingContact = await Contact.findOne({email});

    if(existingContact)
    {
      return res.status(400).json({success: false, msg: 'Contact Already Exists'});
    }

    const newContact = new Contact({name, email, phone, type, user: req.user});



    const contact = await newContact.save();
    
    res.status(201).json({ success: true, contact, msg: 'contact saved successfully' });
    
  } catch (error) {
    return res.status(500).json({success: false,error});
  }
});

router.put('/:id', (req,res) => {
  res.send('update contact');
});

router.delete('/:id', (req,res) => {
  res.send('delete contact');
});


module.exports = router;