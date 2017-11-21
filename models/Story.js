const mongoose = require('mongoose');

let StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  comments: [{
    commentBody: {
      type: String,
      require: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
    commentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

let Story = mongoose.model('stories', StorySchema, 'stories');

module.exports = { Story };