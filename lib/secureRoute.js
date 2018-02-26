//secure route middleware to restrict access to certain route if user hs not created restaurant or review
function secureRoute(req, res, next) {
  if(!req.session.UserSessionid){
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to do that.');
      res.redirect('/login');
    });
  }
  next(); //sends to next action which is the route
}

module.exports = secureRoute;
