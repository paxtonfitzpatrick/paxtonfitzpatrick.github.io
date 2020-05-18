/*
ADAPTED AND SIGNIFICANTLY REVISED FROM
-----------------------------------------------
Author : Vincent Garreau  - vincentgarreau.com
MIT license: http://opensource.org/licenses/MIT
Demo / Generator : vincentgarreau.com/particles.js
GitHub : github.com/VincentGarreau/particles.js
How to use? : Check the GitHub README
v2.0.0
-----------------------------------------------
 */

const ParticleTextDisplayer = function(tag_id, params) {
  // get canvas element (created in window.particleText)
  const canvas_el = document.querySelector('#' + tag_id + ' > .particle-text-canvas-el');

  this.pTextConfig = {
    text_particles: {
      enabled: true,
      array: [],
      text: '',
      density: 300,
      color: '#fff',
      opacity: {
        value: 1,
        // random: false,
        // animate: {
        //   enabled: false,
        //   speed: 1,
        //   min: 0,
        //   sync: false
        // },
      },
      size: {
        value: 20,
        random: false,
        animate: {
          enabled: false,
          speed: 1,
          min: 0,
          sync: false
        },
      },
      movement: {
        speed: 1,
        restless: {
          enabled: false,
          value: 10,
          sync: false
        }
      },
      line_linked: {
        enabled: false,
        distance: 10,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      interactivity: {
        on_hover: {
          enabled: true,
          action: 'repulse',
        },
        on_click: {
          enabled: true,
          action: 'big_repulse',
        },
        on_touch: {
          enabled: true,
          action: 'repulse',
        }
      }
    },
    bg_particles: {
      enabled: true,
      array: [],
      density: 10,
      color: '#fff',
      opacity: {
        value: 0.5,
        // random: false,
        // animate: {
        //   enable: false,
        //   speed: 1,
        //   min: 0,
        //   sync: false
        // },
      },
      size: {
        value: 20,
        random: false,
        animate: {
          enabled: false,
          speed: 1,
          min: 0,
          sync: false
        },
      },
      movement: {
        speed: 1,
        bounce_on_border: false
      },
      line_linked: {
        enabled: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      interactivity: {
        on_hover: {
          enabled: true,
          action: 'repulse',
        },
        on_click: {
          enabled: true,
          action: 'grab',
        },
        on_touch: {
          enabled: false,
          action: 'repulse'
        }
      }
    },
    interactions: {
      repulse: {
        distance: 100,  // trigger distance between mouse/touch and particles
        duration: 0.4,  // how long interaction lasts
        strength: 100   // how far away the particles are repulsed
      },
      big_repulse: {    // same as repulse, but stronger
        distance: 100,
        duration: 0.4,
        strength: 100
      },
      create: {         // number of particles to be created
        n_particles: 4
      },
      grab: {
        distance: 100,
        line_opacity: 1
      }
    },
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    functions: {
      particles: {},
      canvas: {},
      interactivity: {}
    },
    retina_detect: true, // helps reduce CPU load on retina displays
    tmp: {}
  }
  // apply params for this instance
  const pText = this.pTextConfig;
  if (params) {
    Object.deepExtend(pText, params);
  }

  pText.tmp = {
    text_particles: {
      size: pText.text_particles.size.value,
      size_anim_speed: pText.text_particles.size.animate.speed,
      move_speed: pText.text_particles.movement.speed,
      restless_val: pText.text_particles.movement.restless.value,
      line_linked_distance: pText.text_particles.line_linked.distance,
      line_linked_width: pText.text_particles.line_linked.width,
    },
    bg_particles: {
      size: pText.bg_particles.size.value,
      size_anim_speed: pText.bg_particles.size.animate.speed,
      move_speed: pText.bg_particles.movement.speed,
      line_linked_distance: pText.bg_particles.line_linked.distance,
      line_linked_width: pText.bg_particles.line_linked.width,
    },
    retina_detect: pText.retina_detect,
    grab_distance: pText.interactions.grab.distance,
    repulse_distance: pText.interactions.repulse.distance,
    repulse_strength: pText.interactions.repulse.strength,
    big_repulse_distance: pText.interactions.big_repulse.distance,
    big_repulse_strength: pText.interactions.big_repulse.strength
  };

  /*
  ========================================
  =           CANVAS FUNCTIONS           =
  ========================================
  */

  pText.functions.canvas.retinaInit = function() {
    if (pText.retina_detect && window.devicePixelRatio > 1) {
      pText.canvas.pxratio = window.devicePixelRatio;
      pText.tmp.retina_detect = true;
    } else {
      pText.canvas.pxratio = 1;
      pText.tmp.retina = false;
    }

    pText.canvas.w = pText.canvas.el.offsetWidth * pText.canvas.pxratio;
    pText.canvas.h = pText.canvas.el.offsetHeight * pText.canvas.pxratio;
    pText.text_particles.size.value = pText.tmp.text_particles.size * pText.canvas.pxratio;
    pText.text_particles.size.animate.speed = pText.tmp.text_particles.size_anim_speed * pText.canvas.pxratio;
    pText.text_particles.movement.speed = pText.tmp.text_particles.move_speed * pText.canvas.pxratio;
    pText.text_particles.movement.restless.value = pText.tmp.text_particles.restless_val * pText.canvas.pxratio;
    pText.text_particles.line_linked.distance = pText.tmp.text_particles.line_linked_distance * pText.canvas.pxratio;
    pText.text_particles.line_linked.width = pText.tmp.text_particles.line_linked_width * pText.canvas.pxratio;
    pText.bg_particles.size.value = pText.tmp.bg_particles.size * pText.canvas.pxratio;
    pText.bg_particles.size.animate.speed = pText.tmp.bg_particles.size_anim_speed * pText.canvas.pxratio;
    pText.bg_particles.movement.speed = pText.tmp.bg_particles.move_speed * pText.canvas.pxratio;
    pText.bg_particles.line_linked.distance = pText.tmp.bg_particles.line_linked_distance * pText.canvas.pxratio;
    pText.bg_particles.line_linked.width = pText.tmp.bg_particles.line_linked_width * pText.canvas.pxratio;
    pText.interactions.grab.distance = pText.tmp.grab_distance * pText.canvas.pxratio;
    pText.interactions.repulse.distance = pText.tmp.repulse_distance * pText.canvas.pxratio;
    pText.interactions.repulse.strength = pText.tmp.repulse_strength * pText.canvas.pxratio;
    pText.interactions.big_repulse.distance = pText.tmp.big_repulse_distance * pText.canvas.pxratio;
    pText.interactions.big_repulse.strength = pText.tmp.big_repulse_strength * pText.canvas.pxratio;
  };

  pText.functions.canvas.init = function() {
    // get context, set size, set text alignment
    pText.canvas.context = pText.canvas.el.getContext('2d');
    pText.canvas.el.width = pText.canvas.w;
    pText.canvas.el.height = pText.canvas.h;

    // add event listener for window resize
    window.addEventListener('resize', function() {
      pText.canvas.w = pText.canvas.el.offsetWidth * pText.canvas.pxratio;
      pText.canvas.h = pText.canvas.el.offsetHeight * pText.canvas.pxratio;
      pText.canvas.el.width = pText.canvas.w;
      pText.canvas.el.height = pText.canvas.h;
      /* TODO: call pText.functions.canvas function(s) to:
          - redraw text and recompute pixels to fill
          - recompute new number of text particles based on new number of text pixels
          - push or remove difference in number of text particles in array
          - reassign remaining text particle positions
          - recompute new number of background particles based on new canvas size*/
    });
  };

  pText.functions.canvas.clear = function() {
    // convenience function to clear the canvas
    pText.canvas.context.clearRect(0, 0, pText.canvas.w, pText.canvas.h);
  };

  pText.functions.canvas.getTextData = function() {
    // get ImageData object with pixel-wise RGBA values to determine text pixels
    pText.functions.canvas.clear();
    pText.canvas.context.font = "bold " + (pText.canvas.width) + "px sans-serif";
    pText.canvas.context.fillText(pText.text_particles.text, pText.canvas.width / 10, pText.canvas.height / 10);
    const pixel_data = pText.canvas.context.getImageData(0, 0, pText.canvas.width, pText.canvas.height).data;
    pText.functions.canvas.clear();
    return pixel_data;
  };

  /*
  ========================================
  =          PARTICLE FUNCTIONS          =
  ========================================
  */
  pText.functions.particles.SingleTextParticle = function(init_xy, dest_xy) {
    // set movement attributes
    this.x = init_xy.x;  // initial x-position
    this.y = init_xy.y;  // initial y-position
    this.dest_x = dest_xy.x;  // destination x-position in text
    this.dest_y = dest_xy.y;  // destination y-position in text
    this.vx = (Math.random() - 0.5) * pText.text_particles.movement.speed;  // initial x-velocity
    this.vy = (Math.random() - 0.5) * pText.text_particles.movement.speed;  // initial y-velocity
    this.acc_x = 0;  // initial x-acceleration
    this.acc_y = 0;  // initial y-acceleration
    this.friction = Math.random() * 0.01 + 0.95;  // friction TODO: make this customizable?
    this.restlessness = {  // restlessness behavior
      max_displacement: Math.ceil(Math.random() * pText.text_particles.movement.restless.value),
      x_jitter: pText.functions.randIntInRange(-3, 3),
      y_jitter: pText.functions.randIntInRange(-3, 3),
      on_curr_frame: false
    };
    // set color & opacity
    if (pText.text_particles.color instanceof Array) {
      this.color = pText.text_particles.color[Math.floor(Math.random() * (pText.text_particles.color.length + 1))];
    } else {
      this.color = pText.text_particles.color;
    }
    // this.opacity = (pText.text_particles.opacity.random ? Math.random() : 1) * pText.text_particles.opacity.value;
    // set size & size animation params
    this.radius = (pText.text_particles.size.random ? Math.random() : 1) * pText.text_particles.size.value;
    if (pText.text_particles.size.animate.enabled) {
      this.grow = false;  // controls whether particle is currently growing or shrinking
      this.resize_speed = pText.text_particles.size.animate.speed / 100;
      if (!pText.text_particles.size.animate.sync) {
        this.resize_speed *= Math.random();
      }
    }
    // // make sure initial position is inside canvas (DOESN'T SEEM NECESSARY...)
    // if (this.x > pText.canvas.w - this.radius * 2) {
    //   this.x -= this.radius;
    // } else if (this.x < this.radius * 2) {
    //   this.x += this.radius;
    // }
    // if (this.y > pText.canvas.h - this.radius * 2) {
    //   this.y -= this.radius;
    // } else if (this.y < this.radius * 2) {
    //   this.y += this.radius;
    // }
  };

  pText.functions.particles.SingleTextParticle.prototype.draw = function() {
    // draw a SingleTextParticle on the canvas
    pText.canvas.context.fillStyle = this.color;
    pText.canvas.context.beginPath();
    pText.canvas.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    pText.canvas.context.fill();
  };

  pText.functions.particles.createTextParticles = function(pixel_data, at_dest = false) {
    // given pixel-wise RGBA data, create text particles
    for (let i = 0; i < pText.canvas.w; i += Math.round(pText.canvas.w / pText.text_particles.density)) {
      for (let j = 0; j < pText.canvas.h; j += Math.round(pText.canvas.h / pText.text_particles.density)) {
        // if alpha value of pixel is > 128, create a particle whose destination is that pixel
        if (pixel_data[(i + j * pText.canvas.w) * 4 + 3] > 128) {
          let dest_xy = {x: i, y: j};
          // if at_dest is true, create the particle at the pixel instead of random point on canvas
          let init_xy = at_dest ? dest_xy : {x: Math.random() * pJS.canvas.w, y: Math.random() * pJS.canvas.h};
          pText.text_particles.array.push(new pText.functions.particles.SingleTextParticle(init_xy, dest_xy));
        }
      }
    }
  };

  pText.functions.particles.jitterParticle = function(p) {
    p.x += p.restlessness.x_jitter;
    p.y += p.restlessness.y_jitter;
    if (Math.sqrt((p.dest_x - p.x) ** 2 + (p.dest_y - p.y) ** 2) >= pText.text_particles.movement.restless.value) {
      p.restlessness.on_curr_frame = false;
    }
  };

  pText.functions.interactivity.linkParticles = function(p, p_other, link) {
    let dist = Math.sqrt((p.x - p_other.x) ** 2 + (p.y - p_other.y) ** 2);
    if (dist <= link.dist) {
      let opacity = link.opacity - (dist / (link.opacity)) / link.dist;
      if (opacity > 0) {
        pText.canvas.context.strokeStyle = link.color;
        pText.canvas.context.lineWidth = link.width;
        pText.canvas.context.beginPath();
        pText.canvas.context.moveTo(p.x, p.y);
        pText.canvas.context.lineTo(p_other.x, p_other.y);
        pText.canvas.context.stroke();
        pText.canvas.context.closePath();
      }
    }
  };

  pText.functions.particles.updateParticleSize = function(p) {
    if (p.grow) {
      p.radius += p.resize_speed;
      if (p.radius >= pText.text_particles.size.value) {
        p.grow = false;
      }
    } else {
      p.radius -= p.resize_speed;
      if (p.radius <= pText.text_particles.size.animate.min) {
        p.grow = true;
      }
    }
    if (p.radius < 0) {
      p.radius = 0;
    }
  };

  pText.functions.particles.updateOnBorder = function(p, bounce = false) {
    let new_pos = {
      x_left: p.radius,
      x_right: pText.canvas.w,
      y_top: p.radius,
      y_bottom: pText.canvas.h
    }
    if (!bounce) {
      new_pos.x_left *= -1;
      new_pos.x_right += p.radius;
      new_pos.y_top *= -1;
      new_pos.y_bottom += p.radius;
    }
    if (p.x - p.radius > pText.canvas.w) {
      p.x = new_pos.x_left;
      p.y = Math.random() * pText.canvas.h;
    } else if (p.x + p.radius < 0) {
      p.x = new_pos.x_right;
      p.y = Math.random() * pText.canvas.h;
    }
    if (p.y - p.radius > pText.canvas.h) {
      p.y = new_pos.y_top;
      p.x = Math.random() * pText.canvas.w;
    } else if (p.y + p.radius < 0) {
      p.y = new_pos.y_bottom;
      p.x = Math.random() * pText.canvas.w;
    }
  };

  pText.functions.particles.updateTextParticles = function() {
    // set line-linked params upfront to save re-declaring each time through loop
    const link_params = {
      distance: pText.text_particles.line_linked.distance,
      opacity: pText.text_particles.line_linked.opacity,
      color: pText.text_particles.line_linked.color,
      width: pText.text_particles.line_linked.width
    };
    for (let p of pText.text_particles.array) {
      // update position, velocity, acceleration
      if ((pText.text_particles.movement.restless.enabled) && (p.restlessness.on_curr_frame)) {
        // if restless activity is enabled & particle is in restless mode, animate some random movement
        pText.functions.particles.jitterParticle(p);
      } else {
        // otherwise, update position with approach to destination
        p.acc_x = (p.dest_x - p.x) / 500;
        p.acc_y = (p.dest_y - p.y) / 500;
        p.vx = (p.vx + p.acc_x) * p.friction;
        p.vy = (p.vy + p.acc_y) * p.friction;
        p.x += p.vx;
        p.y += p.vy;
      }
      // update size (if animated)
      if (pText.size.animate.enabled) {
        pText.functions.particles.updateParticleSize(p);
      }
      // TODO: add on_hover interactivity actions

      // draw linking lines, if enabled
      if (pText.text_particles.line_linked.enabled) {
        for (let p_other of pText.text_particles.array) {
          pText.functions.interactivity.linkParticles(p, p_other, link_params);
        }
      }
    }
  };

  pText.functions.particles.SingleBackgroundParticle = function(init_xy) {
    // initial position & velocity
    this.x = init_xy ? init_xy.x : Math.random() * pText.canvas.w;
    this.y = init_xy ? init_xy.y : Math.random() * pText.canvas.h;
    this.vx = (Math.random() - 0.5) * pText.bg_particles.movement.speed;
    this.vy = (Math.random() - 0.5) * pText.bg_particles.movement.speed;
    // color & opacity
    if (pText.bg_particles.color instanceof Array) {
      this.color = pText.bg_particles.color[Math.floor(Math.random() * (pText.bg_particles.color.length + 1))];
    } else {
      this.color = pText.bg_particles.color;
    }
    this.opacity = pText.bg_particles.opacity.value;
    // size
    this.radius = (pText.bg_particles.size.random ? Math.random() : 1) * pText.bg_particles.size.value;
    if (pText.bg_particles.size.animate.enabled) {
      this.grow = false;
      this.resize_speed = pText.bg_particles.size.animate.speed / 100;
      if (!pText.bg_particles.size.animate.sync) {
        this.resize_speed *= Math.random();
      }
    }
    // make sure initial position is inside canvas
    if (this.x > pText.canvas.w - this.radius * 2) {
      this.x -= this.radius;
    } else if (this.x < this.radius * 2) {
      this.x += this.radius;
    }
    if (this.y > pText.canvas.h - this.radius * 2) {
      this.y -= this.radius;
    } else if (this.y < this.radius * 2) {
      this.y += this.radius;
    }
  };

  // SingleBackgroundParticle's draw method is the same as SingleTextParticle's
  pText.functions.particles.SingleBackgroundParticle.prototype.draw = pText.functions.particles.SingleTextParticle.prototype.draw;

  pText.functions.particles.createBackgroundParticles = function () {
    // compute get number of pixels in canvas
    let canvas_area = pText.canvas.w * pText.canvas.h / 1000;
    if (pText.tmp.retina) {
      canvas_area /= (pText.canvas.pxratio * 2);
    }
    // compute total number of particles from density and canvas size
    const n_particles = canvas_area * pText.bg_particles.density;
    // push particles to array
    for (let i = 0; i < n_particles; i++) {
      pText.bg_particles.array.push(new pText.functions.particles.SingleBackgroundParticle());
    }
  };

  // updateBackgroundParticles
  pText.functions.particles.updateBackgroundParticles = function() {
    const link_params = {
      distance: pText.bg_particles.line_linked.distance,
      opacity: pText.bg_particles.line_linked.opacity,
      color: pText.bg_particles.line_linked.color,
      width: pText.bg_particles.line_linked.width
    };
    for (let p of pText.bg_particles.array) {
      // update position
      p.x += p.vx;
      p.y += p.vy;
      // draw linking lines, if enabled
      if (pText.bg_particles.line_linked.enabled) {
        for (let p_other of pText.bg_particles.array) {
          pText.functions.interactivity.linkParticles(p, p_other, link_params)
        }
      }

    }
  };

























  pText.functions.particles.drawParticles = function() {
    /* updates and redraws ALL particles on each frame */
    // clear canvas
    pText.functions.canvas.clear();
    // pText.canvas.context.clearRect(0, 0, pText.canvas.w, pText.canvas.h);
    // update text particle states (position, velocity, linkage, etc.) and re-draw
    pText.functions.particles.updateTextParticles();
    for (let p of pText.text_particles.array) {
      p.draw();
    }
    // update and re-draw background particles, if enabled
    if (pText.bg_particles.enabled) {
      pText.functions.particles.updateBackgroundParticles();
      for (let p of pText.bg_particles.array) {
        p.draw();
      }
    }
  };

  /*
  ========================================
  =            OTHER FUNCTIONS           =
  ========================================
  */
  pText.functions.randIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }






};








/*
========================================
=           LAUNCH FUNCTION            =
========================================
*/
window.pTextDom = [];

window.particleTextDisplay = function(tag_id, params){
  // get target element by ID, check for existing canvases
  const pText_el = document.getElementById(tag_id),
      canvas_classname = 'particle-text-canvas-el',
      existing_canvases = pText_el.getElementsByClassName(canvas_classname);

  // remove any existing canvases within div
  if (existing_canvases.length) {
    while(existing_canvases.length > 0){
      pText_el.removeChild(existing_canvases[0]);
    }
  }

  // create canvas element, set size, append to target element
  const canvas_el = document.createElement('canvas');
  canvas_el.className = canvas_classname;
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";
  const canvas = document.getElementById(tag_id).appendChild(canvas_el);
  // const canvas = pt_tag.appendChild(canvas_el);

  /* get text to be "particlized" from element dataobject
  (easier to dynamically set there via liquid) */
  if(pText_el.hasAttribute("data-text")){
    params.text_particles.text = pText_el.getAttribute("data-text");
  }

  // launch display
  if(canvas != null){
    pTextDom.push(new ParticleTextDisplayer(tag_id, params));
  }
};