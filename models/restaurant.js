//Model will connect to DB and perform CRUD actions on DB
//Restaurant and review models
const mongoose = require('mongoose');
//const User = require('./user');

const reviewSchema = new mongoose.Schema({
  maintitle: {type: String, minlength: 2, required: true},
  content: {type: String, minlength: 2, required: true},
  rating: {type: Number, min: 0, max: 50},
  moderated: {type: Boolean, default: false},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

//add virtual to display time stamp on review
reviewSchema
  .virtual('formattedDate') //Name of the virtual
  .get(function getFormattedDate() { //it gets data from the DB
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[this.createdAt.getMonth()] + '-' + this.createdAt.getFullYear();
  });

//add methods to check wether a review is owned bt a certain user
reviewSchema.methods.isOwnedBy = function(user){ //pass in logged in User
  return this.user && user._id.equals(this.user._id);   //.this is the comment . HAve to use .equals as comparing 2 objects
};

//restaurant schema
const schema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  location: {type: String, required: true},
  priceRange: {type: String, required: true, enum: ['£', '££', '£££', '££££']},
  cuisine: {type: String, required: true},
  description: {type: String, required: true, maxlength: 380},
  image: {
    type: String,
    required: true,
    validate: image => /https?:\/\/.+/.test(image)
  },
  address: {type: String,required: true},
  phone: {
    type: String,
    required: true
    // validate: phone => /[0-9]{3}-[0-9]{4}-[0-9]{4}/.test(phone) //does not work
  },
  website: {
    type: String,
    required: true,
    validate: image => /https?:\/\/.+/.test(image)
  },
  reviews: [reviewSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

//add methods to check wether a restaurant is owned by a certain user
schema.methods.isOwnedBy = function(user){ //pass in logged in User
  // (typeof this.user === 'undefined' || user === 'undefined')
  return this.user && user._id.equals(this.user._id);   //.this is the restaurant
};

//add virtual to calculate average rating
//loop through the array of reviews and return the average
schema
  .virtual('averageRating') //Name of the virtual
  .get(function getaverageRating() {
    let sum = 0;
    const filteredArray = this.reviews.filter((elt) => {
      return elt.moderated === true;
    });
    const nbReviewsModerated = filteredArray.length;
    if (nbReviewsModerated !== 0){
      filteredArray.forEach(obj => {
        sum = sum + obj['rating'];
      });
      return Math.round(sum / nbReviewsModerated * 2)/2;
    } else return 0;
  });

//add virtual to calculate the number of reviews
schema
  .virtual('numberReviews') //Name of the virtual
  .get(function getNumberReviews() {
    return this.reviews.length;
  });

//add virtual to generate distinct locations - did not work as attached to each restaurant and not restaurants so could not show it on the index page.
// schema
//   .virtual('distinctLocations') //Name of the virtual
//   .get(function getdistinctLocations() { //it gets data from the DB
//     return this.find().distinct('location');
//   });



module.exports = mongoose.model('Restaurant', schema);
