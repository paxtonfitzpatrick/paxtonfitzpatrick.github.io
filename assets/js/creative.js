(function($) {
  "use strict";

  const navbarHeight = document.getElementById('main-nav').offsetHeight;

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - navbarHeight)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll

  // scrollspy offset must be greater than (not equal to) navbar height for
  // current section to be highlighted correctly after scrolling to it
  $('body').scrollspy({
    target: '#main-nav',
    offset: navbarHeight + 1
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#main-nav").offset().top > 100) {
      $("#main-nav").addClass("navbar-scrolled");
    } else {
      $("#main-nav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict
