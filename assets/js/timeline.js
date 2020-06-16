const TimelineDisplayer = function(tag_id, timeline_el, canvas) {

  const events_list_el = document.querySelector(`#${tag_id} > .timeline-events`);

  this.timelineObj = {
    // get start and end years from element dataset
    start_year: parseInt(timeline_el.dataset.start),
    end_year: parseInt(timeline_el.dataset.end),
    events: [],
    style: {},
    functions: {
      timeline: {},
      events: {}
    },
  };
  const TL = this.timelineObj;

  /*
  ========================================
  =          TIMELINE FUNCTIONS          =
  ========================================
  */
  TL.functions.timeline.getStyle = function() {
    /* styling info is set via sass variables and stored in custom properties
    of timeline element */
    const compStyles = getComputedStyle(timeline_el);
    TL.style.background_color = compStyles.getPropertyValue("--background-color");
    TL.style.timeline_color =
  }






  /*
  ========================================
  =           EVENT FUNCTIONS            =
  ========================================
  */



  /*
  ========================================
  =           LAUNCH FUNCTIONS           =
  ========================================
  */


};


// const bg_color = getComputedStyle(timeline_el).getPropertyValue("--background-color");
// console.log(bg_color);

/*
========================================
=           GLOBAL FUNCTIONS           =
========================================
*/
window.timelineDom = [];

window.timelineDisplay = function(tag_id) {
  // get target element by ID, add a full-size canvas as a child
  const timeline_el = document.getElementById(tag_id),
    canvas_el = document.createElement('canvas');
  canvas_el.className = 'timeline-canvas-el';
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";
  const canvas = timeline_el.appendChild(canvas_el);

  // launch display
  if (canvas != null) {
    timelineDom.push(new TimelineDisplayer(tag_id, timeline_el, canvas));
  }
};

timelineDisplay('timeline')