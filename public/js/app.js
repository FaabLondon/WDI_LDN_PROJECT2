$(() => {
  console.log('JS Loaded');

  $('form').validate(); //to activate jquery validate plugin on form validations

  $('.ratingcircle').on('mouseover', function () {
    $(this)
      .find('[data-fa-i2svg]')
      .removeClass('fa-circle')
      .addClass('fa-dot-circle');
    const value = ratingValue($(this));
    $('.rating').attr('value', value);
    //ensures that the circle before is also checked - so if users hover on 5th circle, then the circle 1, 2, 3 an 4 are also ticked



  });

  function ratingValue(obj){
    const startSearch = obj.attr('class').search('rating-') + 7;
    return obj.attr('class').substr(startSearch, 2);
  }

});
