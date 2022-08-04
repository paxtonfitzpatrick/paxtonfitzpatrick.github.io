(() => {
  'use strict';

  /*
  ========================================
  =         TIMELINE EVENT CLASS         =
  ========================================
  */
  class TimelineEvent {
    constructor(eventListItem, timeline) {
      // reference to owner class
      this.timeline = timeline;
      this.info = eventListItem.innerHTML;
      // start and end years (+ increments) of the timeline
      this.startYear = parseFloat(eventListItem.dataset.start);
      this.endYear = parseFloat(eventListItem.dataset.end);
      this.color = `#${eventListItem.dataset.color}`;
      // x-coordinate of column where event will be drawn
      this.xCoord = null;
    }

    drawEventLine() {
      const ctx = this.timeline.canvas.context,
        eventWidth = this.timeline.style.eventWidth,
        yearsYCoords = this.timeline.yearsYCoords;

      ctx.beginPath();
      ctx.lineWidth = eventWidth;
      ctx.strokeStyle = this.color;
      ctx.lineCap = 'round';
      // rounded caps have a radius of 1/2 the line's width and add that much
      // additional length to the line
      ctx.moveTo(this.xCoord, yearsYCoords[this.startYear] + (eventWidth / 2));
      ctx.moveTo(this.xCoord, yearsYCoords[this.endYear] - (eventWidth / 2));
      ctx.stroke();
    }

    // eslint-disable-next-line -- (placeholder) // TODO: write me
    drawInfo(infoLayout) {};

    // eslint-disable-next-line -- (placeholder) // TODO: write me
    formatInfoLayout(infoLeftXcoord, infoRightXcoord) {};

  }

  /*
  ========================================
  =            TIMELINE CLASS            =
  ========================================
  */
  class Timeline {
    constructor(timelineElement) {
      // target element
      this.timelineElement = timelineElement;
      // current height & width of target element (and child canvas)
      // TODO: account for padding?
      this.currentWidth = timelineElement.offsetWidth;
      this.currentHeight = timelineElement.offsetHeight;
      // start and end years of the timeline
      this.startYear = parseInt(timelineElement.dataset.start, 10);
      this.endYear = parseInt(timelineElement.dataset.end, 10);
      // sets this.canvas:
      //   {element: HTMLCanvasElement, context: CanvasRenderingContext2D}
      this.initCanvas(timelineElement);
      // sets this.style (Object; see function for full list of field names)
      this.getStyles();
      // sets this.events (Array of TimelineEvents)
      this.parseEvents();
      // sets:
      //  - this.yearLineHeight:
      //    (approximate) height of year labels for grid lines (for alignment)
      //  - this.yearXOffset:
      //    used to offset labels from grid lines (approx. 1 character width)
      //  - this.infoLineHeight:
      //    line height of event info/descriptions
      this.precomputeStaticValues();
      // sets:
      //  - this.yearsYCoords:
      //    {year: y-coord} of offsets from the canvas top for each 1/4 year
      //    increment in the timeline
      //  - this.occupiedGrid:
      //    {year: this.events.length binary array} initially has all 0's; will
      //    contain 1's in rows/cols occupied by a timeline event
      //  - this.centerXCoord:
      //    x-coord at center of canvas, used to determine which side to place
      //    each event's info on
      this.computeBaseLayout();
      // sets:
      //  - this.infoLeftXCoord:
      //    x-coord of right edge of event info/description text on left side
      //  - this.infoRightXCoord:
      //    x-coord of left edge of event info/description text on right side
      this.computeEventLayout();
      this.drawBase();
      this.drawEvents();
    }

    precomputeStaticValues() {
      // compute & cache various values that don't change when resizing canvas
      // this.yearXOffset & this.yearLineHeight:
      // TODO: Math.round/Math.floor these?
      const ctx = this.canvas.context;
      ctx.font = `${this.style.yearFontsize} sans-serif`;
      // use 5 digits (4 for year + 1) to get small gap between year and line.
      // all digits are equal width, so this should hopefully work for the next
      // ~8,000 years
      const yearTextMetrics = ctx.measureText('00000');
      this.yearXOffset = yearTextMetrics.width;
      this.yearLineHeight = yearTextMetrics.actualBoundingBoxAscent;
      // this.infoLineHeight:
      ctx.font = `${this.style.infoFontsize} sans-serif`;
      this.infoLineHeight = ctx.measureText('0').actualBoundingBoxAscent;
      // could also pre-compute this.occupiedGrid here since that doesn't
      // change, but as-is, it's being constructed in loops that would exist
      // anyway, so it doesn't cost much and extracting it to here would just
      // add more operations before the first paint in order to be a tiny bit
      // more efficient in the comparatively uncommon case where someone resizes
      // the screen while the timeline is in view.
    }

    computeBaseLayout() {
      const topY = this.style.verticalPadding,
        bottomY = this.canvas.element.height - this.style.verticalPadding,
        // compute y-coord for each 1/4 year increment included in the timeline
        yInc = (bottomY - topY) / ((this.endYear - this.startYear) * 4),
        yearsYCoords = {},
        occupiedGrid = {};

      for (
        let year = this.startYear, yearY = topY; year <= this.endYear; year += 0.25, yearY += yInc
      ) {
        yearsYCoords[year] = Math.floor(yearY);
        occupiedGrid[year] = Array(this.events.length).fill(0);
      }
      this.yearsYCoords = yearsYCoords;
      this.occupedGrid = occupiedGrid;
      this.centerXCoord = Math.round(this.canvas.element.width / 2 - this.yearXOffset);
    }

    computeEventLayout() {
      // store x-coords for each possible column event bars can occupy (largest
      // number of simultaneous events we have to account for is the total
      // number of events). Layout is computed similarly to a CSS grid with
      // "auto-flow: column dense;", but rather than preferring the left column
      // and expanding right, this prioritizes the center column and expands
      // outward in both directions
      const eventColXCoords = [this.centerXCoord];
      // current number of columns from center (left or right)
      let columnOffset = 1;
      while (eventColXCoords.length < this.events.length) {
        const offsetX = columnOffset * (this.style.eventWidth + this.style.eventOffset);
        eventColXCoords.push(this.centerXCoord + offsetX);
        if (eventColXCoords.length < this.events.length) {
          eventColXCoords.push(this.centerXCoord - offsetX);
        }
        columnOffset++;
      }

      const eventXCoords = [];
      // for each timeline event
      this.events.forEach((event) => {
        // get the index of the center-most column not occupied at its start year
        const firstOpenCol = this.occupedGrid[event.startYear].indexOf(0),
          // get the x-coordinate of the column where the event should be drawn
          xCoord = eventColXCoords[firstOpenCol];

        event.xCoord = xCoord;
        eventXCoords.push(xCoord);
        // mark that column as occupied for the duration of the event
        for (let year = event.startYear; year < event.endYear; year += 0.25) {
          this.occupedGrid[year][firstOpenCol] = 1;
        }
      });

      // set x-coordinates for event info text on left side (right edge) & right
      // side (left edge)
      this.infoLeftXCoord = Math.min(eventXCoords) - this.style.infoXOffset;
      this.infoRightXCoord = Math.max(eventXCoords) + this.style.infoXOffset;
    }

    drawBase() {
      // draw horizontal grid lines and year labels
      const ctx = this.canvas.context;
      ctx.beginPath();
      ctx.fillStyle = this.style.yearColor;
      ctx.textAlign = 'right';
      ctx.font = `${this.style.year_fontsize} sans-serif`;
      ctx.strokeStyle = this.style.gridlineColor;
      ctx.lineWidth = this.style.gridlineWidth;

      for (const [yearString, yCoord] of Object.entries(this.yearsYCoords)) {
        if (Number.isInteger(Number(yearString))) {
          // TODO: second arg here is probably why year labels are overflowing
          // TODO: Math.round/Math.floor these?
          ctx.fillText(yearString, this.canvas.element.width, yCoord + (this.yearLineHeight / 2));
          ctx.moveTo(0, yCoord);
          // TODO: this.currentWidth instead? Any difference?
          ctx.lineTo(this.canvas.element.width - this.yearXOffset, yCoord);
        }
      }
      ctx.stroke();
    }

    drawEvents() {
      // wrapper function that draws each event, formats and draws its info, and
      // also pre-sets the canvas context's font size to ensure the layout is
      // computed properly
      this.canvas.context.font = `${this.style.infoFontsize}`
      this.events.forEach((event) => {
        event.drawEventLine();
        const eventInfoLayout = event.formatInfoLayout();
        event.drawInfo(eventInfoLayout);
      });
    }

    getStyles() {
      // parse timeline style config from CSS variables stored on the target
      // element. Timeline vars are set in _vars.scss and converted to CSS vars
      // in _bio-timeline.scss.
      const compStyles = getComputedStyle(this.timelineElement),
        backgroundColor = compStyles.getPropertyValue('--background-color').trim(),
        backgroundAlpha = parseFloat(compStyles.getPropertyValue('--background-alpha')),
        yearColor = compStyles.getPropertyValue('--year-color').trim(),
        yearAlpha = parseFloat(compStyles.getPropertyValue('--year-alpha')),
        gridlineColor = compStyles.getPropertyValue('--gridline-color').trim(),
        gridlineAlpha = parseFloat(compStyles.getPropertyValue('--gridline-alpha')),
        infoFontColor = compStyles.getPropertyValue('--info-font-color').trim(),
        infoFontAlpha = parseInt(compStyles.getPropertyValue('--info-font-alpha'), 10);
      this.style = {
        verticalPadding: parseInt(compStyles.getPropertyValue('--vertical-padding'), 10),
        yearFontsize: compStyles.getPropertyValue('--year-font-size').trim(),
        gridlineWidth: parseInt(compStyles.getPropertyValue('--gridline-width'), 10),
        eventWidth: parseInt(compStyles.getPropertyValue('--event-width'), 10),
        eventOffset: parseInt(compStyles.getPropertyValue('--event-offset'), 10),
        infoLineWidth: parseInt(compStyles.getPropertyValue('--info-line-width'), 10),
        infoXOffset: parseInt(compStyles.getPropertyValue('--info-x-offset'), 10),
        infoYOffset: parseFloat(compStyles.getPropertyValue('--info-y-offset')),
        infoFontsize: compStyles.getPropertyValue('--info-font-size').trim(),
        backgroundColor: hexToRGBA(backgroundColor, backgroundAlpha),
        yearColor: hexToRGBA(yearColor, yearAlpha),
        gridlineColor: hexToRGBA(gridlineColor, gridlineAlpha),
        infoFontColor: hexToRGBA(infoFontColor, infoFontAlpha),
      };
    }

    initCanvas(timelineElement) {
      // create canvas element and push it to the DOM as a child of the target
      // element
      const canvasElement = document.createElement('canvas');
      canvasElement.className = 'timeline-canvas-el';
      canvasElement.width = timelineElement.clientWidth;
      canvasElement.height = timelineElement.clientHeight;
      // style.position (absolute), style.width (100%), & style.height (100%)
      // set in _bio-timeline.scss; no need to set here
      timelineElement.appendChild(canvasElement);

      this.canvas = {
        element: canvasElement,
        context: canvasElement.getContext('2d'),
      };
    }

    onResize() {
      const newWidth = this.timelineElement.clientWidth,
        newHeight = this.timelineElement.clientHeight;

      if (newWidth !== this.currentWidth || newHeight !== this.currentHeight) {
        this.canvas.context.clearRect(0, 0, this.currentWidth, this.currentHeight);
        this.canvas.element.width = newWidth;
        this.canvas.element.height = newHeight;
        this.currentWidth = newWidth;
        this.currentHeight = newHeight;
        this.computeBaseLayout();
        this.computeEventLayout();
        this.drawBase();
        this.drawEvents();
      }
    }

    parseEvents() {
      const eventsList = this.timelineElement.getElementsByTagName('li'),
        events = [];
      Array.prototype.forEach.call(eventsList, (eventLi) => {
        events.push(new TimelineEvent(eventLi, this));
      });
      this.events = events;
    }
  }

  /*
  ========================================
  =           HELPER FUNCTIONS           =
  ========================================
  */
  const hexToRGBA = (hex, opacity = 1) => {
    const tempHex = hex.replace('#', ''),
      r = parseInt(tempHex.substring(0, 2), 16),
      g = parseInt(tempHex.substring(2, 4), 16),
      b = parseInt(tempHex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  /*
  ========================================
  =             MAIN SCRIPT              =
  ========================================
  */
  const timelineElement = document.getElementById(tagID);
  if (timelineElement !== null) {
    const timelineObj = new Timeline(timelineElement);
    timelineElement.addEventListener('resize', timelineObj.onResize);
  }
})();
