'use strict';

function ParticleImageDisplayer(canvasEl, params) {
  this.pImageConfig = {
    particles: {
      array: [],
      density: 100,
      color: '#fff',
      size: {
        value: 2,
        random: false,
      },
      movement: {
        speed: 1,
        restless: {
          enabled: false,
          value: 10,
        },
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
      },
    },
    image: {
      src: {
        path: null,
        is_external: false,
      },
      size: {
        canvas_pct: 60,
        min_px: 50,
        max_px: 800,
      },
      bottom_constraint: {
        el: document.getElementById('header-content'),
      },
    },
    interactions: {
      repulse: {
        distance: 100,
        strength: 200,
      },
      big_repulse: {
        distance: 100,
        strength: 500,
      },
      grab: {
        distance: 100,
        line_width: 1,
      },
    },
    canvas: {
      el: canvasEl,
      w: canvasEl.offsetWidth,
      h: canvasEl.offsetHeight,
      offset_top: 72,
    },
    animation: {
      lastTimestamp: 0,
      targetFPS: 60,
      deltaTime: 0,
    },
    functions: {
      particles: {},
      image: {},
      canvas: {},
      interactivity: {},
      utils: {},
    },
    mouse: {
      x: null,
      y: null,
      click_x: null,
      click_y: null,
    },
  };

  const pImg = this.pImageConfig;
  if (params) {
    Object.deepExtend(pImg, params);
  }

  /*
  ========================================
  =           CANVAS FUNCTIONS           =
  ========================================
  */
  pImg.functions.canvas.init = function canvasInit() {
    pImg.canvas.context = pImg.canvas.el.getContext('2d');
    pImg.canvas.el.width = pImg.canvas.w;
    pImg.canvas.el.height = pImg.canvas.h;
    pImg.image.height_available = pImg.image.bottom_constraint.el.offsetTop - pImg.canvas.offset_top;
    pImg.canvas.aspect_ratio = pImg.canvas.w / pImg.image.height_available;
    window.addEventListener(
      'resize',
      pImg.functions.utils.debounce(pImg.functions.canvas.onResize, 200),
      pImg.eventListenerOpts,
    );
  };

  pImg.functions.canvas.onResize = function canvasOnResize() {
    pImg.canvas.w = pImg.canvas.el.offsetWidth;
    pImg.canvas.h = pImg.canvas.el.offsetHeight;
    pImg.canvas.el.width = pImg.canvas.w;
    pImg.canvas.el.height = pImg.canvas.h;
    pImg.image.height_available = pImg.image.bottom_constraint.el.offsetTop - pImg.canvas.offset_top;
    pImg.canvas.aspect_ratio = pImg.canvas.w / pImg.image.height_available;
    pImg.particles.array = [];
    pImg.functions.image.resize();
    const imagePixels = pImg.functions.canvas.getImagePixels();
    pImg.functions.particles.createImageParticles(imagePixels, true);
  };

  pImg.functions.canvas.clear = function canvasClear() {
    pImg.canvas.context.clearRect(0, 0, pImg.canvas.w, pImg.canvas.h);
  };

  pImg.functions.canvas.getImagePixels = function canvasGetImagePixels() {
    pImg.functions.canvas.clear();
    pImg.canvas.context.drawImage(
      pImg.image.obj,
      pImg.image.x,
      pImg.image.y,
      pImg.image.obj.width,
      pImg.image.obj.height,
    );
    const pixelData = pImg.canvas.context.getImageData(
      pImg.image.x,
      pImg.image.y,
      pImg.image.obj.width,
      pImg.image.obj.height,
    );
    pImg.functions.canvas.clear();
    return pixelData;
  };

  /*
  ========================================
  =           IMAGE FUNCTIONS            =
  ========================================
  */
  pImg.functions.image.resize = function imageResize() {
    if (pImg.image.aspect_ratio < pImg.canvas.aspect_ratio) {
      // canvas height constrains image size
      pImg.image.obj.height = pImg.functions.utils.clamp(
        Math.round(pImg.image.height_available * pImg.image.size.canvas_pct / 100),
        pImg.image.size.min_px,
        pImg.image.size.max_px,
      );
      pImg.image.obj.width = Math.round(pImg.image.obj.height * pImg.image.aspect_ratio);
    } else {
      // canvas width constrains image size
      pImg.image.obj.width = pImg.functions.utils.clamp(
        Math.round(pImg.canvas.w * pImg.image.size.canvas_pct / 100),
        pImg.image.size.min_px,
        pImg.image.size.max_px,
      );
      pImg.image.obj.height = Math.round(pImg.image.obj.width / pImg.image.aspect_ratio);
    }
    // set x,y coords to center image on canvas
    pImg.image.x = pImg.canvas.w / 2 - pImg.image.obj.width / 2;
    pImg.image.y = pImg.image.height_available / 2 - pImg.image.obj.height / 2;
  };

  pImg.functions.image.init = function imageInit() {
    pImg.image.obj = new Image();
    pImg.image.obj.addEventListener('load', () => {
      // get aspect ratio (only have to compute once on initial load)
      pImg.image.aspect_ratio = pImg.image.obj.width / pImg.image.obj.height;
      pImg.functions.image.resize();
      const imgPixels = pImg.functions.canvas.getImagePixels();
      pImg.functions.particles.createImageParticles(imgPixels);
      window.requestAnimationFrame(pImg.functions.particles.animateParticles);
    }, pImg.eventListenerOpts);
    let srcPath = pImg.image.src.path;
    if (pImg.image.src.is_external) {
      srcPath = `https://cors-anywhere.herokuapp.com/${pImg.image.src.path}`;
      pImg.image.obj.crossOrigin = 'anonymous';
    }
    pImg.image.obj.src = srcPath;
  };

  /*
  ========================================
  =          PARTICLE FUNCTIONS          =
  ========================================
  */
  pImg.functions.particles.SingleImageParticle = function SingleImageParticle(initXY, destXY) {
    this.x = initXY.x;
    this.y = initXY.y;
    this.dest_x = destXY.x;
    this.dest_y = destXY.y;
    this.vx = (Math.random() - 0.5) * pImg.particles.movement.speed;
    this.vy = (Math.random() - 0.5) * pImg.particles.movement.speed;
    this.acc_x = 0;
    this.acc_y = 0;
    this.friction = Math.random() * 0.01 + 0.92;
    this.restlessness = {
      max_displacement: Math.ceil(Math.random() * pImg.particles.movement.restless.value),
      x_jitter: pImg.functions.utils.randIntInRange(-3, 3),
      y_jitter: pImg.functions.utils.randIntInRange(-3, 3),
      on_curr_frame: false,
    };
    if (pImg.particles.color instanceof Array) {
      this.color = pImg.particles.color[Math.floor(Math.random() * (pImg.particles.color.length + 1))];
    } else {
      this.color = pImg.particles.color;
    }
    this.radius = Math.round(
      (pImg.particles.size.random ? Math.max(Math.random(), 0.5) : 1) * pImg.particles.size.value,
    );
  };

  pImg.functions.particles.SingleImageParticle.prototype.draw = function drawMethod() {
    pImg.canvas.context.fillStyle = this.color;
    pImg.canvas.context.beginPath();
    pImg.canvas.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    pImg.canvas.context.fill();
  };

  pImg.functions.particles.createImageParticles = function createImageParticles(pixelData, atDest = false) {
    const increment = Math.round(pixelData.width / pImg.particles.density);
    for (let i = 0; i < pixelData.width; i += increment) {
      for (let j = 0; j < pixelData.height; j += increment) {
        if (pixelData.data[(i + j * pixelData.width) * 4 + 3] > 128) {
          const destXY = { x: pImg.image.x + i, y: pImg.image.y + j },
                initXY = atDest ? destXY : { x: Math.random() * pImg.canvas.w, y: Math.random() * pImg.canvas.h };
          pImg.particles.array.push(new pImg.functions.particles.SingleImageParticle(initXY, destXY));
        }
      }
    }
  };

  pImg.functions.particles.updateParticles = function updateParticles(deltaTime) {
    const normalizedDelta = deltaTime || 1; // fallback for first frame
    // eslint-disable-next-line no-restricted-syntax
    for (const p of pImg.particles.array) {
      if ((pImg.particles.movement.restless.enabled) && (p.restlessness.on_curr_frame)) {
        // if restless activity is enabled & particle is in restless mode, animate some random movement
        pImg.functions.particles.jitterParticle(p, normalizedDelta);
      } else {
        // otherwise, update position with approach to destination
        p.acc_x = (p.dest_x - p.x) / 500;
        p.acc_y = (p.dest_y - p.y) / 500;
        p.vx = (p.vx + p.acc_x) * p.friction;
        p.vy = (p.vy + p.acc_y) * p.friction;
        p.x += p.vx * normalizedDelta;
        p.y += p.vy * normalizedDelta;
      }

      pImg.functions.interactivity.interactWithClient(p, normalizedDelta);
    }
  };

  pImg.functions.particles.jitterParticle = function jitterParticle(p, deltaTime) {
    const normalizedDelta = deltaTime || 1;
    /* eslint-disable no-param-reassign */
    p.x += p.restlessness.x_jitter * normalizedDelta;
    p.y += p.restlessness.y_jitter * normalizedDelta;
    if (Math.sqrt((p.dest_x - p.x) ** 2 + (p.dest_y - p.y) ** 2) >= pImg.particles.movement.restless.value) {
      p.restlessness.on_curr_frame = false;
    }
    /* eslint-enable no-param-reassign */
  };

  pImg.functions.particles.animateParticles = function animateParticles(timestamp) {
    // Calculate delta time for frame-rate independent animation
    if (pImg.animation.lastTimestamp === 0) {
      pImg.animation.lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - pImg.animation.lastTimestamp;
    pImg.animation.lastTimestamp = timestamp;

    // Normalize delta time to target 60 FPS (16.67ms per frame)
    const targetFrameTime = 1000 / pImg.animation.targetFPS,
          // limit delta time to 2x target frame time to prevent massive jumps
          // (e.g., when returning to browser tab after switching away)
          normalizedDelta = Math.min(deltaTime / targetFrameTime, 2);

    pImg.functions.canvas.clear();
    pImg.functions.particles.updateParticles(normalizedDelta);
    // eslint-disable-next-line no-restricted-syntax
    for (const p of pImg.particles.array) {
      p.draw();
    }
    window.requestAnimationFrame(pImg.functions.particles.animateParticles);
  };

  /*
  ========================================
  =        INTERACTIVITY FUNCTIONS       =
  ========================================
  */
  pImg.functions.interactivity.repulseParticle = function repulseParticle(p, args, deltaTime = 1) {
    // compute distance to mouse
    const dxMouse = p.x - pImg.mouse.x,
          dyMouse = p.y - pImg.mouse.y,
          mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse),
          invStrength = pImg.functions.utils.clamp(300 - args.strength, 10, 300);
    if (mouseDist <= args.distance) {
      /* eslint-disable no-param-reassign */
      p.acc_x = (p.x - pImg.mouse.x) / invStrength;
      p.acc_y = (p.y - pImg.mouse.y) / invStrength;
      p.vx += p.acc_x * deltaTime;
      p.vy += p.acc_y * deltaTime;
      /* eslint-enable no-param-reassign */
    }
  };

  pImg.functions.interactivity.grabParticle = function grabParticle(p, args) {
    const dxMouse = p.x - pImg.mouse.x,
          dyMouse = p.y - pImg.mouse.y,
          mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    if (mouseDist <= args.distance) {
      pImg.canvas.context.strokeStyle = p.color;
      pImg.canvas.context.lineWidth = Math.min(args.line_width, p.radius * 2);
      pImg.canvas.context.beginPath();
      pImg.canvas.context.moveTo(p.x, p.y);
      pImg.canvas.context.lineTo(pImg.mouse.x, pImg.mouse.y);
      pImg.canvas.context.stroke();
      pImg.canvas.context.closePath();
    }
  };

  pImg.functions.interactivity.onMouseMove = function onMouseMove(func, args, p, deltaTime) {
    if (pImg.mouse.x != null && pImg.mouse.y != null) {
      func(p, args, deltaTime);
    }
  };

  pImg.functions.interactivity.onMouseClick = function onMouseClick(func, args, p, deltaTime) {
    if (pImg.mouse.click_x != null && pImg.mouse.click_y != null) {
      func(p, args, deltaTime);
    }
  };

  pImg.functions.interactivity.addEventListeners = function addEventListeners() {
    if (pImg.particles.interactivity.on_hover.enabled || pImg.particles.interactivity.on_click.enabled) {
      pImg.canvas.el.addEventListener('mousemove', (e) => {
        const posX = e.offsetX || e.clientX,
              posY = e.offsetY || e.clientY;
        pImg.mouse.x = posX;
        pImg.mouse.y = posY;
      }, pImg.eventListenerOpts);
      pImg.canvas.el.addEventListener('mouseleave', () => {
        pImg.mouse.x = null;
        pImg.mouse.y = null;
      }, pImg.eventListenerOpts);
      pImg.functions.utils.addEventActions('on_hover');
    }
    if (pImg.particles.interactivity.on_click.enabled) {
      pImg.canvas.el.addEventListener('mousedown', () => {
        pImg.mouse.click_x = pImg.mouse.x;
        pImg.mouse.click_y = pImg.mouse.y;
      }, pImg.eventListenerOpts);
      pImg.canvas.el.addEventListener('mouseup', () => {
        pImg.mouse.click_x = null;
        pImg.mouse.click_y = null;
      }, pImg.eventListenerOpts);
      pImg.functions.utils.addEventActions('on_click');
    }
    if (pImg.particles.interactivity.on_touch.enabled) {
      pImg.canvas.el.addEventListener('touchmove', (e) => {
        const posX = e.touches[0].clientX,
              posY = e.touches[0].clientY;
        pImg.mouse.x = posX;
        pImg.mouse.y = posY;
      }, pImg.eventListenerOpts);
      pImg.canvas.el.addEventListener('touchend', () => {
        pImg.mouse.x = null;
        pImg.mouse.y = null;
      }, pImg.eventListenerOpts);
      pImg.functions.utils.addEventActions('on_touch');
    }
  };

  pImg.functions.interactivity.interactWithClient = function interactWithClient(p, deltaTime) {
    // eslint-disable-next-line no-restricted-syntax
    for (const func of pImg.particles.interactivity.fn_array) {
      func(p, deltaTime);
    }
  };

  /*
  ========================================
  =           UTILS FUNCTIONS            =
  ========================================
  */
  pImg.functions.utils.randIntInRange = function randIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  pImg.functions.utils.clamp = function clamp(n, min, max) {
    return Math.min(Math.max(n, min), max);
  };

  pImg.functions.utils.debounce = function debounce(func, minInterval) {
    let timer;
    return (event) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, minInterval, event);
    };
  };

  pImg.functions.utils.addEventActions = function addEventActions(event) {
    const actionFuncs = {
      repulse: pImg.functions.interactivity.repulseParticle,
      big_repulse: pImg.functions.interactivity.repulseParticle,
      grab: pImg.functions.interactivity.grabParticle,
    },
          eventWrapper = event === 'on_click'
            ? pImg.functions.interactivity.onMouseClick
            : pImg.functions.interactivity.onMouseMove;
    if (pImg.particles.interactivity[event].enabled) {
      const func = actionFuncs[pImg.particles.interactivity[event].action],
            args = pImg.interactions[pImg.particles.interactivity[event].action],
            partialFunc = (p, deltaTime) => eventWrapper(func, args, p, deltaTime);
      pImg.particles.interactivity.fn_array.push(partialFunc);
    }
  };

  /*
  ========================================
  =           LAUNCH FUNCTIONS           =
  ========================================
  */
  pImg.functions.launch = function launch() {
    pImg.functions.interactivity.addEventListeners();
    pImg.functions.canvas.init();
    pImg.functions.image.init();
  };

  if (!pImg.disabled) {
    pImg.functions.launch();
  }
}

