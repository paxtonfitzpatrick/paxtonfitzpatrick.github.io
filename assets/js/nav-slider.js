(function($) {
  "use strict";

  // Nav Slider functionality
  function initNavSlider() {
    $('.nav-slider').each(function() {
      const $navSlider = $(this);
      const $activeLink = $navSlider.find('.nav-link.active');

      // Initialize slider position on page load
      if ($activeLink.length) {
        updateSliderPosition($navSlider, $activeLink);
      }
    });

    // Handle tab clicks
    $('.nav-slider .nav-link').on('shown.bs.tab', function(e) {
      const $clickedLink = $(e.target);
      const $navSlider = $clickedLink.closest('.nav-slider');
      updateSliderPosition($navSlider, $clickedLink);
    });

    // Handle window resize to recalculate positions
    $(window).on('resize', function() {
      $('.nav-slider').each(function() {
        const $navSlider = $(this);
        const $activeLink = $navSlider.find('.nav-link.active');
        if ($activeLink.length) {
          updateSliderPosition($navSlider, $activeLink);
        }
      });
    });
  }

  function updateSliderPosition($navSlider, $activeLink) {
    // Get the position and dimensions of the active link relative to the nav container
    const navSliderOffset = $navSlider.offset();
    const activeLinkOffset = $activeLink.offset();
    const activeLinkWidth = $activeLink.outerWidth();

    // Calculate the left position relative to the nav-slider container
    const leftPosition = activeLinkOffset.left - navSliderOffset.left + 2; // +2 for the groove padding

    // Set CSS custom properties to position and size the slider
    $navSlider[0].style.setProperty('--slider-left', leftPosition + 'px');
    $navSlider[0].style.setProperty('--slider-width', (activeLinkWidth - 4) + 'px'); // -4 for groove padding (2px each side)
  }

  // Initialize when document is ready
  $(document).ready(function() {
    initNavSlider();
  });

  // Re-initialize after any dynamic content changes (if needed)
  window.reinitNavSlider = initNavSlider;

})(jQuery); // End of use strict