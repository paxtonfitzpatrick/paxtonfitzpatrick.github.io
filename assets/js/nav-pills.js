(function($) {
  "use strict";

  // Nav Pills Slider functionality
  function initNavPillsSlider() {
    $('.nav-pills').each(function() {
      const $navPills = $(this);
      const $activeLink = $navPills.find('.nav-link.active');

      // Initialize pill position on page load
      if ($activeLink.length) {
        updatePillPosition($navPills, $activeLink);
      }
    });

    // Handle tab clicks
    $('.nav-pills .nav-link').on('shown.bs.tab', function(e) {
      const $clickedLink = $(e.target);
      const $navPills = $clickedLink.closest('.nav-pills');
      updatePillPosition($navPills, $clickedLink);
    });

    // Handle window resize to recalculate positions
    $(window).on('resize', function() {
      $('.nav-pills').each(function() {
        const $navPills = $(this);
        const $activeLink = $navPills.find('.nav-link.active');
        if ($activeLink.length) {
          updatePillPosition($navPills, $activeLink);
        }
      });
    });
  }

  function updatePillPosition($navPills, $activeLink) {
    // Get the position and dimensions of the active link relative to the nav container
    const navPillsOffset = $navPills.offset();
    const activeLinkOffset = $activeLink.offset();
    const activeLinkWidth = $activeLink.outerWidth();

    // Calculate the left position relative to the nav-pills container
    const leftPosition = activeLinkOffset.left - navPillsOffset.left + 2; // +2 for the groove padding

    // Set CSS custom properties to position and size the pill
    $navPills[0].style.setProperty('--pill-left', leftPosition + 'px');
    $navPills[0].style.setProperty('--pill-width', (activeLinkWidth - 4) + 'px'); // -4 for groove padding (2px each side)
  }

  // Initialize when document is ready
  $(document).ready(function() {
    initNavPillsSlider();
  });

  // Re-initialize after any dynamic content changes (if needed)
  window.reinitNavPillsSlider = initNavPillsSlider;

})(jQuery); // End of use strict