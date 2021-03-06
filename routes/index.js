const router = require('express').Router();
const passport = require('passport');
const { Story } = require('../models/Story');
const { ensureAuthentication, ensureGuest } = require('../helpers/security/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard/:id?', ensureAuthentication, (req, res) => {
  let id=(req.params.id)?req.params.id:req.user._id;
  Story.find({
    user:id
  })
  .or([{'user':req.user._id},{ 'status': 'public' }])
  .populate('user')
  .then(stories=>{
    res.render('index/dashboard',{stories});
  });
});

router.get('/about', (req, res) => {
  res.render('index/about');
});

module.exports = router;