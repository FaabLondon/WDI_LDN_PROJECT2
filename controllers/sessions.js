//sessions controller
const User = require('../models/user');

//NEW route - login page
function newRoute(req, res){
  res.render('sessions/new');
}

//CREATE route - creates a new session when logged in
function createRoute(req, res, next){
  User.findOne({email: req.body.email})
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)){
        return res.redirect('/login');
      }

      //Logged in ! store the logged in user's ID into the session cookie, to know that user logged in. Otherwise logged out immediately on redirect
      req.session.UserSessionid = user._id;

      //flash message

      res.redirect('/');
    })
    .catch(next);
}

//logout
function deleteRoute(req, res){
  req.session.regenerate(() => res.redirect('/'));
}


module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
