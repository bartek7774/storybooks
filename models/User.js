const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  }
});

let User = mongoose.model('users', UserSchema);

module.exports = { User };