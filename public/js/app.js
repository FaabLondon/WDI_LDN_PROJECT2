$(() => {
  console.log('JS Loaded');

  $('form').validate(); //to activate jquery validate plugin on form validations

  //***************** SLICK CARROUSEL ******************************

  $('.carrousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    centerMode: true
    // centerPadding: '20px',
    //variableWidth: true
  });

  // $('.homepageTitle').slick();

  //*************************************************************
  //on mouseover on rating circles
  $('.ratingcircle').on('mouseover', function () {
    const value = ratingValue($(this)); //this is div hovered on, function returns value of rating
    $('.rating').attr('value', value); //updates hidden input field in form with value

    //initialise all circles to unchecked
    $('.ratingcircle').each(function() { //for each dividend
      $(this)
        .removeClass('dot-circle')
        .addClass('circle');
    });

    //ensures that all circles before is also checked
    $('.ratingcircle').each(function() {
      if(ratingValue($(this)) <= value){
        $(this) //dividend
          .removeClass('circle')
          .addClass('dot-circle');
      }
    });
  });

  //*************************************************************
  //display average review value in rating circles
  const value = $('.averageRating').attr('data-value'); //Returns the average review value for that restaurant

  //loop through all div/circles and keep track of where the last one was
  let counter = 0;
  $('.averageRatingcircle').each(function() {
    if(ratingValue($(this)) <= value){ // each dividend
      counter++;
      $(this)
        .removeClass('circle')
        .addClass('dot-circle');
    }
  });
  //add a half circle as showing rating by 0.5
  if (value % 1 === 0.5) {
    //adds a half circle on the next circle
    $($('.averageRatingcircle')[counter]).removeClass('circle');
    $($('.averageRatingcircle')[counter]).addClass('dot-half-circle');
  }


  //*************************************************************
  //display review value in circles

  // const valueReview = $('.reviewRating').attr('data-value'); //Returns the review value
  //
  // //loop through all div/circles
  // $('.reviewcircle').each(function() {
  //   if(ratingValue($(this)) <= valueReview){ // each dividend
  //     $(this)
  //       .removeClass('circle')
  //       .addClass('dot-circle');
  //   }
  // });


  //*************************************************************
  //function returns the value of the rating based on which circle is hovered on
  function ratingValue(obj){
    const startSearch = obj.attr('class').search('rating-') + 7;
    return obj.attr('class').substr(startSearch, 2);
  }

  //*************************************************************

});
