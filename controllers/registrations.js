const User = require('../models/user');


//NEW user registration Route
function newRoute(req, res){
  res.render('registrations/new');
}

//pre-save and pre-validate hooks will happen before creating the new user record in DN
function createRoute(req, res, next){
  User.create(req.body)
    .then(() => res.redirect('/login'))
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute
};
