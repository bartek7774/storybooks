const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');
const { Story } = require('../models/Story');
const _ = require('lodash');
const { ensureAuthentication } = require('../helpers/security/auth');

router.get('/', (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .sort({ date: 'desc' })
    .then((stories) => {
      res.render('stories/index', { stories });
    });
});

router.get('/user/:userId', (req, res) => {
  Story.find({ user: req.params.userId, status: 'public' })
    .populate('user')
    .then(stories => {
      res.render('stories/index', { stories });
    });
});

router.get('/my', ensureAuthentication ,(req,res)=>{
  Story.find({user:req.user.id})
      .populate('user')
      .then(stories=>{
        res.render('stories/index',{stories});
      });
});

router.get('/add', ensureAuthentication, (req, res) => {
  res.render('stories/add');
});

router.post('/', ensureAuthentication, (req, res) => {
  let { allowComments } = req.body;
  let newStory = _.pick(req.body, ['title', 'status', 'body']);
  newStory.allowComments = allowComments ? true : false;
  newStory.user = req.user._id;

  new Story(newStory).save()
    .then((story) => {
      res.redirect(`/stories/show/${story._id}`);
    })
    .catch((err) => console.log(err));
});

router.get('/edit/:id', ensureAuthentication, (req, res) => {
  Story.findOne({ _id: req.params.id })
    .then(story => {
      if (story.user.toHexString() !== req.user._id.toHexString()) {
        res.redirect('/stories');
      } else {
        res.render('stories/edit', { story });
      }
    });
});

router.put('/:id', ensureAuthentication, (req, res) => {
  let { allowComments } = req.body;
  let changedStory = _.pick(req.body, ['title', 'status', 'body']);
  changedStory.allowComments = allowComments ? true : false;

  Story.findOneAndUpdate
    ({ _id: req.params.id, user: req.user._id },
    { $set: changedStory }, { new: true })
    .then(story => {
      return res.redirect('/dashboard');
    });
});

router.delete('/delete/:id', ensureAuthentication, (req, res) => {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send();
  Story.findOneAndRemove(
    { _id: req.params.id, user: req.user._id })
    .then(story => {
      if (!story) return res.status(404).send();
      res.redirect('/dashboard');
    });
});

router.get('/show/:id', (req, res) => {
  let userId=req.user?req.user.id:null;
  Story.findOne({
    _id: req.params.id
  })
    .populate('user')
    .populate({ path: 'comments.commentUser' })
    .or([{ 'status': 'public' }, { 'user': userId}])
    .then(story => {
      if (!story) return res.redirect('/stories');
      res.render('stories/show', { story });
    });

});

router.post('/comment/:id', ensureAuthentication, (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
    .and({ 'allowComments': 'true' })
    .then(story => {
      if (!story) return res.status(404).send();
      let newComment = _.pick(req.body, ['commentBody']);
      newComment.commentUser = req.user._id;
      story.comments.unshift(newComment);
      story.save().then(story => {
        return res.redirect(`/stories/show/${story.id}`);
      })
    });
});

module.exports = router;