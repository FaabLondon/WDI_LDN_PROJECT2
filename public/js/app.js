/* global google*/

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

  //**************************************************************
  //filestack



  if($('#dropzone')[0]) {
    const client = filestack.init('AFOYrjEmESlCGqN9sQtLOz');

    const pickOptions = {
      accept: 'image/*',
      maxFiles: 1,
      minFiles: 1,
      maxSize: 1024*1024,
      imageDim: [500, 300],
      transformations: { crop: true }
    };

    client.makeDropPane({
      id: 'dropzone',
      customText: 'Drag and Drop, copy and paste image or the URL of your image ',
      onSuccess: result => $('.InputImage').attr('value', result[0].url)
      // onError: () => alert('Oups, there was a problem with the file upload')
    }, pickOptions);
  }


  if($('#dropzoneProfilepic')[0]) {
    const client = filestack.init('AFOYrjEmESlCGqN9sQtLOz');
    const pickOptions = {
      accept: 'image/*',
      maxFiles: 1,
      minFiles: 1,
      maxSize: 1024*1024,
      imageDim: [200, 300],
      transformations: { crop: true }
    };

    client.makeDropPane({
      id: 'dropzoneProfilepic',
      customText: 'Drag and Drop, copy and paste image or the URL of your image ',
      onSuccess: result => $('.ProfilePic').attr('value', result[0].url)
      // onError: () => alert('Oups, there was a problem with the file upload')
    }, pickOptions);
  }

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
  //function returns the value of the rating based on which circle is hovered on
  function ratingValue(obj){
    const startSearch = obj.attr('class').search('rating-') + 7;
    return obj.attr('class').substr(startSearch, 2);
  }

  //*************************************************************

  //to activate burger menu on mobile in BULMA
  // Add a click event on each burger menu
  $('.navbar-burger').on('click', function () {
    // Get the target from the "data-target" attribute
    const target = $(this).attr('data-target');
    const $target = $(target);
    // Toggle the class on both the "navbar-burger" and the "navbar-menu"
    //$(this).toggle('is-active');
    $target.toggle('is-active');
  });

  //*************************************************************
  //GOOGLE MAPS SETUP

  function initMap() {

    const geocoder = new google.maps.Geocoder();
    const address = $('#restaurantAddress').text();
    // gets the latitute and longitude of the restuarant based in its address
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        const latitude = results[0].geometry.location.lat(); //number
        const longitude = results[0].geometry.location.lng(); //number

        const location = {lat: latitude, lng: longitude};
        const map = new google.maps.Map($('#map')[0], {
          zoom: 15,
          center: location
        });
        new google.maps.Marker({
          position: location,
          map: map
        });
      }
    });
  }

  if($('#map')[0]) initMap();

  //*************************************************************
  //GOOGLE AUTOCOMPLETE SETUP for ADDRESSES AND CITIES

  function initAutocompleteAddress() {
    //google maps autocomplete with addresses
    new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement}*/
      ($('#autocompleteAddress')[0]),
      {types: ['geocode']});
  }

function initAutocompleteCity() {
    //google maps autocomplete with cities
    new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement}*/
      ($('#autocompleteCity')[0]),
      {types: ['(cities)']});
  }

  if($('#autocompleteAddress')[0]) initAutocompleteAddress();
  if($('#autocompleteCity')[0]) initAutocompleteCity();

});
