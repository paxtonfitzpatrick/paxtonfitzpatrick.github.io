'use strict';

(() => {
  function initScrollShadows() {
    // detect passive event listener support
    let passiveOptsOrUseCapture = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        // eslint-disable-next-line getter-return
        get: () => { passiveOptsOrUseCapture = { passive: true }; },
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch {}

    const scrollShadowElements = document.getElementsByClassName('scroll-shadows');

    Array.prototype.forEach.call(scrollShadowElements, (element) => {
      // set initial state of shadows
      updateShadows(element);

      // optimize scroll performance
      let ticking = false;
      element.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateShadows(element);
            ticking = false;
          });
          ticking = true;
        }
      }, passiveOptsOrUseCapture);
    });
  }

  function updateShadows(element) {
    const { classList, offsetHeight, scrollHeight, scrollTop } = element,
          atTop = scrollTop <= 0,
          atBottom = scrollTop >= scrollHeight - offsetHeight;

    classList.toggle('scroll-shadow-top', !atTop);
    classList.toggle('scroll-shadow-bottom', !atBottom);
  }

  if (document.readyState !== 'loading') {
    initScrollShadows();
  } else {
    document.addEventListener('DOMContentLoaded', initScrollShadows);
  }
})();
