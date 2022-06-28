(() => {
  'use strict';

  // check whether browser supports passive eventListeners
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: () => { supportsPassive = true; },
    });
    window.addEventListener('testPEL', null, opts);
    window.removeEventListener('testPEL', null, opts);
  } catch (e) {}

  const scrollShadowElements = document.getElementsByClassName('scroll-shadows');

  // initialize scroll-shadows elements
  Array.from(scrollShadowElements).forEach((element) => {
    // div starts out unscrolled, so add bottom shadow
    element.classList.add('scroll-shadow-bottom');

    // add "scroll" eventListeners
    element.addEventListener('scroll', () => {
      const elementScrollTop = element.scrollTop;

      if (elementScrollTop > 0) {
        element.classList.add('scroll-shadow-top');
        if (elementScrollTop < element.scrollHeight - element.offsetHeight) {
          element.classList.add('scroll-shadow-bottom');
        } else {
          element.classList.remove('scroll-shadow-bottom');
        }
      } else {
        element.classList.remove('scroll-shadow-top');
      }
    }, supportsPassive ? { passive: true } : false);
  });
})();
