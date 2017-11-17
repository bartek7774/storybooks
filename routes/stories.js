const router = require('express').Router();
const passport = require('passport');
const { ensureAuthentication } = require('../lib/helpers/auth');

router.get('/', (req, res) => {
  res.render('stories/index');
});

router.get('/add', (req, res) => {
  res.render('stories/add');
});

router.get('/edit', ensureAuthentication, (req, res) => {
  res.render('stories/edit');
});

router.get('/show', ensureAuthentication, (req, res) => {
  res.render('stories/show');
});

module.exports = router;