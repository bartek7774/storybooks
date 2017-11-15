const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), 
(req, res) => {
  res.send('auth');
});

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
  });

module.exports = router;