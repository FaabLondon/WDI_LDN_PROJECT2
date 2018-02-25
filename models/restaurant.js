//Model will connect to DB and perform CRUD actions on DB

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  mainTitle: {type: String, minlength: 2, required: true},
  content: {type: String, minlength: 2, required: true},
  rating: {type: Number, min: 0, max: 50},
  moderated: {type: Boolean}
  //user:
});

const schema = new mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true},
  priceRange: {type: String, required: true},
  cuisine: {type: String, required: true},
  description: {type: String, maxlength: 360},
  image: {type: String,pattern: /^https?:\/\/.+/},
  address: {type: String},
  phone: {type: String},
  website: {type: String,pattern: /^https?:\/\/.+/},
  reviews: [reviewSchema]
  //createbyUser:
});

module.exports = mongoose.model('Restaurant', schema);
