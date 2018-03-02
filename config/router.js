//************* ROUTER **********************
const router = require('express').Router();
const restaurants = require('../controllers/restaurants');
const registration = require('../controllers/registrations');
const session = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

//Request listener to serve home template
router.route('/')
  .get(restaurants.homepage);

//*************** RESTAURANTS ROUTES*****************************

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

//EDIT Route
router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurants.edit);

//**************** REVIEW ROUTES*****************************

//NEW review
router.route('/restaurants/:id/reviews')
  .post(secureRoute, restaurants.reviewCreate);

//DELETE review
router.route('/restaurants/:id/reviews/:reviewId')
  .delete(secureRoute, restaurants.reviewDelete);

//Show moderation page Reviews
router.route('/moderate')
  .get(secureRoute, restaurants.moderateShow);

//UPDATE or DELETE reviews in Moderation
router.route('/moderate/:id/reviews/:reviewId')
  .delete(secureRoute, restaurants.moderateDelete)
  .get(secureRoute, restaurants.moderateUpdate);

//*************** USER /REGISTRATION ROUTES*****************************

//NEW and CREATE User route
router.route('/register')
  .get(registration.new)
  .post(registration.create);

//EDIT User route
router.route('/register/:userid/edit')
  .get(secureRoute, registration.edit);

//UPDATE User route
router.route('/register/:userid')
  .put(secureRoute, registration.update);

//*************** SESSION ROUTES*****************************

//NEW, CREATE routes for session - login
router.route('/login')
  .get(session.new)
  .post(session.create);

//DELETE Session - logout
router.route('/logout')
  .get(session.delete);

//******************* ERROR MANAGEMENT *****************

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
