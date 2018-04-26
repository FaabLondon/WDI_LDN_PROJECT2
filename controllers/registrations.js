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

//show edit profile for user
function editRoute(req, res, next){
  User.findById(req.params.userid)
    .then(user => res.render('registrations/edit', {user}))
    .catch(next);
}

//enables to update the user profile
function updateRoute(req, res, next){
  User.findById(req.params.userid)
    .then(user => {
      console.log(req.body.password);
      if(!user.validatePassword(req.body.password) || !user.validatePassword(req.body.passwordConfirmation)){
        res.redirect(`/register/${req.params.userid}/edit`);
      } else {
        Object.assign(user, req.body);
        user.save();
        res.redirect('/');
      }
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute
};
