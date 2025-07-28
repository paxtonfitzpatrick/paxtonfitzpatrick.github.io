'use strict';

(() => {
  function initNavSlider() {
    const navSliders = document.querySelectorAll('.nav-slider');

    navSliders.forEach((navSlider) => {
      navSlider.querySelectorAll('.nav-link').forEach((navLink) => {
        // set each slider's initial position to the active link
        if (navLink.classList.contains('active')) {
          updateSliderPosition(navSlider, navLink);
        }

        // add event listener to update slider position when link is clicked
        navLink.addEventListener('click', () => {
          requestAnimationFrame(() => {
            const activeLink = navSlider.querySelector('.nav-link.active');
            if (activeLink) {
              updateSliderPosition(navSlider, activeLink);
            }
          });
        });
      });
    });

    // Recalculate slider position on window resize
    window.addEventListener('resize', () => {
      navSliders.forEach((navSlider) => {
        const activeLink = navSlider.querySelector('.nav-link.active');
        if (activeLink) {
          updateSliderPosition(navSlider, activeLink);
        }
      });
    });
  }

  function updateSliderPosition(navSlider, activeLink) {
    const navSliderRect = navSlider.getBoundingClientRect(),
          activeLinkRect = activeLink.getBoundingClientRect(),
          leftPosition = activeLinkRect.left - navSliderRect.left + 2,
          activeLinkWidth = activeLink.offsetWidth;

    navSlider.style.setProperty('--slider-left', `${leftPosition}px`);
    navSlider.style.setProperty('--slider-width', `${activeLinkWidth - 4}px`);
  }

  if (document.readyState !== 'loading') {
    initNavSlider();
  } else {
    document.addEventListener('DOMContentLoaded', initNavSlider);
  }
})();
