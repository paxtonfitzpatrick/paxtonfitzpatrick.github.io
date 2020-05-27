const ParticleImageDisplayer = function(tag_id, params) {
  // get canvas element
  const canvas_el = document.querySelector('#' + tag_id + ' > .particle-image-canvas-el');

  this.pImageConfig = {
    particles: {
      array: [],
      density: 300,
      color: '#fff',
      opacity: {
        value: 1,
        random: false,
        animate: {
          enabled: false,
          speed: 1,
          min: 0,
          sync: false
        }
      },
      size: {
        value: 5,
        random: false,
        animate: {
          enabled: false,
          speed: 20,
          min: 0,
          sync: false
        }
      },
      movement: {
        speed: 1,
        restless: {
          enabled: false,
          value: 10,
          sync: false
        }
      },
      interactivity: {
        on_hover: {
          enabled: true,
          action: 'repulse'
        },
        on_click: {
          enabled: false,
          action: 'big_repulse'
        },
        on_touch: {
          enabled: true,
          action: 'repulse'
        },
        fn_array: []
      }
    },
    image: {
      size: 5
    },
    interactions: {
      repulse: {
        distance: 100,
        strength: 100
      },
      big_repulse: {
        distance: 100,
        strength: 100
      },
      grab: {
        distance: 100,
        line_opacity: 1
      }
    },
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight,
      pxratio: 1
    },
    functions: {
      particles: {},
      image: {},
      canvas: {},
      interactivity: {},
      utils: {}
    },
    mouse: {
      x: null,
      y: null,
      click_x: null,
      click_y: null
    },
    retina_detect: true
  };

  const pImg = this.pImageConfig;
  if (params) Object.deepExtend(pImg, params);

  pImg.tmp = {
    particles: {
      size: pImg.particles.size.value,
      size_anim_speed: pImg.particles.size.animate.speed,
      move_speed: pImg.particles.movement.speed,
      restless_val: pImg.particles.movement.restless.value
    },
    retina: false,
    retina_detect: pImg.retina_detect,
    grab_distance: pImg.interactions.grab.distance,
    repulse_distance: pImg.interactions.repulse.distance,
    repulse_strength: pImg.interactions.repulse.strength,
    big_repulse_distance: pImg.interactions.big_repulse.distance,
    big_repulse_strength: pImg.interactions.big_repulse.distance
  };

  /*
  ========================================
  =           CANVAS FUNCTIONS           =
  ========================================
  */
  pImg.functions.canvas.init = function() {
    pImg.functions.canvas.retinaInit();
    pImg.canvas.context = pImg.canvas.el.getContext('2d');
    pImg.canvas.el.width = pImg.canvas.w;
    pImg.canvas.el.height = pImg.canvas.h;
    pImg.canvas.area = (pImg.canvas.el.width * pImg.canvas.el.height / 1000) / (pImg.canvas.pxratio * 2);
    window.addEventListener('resize', pImg.functions.utils.debounce(pImg.functions.canvas.onResize, 150));
  };

  pImg.functions.canvas.retinaInit = function() {
    if (pImg.retina_detect && window.devicePixelRatio > 1) {
      pImg.tmp.retina = true;
      pImg.canvas.pxratio = window.devicePixelRatio;
      pImg.canvas.w *= pImg.canvas.pxratio;
      pImg.canvas.h *= pImg.canvas.pxratio;
    }
    pImg.particles.size.value = pImg.tmp.particles.size * pImg.canvas.pxratio;
    pImg.particles.size.animate.speed = pImg.tmp.particles.size_anim_speed * pImg.canvas.pxratio;
    pImg.particles.movement.speed = pImg.tmp.particles.move_speed * pImg.canvas.pxratio;
    pImg.particles.movement.restless.value = pImg.tmp.particles.restless_val * pImg.canvas.pxratio;
    pImg.interactions.grab.distance = pImg.tmp.grab_distance * pImg.canvas.pxratio;
    pImg.interactions.repulse.distance = pImg.tmp.repulse_distance * pImg.canvas.pxratio;
    pImg.interactions.repulse.strength = pImg.tmp.repulse_strength * pImg.canvas.pxratio;
    pImg.interactions.big_repulse.distance = pImg.tmp.big_repulse_distance * pImg.canvas.pxratio;
    pImg.interactions.big_repulse.strength = pImg.tmp.big_repulse_strength * pImg.canvas.pxratio;
  };

  pImg.functions.canvas.onResize = function() {
    pImg.canvas.w = pImg.canvas.el.offsetWidth * pImg.canvas.pxratio;
    pImg.canvas.h = pImg.canvas.el.offsetHeight * pImg.canvas.pxratio;
    pImg.canvas.el.width = pImg.canvas.w;
    pImg.canvas.el.height = pImg.canvas.h;
    pImg.particles.array = [];
    const image_pixels = pImg.functions.canvas.getImagePixels();
    pImg.functions.particles.createImageParticles(image_pixels, true);
  };

  pImg.functions.canvas.clear = function() {
    pImg.canvas.context.clearRect(0, 0, pImg.canvas.w, pImg.canvas.h);
  };

  pImg.functions.particles.getImagePixels = function() {
    // clear the canvas
    pImg.functions.canvas.clear();
    //
  };

  /*
  ========================================
  =           IMAGE FUNCTIONS            =
  ========================================
  */

  pImg.functions.image.load = function() {
    pImg.image.obj = pImg.image = new Image();
    pImg.image.obj.addEventListener('load', function() {
      // get aspect ratio (doesn't change on resize, so do separately)
      pImg.image.ratio = pImg.image.obj.width / pImg.image.obj.height;
      pImg.functions.image.resize();
    });
    pImg.image.obj.src = pImg.src_path;

    pImg.image.obj.height =

  }

  pImg.functions.image.resize = function() {

    pImg.image.obj.width = Math.round(pImg.canvas.w * pImg.image.size / 100);
  }








};



