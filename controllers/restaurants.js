//Controller will combine DB (Models) and views

const Restaurant = require('../models/restaurant');

//INDEX route for restaurants
function indexRoute(req, res, next){
  Restaurant.find()
    .then(restaurants => res.render('restaurants/index', {restaurants}))
    .catch(next);
}

//SHOW route for restaurants
function showRoute(req, res, next){
  Restaurant.findById(req.params.id)
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

module.exports = {
  index: indexRoute,
  new: newRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  create: createRoute,
  delete: deleteRoute
};
