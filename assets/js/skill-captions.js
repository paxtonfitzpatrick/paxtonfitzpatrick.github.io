'use strict';

(() => {
  function initSkillCaptionSvgs() {
    const skillCaptionSvgs = document.querySelectorAll('.skill-box svg');

    skillCaptionSvgs.forEach((captionSvg) => {
      const bbox = captionSvg.querySelector('text').getBBox();
      captionSvg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
    });
  }

  function observeSkillsTabVisibility() {
    const skillsTabElement = document.getElementById('skills'),
          skillTabVisibilityObserver = new MutationObserver((_mutations, observer) => {
            if (skillsTabElement.classList.contains('active')) {
              initSkillCaptionSvgs();
              observer.disconnect();
            }
          });

    skillTabVisibilityObserver.observe(skillsTabElement, { attributes: true, attributeFilter: ['class'] });
  }

  if (document.readyState !== 'loading') {
    observeSkillsTabVisibility();
  } else {
    document.addEventListener('DOMContentLoaded', observeSkillsTabVisibility);
  }
})();
