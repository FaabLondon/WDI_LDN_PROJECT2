//file to seed the mongoose DB with data
const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant');
mongoose.Promise = require('bluebird');
let restaurantData = require('./data/restaurants');
const User = require('../models/user');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/main-database', (err, db) =>{
  //db.dropDatabase();
  db.dropCollection('restaurants');

  User.findOne({ admin: true }) //all the seed restaurant will be created by admin
    .then(user => {
      restaurantData = restaurantData.map(restaurant => {
        restaurant.user = user;
        return restaurant;
      });

      Restaurant.create(restaurantData)
        .then(restaurants => {
          console.log(`${restaurants.length} records created`);
        })
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());
    });


  //Create the admin account - password is modified afterwards and create all restaurants in DB with that user
  // User.create({
  //   username: 'FaabLondon',
  //   email: 'faabke@gmail.com',
  //   password: 'password',
  //   passwordConfirmation: 'password',
  //   admin: true
  // })
  //
  //   .then(user => {
  //     restaurantData = restaurantData.map(restaurant => {
  //       restaurant.user = user;
  //       return restaurant;
  //     });
  //
  //     Restaurant.create(restaurantData)
  //       .then(restaurants => {
  //         console.log(`${restaurants.length} records created`);
  //       })
  //       .catch(err => console.log(err))
  //       .finally(() => mongoose.connection.close());
  //   });
});
