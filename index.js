const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const userAuth = require('./lib/userAuth');
const flash = require('express-flash');

//Mongoose
const mongoose = require('mongoose');
//tell mongoose to use bluebird as promise library
mongoose.Promise = require('bluebird');

//require router
const router = require('./config/router');

//create express app
const app = express();

//setup port number
const PORT = process.env.PORT || 8000;

//Connect to our database
mongoose.connect('mongodb://localhost/main-database');

//configure Express to use ejs
app.set('view engine', 'ejs');
//configure Express - tell where to look for template files
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

//tell app where to look for static files
app.use(express.static(`${__dirname}/public`));

//body-parser MUST come before the router
app.use(bodyParser.urlencoded({ extended: true }));

// setup method-override
app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//to manage session cookies - uses a key to decrypt the cookie
app.use(session({
  secret: 'GysHa^72u91sk3Fab(', // a random key used to encrypt the session cookie
  resave: false,
  saveUninitialized: false
}));

//set up flash messages - must be AFTER express-session as uses session cookie
app.use(flash());

//to check on each page load wether user is logged in or not
app.use(userAuth);

//tell express to use Router
app.use(router);

// error handler
app.use((err, req, res, next) => { //eslint-disable-line
  console.log(err);
  if(err.name === 'ValidationError') return res.render('pages/422', {err});
  res.render('pages/500', {err});
  // next(err);
});

//Start the app listening out for incoming connections
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
