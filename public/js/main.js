jQuery(document).ready(function ($) {


  $('.review-slider').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: 'ease-in-out',
    arrows: true,
    autoplay: true,
    // autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });




  (function () {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
        // Check validity
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        // Always add Bootstrap validation styling
        form.classList.add('was-validated');
      }, false);
    });
  })();


});







// public/js/confirmDelete.js




