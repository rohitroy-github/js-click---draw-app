// Array Remove one occurence of the given entry
Array.prototype.removeEntry = function (entry) {
  var index = this.indexOf(entry);
  if (index !== -1) this.remove(index);
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

/*
    DEBUG
    =====
    
  */

$(".controls").bind("mousedown", function (event) {
  event.stopPropagation();
});
$("#debug").change(function (event) {
  $("html").toggleClass("debug");
  localStorage["alignmentGuidesDebug"] = this.checked;
});

if (localStorage["alignmentGuidesDebug"]) {
  var shouldDebug = JSON.parse(localStorage["alignmentGuidesDebug"]);
  $("#debug").attr("checked", shouldDebug);
  if (shouldDebug) $("html").addClass("debug");
}

/*
    Draw Area
    =========
    
  */

function drawArea(element) {
  this.element = element;
  this.boxes = new Array();
  this.snapTreshhold = 5;
  this.minimumDistance = 10;
  this.offset = this.element.offset();
  this.staticGuides = {
    x: [0, Math.round(this.element.width() / 2), this.element.width()],
    y: [0, Math.round(this.element.height() / 2), this.element.height()],
  };

  key("up, right, down, left", this.handleKey.bind(this));
  this.resetEdges();

  this.element.bind("mousedown", this.startToDraw.bind(this));
  this.element.bind("boxMoveEnd", this.chart.bind(this));
  this.element.bind("boxMoveEnd", this.removeGuides.bind(this));
}

drawArea.prototype = {
  startToDraw: function (event) {
    var box = new Box(this);
    box.start(event);
    this.boxes.push(box);

    $(document).bind("mousemove", box.resize.bind(box));
    $(document).one("mouseup", this.finishDrawing.bind(this));
  },
  finishDrawing: function (event) {
    this.boxes[this.boxes.length - 1].seal();
    $(document).unbind("mousemove");
  },
  handleKey: function (event, handler) {
    if (this.selected) {
      switch (handler.shortcut) {
        case "up":
          this.selected.move(0, -1);
          break;
        case "right":
          this.selected.move(1, 0);
          break;
        case "down":
          this.selected.move(0, 1);
          break;
        case "left":
          this.selected.move(-1, 0);
          break;
      }
    }
  },
  resetEdges: function () {
    // .slice() to only copy them - otherwise a reference would get created
    this.edges = {
      x: this.staticGuides.x.slice(),
      y: this.staticGuides.y.slice(),
    };
  },
  /*
      TODO:
      
      - chart dimensions (width, height)
      
    */
  chart: function () {
    this.resetEdges();
    this.distances = new Object();

    for (var i = 0; i < this.boxes.length; i++) {
      var box = this.boxes[i];
      var interestPoints = box.getInterestPoints();

      // add the interestPoints arrays to the end of the edges array
      // trick from http://stackoverflow.com/questions/5080028/what-is-the-most-efficient-way-to-concatenate-n-arrays-in-javascript
      this.edges.x.push.apply(this.edges.x, interestPoints.x);
      this.edges.y.push.apply(this.edges.y, interestPoints.y);
    }

    this.chartDistances();

    this.showAllGuides();
  },
  chartDistances: function () {
    for (var i = 0, l = this.boxes.length; i < l; i++) {
      var boxA = this.boxes[i];

      for (var j = 0; j < l; j++) {
        var boxB = this.boxes[j];
        if (i !== j) {
          var distanceX = boxB.left - boxA.right;
          var distanceY = boxB.top - boxA.bottom;

          if (distanceX > this.minimumDistance)
            this.addDistance("x", distanceX, boxA, boxB);

          if (distanceY > this.minimumDistance)
            this.addDistance("y", distanceY, boxA, boxB);
        }
      }
    }
  },
  addDistance: function (axis, distance, boxA, boxB) {
    var start = axis === "x" ? "right" : "bottom";
    var end = axis === "x" ? "left" : "top";

    if (this.distances[distance] === undefined)
      this.distances[distance] = new Array();
    this.distances[distance].push({
      axis: axis,
      boxA: boxA,
      boxB: boxB,
    });
  },
  renderDistance: function (axis, distance, boxA, boxB) {
    var css;

    if (axis === "x") {
      var boxWithSmallerHeight = boxA.height < boxB.height ? boxA : boxB;

      css = {
        top:
          boxWithSmallerHeight.y + Math.round(boxWithSmallerHeight.height / 2),
        left: boxA.right,
        width: distance - 10,
      };
    } else {
      var boxWithSmallerWidth = boxA.width < boxB.width ? boxA : boxB;

      css = {
        top: boxA.bottom,
        left: boxWithSmallerSide.x + Math.round(boxWithSmallerSide.width / 2),
        height: distance - 10,
      };
    }

    this.element.append(
      $('<div class="distance guide">')
        .addClass("axis-" + axis)
        .css(css)
        .append($('<div class="label">').text(distance + "px"))
    );
  },
  drawStaticDistances: function () {
    for (distance in this.distances) {
      for (var i = 0; i < this.distances[distance].length; i++) {
        var gap = this.distances[distance][i];
        this.renderDistance(gap.axis, distance, gap.boxA, gap.boxB);
      }
    }
  },
  removeGuides: function () {
    this.element.find(".guide:not(.static)").remove();
  },
  renderGuide: function (axis, position, additionalClass) {
    var className = "axis-" + axis;
    if (additionalClass) className += " " + additionalClass;

    this.element.append(
      $('<div class="guide">')
        .addClass(className)
        .css(axis === "x" ? "left" : "top", position)
    );
  },
  showAllGuides: function () {
    this.element.find(".guide.static").remove();
    this.drawStaticGuides("x");
    this.drawStaticGuides("y");
    //this.drawStaticDistances();
  },
  drawStaticGuides: function (axis) {
    for (var i = 0; i < this.edges[axis].length; i++) {
      this.renderGuide(axis, this.edges[axis][i], "static");
    }
  },
  remove: function (box) {
    for (var i = 0; i < this.boxes.length; i++) {
      if (this.boxes[i].is(box)) {
        box.element.remove();
        this.boxes.remove(i);
      }
    }
  },
  select: function (box) {
    if (this.selected) {
      this.selected.element.removeClass("selected");
    }
    this.selected = box;
    this.selected.element.addClass("selected");
  },
};

function Box(parent) {
  this.parent = parent;
  this.x = 0;
  this.y = 0;
  this.minSize = 10;

  this.element = $('<div class="box">');
}

Box.prototype = {
  start: function (event) {
    this.x = this.startX = event.pageX - this.parent.offset.left;
    this.y = this.startY = event.pageY - this.parent.offset.top;

    this.parent.element.append(this.element);

    this.parent.select(this);
    this.resize(event);
  },
  resize: function (event) {
    var mouseX = event.pageX - this.parent.offset.left;
    var mouseY = event.pageY - this.parent.offset.top;

    this.width = Math.abs(mouseX - this.startX);
    this.height = Math.abs(mouseY - this.startY);

    if (mouseX < this.startX) this.x = mouseX;
    else this.x = this.startX;

    if (mouseY < this.startY) this.y = mouseY;
    else this.y = this.startY;

    // lock width/height ratio to 1:1 on SHIFT key
    if (event.shiftKey) {
      if (this.height < this.width) this.width = this.height;
      else this.height = this.width;
    }

    // resize from the center of the box
    if (event.altKey) {
      this.x -= this.width;
      this.y -= this.height;
      this.width *= 2;
      this.height *= 2;
    }

    this.snapToGuides({resize: true});

    this.redraw();
  },
  seal: function () {
    if (this.width > this.minSize || this.height > this.minSize) {
      this.element.bind("mousedown", this.startToDrag.bind(this));
      this.parent.element.trigger("boxMoveEnd");
    } else {
      this.parent.remove(this);
    }
  },
  is: function (box) {
    return (
      this.x === box.x &&
      this.y === box.y &&
      this.width === box.width &&
      this.height === box.height
    );
  },
  move: function (x, y) {
    this.x += x;
    this.y += y;
    this.redraw();
  },
  redraw: function () {
    this.element.css({
      left: this.x,
      top: this.y,
      width: this.width,
      height: this.height,
    });
  },
  startToDrag: function (event) {
    event.stopPropagation();
    this.mouseOffsetX = event.pageX - this.element.offset().left;
    this.mouseOffsetY = event.pageY - this.element.offset().top;

    this.startX = this.x + this.mouseOffsetX;
    this.startY = this.y + this.mouseOffsetY;

    $(document).bind("mousemove", this.drag.bind(this));
    $(document).bind("mousemove", this.drag.bind(this));
    $(document).bind("mouseup", this.stopToDrag.bind(this));

    this.excludeBoxformEdges();
    this.excludeBoxFromDistances();
    this.parent.showAllGuides();

    this.parent.select(this);
    this.drag(event);
  },
  drag: function (event) {
    this.x = event.pageX - this.parent.offset.left - this.mouseOffsetX;
    this.y = event.pageY - this.parent.offset.top - this.mouseOffsetY;

    // lock one axis
    if (event.shiftKey) {
      if (!this.lockedAxis) {
        var relativeX = this.x - this.startX;
        var relativeY = this.y - this.startY;
        var absX = Math.abs(relativeX);
        var absY = Math.abs(relativeY);
        if (relativeY >= absX || relativeY <= -absX) {
          // vertical lock
          this.lockedAxis = "x";
        } else if (relativeX > absY || relativeX < -absY) {
          // horizontal lock
          this.lockedAxis = "y";
        }
      }
    } else {
      this.lockedAxis = null;
    }

    if (this.lockedAxis === "x") this.x = this.startX - this.mouseOffsetX;
    if (this.lockedAxis === "y") this.y = this.startY - this.mouseOffsetY;

    this.snapToGuides();

    this.redraw();
  },
  stopToDrag: function (event) {
    $(document).unbind("mousemove");
    this.parent.element.trigger("boxMoveEnd");
    this.lockedAxis = null;
  },
  snapToGuides: function (options) {
    var resize = options ? options.resize : false;
    this.parent.removeGuides();
    this.snap({resize: resize, axis: "x"});
    this.snap({resize: resize, axis: "y"});
    this.snapToDistances(options);
  },
  excludeBoxFromDistances: function () {
    for (distance in this.parent.distances) {
      var gaps = this.parent.distances[distance];

      for (var i = 0; i < gaps.length; i++) {
        var gap = gaps[i];
        if (this.is(gap.boxA) || this.is(gap.boxB)) gaps.remove(i--);
      }

      if (gaps.length === 0) delete this.parent.distances[distance];
    }
  },
  excludeBoxformEdges: function () {
    this.parent.edges.x.removeEntry(this.x);
    this.parent.edges.x.removeEntry(this.x + Math.round(this.width / 2));
    this.parent.edges.x.removeEntry(this.right);

    this.parent.edges.y.removeEntry(this.y);
    this.parent.edges.y.removeEntry(this.y + Math.round(this.height / 2));
    this.parent.edges.y.removeEntry(this.bottom);
  },
  snapToDistances: function (options) {},
  /*
      TODO: 
        - snap to same distances
          -> aka meassure the distance to every interest point and 
             from every interest point to another (this can be done before) 
             and compare if some are the same and also visualy highlight all of them
        - respect 1:1 ratio
    */
  snap: function (options) {
    var axis = options.axis;
    var side = axis === "x" ? "width" : "height";
    var start = axis === "x" ? "left" : "top";
    var end = axis === "x" ? "right" : "bottom";

    for (var i = 0; i < this.parent.edges[axis].length; i++) {
      var position = this.parent.edges[axis][i];
      var distance = this[axis];
      var halfSideLength = Math.abs(this[side] / 2);
      var center = distance + halfSideLength;
      var endDistance = distance + this[side];
      var setGuide = false;

      if (Math.abs(distance - position) <= this.parent.snapTreshhold) {
        this[axis] = position;
        setGuide = true;
      } else if (Math.abs(center - position) <= this.parent.snapTreshhold) {
        if (options.resize)
          this[side] = Math.round(Math.abs(position - distance) * 2);
        // resize snap behavior
        else this[axis] = position - halfSideLength; // move snap behavior
        setGuide = true;
      } else if (
        Math.abs(endDistance - position) <= this.parent.snapTreshhold
      ) {
        if (options.resize)
          this[side] = Math.abs(position - distance); // resize snap behavior
        else this[axis] = position - this[side]; // move snap behavior
        setGuide = true;
      }

      if (setGuide) this.parent.renderGuide(axis, position);
    }
  },
  getInterestPoints: function () {
    return {
      x: [this.x, this.x + Math.round(this.width / 2), this.right],
      y: [this.y, this.y + Math.round(this.height / 2), this.bottom],
    };
  },

  /* getters and setters for easier to read values (top, right, bottom, left instead left+width etc.) */
  get top() {
    return this.y;
  },
  set top(value) {
    this.y = value;
  },

  get right() {
    return this.x + this.width;
  },
  set right(value) {
    this.width = value - this.x;
  },

  get bottom() {
    return this.y + this.height;
  },
  set bottom(value) {
    this.height = value - this.y;
  },

  get left() {
    return this.x;
  },
  set left(value) {
    this.x = value;
  },
};

area = new drawArea($(".container"));
