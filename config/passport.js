const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('./../models/User');

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy:true
  },
    function (accessToken, refreshToken, profile, done) {
      // console.log(accessToken);
      // console.log(profile);
      const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      };

      User.findOne({
        googleID: profile.id
      }).then(user => {
        if (user) return done(null, user);
        new User(newUser).save().then(user => {
          return done(null, user);
        });
        done(null,user);
      }).catch((err)=> {console.log(err); done(err); });
    }
  ));
}