require('./config/config');

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers=require('./helpers/handlebars/hbs');
const bodyParser = require('body-parser')
const methodOverride=require('method-override');
const port = process.env.PORT;

// load DB config
require('./db/mongoose');
// Passport Config
require('./config/passport')(passport);

//Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

// Serve static files: css, js, fonts
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' , helpers: helpers}));
app.set('view engine', '.hbs');

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

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});