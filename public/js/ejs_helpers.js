//When I try to call it in the template for each review, it does not work
// <% ejsHelpers['reviewCircle']() %>

//*************************************************************
//display review value in circles
function reviewCircle(){
  const valueReview = $('.reviewRating').attr('data-value'); //Returns the review value

  //loop through all div/circles
  $('.reviewcircle').each(function() {
    if(ratingValue($(this)) <= valueReview){ // each dividend
      $(this)
        .removeClass('circle')
        .addClass('dot-circle');
    }
  });
}

//*************************************************************
//function returns the value of the rating based on which circle is hovered on
function ratingValue(obj){
  const startSearch = obj.attr('class').search('rating-') + 7;
  return obj.attr('class').substr(startSearch, 2);
}

//*************************************************************

module.exports = {
  reviewCircle: reviewCircle,
  ratingValue: ratingValue
};
