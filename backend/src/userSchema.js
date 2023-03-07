const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
    salt: String,
    hash: String,
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  },
  session:{
    type: String,
  },
  sessionTime:{
    type: Date,
  },
  headline:{
    type: String,
  },
  email:{
    type: String,
  },
    zipcode:{
    type: String,
    },
    dob:{
    type: Date,
    },
  following:{
    type: Array,
  }
})

module.exports = userSchema;
