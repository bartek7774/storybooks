const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Passport Config
require('./config/passport')(passport);

//Load Routes
const auth = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('It works!');
});

// Use Routes
app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
})