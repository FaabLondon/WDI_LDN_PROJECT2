//file to seed the mongoose DB with data

const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
mongoose.Promise = require('bluebird');
const restaurantData = require('./data/restaurants');

mongoose.connect('mongodb://localhost/main-database', (err, db) =>{
  db.dropDatabase();

  Restaurant.create(restaurantData)
    .then(restaurants => console.log(`${restaurants.length} records created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
