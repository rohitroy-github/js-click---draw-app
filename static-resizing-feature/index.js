"use strict";

// minimimumResizingAllowed
var minWidth = 50;
var minHeight = 25;

//marginWithinWhichCursorChanges
var MARGINS = 10;

// End of what's configurable.
var clicked = null;
var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;

var rightScreenEdge, bottomScreenEdge;

var b, x, y;

var redraw = false;

let rect = document.getElementById("rect");

function setBounds(element, x, y, w, h) {
  element.style.left = x + "px";
  element.style.top = y + "px";
  element.style.width = w + "px";
  element.style.height = h + "px";
}
// Mouse events
rect.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMove);
document.addEventListener("mouseup", onUp);

function canMove() {
  return x > 0 && x < b.width && y > 0 && y < b.height && y < 30;
}

function calc(e) {
  b = rect.getBoundingClientRect();
  x = e.clientX - b.left;
  y = e.clientY - b.top;

  onTopEdge = y < MARGINS;
  onLeftEdge = x < MARGINS;
  onRightEdge = x >= b.width - MARGINS;
  onBottomEdge = y >= b.height - MARGINS;

  rightScreenEdge = window.innerWidth - MARGINS;
  bottomScreenEdge = window.innerHeight - MARGINS;
}

function onMouseDown(e) {
  console.log("mousedown");

  onDown(e);
  e.preventDefault();
}

function onDown(e) {
  calc(e);

  var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;

  clicked = {
    x: x,
    y: y,
    cx: e.clientX,
    cy: e.clientY,
    w: b.width,
    h: b.height,
    isResizing: isResizing,
    isMoving: !isResizing && canMove(),
    onTopEdge: onTopEdge,
    onLeftEdge: onLeftEdge,
    onRightEdge: onRightEdge,
    onBottomEdge: onBottomEdge,
  };
}

var e;

function onMove(ee) {
  // console.log("mousemove");

  calc(ee);

  e = ee;

  redraw = true;
}

function onUp(e) {
  console.log("mouseup");

  calc(e);

  clicked = null;
}

function animate() {
  requestAnimationFrame(animate);

  if (!redraw) return;

  redraw = false;

  if (clicked && clicked.isResizing) {
    if (clicked.onRightEdge) rect.style.width = Math.max(x, minWidth) + "px";
    if (clicked.onBottomEdge) rect.style.height = Math.max(y, minHeight) + "px";

    if (clicked.onLeftEdge) {
      var currentWidth = Math.max(clicked.cx - e.clientX + clicked.w, minWidth);
      if (currentWidth > minWidth) {
        rect.style.width = currentWidth + "px";
        rect.style.left = e.clientX + "px";
      }
    }

    if (clicked.onTopEdge) {
      var currentHeight = Math.max(
        clicked.cy - e.clientY + clicked.h,
        minHeight
      );
      if (currentHeight > minHeight) {
        rect.style.height = currentHeight + "px";
        rect.style.top = e.clientY + "px";
      }
    }

    return;
  }

  // cursorChangesOnEdges/Corners
  if ((onRightEdge && onBottomEdge) || (onLeftEdge && onTopEdge)) {
    rect.style.cursor = "nwse-resize";
  } else if ((onRightEdge && onTopEdge) || (onBottomEdge && onLeftEdge)) {
    rect.style.cursor = "nesw-resize";
  } else if (onRightEdge || onLeftEdge) {
    rect.style.cursor = "ew-resize";
  } else if (onBottomEdge || onTopEdge) {
    rect.style.cursor = "ns-resize";
  } else if (canMove()) {
    rect.style.cursor = "move";
  } else {
    rect.style.cursor = "move";
  }
}

animate();
