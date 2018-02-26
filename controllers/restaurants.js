//Controller will combine DB (Models) and views

const Restaurant = require('../models/restaurant');

//INDEX route for restaurants
function indexRoute(req, res, next){
  Restaurant.find().distinct('location', (err, locations) => {
    Restaurant.find().distinct('cuisine', (err, cuisines) => {
      Restaurant.find().distinct('priceRange', (err, priceRanges) => {
        Restaurant.find()
          .then(restaurants => res.render('restaurants/index', {restaurants, locations, cuisines, priceRanges}))
          .catch(next);
      });
    });
  });
}

//SHOW route for restaurants
function showRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .populate('reviews.user') //to make sure to get the data for the referenced record when we retrieve the data from the database. Otherwise just gets ID
    //search for user attached to reviews array and populates it. It  means that it replaces ID by user object
    .populate('user') //had to populate user data in order to get access to restaurant.user._id
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
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      req.flash('danger', 'Thank you for your contribution. Our moderators will review your comment and publish it shortly');
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
      return restaurant.save(); //why do we need to RETURN the saved parent collection?
    })
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch(next);
}

function moderateShowRoute(req, res, next){
  Restaurant.find()
    .populate('reviews')
    //.populate('user') //had to populate user data in order to get access to restaurant.user._id
    .then(restaurants => {
      res.render('restaurants/showReview', {restaurants});
    })
    .catch(next);
}

function moderateDeleteRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      const review = restaurant.reviews.id(req.params.reviewId);
      review.remove();
      return restaurant.save(); //why do we need to RETURN the saved parent collection?
    })
    .then(() => moderateShowRoute(req, res, next))
    .catch(next);
}

function moderateUpdateRoute(req, res, next){
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      const review = restaurant.reviews.id(req.params.reviewId);
      review.moderated = true;
      return restaurant.save();
    })
    .then(() => moderateShowRoute(req, res, next))
    .catch(next);
}

module.exports = {
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
