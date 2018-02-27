$(() => {
  console.log('JS Loaded');

  $('form').validate(); //to activate jquery validate plugin on form validations


  //*************************************************************
  //on mouseover on rating circles
  $('.ratingcircle').on('mouseover', function () {
    const value = ratingValue($(this)); //this is div hovered on, function returns value of rating
    $('.rating').attr('value', value); //updates hidden input field in form with value

    //initialise all circles to unchecked
    $('.ratingcircle').each(function() { //for each dividend
      $(this)
        .find('[data-fa-i2svg]') //finds descendent (svg/i) with that value
        .removeClass('fa-dot-circle')
        .addClass('fa-circle');
    });

    //ensures that all circles before is also checked
    $('.ratingcircle').each(function() {
      if(ratingValue($(this)) <= value){
        $(this) //dividend
          .find('[data-fa-i2svg]') //finds descendent (svg/i) with that value
          .removeClass('fa-circle')
          .addClass('fa-dot-circle');
      }
    });
  });

  //*************************************************************
  //display average review value in rating circles
  const value = $('.averageRating').attr('data-value'); //this works and returns the average review value for that restaurant

  //loop through all div
  $('.averageRatingcircle').each(function() {
    if(ratingValue($(this)) <= value){ // each dividend
      $(this)
        .find('[data-fa-i2svg]')//finds descendent (svg/i) with that value
        .removeClass('fa-circle')
        .addClass('fa-dot-circle');
    }
  });


  //*************************************************************
  //function returns the value of the rating
  function ratingValue(obj){
    const startSearch = obj.attr('class').search('rating-') + 7;
    return obj.attr('class').substr(startSearch, 2);
  }

  //*************************************************************

});