/*
========================================
=           GLOBAL FUNCTIONS           =
========================================
*/
// GLOBALLY DEFINED IN PARTICLE-TEXT.JS
// Object.deepExtend = function(destination, source) {
//   // credit: https://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
//   for (let property in source) {
//     if (source[property] && source[property].constructor &&
//      source[property].constructor === Object) {
//       destination[property] = destination[property] || {};
//       arguments.callee(destination[property], source[property]);
//     } else {
//       destination[property] = source[property];
//     }
//   }
//   return destination;
// };
//
// window.requestAnimFrame = (function() {
//   return  window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame    ||
//     window.oRequestAnimationFrame      ||
//     window.msRequestAnimationFrame     ||
//     function(callback) {
//       window.setTimeout(callback, 1000 / 60);
//     };
// })();
//
// window.cancelRequestAnimFrame = (function() {
//   return window.cancelAnimationFrame         ||
//     window.webkitCancelRequestAnimationFrame ||
//     window.mozCancelRequestAnimationFrame    ||
//     window.oCancelRequestAnimationFrame      ||
//     window.msCancelRequestAnimationFrame     ||
//     clearTimeout
// })();

window.pImgDom = [];

window.particleImageDisplay = function(tag_id, params) {
  // get target element by ID, check for existing canvases
  const pImage_el = document.getElementById(tag_id),
      canvas_classname = 'particle-image-canvas-el',
      existing_canvases = pImage_el.getElementsByClassName(canvas_classname);

  // remove any existing canvases within div
  if (existing_canvases.length) {
    while(existing_canvases.length > 0){
      pImage_el.removeChild(existing_canvases[0]);
    }
  }

  // create canvas element, set size, append to target element
  const canvas_el = document.createElement('canvas');
  canvas_el.className = canvas_classname;
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";
  const canvas = document.getElementById(tag_id).appendChild(canvas_el);

  // get image to be "particlized" from element dataobject
  if(pImage_el.hasAttribute("data-img")){
    params.src_path = pImage_el.getAttribute("data-img");
  }

  // launch display
  if(canvas != null){
    pImgDom.push(new ParticleImageDisplayer(tag_id, params));
  }
};