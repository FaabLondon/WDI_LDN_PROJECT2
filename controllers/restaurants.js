//Controller will combine DB (Models) and views
const Restaurant = require('../models/restaurant');
const Promise = require('bluebird');

//homepage
function homepageRoute(req, res, next) {
  Restaurant.find()
    .then(restaurants => res.render('pages/home', {restaurants}))
    .catch(next);
}

//INDEX route for restaurants
function indexRoute(req, res, next){
  // console.log(req.query);
  Promise.props({
    allRestaurants: Restaurant.find(),
    restaurants: Restaurant.find(req.query)
  })
    .then(data => {
      ['location', 'cuisine', 'priceRange'].forEach(key => {
        data[`${key}s`] = Array.from(new Set(data.allRestaurants.map(restaurant => restaurant[key]))).sort();
        data[`selected${key}`] = typeof req.query[key] === 'string' ? req.query[key].split(): req.query[key] ;
        //store the selected data that can look like {cuisine: ['world food', 'italian']} or {cuisine: 'italian'}
      });
      res.render('restaurants/index', data); //Object of variable I want to pass in render
    })
    .catch(next);
}

//SHOW route for restaurants
//Populate : //to make sure to get the data for the referenced record when we retrieve the data from the database. Otherwise just gets ID - It search for user attached to reviews array and populates it. It  means that it replaces ID by user object
function showRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .populate('user') //had to populate user data in order to get access to restaurant.user._id
    .populate('reviews.user')
    .then(restaurant => res.render('restaurants/show', {restaurant}))
    .catch(next);
}

//EDIT route for restaurant
function editRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .then(restaurant => res.render('restaurants/edit', {restaurant}))
    .catch(next);
}

//UPDATE route for restaurant
function updateRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .then(restaurant => Object.assign(restaurant, req.body))
    .then(restaurant => restaurant.save())
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch(next);
}

//NEW route for restaurant
function newRoute(req, res){
  res.render('restaurants/new');
}

//CREATE route
function createRoute(req, res, next){
  req.body.user = req.currentUser; //to add user to the resturant inserted to DB
  Restaurant.create(req.body)
    .then(() => res.redirect('/restaurants'))
    .catch(next);
}

//DELETE Route
function deleteRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/restaurants'))
    .catch(next);
}

//newReview for restaurant
function reviewCreateRoute(req, res, next){
  req.body.user = req.currentUser; //add user to new review - was setup in userAuth
  req.flash('danger', 'Thank you for your contribution. Our moderators will review your comment and publish it shortly');
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      restaurant.reviews.push(req.body);
      return restaurant.save(); //why do we need to RETURN the saved parent collection - it is a callback so needs to be returned otherwise undefined
    })
    .then(restaurant => {
      res.redirect(`/restaurants/${restaurant._id}`);
    })
    .catch(next);
}

function reviewDeleteRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      //returns review with certain ID
      const review = restaurant.reviews.id(req.params.reviewId);
      review.remove();
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch(next);
}

function moderateShowRoute(req, res, next){
  if(!req.currentUser.admin){
    req.flash('danger', 'You do not have the permission to moderate');
    res.redirect('/');
  } else {
    Restaurant.find()
      .populate('reviews')
      .populate('reviews.user') //had to populate user data in order to see username etc
      .then(restaurants => {
        res.render('restaurants/showReview', {restaurants});
      })
      .catch(next);
  }
}

function moderateDeleteRoute(req, res, next){
  if(!req.currentUser.admin){
    req.flash('danger', 'You do not have the permission to moderate');
    res.redirect('/');
  } else {
    Restaurant.findById(req.params.id)
      .then(restaurant => {
        const review = restaurant.reviews.id(req.params.reviewId);
        review.remove();
        return restaurant.save(); //why do we need to RETURN the saved parent collection?
      })
      .then(() => moderateShowRoute(req, res, next))
      .catch(next);
  }
}

function moderateUpdateRoute(req, res, next){
  if(!req.currentUser.admin){
    req.flash('danger', 'You do not have the permission to moderate');
    res.redirect('/');
  } else {
    Restaurant.findById(req.params.id)
      .then(restaurant => {
        const review = restaurant.reviews.id(req.params.reviewId);
        review.moderated = true;
        return restaurant.save();
      })
      .then(() => moderateShowRoute(req, res, next))
      .catch(next);
  }
}

module.exports = {
  homepage: homepageRoute,
  index: indexRoute,
  new: newRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  create: createRoute,
  delete: deleteRoute,
  reviewCreate: reviewCreateRoute,
  reviewDelete: reviewDeleteRoute,
  moderateShow: moderateShowRoute,
  moderateDelete: moderateDeleteRoute,
  moderateUpdate: moderateUpdateRoute
};

//OLD INDEX ROUTE WITH CALLBACK HELL ;)
// Restaurant.find().distinct('location', (err, locations) => {
//   Restaurant.find().distinct('cuisine', (err, cuisines) => {
//     Restaurant.find().distinct('priceRange', (err, priceRanges) => {
//       Restaurant.find(req.query)
//         .then(restaurants => res.render('restaurants/index', {restaurants, locations, cuisines, priceRanges}))
//         .catch(next);
//     });
//   });
// });
