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
      this.info = eventListItem.innerText.trim();
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
      ctx.lineTo(this.xCoord, yearsYCoords[this.endYear] - (eventWidth / 2));
      ctx.stroke();
    }

    // TODO: should this be accounting for this.timeline.yearXOffset?
    drawInfo(infoLayout) {
      const ctx = this.timeline.canvas.context;
      ctx.beginPath();
      // line properties
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.timeline.style.infoLineWidth;
      // text properties -- font is already set by Timeline.drawEvents method
      ctx.fillStyle = this.timeline.style.infoFontColor;
      // TODO: look at effects of changing this
      ctx.textBaseline = 'bottom';
      ctx.textAlign = infoLayout.alignment;
      ctx.lineJoin = 'round';
      infoLayout.lineArr.forEach((line, lineIndex, lineArr) => {
        ctx.fillText(
          line,
          infoLayout.xCoord,
          infoLayout.underlineY
            - this.timeline.style.infoUnderlineOffset
            - (infoLayout.lineHeight * (lineArr.length - 1 - lineIndex)),
        );
      });
      // TODO: clean this up; lots of repeat property accesses
      let infoLineStartY = this.timeline.yearsYCoords[
        this.startYear + this.timeline.style.infoYOffset
      ];
      if (this.endYear - this.startYear <= this.timeline.style.infoYOffset) {
        infoLineStartY = Math.floor(
          (this.timeline.yearsYCoords[this.startYear]
            + this.timeline.yearsYCoords[this.endYear])
          / 2
        );
      }

      ctx.moveTo(this.xCoord, infoLineStartY);
      ctx.lineTo(
        infoLayout.xCoord,
        infoLayout.underlineY
      );
      ctx.lineTo(
        infoLayout.underlineX,
        infoLayout.underlineY
      );
      ctx.stroke();
    }

    formatInfoLayout() {
      const infoLayout = {
          lineArr: [],
          lineHeight: this.timeline.style.infoLineHeight,
          underlineY: this.timeline.yearsYCoords[this.startYear],
        },
        infoWords = this.info.split(' '),
        lineWidths = [];

      let infoMaxWidth,
        currentLine = infoWords[0],
        currentLineWidth = this.timeline.canvas.context.measureText(infoWords[0]).width;

      if (this.xCoord >= this.timeline.centerXCoord) {
        // place info to right of event line
        infoLayout.xCoord = this.timeline.infoRightXCoord;
        infoLayout.alignment = 'left';
        infoMaxWidth = this.timeline.currentWidth - infoLayout.xCoord - this.timeline.yearXOffset;
      } else {
        // place info to left of event line
        infoLayout.xCoord = this.timeline.infoLeftXCoord;
        infoLayout.alignment = 'right';
        infoMaxWidth = infoLayout.xCoord;
      }

      // wrap info text by iteratively adding words to each line until its
      // length exceeds infoMaxWidth, then start a new one
      infoWords.slice(1).forEach((nextWord) => {
        const withNextWord = `${currentLine} ${nextWord}`,
          widthWithNextWord = this.timeline.canvas.context.measureText(withNextWord).width;
        // always split on comma regardless of current line length
        if (widthWithNextWord > infoMaxWidth || currentLine.endsWith(',')) {
          infoLayout.lineArr.push(currentLine);
          lineWidths.push(currentLineWidth);
          currentLine = nextWord;
          currentLineWidth = widthWithNextWord - currentLineWidth;
        } else {
          currentLine = withNextWord;
          currentLineWidth = widthWithNextWord;
        }
      });

      infoLayout.lineArr.push(currentLine);
      lineWidths.push(currentLineWidth);
      // TODO: optimize this -- track running max width above rather than recomputing here
      infoLayout.width = Math.max(...lineWidths);
      // TODO: optimize this -- conditional is redundant with the one above
      if (infoLayout.alignment === 'left') {
        infoLayout.underlineX = infoLayout.xCoord + infoLayout.width;
      } else {
        infoLayout.underlineX = infoLayout.xCoord - infoLayout.width;
      }
      return infoLayout;
    }
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
      this.currentWidth = timelineElement.clientWidth;
      this.currentHeight = timelineElement.clientHeight;
      // start and end years of the timeline
      this.startYear = parseInt(timelineElement.dataset.start, 10);
      this.endYear = parseInt(timelineElement.dataset.end, 10);
      // sets:
      //  - this.canvas:
      //    {element: HTMLCanvasElement, context: CanvasRenderingContext2D}
      //  - this.devicePixelRatio:
      //    window.devicePixelRatio, used to scale canvas for retina displays
      this.initCanvas(timelineElement);
      // sets this.style (Object; see function for full list of field names)
      this.getStyles();
      // sets this.events (Array of TimelineEvents)
      this.parseEvents();
      // sets:
      //  - this.yearXOffset:
      //    used to offset labels from grid lines (approx. 1 character width)
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
      // TODO: Math.round/Math.floor these?
      const ctx = this.canvas.context;
      ctx.font = `${this.style.yearFontSize}px sans-serif`;
      ctx.textBaseline = 'bottom';
      // use 5 digits (4 for year + 1) to get small gap between year and line.
      // all digits are equal width, so this should hopefully work for the next
      // ~8,000 years
      this.yearXOffset = ctx.measureText('00000').width;
      // could also pre-compute this.occupiedGrid here since that doesn't
      // change, but as-is, it's being constructed in loops that would exist
      // anyway, so it doesn't cost much and extracting it to here would just
      // add more operations before the first paint in order to be a tiny bit
      // more efficient in the comparatively uncommon case where someone resizes
      // the screen while the timeline is in view.
    }

    adjustEventInfo(eventsInfoLayouts) {
      // for each event's info:
      //  - get the y-coord of its top
      //    - if its top's y-coord is less than the previous event's underline's
      //      y-coord AND they're on the same side:
      //    - figure out how much the previous event would have to be moved
      //      upward so the current event doesn't overlap AND there's some min.
      //      amount of space between them
      //    - if the prev event CAN be moved up that much without overlapping
      //      the one before IT:
      //      - update its underline's y-coord to the new y-coord
      //     - else:
      //      - instead, move the current event downward until it doesn't
      //        overlap the previous one
      [this.infoLeftXCoord, this.infoRightXCoord].forEach((xCoord) => {
        // deal with vertically adjusting info on left and right separately
        const sameSideInfoLayouts = eventsInfoLayouts.filter((info) => info.xCoord === xCoord);
        // index arg to forEach callback func corresponds to index of previous
        // event (on the same side)'s info because 1st item is `.slice`d off
        sameSideInfoLayouts.slice(1).forEach((eventInfo, prevEventIx) => {
          // get y-coord of top of event info text
          const infoTopY = eventInfo.underlineY
            - this.style.infoUnderlineOffset
            - (this.style.infoLineHeight * eventInfo.lineArr.length),
            // get info data for previous event (on the same side)
            prevEventInfo = sameSideInfoLayouts[prevEventIx];
          // if the top of the current event's info text isn't at least
          // infoMinPaddingY from the bottom of previous event's info text:
          if (infoTopY < prevEventInfo.underlineY + this.style.infoMinPaddingY) {
            // console.log(eventInfo.lineArr);
            // distance the previous event's info would need to be moved upward
            // or the current event's info would need to be moved downward to
            // A) not overlap and B) have infoMinPaddingY space between them
            const toMove = (prevEventInfo.underlineY + this.style.infoMinPaddingY) - infoTopY,
              // y-coord for the top of the previous event's info text
              prevInfoTopY = prevEventInfo.underlineY
                - this.style.infoUnderlineOffset
                - (this.style.infoLineHeight * prevEventInfo.lineArr.length);
            if (
              // if the previous event is the first on that side and can be
              // moved upward without going off the top edge of the canvas...
              (prevEventIx === 0 && prevInfoTopY - toMove >= 0)
              // ...or the previous event *isn't* the first on that side and can
              // be moved upward without overlapping with the one above *that*:
              || (prevEventIx > 0
                  && prevInfoTopY - toMove
                  >= sameSideInfoLayouts[prevEventIx - 1].underlineY + this.style.infoMinPaddingY)
            ) {
              // move the previous event's info text upward
              prevEventInfo.underlineY -= toMove;
            } else {
              // otherwise, move the current event's info text downward the required amount
              eventInfo.underlineY += toMove;
            }
          }
        });
      });
    }

    computeBaseLayout() {
      const topY = this.style.verticalPadding,
        bottomY = this.currentHeight - this.style.verticalPadding,
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
      this.centerXCoord = Math.round((this.currentWidth - this.yearXOffset) / 2);
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
      this.infoLeftXCoord = Math.min(...eventXCoords) - this.style.infoXOffset;
      this.infoRightXCoord = Math.max(...eventXCoords) + this.style.infoXOffset;
    }

    drawBase() {
      // draw horizontal grid lines and year labels
      const ctx = this.canvas.context;
      ctx.beginPath();
      ctx.fillStyle = this.style.yearColor;
      ctx.textAlign = 'right';
      ctx.font = `${this.style.yearFontSize}px sans-serif`;
      ctx.strokeStyle = this.style.gridlineColor;
      ctx.lineWidth = this.style.gridlineWidth;

      Object.entries(this.yearsYCoords).forEach(([yearString, yCoord]) => {
        if (Number.isInteger(Number(yearString))) {
          // TODO: Math.round/Math.floor these?
          ctx.fillText(
            yearString,
            this.currentWidth,
            yCoord + (this.style.yearFontSize / 2)
          );
          ctx.moveTo(0, yCoord);
          // TODO: this.currentWidth instead? Any difference?
          ctx.lineTo(this.currentWidth - this.yearXOffset, yCoord);
        }
      });
      ctx.stroke();

      // // TEST:
      // ctx.beginPath();
      // ctx.strokeStyle = 'red';
      // ctx.lineWidth = '2px';
      // ctx.moveTo(this.currentWidth - this.yearXOffset, 0);
      // ctx.lineTo(this.currentWidth - this.yearXOffset, this.currentHeight);
      // ctx.stroke();
      //
      // // ctx.moveTo(this.centerXCoord, 0);
      // // ctx.lineTo(this.centerXCoord, this.currentHeight);
      // // ctx.stroke();
      // ctx.beginPath();
      // ctx.strokeStyle = 'blue';
      // const center1 = Math.round((this.canvas.element.width - this.yearXOffset) / 2);
      // ctx.moveTo(center1, 0);
      // ctx.lineTo(center1, this.currentHeight);
      // ctx.stroke();
      //
      // ctx.beginPath();
      // ctx.strokeStyle = 'green';
      // const center2 = Math.round(this.canvas.element.width / 2 - this.yearXOffset);
      // ctx.moveTo(center2, 0);
      // ctx.lineTo(center2, this.currentHeight);
      // ctx.stroke();
    }

    drawEvents() {
      // wrapper function that:
      //   - pre-sets the canvas context's font size & style to ensure the
      //     layout is computed properly
      //   - draws each event's line on the timeline
      //   - computes an initial position for each event's info text & callout
      //     line
      //   - adjusts the layout of the events' info to avoid overlap
      //   - draws the events' info to the canvas
      const eventsInfoLayouts = [];
      this.canvas.context.font = `${this.style.infoFontSize}px sans-serif`;
      this.events.forEach((event) => {
        event.drawEventLine();
        eventsInfoLayouts.push(event.computeInfoLayout());
      });
      this.adjustEventInfo(eventsInfoLayouts);
      this.events.forEach((event, ix) => {
        event.drawInfo(eventsInfoLayouts[ix]);
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
        infoFontAlpha = parseInt(compStyles.getPropertyValue('--info-font-alpha'), 10),
        infoFontSize = parseInt(compStyles.getPropertyValue('--info-font-size'), 10);
      this.style = {
        verticalPadding: parseInt(compStyles.getPropertyValue('--vertical-padding'), 10),
        yearFontSize: parseInt(compStyles.getPropertyValue('--year-font-size'), 10),
        gridlineWidth: parseInt(compStyles.getPropertyValue('--gridline-width'), 10),
        eventWidth: parseInt(compStyles.getPropertyValue('--event-width'), 10),
        eventOffset: parseInt(compStyles.getPropertyValue('--event-offset'), 10),
        infoLineWidth: parseInt(compStyles.getPropertyValue('--info-line-width'), 10),
        infoUnderlineOffset: parseInt(compStyles.getPropertyValue('--info-underline-offset'), 10),
        infoXOffset: parseInt(compStyles.getPropertyValue('--info-x-offset'), 10),
        infoYOffset: parseFloat(compStyles.getPropertyValue('--info-y-offset')),
        infoFontSize: infoFontSize,
        infoLineHeight: Math.round(infoFontSize * parseFloat(compStyles.getPropertyValue('--info-line-height'))),
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
  const timelineElement = document.getElementById('timeline');
  if (timelineElement !== null) {
    window.addEventListener('load', () => {
      const timelineObj = new Timeline(timelineElement);
      // window.timeline = timelineObj;
      window.addEventListener('resize', () => timelineObj.onResize());
    });
  }
})();
