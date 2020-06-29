"use strict";

particleImageDisplay('particle-animation',
  {
    "particles": {
      "density": 200,
      "color": "#fff",
      "opactiy": {
        "value": 1
      },
      "size": {
        "value": 1,
        "random": false,
      },
      "movement": {
        "speed": 1,
      },
      "interactivity": {
        "on_hover": {
          "enabled": true,
          "action": "repulse"
        },
        "on_click": {
          "enabled": false,
          "action": "big_repulse"
        },
        "on_touch": {
          "enabled": true,
          "action": "repulse"
        },
      }
    },
    "image": {
      "size": {
        "width_pct": 60,
        "min_px": 150,
        "max_px": 800
      }
    },
    "interactions": {
      "repulse": {
        "distance": 100,
        "strength": 200
      }
    },
    "retina_detect": false,
    "disabled": true
  }
);

timelineDisplay('timeline');