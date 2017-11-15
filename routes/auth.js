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

router.get('/verify',(req,res)=>{
  if(req.user){
    console.log(req.user);
  }else{
    console.log('Not auth');
  }
});

router.get('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/');
});

module.exports = router;