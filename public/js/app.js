$(() => {
  console.log('JS Loaded');
  $('form').validate(); //to activate jquery validate plugin on form validations

  var ratingCircle = document.querySelectorAll('.ratingcircle'); //select

  ratingCircle[0].addEventListener('mouseover', e => {
    alert('test');
    // e.target.classList.removeClass('fa-circle');
    // e.target.addClass('fa-dot-circle');
  });


});
