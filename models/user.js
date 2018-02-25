//Model will connect to DB and perform CRUD actions on DB
//Restaurant and review models
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// set up the 'passwordConfirmation' virtual
// store the password on the user model temporarily so we can access it in our pre-validate hook
// `this` refers to the user object. It contains data object from user.create(req.body) //The '_' means it is temporary
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

//pre-validate hook to check that password and password confirmation match
schema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');

  // otherwise continue to the next step (validation)
  next();
});

//pre-save hook to hash the password before saving to DB
// hash the password with bcrypt and store the hashed password on the user object
schema.pre('save', function hashPassword(next){
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }

  // continue to the next step (save)
  next();
});

// compareSync compares a plain text password against the hashed one stored on the user object
// Any functions added to the methods object will be shared by all instances of the model. 
schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', schema);
