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

//SHOW and DELETE Route
router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(secureRoute, restaurants.update)
  .delete(secureRoute, restaurants.delete);

//EDIT Route
router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurants.edit);

//NEW User registration route
router.route('/register')
  .get(registration.new)
  .post(registration.create);

//NEW Session route
router.route('/login')
  .get(session.new)
  .post(session.create);

module.exports = router;
