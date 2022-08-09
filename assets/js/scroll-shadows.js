(() => {
  'use strict';

  // check whether browser supports passive eventListeners
  let passiveOptsOrUseCapture = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: () => { passiveOptsOrUseCapture = { passive: true }; },
    });
    window.addEventListener('checkPEL', null, opts);
    window.removeEventListener('checkPEL', null, opts);
  } catch (e) {}

  // get elements with "scroll-shadows" class
  const scrollShadowElements = document.getElementsByClassName('scroll-shadows');

  // initialize scroll shadows
  Array.prototype.forEach.call(scrollShadowElements, (element) => {
    // div starts out unscrolled, so add bottom shadow
    element.classList.add('scroll-shadow-bottom');
    // attach eventListeners to add/remove shadows on scroll
    element.addEventListener('scroll', () => {
      // destructuring
      const { classList, offsetHeight, scrollHeight, scrollTop } = element;

      if (scrollTop > 0) {
        // if element is scrolled, add top shadow
        classList.add('scroll-shadow-top');
        if (scrollTop < scrollHeight - offsetHeight) {
          // if element is not scrolled all the way to the bottom, also add
          // bottom shadow
          classList.add('scroll-shadow-bottom');
        } else {
          // if scrolled to bottom, remove bottom shadow (if present)
          classList.remove('scroll-shadow-bottom');
        }
      } else {
        // if element is not scrolled, remove top shadow (if present)
        classList.remove('scroll-shadow-top');
      }
    }, passiveOptsOrUseCapture);
  });
})();
