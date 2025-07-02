/* eslint-disable max-classes-per-file */
'use strict';

(() => {
  /*
  ========================================
  =         TIMELINE EVENT CLASS         =
  ========================================
  */
  class TimelineEvent {
    constructor(eventListItem, timeline) {
      // reference to owner class
      this.timeline = timeline;
      // start and end years (+ increments) of the timeline
      this.startYear = parseFloat(eventListItem.dataset.start);
      const endYear = eventListItem.dataset.end;
      this.endYear = endYear === 'present' ? endYear : parseFloat(endYear);
      this.group = eventListItem.dataset.group;
      this.color = getComputedStyle(this.timeline.timelineElement).getPropertyValue(`--group-${this.group}`).trim();
      this.backgroundColor = colorToRGBA(this.color, timeline.style.infoBackgroundAlpha);
      this.info = eventListItem.innerText.trim();
      // x-coordinate of column where event will be drawn
      this.xCoord = null;
    }

    computeInfoLayout() {
      const { canvas: { context: ctx }, style, yearsYCoords } = this.timeline,
            infoLayout = { lineArr: [], bottomY: yearsYCoords[this.startYear] },
            infoWords = this.info.split(' '),
            lineWidths = [];

      let maxTextWidth,
          currentLine = infoWords[0],
          currentLineWidth = ctx.measureText(infoWords[0]).width;

      if (this.xCoord >= this.timeline.centerXCoord) {
        // place info to right of event line
        infoLayout.lineXDest = this.timeline.infoRightXCoord;
        maxTextWidth = this.timeline.currentWidth
                       - infoLayout.lineXDest
                       - this.timeline.yearXOffset;
      } else {
        // place info to left of event line
        infoLayout.lineXDest = this.timeline.infoLeftXCoord;
        maxTextWidth = infoLayout.lineXDest;
      }
      // account for padding between info text and edge of background
      maxTextWidth -= style.infoBackgroundPadding * 2;

      // wrap info text by iteratively adding words to each line until its
      // length exceeds `maxTextWidth`, then starting a new one
      infoWords.slice(1).forEach((nextWord) => {
        const withNextWord = `${currentLine} ${nextWord}`,
              widthWithNextWord = ctx.measureText(withNextWord).width;
        // always split on comma regardless of current line length
        if (widthWithNextWord > maxTextWidth || currentLine.endsWith(',')) {
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
      infoLayout.width = Math.max(...lineWidths) + style.infoBackgroundPadding * 2;
      infoLayout.height = style.infoLineHeight * infoLayout.lineArr.length
                          + style.infoBackgroundPadding * 2;
      return infoLayout;
    }

    drawEventLine() {
      const {
        canvas: { context: ctx },
        style: { eventWidth },
        yearsYCoords,
      } = this.timeline;

      ctx.beginPath();
      ctx.lineWidth = eventWidth;
      // rounded caps have a radius of 1/2 the line's width and add that much
      // additional length to the line
      ctx.lineCap = 'round';
      ctx.moveTo(this.xCoord, yearsYCoords[this.startYear] + (eventWidth / 2));

      if (this.endYear === 'present') {
        const gradient = ctx.createLinearGradient(
          this.xCoord,
          yearsYCoords[this.startYear],
          this.xCoord,
          this.timeline.currentHeight,
        );
        gradient.addColorStop(0.25, this.color);
        gradient.addColorStop(1, this.timeline.style.backgroundColor);
        ctx.strokeStyle = gradient;
        ctx.lineTo(this.xCoord, this.timeline.currentHeight);
      } else {
        ctx.strokeStyle = this.color;
        ctx.lineTo(this.xCoord, yearsYCoords[this.endYear] - (eventWidth / 2));
      }
      ctx.stroke();
    }

    drawInfo(infoLayout) {
      const {
        canvas: { context: ctx },
        style,
        yearsYCoords,
        centerXCoord,
      } = this.timeline;

      let { lineXDest, bottomY: lineYDest } = infoLayout,
          xLeft = lineXDest,
          lineYStart = yearsYCoords[this.startYear + style.infoYOffset];

      if (this.xCoord >= centerXCoord) {
        // info is on right side of event line
        lineXDest += style.infoBackgroundRadius / 2;
      } else {
        // info is on left side of event line
        lineXDest -= style.infoBackgroundRadius / 2;
        xLeft -= infoLayout.width;
      }

      if (this.endYear !== 'present' && this.endYear - this.startYear <= style.infoYOffset) {
        lineYStart = Math.round(
          (this.timeline.yearsYCoords[this.startYear] + this.timeline.yearsYCoords[this.endYear]) / 2,
        );
      }

      if (infoLayout.bottomY < lineYStart) {
        // connecting to bottom corner of background
        lineYDest -= style.infoBackgroundRadius / 2;
      } else if (infoLayout.bottomY - infoLayout.height > lineYStart) {
        // connecting to top corner of background
        lineYDest -= infoLayout.height - style.infoBackgroundRadius / 2;
      } else {
        // connecting to middle of background
        lineYDest -= infoLayout.height / 2;
        // lineXDest = infoLayout.lineXDest;
      }

      // line properties
      ctx.strokeStyle = colorToRGBA(this.color, style.infoLineAlpha);
      ctx.lineWidth = style.infoLineWidth;

      // draw reference line first
      ctx.beginPath();
      ctx.moveTo(this.xCoord, lineYStart);
      ctx.lineTo(Math.round(lineXDest), Math.round(lineYDest));
      ctx.stroke();

      // functionally similar to ctx.clearRect, but accounts for rounded corners
      ctx.fillStyle = style.backgroundColor;
      roundedRect(
        ctx,
        xLeft,
        infoLayout.bottomY - infoLayout.height,
        infoLayout.width,
        infoLayout.height,
        style.infoBackgroundRadius,
      );
      // draw background
      ctx.fillStyle = this.backgroundColor;
      roundedRect(
        ctx,
        xLeft,
        infoLayout.bottomY - infoLayout.height,
        infoLayout.width,
        infoLayout.height,
        style.infoBackgroundRadius,
      );

      ctx.beginPath();
      ctx.font = `${style.infoFontSize}px sans-serif`;
      ctx.fillStyle = style.infoFontColor;
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'left';
      ctx.lineJoin = 'round';
      infoLayout.lineArr.forEach((line, lineIndex, lineArr) => {
        ctx.fillText(
          line,
          xLeft + style.infoBackgroundPadding,
          infoLayout.bottomY
            - style.infoBackgroundPadding
            - (style.infoLineHeight * (lineArr.length - 1 - lineIndex)),
        );
        if (line.endsWith(',')) {
          ctx.font = `italic ${style.infoFontSize}px sans-serif`;
        }
      });
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
      // start and end years of the timeline
      this.startYear = parseInt(timelineElement.dataset.start, 10);
      this.endYear = parseInt(timelineElement.dataset.end, 10);
      // hover state management
      this.currentHoveredGroup = null;
      this.isHovering = false;
      this.hoverInteractionsEnabled = false;
      // hover debouncing
      this.hoverDebounceTimer = null;
      // transition state management
      this.transitionStartTime = null;
      this.isTransitioning = false;
      this.eventOpacities = new Map(); // event -> current opacity
      this.targetOpacities = new Map(); // event -> target opacity
      // sets:
      //  - this.canvas:
      //    {element: HTMLCanvasElement, context: CanvasRenderingContext2D}
      //  - this.currentWidth:
      //    current width of both `this.timelineElement` & `this.canvas.element`
      //  - this.currentHeight:
      //    current height of both `this.timelineElement` & `this.canvas.element`
      this.initCanvas();
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
      // initialize opacity system
      this.initializeOpacitySystem();
      // set up hover interactions
      this.setupHoverInteractions();
    }

    initializeOpacitySystem() {
      // Initialize all events with full opacity
      this.events.forEach((event) => {
        this.eventOpacities.set(event, 1.0);
        this.targetOpacities.set(event, 1.0);
      });
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
      [this.infoLeftXCoord, this.infoRightXCoord].forEach((lineXDest) => {
        // deal with vertically adjusting info on left and right separately
        const sameSideInfoLayouts = eventsInfoLayouts.filter((info) => info.lineXDest === lineXDest);
        // index arg to forEach callback func corresponds to index of previous
        // event (on the same side)'s info because 1st item is `.slice`d off
        sameSideInfoLayouts.slice(1).forEach((eventInfo, prevEventIx) => {
          // get y-coord of top of event info text
          const infoTopY = eventInfo.bottomY - eventInfo.height,
            // get info data for previous event (on the same side)
                prevEventInfo = sameSideInfoLayouts[prevEventIx];
          // if the top of the current event's info text isn't at least
          // infoMinPaddingY from the bottom of previous event's info text:
          if (infoTopY < prevEventInfo.bottomY + this.style.infoMinPaddingY) {
            // distance the previous event's info would need to be moved upward
            // or the current event's info would need to be moved downward to
            // A) not overlap and B) have infoMinPaddingY space between them
            const toMove = (prevEventInfo.bottomY + this.style.infoMinPaddingY) - infoTopY;
            // if the previous event is the first on that side, the most it can
            // be moved upward is the distance from the top of its background to
            // the top of the canvas (y=0), which is equal to its top y-coord
            let prevInfoCanMove = prevEventInfo.bottomY - prevEventInfo.height;
            if (prevEventIx > 0) {
              // if the previous event *isn't* the first on that side, the most
              // it can be moved upward is the distance from the top of its info
              // text to the bottom of the previous event's info text, minus the
              // min. required vertical space between them
              prevInfoCanMove -= sameSideInfoLayouts[prevEventIx - 1].bottomY
                                 + this.style.infoMinPaddingY;
            }
            if (prevInfoCanMove >= toMove) {
              // if the previous event's info can be moved upward the full
              // amount needed, do so
              prevEventInfo.bottomY -= toMove;
            } else {
              // otherwise, move the previous event's info upward as much as
              // possible, and move the current event's info downward to make up
              // the difference
              prevEventInfo.bottomY -= prevInfoCanMove;
              // eslint-disable-next-line no-param-reassign
              eventInfo.bottomY += toMove - prevInfoCanMove;
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

      for (let year = this.startYear, yearY = topY; year <= this.endYear; year += 0.25, yearY += yInc) {
        yearsYCoords[year] = Math.floor(yearY);
        occupiedGrid[year] = Array(this.events.length).fill(0);
      }
      this.yearsYCoords = yearsYCoords;
      this.occupiedGrid = occupiedGrid;
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
        const firstOpenCol = this.occupiedGrid[event.startYear].indexOf(0),
              // get the x-coordinate of the column where the event should be drawn
              xCoord = eventColXCoords[firstOpenCol];

        // eslint-disable-next-line no-param-reassign
        event.xCoord = xCoord;
        eventXCoords.push(xCoord);
        // mark that column as occupied for the duration of the event
        let { endYear } = event;
        if (endYear === 'present') {
          endYear = this.endYear;
        }
        for (let year = event.startYear; year < endYear; year += 0.25) {
          this.occupiedGrid[year][firstOpenCol] = 1;
        }
      });

      // // adjust center to be between center two columns when even number is used
      // const nColumnsUsed = new Set(eventXCoords).size;
      // if (nColumnsUsed % 2 === 0) {
      //   const centerAdjust = Math.round((this.style.eventWidth + this.style.eventOffset) / 2);
      //   this.centerXCoord -= centerAdjust;
      //   for (let ix = 0; ix < eventXCoords.length; ix++) {
      //     eventXCoords[ix] -= centerAdjust;
      //     this.events[ix].xCoord -= centerAdjust;
      //   }
      // }

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
          ctx.fillText(
            yearString,
            this.currentWidth,
            Math.round(yCoord + (this.style.yearFontSize / 2)),
          );
          ctx.moveTo(0, yCoord);
          ctx.lineTo(this.currentWidth - this.yearXOffset, yCoord);
        }
      });
      ctx.stroke();
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
        const layout = event.computeInfoLayout();
        eventsInfoLayouts.push(layout);
        // Store layout on event for hit detection
        // eslint-disable-next-line no-param-reassign
        event.infoLayout = layout;
      });
      this.adjustEventInfo(eventsInfoLayouts);
      this.events.forEach((event, ix) => {
        event.drawInfo(eventsInfoLayouts[ix]);
        event.drawEventLine();
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
        eventHoverMargin: parseInt(compStyles.getPropertyValue('--event-hover-margin'), 10),
        infoLineWidth: parseInt(compStyles.getPropertyValue('--info-line-width'), 10),
        infoLineAlpha: parseFloat(compStyles.getPropertyValue('--info-line-alpha')),
        infoXOffset: parseInt(compStyles.getPropertyValue('--info-x-offset'), 10),
        infoYOffset: parseFloat(compStyles.getPropertyValue('--info-y-offset')),
        infoMinPaddingY: parseInt(compStyles.getPropertyValue('--info-min-padding-y'), 10),
        infoFontSize,
        infoLineHeight: Math.round(infoFontSize * parseFloat(compStyles.getPropertyValue('--info-line-height'))),
        infoBackgroundPadding: parseInt(compStyles.getPropertyValue('--info-background-padding'), 10),
        infoBackgroundRadius: parseInt(compStyles.getPropertyValue('--info-background-radius'), 10),
        infoBackgroundAlpha: parseFloat(compStyles.getPropertyValue('--info-background-alpha')),
        backgroundColor: colorToRGBA(backgroundColor, backgroundAlpha),
        yearColor: colorToRGBA(yearColor, yearAlpha),
        gridlineColor: colorToRGBA(gridlineColor, gridlineAlpha),
        infoFontColor: colorToRGBA(infoFontColor, infoFontAlpha),
        eventHoverOpacity: parseFloat(compStyles.getPropertyValue('--event-dimmed-opacity')),
        transitionDuration: parseFloat(compStyles.getPropertyValue('--transition-duration')),
        hoverDebounceDelay: parseFloat(compStyles.getPropertyValue('--hover-debounce-delay')),
      };
    }

    initCanvas() {
      // create canvas element and push it to the DOM as a child of the target
      // element
      const canvasElement = document.createElement('canvas'),
            context = canvasElement.getContext('2d');

      // since the containing
      this.currentWidth = this.timelineElement.clientWidth;
      this.currentHeight = this.timelineElement.clientHeight;

      canvasElement.className = 'timeline-canvas-el';
      canvasElement.width = this.currentWidth * devicePixelRatio;
      canvasElement.height = this.currentHeight * devicePixelRatio;

      context.scale(devicePixelRatio, devicePixelRatio);

      canvasElement.style.width = `${this.currentWidth}px`;
      canvasElement.style.height = `${this.currentHeight}px`;

      // style.position (absolute), style.width (100%), & style.height (100%)
      // set in _bio-timeline.scss; no need to set here
      this.timelineElement.appendChild(canvasElement);
      this.canvas = {
        element: canvasElement,
        context,
      };
    }

    onResize() {
      const newWidth = this.timelineElement.clientWidth,
            newHeight = this.timelineElement.clientHeight;

      if (newWidth !== this.currentWidth || newHeight !== this.currentHeight) {
        this.canvas.context.clearRect(0, 0, this.currentWidth, this.currentHeight);
        this.canvas.element.width = newWidth * devicePixelRatio;
        this.canvas.element.height = newHeight * devicePixelRatio;
        this.canvas.context.scale(devicePixelRatio, devicePixelRatio);
        this.canvas.element.style.width = `${newWidth}px`;
        this.canvas.element.style.height = `${newHeight}px`;
        this.currentWidth = newWidth;
        this.currentHeight = newHeight;
        this.computeBaseLayout();
        this.computeEventLayout();
        this.drawBase();
        this.drawEvents();
        this.initializeOpacitySystem();

        // Re-setup hover interactions based on current conditions
        this.setupHoverInteractions();
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

    precomputeStaticValues() {
      // compute & cache various values that don't change when resizing canvas
      const ctx = this.canvas.context;
      ctx.font = `${this.style.yearFontSize}px sans-serif`;
      ctx.textBaseline = 'bottom';
      // use 5 digits (4 for year + 1) to get small gap between year and line.
      // all digits are equal width, so this should hopefully work for the next
      // ~8,000 years
      this.yearXOffset = Math.round(ctx.measureText('00000').width);
      // could also pre-compute this.occupiedGrid here since that doesn't
      // change, but as-is, it's being constructed in loops that would exist
      // anyway, so it doesn't cost much and extracting it to here would just
      // add more operations before the first paint in order to be a tiny bit
      // more efficient in the comparatively uncommon case where someone resizes
      // the screen while the timeline is in view.
    }

    // eslint-disable-next-line class-methods-use-this
    shouldEnableHoverInteractions() {
      // Check if hover interactions should be enabled:
      // 1. Screen width >= 992px (breakpoint below which bio & timeline aren't in viewport at the same time)
      // 2. Device supports hover (non-touchscreen)
      return window.innerWidth >= 992 && window.matchMedia('(hover: hover)').matches;
    }

    removeHoverInteractions() {
      // Clear any pending debounce timer
      if (this.hoverDebounceTimer) {
        clearTimeout(this.hoverDebounceTimer);
        this.hoverDebounceTimer = null;
      }

      // Remove bio element event listeners
      if (this.hoverEventListeners) {
        this.hoverEventListeners.forEach((handlers, element) => {
          element.removeEventListener('mouseenter', handlers.mouseenter);
          element.removeEventListener('mouseleave', handlers.mouseleave);
        });
        this.hoverEventListeners.clear();
      }

      // Remove canvas event listeners
      if (this.canvasMousemoveHandler) {
        this.canvas.element.removeEventListener('mousemove', this.canvasMousemoveHandler);
        this.canvasMousemoveHandler = null;
      }
      if (this.canvasMouseleaveHandler) {
        this.canvas.element.removeEventListener('mouseleave', this.canvasMouseleaveHandler);
        this.canvasMouseleaveHandler = null;
      }

      this.hoverInteractionsEnabled = false;

      // Clear any active dimming when disabling hover interactions
      this.clearDimming();
    }

    setupHoverInteractions() {
      // Clear any existing hover interactions first
      this.removeHoverInteractions();

      // Only set up hover interactions if conditions are met
      if (!this.shouldEnableHoverInteractions()) {
        return;
      }

      // Set up bio text and image hover interactions
      const bioTexts = document.querySelectorAll('.bio-text'),
            bioImages = document.querySelectorAll('.bio-img');

      // Store event listeners for later removal
      this.hoverEventListeners = new Map();

      // Add hover listeners to bio text elements
      bioTexts.forEach((textElement) => {
        const groupMatch = textElement.className.match(/bio-text-group-([\w-]+)/);
        if (groupMatch) {
          const group = groupMatch[1],
                mouseenterHandler = () => this.handleBioHoverEnter(group),
                mouseleaveHandler = () => this.handleBioHoverLeave();

          textElement.addEventListener('mouseenter', mouseenterHandler);
          textElement.addEventListener('mouseleave', mouseleaveHandler);

          // Store handlers for later removal
          this.hoverEventListeners.set(textElement, {
            mouseenter: mouseenterHandler,
            mouseleave: mouseleaveHandler,
          });
        }
      });

      // Add hover listeners to bio image elements
      bioImages.forEach((imageElement) => {
        const groupMatch = imageElement.className.match(/bio-img-group-([\w-]+)/);
        if (groupMatch) {
          const group = groupMatch[1],
                mouseenterHandler = () => this.handleBioHoverEnter(group),
                mouseleaveHandler = () => this.handleBioHoverLeave();

          imageElement.addEventListener('mouseenter', mouseenterHandler);
          imageElement.addEventListener('mouseleave', mouseleaveHandler);

          // Store handlers for later removal
          this.hoverEventListeners.set(imageElement, {
            mouseenter: mouseenterHandler,
            mouseleave: mouseleaveHandler,
          });
        }
      });

      // Set up timeline canvas hover interactions
      this.canvasMousemoveHandler = (e) => this.handleTimelineHover(e);
      this.canvasMouseleaveHandler = () => this.handleBioHoverLeave();

      this.canvas.element.addEventListener('mousemove', this.canvasMousemoveHandler);
      this.canvas.element.addEventListener('mouseleave', this.canvasMouseleaveHandler);
      this.hoverInteractionsEnabled = true;
    }

    handleBioHoverEnter(group) {
      // Cancel any pending hover-out
      if (this.hoverDebounceTimer) {
        clearTimeout(this.hoverDebounceTimer);
        this.hoverDebounceTimer = null;
      }

      // Immediately dim the new group
      this.dimGroup(group);
    }

    handleBioHoverLeave() {
      // Set a timeout before clearing dimming
      this.hoverDebounceTimer = setTimeout(() => {
        this.clearDimming();
        this.hoverDebounceTimer = null;
      }, this.style.hoverDebounceDelay);
    }

    handleTimelineHover(event) {
      const rect = this.canvas.element.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top,
            hoveredEvent = this.getEventAtPosition(x, y);

      if (hoveredEvent) {
        // Cancel any pending hover-out
        if (this.hoverDebounceTimer) {
          clearTimeout(this.hoverDebounceTimer);
          this.hoverDebounceTimer = null;
        }

        if (!this.isHovering || this.currentHoveredGroup !== hoveredEvent.group) {
          this.dimGroup(hoveredEvent.group);
        }
      } else if (this.isHovering) {
        this.handleBioHoverLeave();
      }
    }

    getEventAtPosition(x, y) {
      // Check each event to see if the mouse is over it
      return this.events.find((event) => this.isPositionOverEvent(x, y, event)) || null;
    }

    isPositionOverEvent(x, y, event) {
      const { yearsYCoords, style } = this,
            lineStartY = yearsYCoords[event.startYear],
            lineEndY = event.endYear === 'present' ? this.currentHeight : yearsYCoords[event.endYear];

      // Check if over the event line
      if (Math.abs(x - event.xCoord) <= style.eventWidth / 2 + style.eventHoverMargin
          && y >= lineStartY - style.eventHoverMargin
          && y <= lineEndY + style.eventHoverMargin) {
        return true;
      }

      // Check if over the info text area
      if (event.infoLayout) {
        const { infoLayout } = event;
        let infoLeft = infoLayout.lineXDest;

        if (event.xCoord < this.centerXCoord) {
          // Info is on the left side
          infoLeft -= infoLayout.width;
        }

        const infoTop = infoLayout.bottomY - infoLayout.height,
              infoRight = infoLeft + infoLayout.width,
              infoBottom = infoLayout.bottomY;

        if (x >= infoLeft - style.eventHoverMargin && x <= infoRight + style.eventHoverMargin
            && y >= infoTop - style.eventHoverMargin && y <= infoBottom + style.eventHoverMargin) {
          return true;
        }
      }

      return false;
    }

    dimGroup(activeGroup) {
      // Only proceed if hover interactions are enabled
      if (!this.hoverInteractionsEnabled) {
        return;
      }

      this.currentHoveredGroup = activeGroup;
      this.isHovering = true;

      // Dim bio elements not in the active group
      const bioElements = document.querySelectorAll('.bio-img, .bio-text');
      bioElements.forEach((element) => {
        const hasActiveGroup = element.classList.contains(`bio-img-group-${activeGroup}`)
                            || element.classList.contains(`bio-text-group-${activeGroup}`);

        if (hasActiveGroup) {
          element.classList.remove('dimmed');
        } else {
          element.classList.add('dimmed');
        }
      });

      // Set target opacities for timeline events and start transition
      this.events.forEach((event) => {
        const targetOpacity = event.group === activeGroup ? 1.0 : this.style.eventHoverOpacity;
        this.targetOpacities.set(event, targetOpacity);
      });

      this.startTransition();
    }

    clearDimming() {
      // Always clear dimming state, even if hover interactions are disabled
      this.currentHoveredGroup = null;
      this.isHovering = false;

      // Remove dimming from bio elements
      const bioElements = document.querySelectorAll('.bio-img, .bio-text');
      bioElements.forEach((element) => {
        element.classList.remove('dimmed');
      });

      // Set target opacities for timeline events back to normal and start transition
      this.events.forEach((event) => {
        this.targetOpacities.set(event, 1.0);
      });

      this.startTransition();
    }

    startTransition() {
      // Store initial opacities at the start of transition
      if (!this.initialOpacities) {
        this.initialOpacities = new Map();
      }

      this.events.forEach((event) => {
        const currentOpacity = this.eventOpacities.get(event) || 1.0;
        this.initialOpacities.set(event, currentOpacity);
      });

      this.transitionStartTime = performance.now();
      this.isTransitioning = true;
      this.animateTransition();
    }

    animateTransition() {
      if (!this.isTransitioning) return;

      const elapsed = performance.now() - this.transitionStartTime,
            progress = Math.min(elapsed / this.style.transitionDuration, 1.0);

      // Linear interpolation between initial and target opacities
      this.events.forEach((event) => {
        const initialOpacity = this.initialOpacities.get(event) || 1.0,
              targetOpacity = this.targetOpacities.get(event) || 1.0,
              currentOpacity = initialOpacity + (targetOpacity - initialOpacity) * progress;

        this.eventOpacities.set(event, currentOpacity);
      });

      this.redrawWithTransitions();

      if (progress < 1.0) {
        requestAnimationFrame(() => this.animateTransition());
      } else {
        this.isTransitioning = false;
      }
    }

    redrawWithTransitions() {
      // Clear and redraw the timeline with current opacity values
      this.canvas.context.clearRect(0, 0, this.currentWidth, this.currentHeight);
      this.drawBase();
      this.drawEventsWithTransitions();
    }

    drawEventsWithTransitions() {
      // Similar to drawEvents but with smooth opacity transitions
      const eventsInfoLayouts = [];
      this.canvas.context.font = `${this.style.infoFontSize}px sans-serif`;

      this.events.forEach((event) => {
        const layout = event.computeInfoLayout();
        eventsInfoLayouts.push(layout);
        // Store layout on event for hit detection
        // eslint-disable-next-line no-param-reassign
        event.infoLayout = layout;
      });

      this.adjustEventInfo(eventsInfoLayouts);

      this.events.forEach((event, ix) => {
        const currentOpacity = this.eventOpacities.get(event) || 1.0;

        if (currentOpacity < 1.0) {
          this.canvas.context.globalAlpha = currentOpacity;
        }

        event.drawInfo(eventsInfoLayouts[ix]);
        event.drawEventLine();

        if (currentOpacity < 1.0) {
          this.canvas.context.globalAlpha = 1.0;
        }
      });
    }
  }

  /*
  ========================================
  =           HELPER FUNCTIONS           =
  ========================================
  */
  const colorCache = new Map();

  function colorToRGBA(inputColor, opacity = 1) {
    const cacheKey = `${inputColor}-${opacity}`;
    if (colorCache.has(cacheKey)) {
      return colorCache.get(cacheKey);
    }
    const trimmedColor = inputColor.trim();

    // handle 3- or 6-digit hex colors
    // eslint-disable-next-line one-var
    const hexMatch = trimmedColor.match(/^#([0-9a-f]+)$/i);
    if (hexMatch) {
      let hex = hexMatch[1];
      if (hex.length === 3) {
        hex = hex.split('').map((char) => char + char).join('');
      } else if (hex.length !== 6) {
        throw new Error(`colorToRGBA: Failed to parse color: ${inputColor}`);
      }
      const r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16),
            outputRgba = `rgba(${r},${g},${b},${opacity})`;
      colorCache.set(cacheKey, outputRgba);
      return outputRgba;
    }

    // handle RGB colors
    const rgbMatch = trimmedColor.match(/^rgb\(\s*([^)]+)\s*\)$/i);
    if (rgbMatch) {
      const outputRgba = `rgba(${rgbMatch[1]},${opacity})`;
      colorCache.set(cacheKey, outputRgba);
      return outputRgba;
    }

    // handle RGBA colors
    const rgbaMatch = trimmedColor.match(/^rgba\(((?:\s*[^,]+,){3})(?:[^,)]+)\)$/i);
    if (rgbaMatch) {
      const outputRgba = `rgba(${rgbaMatch[1]},${opacity})`;
      colorCache.set(cacheKey, outputRgba);
      return outputRgba;
    }

    // fall back to using the browser directly to parse colors (named, hls, etc.)
    try {
      const temp = document.createElement('div');
      temp.style.color = trimmedColor;
      document.body.appendChild(temp);
      const rgbOrRgba = getComputedStyle(temp).color;
      document.body.removeChild(temp);

      const rgbOrRgbaMatch = rgbOrRgba.match(
        /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[^)]+)?\s*\)$/i,
      );
      if (!rgbOrRgbaMatch) {
        throw new Error();
      }
      const [, r, g, b] = rgbOrRgbaMatch,
            outputRgba = `rgba(${r},${g},${b},${opacity})`;
      colorCache.set(cacheKey, outputRgba);
      return outputRgba;
    } catch {
      throw new Error(`colorToRGBA: Failed to parse color: ${inputColor}`);
    }
  }

  function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.closePath();
    ctx.fill();
  }

  /*
  ========================================
  =             MAIN SCRIPT              =
  ========================================
  */
  const timelineElement = document.getElementById('timeline');
  if (timelineElement !== null) {
    window.addEventListener('load', () => {
      const timelineObj = new Timeline(timelineElement);
      window.addEventListener('resize', () => timelineObj.onResize());
    });
  }
})();
