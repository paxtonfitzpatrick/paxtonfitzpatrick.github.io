const TimelineDisplayer = function(tag_id, timeline_el, canvas) {

  const events_list_el = document.querySelector(`#${tag_id} > .timeline-events`);


  this.timelineObj = {
    canvas: {
      el: canvas,
      ctx: canvas.getContext('2d')
    },
    // get start and end years from element dataset
    start_year: parseInt(timeline_el.dataset.start),
    end_year: parseInt(timeline_el.dataset.end),
    center_x: Math.floor(canvas.width / 2),
    years_ycoords: {},
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
  TL.functions.timeline.init = function() {
    // compute y-coordinate for each 1/4 year included in the timeline
    const y_inc = TL.canvas.height / ((TL.end_year - TL.start_year) * 4);
    for (let year = TL.start_year, year_y = 0; year <= TL.end_year; year += 0.25, year_y += y_inc) {
      TL.years_ycoords[year] = Math.floor(year_y);
    }
    // also need to load images and wait before moving on
  };

  TL.functions.timeline.getStyle = function() {
    // styling set via sass variables and stored as custom properties in timeline element
    const compStyles = getComputedStyle(timeline_el);
    TL.style.background_color = compStyles.getPropertyValue("--background-color");
    TL.style.year_color = compStyles.getPropertyValue("--year-color");
    TL.style.year_fontsize = compStyles.getPropertyValue("--year-font-size");
    TL.style.gridline_color = compStyles.getPropertyValue("--gridline-color");
    TL.style.gridline_width = compStyles.getPropertyValue("--gridline-width");
    TL.style.timeline_color = compStyles.getPropertyValue("--timeline-color");
    TL.style.timeline_width = compStyles.getPropertyValue("--timeline-width");
    TL.style.bar_width = compStyles.getPropertyValue("--bar-width");
    TL.style.bar_offset = compStyles.getPropertyValue("--bar-offset");
  };

  TL.functions.timeline.drawBase = function() {
    // draw main vertical timeline
    TL.canvas.ctx.beginPath();
    TL.canvas.ctx.moveTo(Math.round(TL.canvas.width / 2), 0);
    TL.canvas.ctx.lineTo(Math.round(TL.canvas.width / 2), TL.canvas.height);
    TL.canvas.ctx.lineWidth = TL.style.timeline_width;
    TL.canvas.ctx.strokeStyle = TL.style.timeline_color;
    TL.canvas.ctx.lineCap = 'round';
    TL.canvas.ctx.stroke();
    // draw years and horizontal grid lines
    TL.canvas.ctx.fillStyle = TL.style.year_color;
    TL.canvas.ctx.font = `${TL.style.year_fontsize} sans-serif`;
    TL.canvas.ctx.textAlign = "right";
    // all digits are equal width, so this will work for the next ~8,000 years
    // use 5 digits to get small gap between year and line
    const gridline_offset = TL.canvas.ctx.measureText("00000").width;
    TL.canvas.ctx.beginPath();
    TL.canvas.ctx.strokeStyle = TL.style.gridline_color;
    TL.canvas.lineWidth = TL.style.gridline_width;
    for (let year in TL.years_ycoords) {
      if (Number.isInteger(year)) {
        TL.canvas.ctx.fillText(year, TL.canvas.width, TL.years_ycoords[year]);
        TL.canvas.ctx.moveTo(0, TL.years_ycoords[year]);
        TL.canvas.ctx.lineTo(gridline_offset, TL.years_ycoords[year]);
      }
    }
    TL.canvas.ctx.stroke();
  }

  /*
  ========================================
  =           EVENT FUNCTIONS            =
  ========================================
  */
  TL.functions.events.TimelineEvent = function(event_li) {
    this.title = event_li.id.replace("timeline-event", "").replace("_", " ");
    this.start_year = parseFloat(event_li.dataset.start).toFixed(2);
    this.end_year = parseFloat(event_li.dataset.end).toFixed(2);
    this.color = event_li.dataset.color;
    this.image_path = event_li.dataset.image;
  };

  TL.functions.events.TimelineEvent.prototype.computePosition = function() {
    // compute veritcal and horizontal position of event bar
  };



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

timelineDisplay('timeline');