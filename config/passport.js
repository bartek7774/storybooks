const GoogleStrategy=require('passport-google-oauth20').Strategy;
const mongoose=require('mongoose');

module.exports=function(passport){
  passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy:true
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken);
    console.log(profile);
  }
));
}