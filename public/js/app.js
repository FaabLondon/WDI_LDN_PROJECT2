$(() => {
  console.log('JS Loaded');

  $('form').validate(); //to activate jquery validate plugin on form validations

  //on mouseover on rating circles
  $('.ratingcircle').on('mouseover', function () {
    const value = ratingValue($(this)); //this is dividend hovered on
    $('.rating').attr('value', value); //updates hidden input field in form with value

    //initialise all circles to unchecked
    $('.ratingcircle').each(function() {
      $(this) //dividend
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


  function ratingValue(obj){
    const startSearch = obj.attr('class').search('rating-') + 7;
    return obj.attr('class').substr(startSearch, 2);
  }

});
