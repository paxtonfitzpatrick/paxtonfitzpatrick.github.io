const TimelineDisplayer = function(tag_id, timeline_el, canvas) {
  this.timelineObj = {
    canvas: {
      el: canvas,
      curr_height: canvas.height,
      curr_width: canvas.width
    },
    // get start and end years from element dataset
    timeline_el: {
      el: timeline_el,
      curr_height: timeline_el.offsetHeight
    },
    start_year: parseInt(timeline_el.dataset.start),
    end_year: parseInt(timeline_el.dataset.end),
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
    TL.functions.timeline.computeTimelineLayout();
  };

  TL.functions.timeline.computeTimelineLayout = function() {
    TL.top_y = TL.style.vertical_padding;
    TL.bottom_y = TL.canvas.el.height - TL.style.vertical_padding;
    TL.functions.events.parseEvents();
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
    TL.style.event_width = parseInt(compStyles.getPropertyValue("--event-width"));
    TL.style.event_offset = parseInt(compStyles.getPropertyValue("--event-offset"));
    TL.style.info_line_width = parseInt(compStyles.getPropertyValue("--info-line-width"));
    TL.style.info_x_offset = parseInt(compStyles.getPropertyValue("--info-x-offset"));
    TL.style.info_y_offset = parseFloat(compStyles.getPropertyValue("--info-y-offset"));
    TL.style.info_fontsize = compStyles.getPropertyValue("--info-font-size").trim();
    const background_color = compStyles.getPropertyValue("--background-color").trim(),
      background_alpha = parseFloat(compStyles.getPropertyValue("--background-alpha")),
      year_color = compStyles.getPropertyValue("--year-color").trim(),
      year_alpha = parseFloat(compStyles.getPropertyValue("--year-alpha")),
      gridline_color = compStyles.getPropertyValue("--gridline-color").trim(),
      gridline_alpha = parseFloat(compStyles.getPropertyValue("--gridline-alpha")),
      info_font_color = compStyles.getPropertyValue("--info-font-color").trim(),
      info_font_alpha = parseInt(compStyles.getPropertyValue("--info-font-alpha"));
    TL.style.background_color = TL.functions.utils.hexToRGBA(background_color, background_alpha);
    TL.style.year_color = TL.functions.utils.hexToRGBA(year_color, year_alpha);
    TL.style.gridline_color = TL.functions.utils.hexToRGBA(gridline_color, gridline_alpha);
    TL.style.info_font_color = TL.functions.utils.hexToRGBA(info_font_color, info_font_alpha);
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
      text_y_offset = TL.functions.utils.getTextLineHeight("0") / 2;
    // need to save this for text-wrapping computations in drawInfo function
    TL.canvas.gridline_x_offset = gridline_x_offset;
    for (let year_str in TL.years_ycoords) {
      const year = Number(year_str);
      if (Number.isInteger(year)) {
        TL.canvas.ctx.fillText(year, TL.canvas.el.width, TL.years_ycoords[year] + text_y_offset);
        TL.canvas.ctx.moveTo(0, TL.years_ycoords[year]);
        TL.canvas.ctx.lineTo(TL.canvas.el.width - gridline_x_offset, TL.years_ycoords[year]);
      }
    }
    TL.canvas.ctx.stroke();
    TL.center_x = Math.floor(TL.canvas.el.width  / 2 - gridline_x_offset);
  };

  /*
  ========================================
  =           EVENT FUNCTIONS            =
  ========================================
  */
  TL.functions.events.TimelineEvent = function(event_li) {
    this.info = event_li.id.replace("timeline-event-", "").replace(/_/g, " ");
    this.start_year = parseFloat(event_li.dataset.start);
    this.end_year = parseFloat(event_li.dataset.end);
    this.color = `#${event_li.dataset.color}`;
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

  TL.functions.events.drawInfo = function() {
    // get x-coordinates for info on left and right
    const info_left_xcoord = Math.min.apply(Math, TL.events.map(function(ev){return ev.x_coord;})) - TL.style.info_x_offset,
      info_right_xcoord = Math.max.apply(Math, TL.events.map(function(ev){return ev.x_coord;})) + TL.style.info_x_offset;

    for (let event of TL.events) {
      TL.canvas.ctx.beginPath();
      // line properties
      TL.canvas.ctx.strokeStyle = event.color;
      TL.canvas.ctx.lineWidth = TL.style.info_line_width;
      // text properties
      TL.canvas.ctx.fillStyle = TL.style.info_font_color;
      TL.canvas.ctx.font = `${TL.style.info_fontsize} sans-serif`;
      TL.canvas.ctx.textBaseline = "bottom";
      const info_layout = TL.functions.events.formatInfoLayout(event, info_left_xcoord, info_right_xcoord);
      TL.canvas.ctx.textAlign = info_layout.alignment;
      for (let line_ix in info_layout.line_arr) {
        TL.canvas.ctx.fillText(info_layout.line_arr[line_ix], info_layout.x, TL.years_ycoords[event.start_year] - (info_layout.line_height * 1.3) * (info_layout.line_arr.length - 1 - line_ix))
      }
      let line_start_y = TL.years_ycoords[event.start_year + TL.style.info_y_offset];
      if (event.end_year - event.start_year <= TL.style.info_y_offset) {
        line_start_y = Math.floor((TL.years_ycoords[event.end_year] + TL.years_ycoords[event.start_year]) / 2);
      }
      TL.canvas.ctx.moveTo(event.x_coord, line_start_y);
      TL.canvas.ctx.lineTo(info_layout.x, TL.years_ycoords[event.start_year] + info_layout.line_height * 0.3);
      TL.canvas.ctx.lineTo(info_layout.underline_x, TL.years_ycoords[event.start_year] + info_layout.line_height * 0.3)
      TL.canvas.ctx.stroke();
    }
  };

  TL.functions.events.formatInfoLayout = function(event, info_left_xcoord, info_right_xcoord) {
    // set left vs right placement & alignment
    let text_layout = {},
      words = event.info.split(' '),
      curr_line = words[0],
      text_max_width;

    if (event.x_coord >= TL.center_x) {
      text_layout.x = info_right_xcoord;
      text_layout.alignment = "left";
      text_max_width = TL.canvas.el.width - text_layout.x;
    } else {
      text_layout.x = info_left_xcoord;
      text_layout.alignment = "right";
      text_max_width = text_layout.x;
    }

    // iteratively add words to current line and re-measure, start new line when line length exceeds max
    text_layout.line_arr = [];
    for (let next_word of words.slice(1)) {
      const with_next_word = `${curr_line} ${next_word}`,
        width_with_next_word = TL.canvas.ctx.measureText(with_next_word).width;
      // always split on comma regardless of current line length
      if (width_with_next_word > text_max_width || curr_line.endsWith(',')) {
        text_layout.line_arr.push(curr_line);
        curr_line = next_word
      } else {
        curr_line = with_next_word;
      }
    }
    text_layout.line_arr.push(curr_line);
    text_layout.width = Math.max.apply(Math, text_layout.line_arr.map(line => TL.canvas.ctx.measureText(line).width));
    text_layout.line_height = TL.functions.utils.getTextLineHeight(text_layout.line_arr[0]);
    text_layout.underline_x = text_layout.alignment === "left" ? text_layout.x + text_layout.width : text_layout.x - text_layout.width;
    return text_layout;
  };

  TL.functions.events.parseEvents = function() {
    const events_list = document.querySelector(`#${tag_id} > .timeline-events`).getElementsByTagName("li");
    for (let event_li of events_list) {
      TL.events.push(new TL.functions.events.TimelineEvent(event_li));
    }
  };

  /*
  ========================================
  =            UTIL FUNCTIONS            =
  ========================================
  */
  TL.functions.utils.onResize = function() {
    const new_height = TL.timeline_el.el.clientHeight;
    if (new_height !== TL.timeline_el.curr_height) {
      TL.canvas.ctx.clearRect(0, 0, TL.canvas.curr_width, TL.canvas.curr_height);
      TL.canvas.el.height = new_height;
      TL.canvas.el.width = TL.timeline_el.el.clientWidth;
      TL.events = [];
      TL.occupied_grid = {};
      TL.functions.timeline.computeTimelineLayout();
      TL.functions.timeline.drawBase();
      TL.functions.timeline.computeEventLayout();
      for (let event of TL.events) {
        event.draw();
      }
      TL.functions.events.drawInfo();
      TL.timeline_el.curr_height = new_height;
      TL.canvas.curr_width = TL.canvas.el.width;
      TL.canvas.curr_height = TL.canvas.el.height;
    }
  };

  TL.functions.utils.hexToRGBA = function(hex, opacity = 1) {
    const tempHex = hex.replace('#', ''),
      r = parseInt(tempHex.substring(0, 2), 16),
      g = parseInt(tempHex.substring(2, 4), 16),
      b = parseInt(tempHex.substring(4, 6), 16);

    return `rgba(${r},${g},${b},${opacity})`;
  };

  TL.functions.utils.getTextLineHeight = function(text) {
    const metrics = TL.canvas.ctx.measureText(text);
    return Math.floor(metrics.actualBoundingBoxAscent);
  };

  /*
  ========================================
  =           LAUNCH FUNCTIONS           =
  ========================================
  */
  TL.functions.launch = function() {
    TL.functions.timeline.init();
    TL.functions.timeline.drawBase();
    TL.functions.timeline.computeEventLayout();
    for (let event of TL.events) {
      event.draw();
    }
    TL.functions.events.drawInfo();
    window.addEventListener('resize', TL.functions.utils.onResize);
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
  canvas_el.width = timeline_el.clientWidth;
  canvas_el.height = timeline_el.clientHeight;
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";
  canvas_el.style.position = "absolute";
  const canvas = timeline_el.appendChild(canvas_el);

  // launch display
  if (canvas != null) {
    timelineDom.push(new TimelineDisplayer(tag_id, timeline_el, canvas));
  }
};

timelineDisplay('timeline');