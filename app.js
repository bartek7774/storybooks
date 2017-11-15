require('./config/config');

const express = require('express');
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

// Use Routes for auth
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});