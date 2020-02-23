const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,   // document has obj id
    ref: 'users'    // refer to specific collections
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
  },
  type:{
    type: String,   
    default: 'personal'       // or proffessional
  },
  date:{
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('contact', ContactSchema);