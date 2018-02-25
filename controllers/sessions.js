//sessions controller
const User = require('../models/user');

function newRoute(req, res){
  res.render('sessions/new');
}

function createRoute(req, res, next){
  
}


module.exports = {
  new: newRoute,
  create: createRoute
};
