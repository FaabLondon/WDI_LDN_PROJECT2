//************* ROUTER **********************
const router = require('express').Router();
const restaurants = require('../controllers/restaurants');


//Request listener to serve home template
router.get('/', (req, res) => res.render('pages/home'));

//INDEX route
router.route('/restaurants')
  .get(restaurants.index);

//NEW route

//SHOW Route
router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(restaurants.update);

//EDIT Route
router.route('/restaurants/:id/edit')
  .get(restaurants.edit);


module.exports = router;
