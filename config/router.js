//************* ROUTER **********************
const router = require('express').Router();
const restaurants = require('../controllers/restaurants');
const registration = require('../controllers/registrations');
const session = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

//Request listener to serve home template
router.get('/', (req, res) => res.render('pages/home'));

//INDEX and CREATE route
router.route('/restaurants')
  .get(restaurants.index)
  .post(secureRoute, restaurants.create);

//NEW route
router.route('/restaurants/new')
  .get(secureRoute, restaurants.new);

//SHOW, UPDATE and DELETE Route
router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(secureRoute, restaurants.update)
  .delete(secureRoute, restaurants.delete);

//NEW review
router.route('/restaurants/:id/reviews')
  .post(secureRoute, restaurants.reviewCreate);

//EDIT and DELETE review
router.route('/restaurants/:id/reviews/:reviewId')
  .get(secureRoute, restaurants.reviewEdit)
  .delete(secureRoute, restaurants.reviewDelete);


//EDIT Route
router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurants.edit);

//NEW User registration route
router.route('/register')
  .get(registration.new)
  .post(registration.create);

//NEW, CREATE routes for session - login
router.route('/login')
  .get(session.new)
  .post(session.create);

//DELETE Session - logout
router.route('/logout')
  .get(session.delete);

module.exports = router;
