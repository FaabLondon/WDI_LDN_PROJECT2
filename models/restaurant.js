//Model will connect to DB and perform CRUD actions on DB
//Restaurant and review models
const mongoose = require('mongoose');
//const User = require('./user');

const reviewSchema = new mongoose.Schema({
  maintitle: {type: String, minlength: 2, required: true},
  content: {type: String, minlength: 2, required: true},
  rating: {type: Number, min: 0, max: 50},
  date: { type: Date, default: Date.now },
  moderated: {type: Boolean, default: false},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

//restaurant schema
const schema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  location: {type: String, required: true},
  priceRange: {type: String, required: true},
  cuisine: {type: String, required: true},
  description: {type: String, required: true, maxlength: 360},
  image: {type: String, required: true, pattern: /^https?:\/\/.+/},
  address: {type: String,required: true},
  phone: {type: String, required: true},
  website: {type: String, required: true, pattern: /^https?:\/\/.+/},
  reviews: [reviewSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Restaurant', schema);
