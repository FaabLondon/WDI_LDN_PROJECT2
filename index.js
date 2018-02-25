const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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

//tell express to use Router
app.use(router);

//Start the app listening out for incoming connections
app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
