const TimelineDisplayer = function(tag_id, timeline_el, canvas) {
  this.timelineObj = {
    canvas: {
      el: canvas
    },
    // get start and end years from element dataset
    start_year: parseInt(timeline_el.dataset.start),
    end_year: parseInt(timeline_el.dataset.end),
    center_x: Math.floor(canvas.width / 2),
    years_ycoords: {},
    occupied_grid: {},
    events: [],
    style: {},
    functions: {
      timeline: {},
      events: {},
      utils: {}
    },
  };
  const TL = this.timelineObj;

  /*
  ========================================
  =          TIMELINE FUNCTIONS          =
  ========================================
  */
  TL.functions.timeline.init = function() {
    TL.canvas.ctx = TL.canvas.el.getContext('2d');
    TL.functions.timeline.getStyle();
    TL.top_y = TL.style.vertical_padding;
    TL.bottom_y = TL.canvas.el.height - TL.style.vertical_padding;
    TL.functions.events.parseEvents();
    // also need to load images and wait before moving on
    // compute y-coordinate for each 1/4 year included in the timeline
    const y_inc = (TL.bottom_y - TL.top_y) / ((TL.end_year - TL.start_year) * 4);
    for (let year = TL.start_year, year_y = TL.top_y; year <= TL.end_year; year += 0.25, year_y += y_inc) {
      TL.years_ycoords[year] = Math.floor(year_y);
      TL.occupied_grid[year] = Array(TL.events.length).fill(0);
    }
  };

  TL.functions.timeline.getStyle = function() {
    // styling set via sass variables and stored as custom properties in timeline element
    const compStyles = getComputedStyle(timeline_el);
    TL.style.vertical_padding = parseInt(compStyles.getPropertyValue("--vertical-padding"));
    TL.style.year_fontsize = compStyles.getPropertyValue("--year-font-size").trim();
    TL.style.gridline_width = parseInt(compStyles.getPropertyValue("--gridline-width"));
    TL.style.timeline_width = parseInt(compStyles.getPropertyValue("--timeline-width"));
    TL.style.event_width = parseInt(compStyles.getPropertyValue("--event-width"));
    TL.style.event_offset = parseInt(compStyles.getPropertyValue("--event-offset"));
    const background_color = compStyles.getPropertyValue("--background-color").trim(),
      background_alpha = parseFloat(compStyles.getPropertyValue("--background-alpha")),
      timeline_color = compStyles.getPropertyValue("--timeline-color").trim(),
      timeline_alpha = parseFloat(compStyles.getPropertyValue("--timeline-alpha")),
      year_color = compStyles.getPropertyValue("--year-color").trim(),
      year_alpha = parseFloat(compStyles.getPropertyValue("--year-alpha")),
      gridline_color = compStyles.getPropertyValue("--gridline-color").trim(),
      gridline_alpha = parseFloat(compStyles.getPropertyValue("--gridline-alpha"));
    TL.style.background_color = TL.functions.utils.hexToRGBA(background_color, background_alpha);
    TL.style.timeline_color = TL.functions.utils.hexToRGBA(timeline_color, timeline_alpha);
    TL.style.year_color = TL.functions.utils.hexToRGBA(year_color, year_alpha);
    TL.style.gridline_color = TL.functions.utils.hexToRGBA(gridline_color, gridline_alpha);
  };

  TL.functions.timeline.computeEventLayout = function() {
    // store x-coordinates for each possible column event bars can occupy
    // (largest number of simultaneously occurring events we have to account for
    // is the total number of events)
    const event_col_xcoords = [TL.center_x];
    let offset_n = 1;
    while (event_col_xcoords.length < TL.events.length) {
      const total_offset = offset_n * (TL.style.event_width + TL.style.event_offset);
      event_col_xcoords.push(TL.center_x + total_offset);
      if (event_col_xcoords.length < TL.events.length) {
        event_col_xcoords.push(TL.center_x - total_offset);
      }
      offset_n ++;
    }

    // for each timeline event
    for (let event_n in TL.events) {
      const event = TL.events[event_n],
        // get the index of the center-most column not occupied at its start start year
        first_open_col = TL.occupied_grid[event.start_year].indexOf(0);
      // set the x-coordinate of the column where the event will be drawn
      event.x_coord = event_col_xcoords[first_open_col];
      // mark that column as occupied for the duration of the event
      for (let year = event.start_year; year < event.end_year; year += 0.25) {
        TL.occupied_grid[year][first_open_col] = 1;
      }
    }
  };

  TL.functions.timeline.drawBase = function() {
    // draw years and horizontal grid lines
    TL.canvas.ctx.beginPath();
    TL.canvas.ctx.fillStyle = TL.style.year_color;
    TL.canvas.ctx.textAlign = "right";
    TL.canvas.ctx.font = `${TL.style.year_fontsize} sans-serif`;
    TL.canvas.ctx.strokeStyle = TL.style.gridline_color;
    TL.canvas.lineWidth = TL.style.gridline_width;
    // all digits are equal width, so this will work for the next ~8,000 years
    // use 5 digits to get small gap between year and line
    const gridline_x_offset = TL.canvas.ctx.measureText("00000").width,
      // for vertically aligning center of text with gridline
      text_y_offset = parseInt(TL.style.year_fontsize) / 2;
    for (let year_str in TL.years_ycoords) {
      const year = Number(year_str);
      if (Number.isInteger(year)) {
        TL.canvas.ctx.fillText(year, TL.canvas.el.width, TL.years_ycoords[year] + text_y_offset);
        TL.canvas.ctx.moveTo(0, TL.years_ycoords[year]);
        TL.canvas.ctx.lineTo(TL.canvas.el.width - gridline_x_offset, TL.years_ycoords[year]);
      }
    }
    TL.canvas.ctx.stroke();
    // draw main vertical timeline
    TL.canvas.ctx.beginPath();
    TL.canvas.ctx.moveTo(Math.round(TL.canvas.el.width / 2), TL.top_y);
    TL.canvas.ctx.lineTo(Math.round(TL.canvas.el.width / 2), TL.bottom_y);
    TL.canvas.ctx.lineWidth = TL.style.timeline_width;
    TL.canvas.ctx.strokeStyle = TL.style.timeline_color;
    TL.canvas.ctx.stroke();
  };

  /*
  ========================================
  =           EVENT FUNCTIONS            =
  ========================================
  */
  TL.functions.events.TimelineEvent = function(event_li) {
    this.title = event_li.id.replace("timeline-event", "").replace("_", " ");
    this.start_year = parseFloat(event_li.dataset.start);
    this.end_year = parseFloat(event_li.dataset.end);
    this.color = `#${event_li.dataset.color}`;
    // this.image_path = event_li.dataset.image;
  };

  TL.functions.events.TimelineEvent.prototype.draw = function() {
    TL.canvas.ctx.beginPath();
    TL.canvas.ctx.lineWidth = TL.style.event_width;
    TL.canvas.ctx.strokeStyle = this.color;
    TL.canvas.ctx.lineCap = "round";
    // rounded caps have a radius of 1/2 the line's width and add that much length to the line
    TL.canvas.ctx.moveTo(this.x_coord, TL.years_ycoords[this.start_year] + (TL.style.event_width / 2));
    TL.canvas.ctx.lineTo(this.x_coord, TL.years_ycoords[this.end_year] - (TL.style.event_width / 2));
    TL.canvas.ctx.stroke();
  };

  TL.functions.events.parseEvents = function() {
    const events_list = document.querySelector(`#${tag_id} > .timeline-events`).getElementsByTagName("li");
    for (let event_li of events_list) {
      TL.events.push(new TL.functions.events.TimelineEvent(event_li));
    }
  };

  /*
  ========================================
  =           LAUNCH FUNCTIONS           =
  ========================================
  */
  TL.functions.utils.hexToRGBA = function(hex, opacity = 1) {
    const tempHex = hex.replace('#', ''),
      r = parseInt(tempHex.substring(0, 2), 16),
      g = parseInt(tempHex.substring(2, 4), 16),
      b = parseInt(tempHex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity})`;
  }

  /*
  ========================================
  =           LAUNCH FUNCTIONS           =
  ========================================
  */
  TL.functions.launch = function() {
    TL.functions.timeline.init();
    TL.functions.timeline.computeEventLayout();
    TL.functions.timeline.drawBase();
    for (let event of TL.events) {
      event.draw();
    }
  };
  TL.functions.launch();
};

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
  canvas_el.width = timeline_el.offsetWidth;
  canvas_el.height = timeline_el.offsetHeight;
  const canvas = timeline_el.appendChild(canvas_el);

  // launch display
  if (canvas != null) {
    timelineDom.push(new TimelineDisplayer(tag_id, timeline_el, canvas));
  }
};