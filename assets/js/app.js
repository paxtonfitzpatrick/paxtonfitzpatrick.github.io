// particleTextDisplay('particle-animation',
//   {
//     "text_particles": {
//       "enabled": true,
//       "density": 400,
//       "color": "#fff",
//       "opacity": {
//         "value": 1,
//       },
//       "size": {
//         "value": 1,
//         "random": false,
//         "animate": {
//           "enabled": false,
//           "speed": 20,
//           "min": 0,
//           "sync": false
//         }
//       },
//       "movement": {
//         "speed": 1,
//         "restless": {
//           "enabled": false,
//           "value": 10,
//           "sync": false
//         }
//       },
//       "line_linked": {
//         "enabled": false,
//         "distance": 10,
//         "color": "#fff",
//         "opacity": 1,
//         "width": 1
//       },
//       "interactivity": {
//         "on_hover": {
//           "enabled": true,
//           "action": "repulse",
//         },
//         "on_click": {
//           "enabled": false,
//           "action": "big_repulse",
//         },
//         "on_touch": {
//           "enabled": true,
//           "action": "repulse",
//         }
//       }
//     },
//     "bg_particles": {
//       "enabled": false,
//       "density": 10,
//       "color": "#fff",
//       "opacity": {
//         "value": 0.5
//       },
//       "size": {
//         "value": 5,
//         "random": false,
//         "animate": {
//           "enabled": false,
//           "speed": 1,
//           "min": 0,
//           "sync": false
//         }
//       },
//       "movement": {
//         "speed": 1,
//         "bounce_on_border": false
//       },
//       "line_linked": {
//         "enabled": false,
//         "distance": 100,
//         "color": "#fff",
//         "opacity": 1,
//         "width": 1
//       },
//       "interactivity": {
//         "on_hover": {
//           "enabled": true,
//           "action": "repulse",
//         },
//         "on_click": {
//           "enabled": false,
//           "action": "big_repulse",
//         },
//         "on_touch": {
//           "enabled": false,
//           "action": "repulse"
//         }
//       }
//     },
//     "interactions": {
//       "repulse": {
//         "distance": 100,
//         "strength": 200
//       },
//       "big_repulse": {
//         "distance": 100,
//         "strength": 100
//       },
//       "grab": {
//         "distance": 100,
//         "line_opacity": 1
//       }
//     },
//     "retina_detect": false
//   }
// );
//
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
    "retina_detect": false
  }
);

