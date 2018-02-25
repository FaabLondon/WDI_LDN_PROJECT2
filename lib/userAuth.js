const User = require('../models/user');

//middleware to check on page load that user is actually logged in
function userAuth(req, res, next){
  if(!req.session.UserSessionid) return next();

  //otherwise we use the id to find the user in the DB
  User.findById(req.session.UserSessionid)
    .then(user => {

      // if the user hasn't been found, log them out (ie delete the data in the session) - regenerate clears the data in the session cookie
      if(!user) req.session.regenerate(() => res.redirect('/login'));

      // add some helpers to res.locals to be accessed anywhere in the views/template
      res.locals.isAuthenticated = true;
      res.locals.currentUser = user;

      // store the user data on `req` to be used inside the controllers
      req.currentUser = user;
      
      next();
    });
}

module.exports = userAuth;
