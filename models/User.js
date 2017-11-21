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

UserSchema.statics.findOrCreate = function (profile, newUser) {
  let User = this;
  return User.findOne({ googleID: profile.id })
    .then(user => {
      if (user) {return Promise.resolve(user);}
      else {
        new User(newUser).save().then(user => {
          return Promise.resolve(user);
        });
      }
    }).catch(err => Promise.reject(err));
}

let User = mongoose.model('users', UserSchema);

module.exports = { User };