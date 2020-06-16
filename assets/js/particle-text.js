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
        value: 5,
        random: false,
        animate: {
          enabled: false,
          speed: 1,
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
          enabled: false,
          action: 'big_repulse',
        },
        on_touch: {
          enabled: true,
          action: 'repulse',
        },
        fn_array: [],
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
          enabled: false,
          action: 'big_repulse',
        },
        on_touch: {
          enabled: false,
          action: 'repulse'
        },
        fn_array: [],
      }
    },
    interactions: {
      repulse: {
        distance: 100,  // trigger distance between mouse/touch and particles
        strength: 100   // how far away the particles are repulsed
      },
      big_repulse: {    // same as repulse, but stronger
        distance: 100,
        strength: 100
      },
      // create: {         // number of particles to be created
      //   n_particles: 4
      // },
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
    retina_detect: true  // helps reduce CPU load on retina displays
  };
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
    retina: false,
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
  pText.functions.canvas.init = function() {
    pText.functions.canvas.retinaInit();
    // get context, set size, get area
    pText.canvas.context = pText.canvas.el.getContext('2d');
    pText.canvas.el.width = pText.canvas.w;
    pText.canvas.el.height = pText.canvas.h;
    pText.canvas.area = (pText.canvas.el.width * pText.canvas.el.height / 1000) / (pText.canvas.pxratio * 2);
    // add event listener for window resize
    window.addEventListener('resize', pText.functions.utils.debounce(pText.functions.canvas.onResize, 100));
    // TODO: add event listener for canvas not in view to pause animation and lighten load
  };

  pText.functions.canvas.retinaInit = function() {
    // TODO: improve this check, it's dirty and doesn't always work
    if (pText.retina_detect && window.devicePixelRatio > 1) {
      pText.tmp.retina = true;
      pText.canvas.pxratio = window.devicePixelRatio;  // non-retina default is 1
      pText.canvas.w *= pText.canvas.pxratio;
      pText.canvas.h *= pText.canvas.pxratio;
    }
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

  // pText.functions.canvas.onResize = function() {
  //   // store old canvas width & resize
  //   const old_canvas_w = pText.canvas.w,
  //         old_n_particles = pText.text_particles.array.length;
  //   pText.canvas.w = pText.canvas.el.offsetWidth * pText.canvas.pxratio;
  //   pText.canvas.h = pText.canvas.el.offsetHeight * pText.canvas.pxratio;
  //   pText.canvas.el.width = pText.canvas.w;
  //   pText.canvas.el.height = pText.canvas.h;
  //   // compute new text pixels
  //   const new_pixel_data = pText.functions.canvas.getTextData(),
  //         new_increment = Math.round(pText.canvas.w / pText.text_particles.density),
  //         particle_resize_factor = pText.canvas.w / old_canvas_w;
  //   // scale size of each particle by window width change, update positions
  //   let p_ix = 0;
  //   for (let i = 0; i < pText.canvas.w; i += new_increment) {
  //     for (let j = 0; j < pText.canvas.h; j += new_increment) {
  //       if (new_pixel_data[(i + j * pText.canvas.w) * 4 + 3] > 128) {
  //         if (p_ix < old_n_particles) {
  //           const p = pText.text_particles.array[p_ix];
  //           p.dest_x = i;
  //           p.dest_y = j;
  //           p.radius *= particle_resize_factor;
  //           p_ix ++;
  //         } else {
  //           const init_xy = {x: Math.random() * pText.canvas.w, y: Math.random() * pText.canvas.h},
  //                 dest_xy = {x: i, y: j};
  //           pText.text_particles.array.push(new pText.functions.particles.SingleTextParticle(init_xy, dest_xy));
  //         }
  //       }
  //     }
  //   }
  //   if (p_ix < old_n_particles) {
  //     // new canvas size requires fewer particles, so delete ones not updated
  //     pText.text_particles.array.splice(-(old_n_particles - p_ix));
  //   }
  // };

  pText.functions.canvas.onResize = function() {
    // resize canvas
    pText.canvas.w = pText.canvas.el.offsetWidth * pText.canvas.pxratio;
    pText.canvas.h = pText.canvas.el.offsetHeight * pText.canvas.pxratio;
    pText.canvas.el.width = pText.canvas.w;
    pText.canvas.el.height = pText.canvas.h;
    // compute new text pixels
    pText.text_particles.array = [];
    const text_pixels = pText.functions.canvas.getTextData();
    if (pText.text_particles.enabled) {
      pText.functions.particles.createTextParticles(text_pixels, true);
    }
  };

  pText.functions.canvas.clear = function() {
    // convenience function to clear the canvas
    pText.canvas.context.clearRect(0, 0, pText.canvas.w, pText.canvas.h);
  };

  pText.functions.canvas.getTextData = function() {
    // get ImageData object with pixel-wise RGBA values to determine text pixels
    pText.functions.canvas.clear();
    pText.canvas.context.font = "bold " + (pText.canvas.w / 16) + "px sans-serif";
    pText.canvas.context.textAlign = "center";
    pText.canvas.context.fillText(pText.text_particles.text, pText.canvas.w / 2, pText.canvas.h * 2 / 3);
    const pixel_data = pText.canvas.context.getImageData(0, 0, pText.canvas.w, pText.canvas.h).data;
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
    this.friction = Math.random() * 0.01 + 0.92;  // friction TODO: make this customizable?
    this.restlessness = {  // restlessness behavior
      max_displacement: Math.ceil(Math.random() * pText.text_particles.movement.restless.value),
      x_jitter: pText.functions.utils.randIntInRange(-3, 3),
      y_jitter: pText.functions.utils.randIntInRange(-3, 3),
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
    this.radius = (pText.text_particles.size.random ? Math.max(Math.random(), 0.5) : 1) * pText.text_particles.size.value * pText.canvas.w / 1500;
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
    const increment = Math.round(pText.canvas.w / pText.text_particles.density);
    for (let i = 0; i < pText.canvas.w; i += increment) {
      for (let j = 0; j < pText.canvas.h; j += increment) {
        // if alpha value of pixel is > 128, create a particle whose destination is that pixel
        if (pixel_data[(i + j * pText.canvas.w) * 4 + 3] > 128) {
          const dest_xy = {x: i, y: j};
          // if at_dest is true, create the particle at the pixel instead of random point on canvas
          const init_xy = at_dest ? dest_xy : {x: Math.random() * pText.canvas.w, y: Math.random() * pText.canvas.h};
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
    if (bounce) {
      if (p.x + p.radius > pText.canvas.w || p.x - p.radius < 0) {
        p.vx *= -1;
      }
      if (p.y + p.radius > pText.canvas.h || p.y - p.radius < 0) {
        p.vy *= -1;
      }
    } else {
      if (p.x - p.radius > pText.canvas.w) {
        p.x = -p.radius;
        p.y = Math.random() * pText.canvas.h;
      } else if (p.x + p.radius < 0) {
        p.x = pText.canvas.w + p.radius;
        p.y = Math.random() * pText.canvas.h;
      }
      if (p.y - p.radius > pText.canvas.h) {
        p.y = -p.radius;
        p.x = Math.random() * pText.canvas.w;
      } else if (p.y + p.radius < 0) {
        p.y = pText.canvas.h + p.radius;
        p.x = Math.random() * pText.canvas.w;
      }
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
      // TODO: factor out this check that runs for each particle for each frame
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
      if (pText.text_particles.size.animate.enabled) {
        pText.functions.particles.updateParticleSize(p);
      }
      // deal with all enabled listener interactions
      pText.functions.interactivity.textInteractWithClient(p);
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
    this.radius = (pText.bg_particles.size.random ? Math.max(Math.random(), 0.5) : 1) * pText.bg_particles.size.value;
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
    // compute total number of particles from density and canvas size
    const n_particles = Math.round(pText.canvas.area * pText.bg_particles.density);
    // push particles to array
    for (let i = 0; i < n_particles; i++) {
      pText.bg_particles.array.push(new pText.functions.particles.SingleBackgroundParticle());
    }
  };

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
      // update size (if animated)
      if (pText.bg_particles.size.animate.enabled) {
        pText.functions.particles.updateParticleSize(p);
      }
      // control behavior if particle hits border
      pText.functions.particles.updateOnBorder(p);
      // deal with all enabled listener interactions
      pText.functions.interactivity.bgInteractWithClient(p);
      // draw linking lines, if enabled
      if (pText.bg_particles.line_linked.enabled) {
        for (let p_other of pText.bg_particles.array) {
          pText.functions.interactivity.linkParticles(p, p_other, link_params);
        }
      }

    }
  };

  pText.functions.particles.drawParticles = function() {
    /* updates and redraws ALL particles on each frame */
    // clear canvas
    pText.functions.canvas.clear();
    // update text particle states (position, velocity, linkage, etc.) and re-draw
    if (pText.text_particles.enabled) {
      pText.functions.particles.updateTextParticles();
      for (let p of pText.text_particles.array) {
        p.draw();
      }
    }
    // update and re-draw background particles, if enabled
    if (pText.bg_particles.enabled) {
      pText.functions.particles.updateBackgroundParticles();
      for (let p of pText.bg_particles.array) {
        p.draw();
      }
    }
  };

  pText.functions.particles.animateParticles = function() {
    pText.functions.particles.drawParticles();
    requestAnimFrame(pText.functions.particles.animateParticles);
  };

  /*
  ========================================
  =        INTERACTIVITY FUNCTIONS       =
  ========================================
  */
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

  pText.functions.interactivity.repulseParticle = function(p, args, p_type) {
    // compute distance to mouse
    const dx_mouse = p.x - pText.mouse.x,
          dy_mouse = p.y - pText.mouse.y,
          mouse_dist = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

    if (mouse_dist <= args.distance) {
      if (p_type === 'bg') {
        // handle repulsion style for background particles
        const norm_x = dx_mouse / mouse_dist,
              norm_y = dy_mouse / mouse_dist,
              strength = Math.min((1 / args.distance) * (-1 * Math.pow(mouse_dist / args.distance, 2) + 1) * args.distance * args.strength, 50),
              new_x = p.x + norm_x * strength,
              new_y = p.y + norm_y * strength;
        if (pText.bg_particles.movement.bounce_on_border) {
          // if enabled, only update position if it wouldn't push particle outside canvas
          if (new_x - p.radius > 0 && new_x + p.radius < pText.canvas.w) {
            p.x = new_x;
          }
          if (new_y - p.radius > 0 && new_y + p.radius < pText.canvas.h) {
            p.y = new_y;
          }
        } else {
          p.x = new_x;
          p.y = new_y;
        }
      } else {
        // handle repulsion style for text particles
        const inv_strength = pText.functions.utils.clamp(300 - args.strength, 10, 300);
        p.acc_x = (p.x - pText.mouse.x) / inv_strength;
        p.acc_y = (p.y - pText.mouse.y) / inv_strength;
        p.vx += p.acc_x;
        p.vy += p.acc_y;
      }
    }
  };

  pText.functions.interactivity.grabParticle = function(p, args, p_type) {
    const dx_mouse = p.x - pText.mouse.x,
          dy_mouse = p.y - pText.mouse.y,
          mouse_dist = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

    if (mouse_dist <= args.distance) {
      // draw a line between the mouse and the particle
      const opacity = args.line_opacity - (mouse_dist / (1 / args.line_opacity)) - args.distance;
      if (opacity > 0) {
        // draw line, use particle's color TODO: add opacity
        pText.canvas.context.strokeStyle = p.color;
        // don't let line be wider than particle
        pText.canvas.context.lineWidth = Math.min(pText[`${p_type}_particles`].line_linked.width, p.radius * 2);
        pText.canvas.context.beginPath();
        pText.canvas.context.moveTo(p.x, p.y);
        pText.canvas.context.lineTo(pText.mouse.x, pText.mouse.y);
        pText.canvas.context.stroke();
        pText.canvas.context.closePath();
      }
    }
  };

  pText.functions.interactivity.onMouseMove = function(func, args, p, p_type) {
    if (pText.mouse.x != null && pText.mouse.y != null) {
      func(p, args, p_type);
    }
  };

  pText.functions.interactivity.onMouseClick = function(func, args, p, p_type) {
    if (pText.mouse.click_x != null && pText.mouse.click_y != null) {
      func(p, args, p_type);
      pText.mouse.click_x = null;
      pText.mouse.click_y = null;
    }
  };

  pText.functions.interactivity.addEventListeners = function() {
    // determine events to listen for
    let listen_for = {click: false, mouse: false, touch: false};
    if (pText.text_particles.interactivity.on_click.enabled || pText.bg_particles.interactivity.on_click.enabled) {
      listen_for.click = listen_for.mouse = true;
    } else if (pText.text_particles.interactivity.on_hover || pText.bg_particles.interactivity.on_hover) {
      listen_for.mouse = true;
    }
    if (pText.text_particles.interactivity.on_touch.enabled || pText.bg_particles.interactivity.on_touch.enabled) {
      listen_for.touch = true;
    }
     // enable listeners and add action functions
    if (listen_for.mouse) {
      // add mousemove and mouseleave EventListeners
      pText.canvas.el.addEventListener('mousemove', function (e) {
        let pos_x = e.offsetX || e.clientX,
          pos_y = e.offsetY || e.clientY;
        // adjust for retina display (pxratio is 1 if not retina)
        pText.mouse.x = pos_x * pText.canvas.pxratio;
        pText.mouse.y = pos_y * pText.canvas.pxratio;
      });
      pText.canvas.el.addEventListener('mouseleave', function (e) {
        // if mouse is not over canvas, set coordinates to null
        pText.mouse.x = null;
        pText.mouse.y = null;
      });
      pText.functions.utils.addEventActions('on_hover');
    }
    if (listen_for.click) {
      pText.canvas.el.addEventListener('click', function(e) {
        pText.mouse.click_x = pText.mouse.x;
        pText.mouse.click_y = pText.mouse.y;
      });
    }
    pText.functions.utils.addEventActions('on_click');

    if (listen_for.touch) {
      // treat touch/drag the same as mouse movement
      pText.canvas.el.addEventListener('touchmove', function(e) {
        let pos_x = e.touches[0].clientX,
            pos_y = e.touches[0].clientY;
        pText.mouse.x = pos_x * pText.canvas.pxratio;
        pText.mouse.y = pos_y * pText.canvas.pxratio;
      });
      pText.canvas.el.addEventListener('touchend', function(e) {
        pText.mouse.x = null;
        pText.mouse.y = null;
      });
      pText.functions.utils.addEventActions('on_touch');
    }
  };

  pText.functions.interactivity.bgInteractWithClient = function(p) {
    for (let func of pText.bg_particles.interactivity.fn_array) {
      func(p, 'bg');
    }
  };

  pText.functions.interactivity.textInteractWithClient = function(p) {
    for (let func of pText.text_particles.interactivity.fn_array) {
      func(p, 'text');
    }
  };

  /*
  ========================================
  =            UTIL FUNCTIONS            =
  ========================================
  */
  pText.functions.utils.randIntInRange = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  pText.functions.utils.clamp = function(n, min, max) {
    return Math.min(Math.max(n, min), max);
  };

  pText.functions.utils.debounce = function(func, min_interval) {
    // credit: https://stackoverflow.com/a/45905199/9986591
    let timer;
    return function(event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, min_interval, event);
    };
  };

  pText.functions.utils.addEventActions = function(event) {
    /* event is a particle-client interaction, one of: on_hover, on_click, on_touch */
    const action_funcs = {
      repulse: pText.functions.interactivity.repulseParticle,
      big_repulse: pText.functions.interactivity.repulseParticle,
      grab: pText.functions.interactivity.grabParticle
    };
    let event_wrapper = pText.functions.interactivity.onMouseMove;
    if (event === 'on_click') {
      event_wrapper = pText.functions.interactivity.onMouseClick;
    }
    // get function from action_funcs mapping
    if (pText.text_particles.interactivity[event].enabled) {
      const func = action_funcs[pText.text_particles.interactivity[event].action],
            args = pText.interactions[pText.text_particles.interactivity[event].action];
      const partial_func = event_wrapper.bind(null, func, args);
      // create partial function where remaining arg is an individual particle
      pText.text_particles.interactivity.fn_array.push(partial_func);
    }
    if (pText.bg_particles.interactivity[event].enabled) {
      const func = action_funcs[pText.bg_particles.interactivity[event].action],
            args = pText.interactions[pText.bg_particles.interactivity[event].action];
      const partial_func = event_wrapper.bind(null, func, args);
      pText.bg_particles.interactivity.fn_array.push(partial_func);
    }
  };

  /*
  ========================================
  =           LAUNCH FUNCTION            =
  ========================================
  */
  pText.functions.launch = function() {
    pText.functions.interactivity.addEventListeners();
    pText.functions.canvas.init();
    if (pText.text_particles.enabled) {
      const text_pixels = pText.functions.canvas.getTextData();
      pText.functions.particles.createTextParticles(text_pixels);
    }
    if (pText.bg_particles.enabled) {
      pText.functions.particles.createBackgroundParticles();
    }
    pText.functions.particles.animateParticles();
  };

  pText.functions.launch();
};

/*
========================================
=           GLOBAL FUNCTIONS           =
========================================
*/
Object.deepExtend = function(destination, source) {
  // credit: https://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
  for (let property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = (function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
})();

window.pTextDom = [];

window.particleTextDisplay = function(tag_id, params) {
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