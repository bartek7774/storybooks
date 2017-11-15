require('./config/config');

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('./db/mongoose');
const passport = require('passport');

const port = process.env.PORT;

// Passport Config
require('./config/passport')(passport);

//Load Routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
  res.send('It works!');
});

app.use(cookieParser());
app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Use Routes for auth
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});