/*
========================================
=           GLOBAL FUNCTIONS           =
========================================
*/
Object.deepExtend = function deepExtendFunction(destination, source) {
  // credit: https://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
  // eslint-disable-next-line no-restricted-syntax
  for (const property in source) {
    /* eslint-disable no-param-reassign */
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      deepExtendFunction(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
    /* eslint-enable no-param-reassign */
  }
  return destination;
};

window.pImgDom = [];

window.particleImageDisplay = function particleImageDisplay(tagId) {
  // chceck whether browser supports passive eventListeners. If so, 3rd param of
  // EventTarget.addEventListener is `options`; pass `{ passive: true }`. Else,
  // 3rd param is `useCapture`; pass `false`.
  let passiveOptsOrUseCapture = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: () => { passiveOptsOrUseCapture = { passive: true }; },
    });
    window.addEventListener('checkPEL', null, opts);
    window.removeEventListener('checkPEL', null, opts);
  } catch {}

  // get target element by ID, check for existing canvases
  const pImageEl = document.getElementById(tagId),
        canvasClassname = 'particle-image-canvas-el',
        existingCanvases = pImageEl.getElementsByClassName(canvasClassname);

  // remove any existing canvases within div
  if (existingCanvases.length) {
    while (existingCanvases.length > 0) {
      pImageEl.removeChild(existingCanvases[0]);
    }
  }

  // create canvas element, set size, append to target element
  const canvasEl = document.createElement('canvas');
  canvasEl.className = canvasClassname;
  canvasEl.style.width = '100%';
  canvasEl.style.height = 'calc(100% - var(--navbar-height))';
  const canvas = document.getElementById(tagId).appendChild(canvasEl);

  if (canvas != null) {
    // get params.json filepath from load parameters from element's data-params-src property
    const paramsJson = pImageEl.dataset.paramsSrc;
    fetch(paramsJson)
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then((params) => {
        // eslint-disable-next-line no-param-reassign
        params.eventListenerOpts = passiveOptsOrUseCapture;
        window.pImgDom.push(new ParticleImageDisplayer(canvas, params));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(`failed to load params.json: ${error.message}`);
      });
  }
};

window.particleImageDisplay('particle-image');
