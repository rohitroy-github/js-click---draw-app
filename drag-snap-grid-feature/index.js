//code-1

// let parent = document.querySelector(".parent");
// let child = document.querySelector(".child");
// let grid = document.querySelector(".grid");

// let isDragging = false;
// let initialX = 0;
// let initialY = 0;
// let xOffsetDrag = 0;
// let yOffsetDrag = 0;

// child.addEventListener("mousedown", dragStart);
// child.addEventListener("mouseup", dragEnd);
// child.addEventListener("mousemove", drag);

// function dragStart(e) {
//   console.log("dragStart");

//   initialX = e.clientX - xOffsetDrag;
//   initialY = e.clientY - yOffsetDrag;

//   console.log("initialX", initialX);
//   console.log("initialY", initialY);

//   if (e.target === child) {
//     isDragging = true;
//   }
// }

// function dragEnd(e) {
//   console.log("dragEnd");

//   initialX = xOffsetDrag;
//   initialY = yOffsetDrag;

//   isDragging = false;

//   console.log("child.offsetLeft", child.offsetLeft);
//   console.log("child.offsetTop", child.offsetTop);

//   // Snap the child to the nearest grid intersection
//   let gridSize = 100; // adjust as needed
//   let xSnap = Math.round(child.offsetLeft / gridSize) * gridSize;
//   let ySnap = Math.round(child.offsetTop / gridSize) * gridSize;

//   // Snap to the nearest grid line
//   if (
//     Math.abs(child.offsetLeft - xSnap) <
//     Math.abs(child.offsetLeft - (xSnap + gridSize))
//   ) {
//     child.style.left = xSnap + "px";
//   } else {
//     child.style.left = xSnap + gridSize + "px";
//   }

//   if (
//     Math.abs(child.offsetTop - ySnap) <
//     Math.abs(child.offsetTop - (ySnap + gridSize))
//   ) {
//     child.style.top = ySnap + "px";
//   } else {
//     child.style.top = ySnap + gridSize + "px";
//   }
// }

// function drag(e) {
//   // console.log("drag");

//   if (isDragging) {
//     e.preventDefault();

//     let currentX = e.clientX - initialX;
//     let currentY = e.clientY - initialY;

//     xOffsetDrag = currentX;
//     yOffsetDrag = currentY;

//     console.log("xOffsetDrag", xOffsetDrag);
//     console.log("yOffsetDrag", yOffsetDrag);

//     setTranslate(currentX, currentY, child);
//   }
// }

// function setTranslate(xPos, yPos, el) {
//   el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
// }

//code-2

// initlialization
let parent = document.querySelector(".parent");
let child = document.querySelector(".child");
let grid = document.querySelector(".grid");

let isDragging = false;
let initialX;
let initialY;
let xOffsetDrag = 0;
let yOffsetDrag = 0;

// eventListeners
child.addEventListener("mousedown", dragStart);
child.addEventListener("mouseup", dragEnd);
child.addEventListener("mousemove", drag);

// onMosueDown
function dragStart(e) {
  initialX = e.clientX - xOffsetDrag;
  initialY = e.clientY - yOffsetDrag;

  if (e.target === child) {
    isDragging = true;
  }
}

// onMouseUp
function dragEnd(e) {
  initialX = xOffsetDrag;
  initialY = yOffsetDrag;

  isDragging = false;

  // Snap the child to the nearest grid intersection
  let gridSize = 50; // adjust as needed
  let xSnap = Math.round(child.offsetLeft / gridSize) * gridSize;
  let ySnap = Math.round(child.offsetTop / gridSize) * gridSize;

  child.style.left = xSnap + "px";
  child.style.top = ySnap + "px";

  // child.style.transform = `translate(${xSnap}px, ${ySnap}px)`;
}

// onMouseMove
function drag(e) {
  if (isDragging) {
    e.preventDefault();

    let currentX = e.clientX - initialX;
    let currentY = e.clientY - initialY;

    xOffsetDrag = currentX;
    yOffsetDrag = currentY;

    setTranslate(currentX, currentY, child);

    // Snap the child to the nearest grid line
    let gridSize = 50; // adjust as needed
    let xSnap = getNearestGridLine(currentX, gridSize);
    let ySnap = getNearestGridLine(currentY, gridSize);

    // child.style.transform = `translate(${xSnap}px, ${ySnap}px)`;

    setTranslate(xSnap, ySnap, child);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate(" + xPos + "px, " + yPos + "px)";
  // el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

// fetchingNearestGridLine
function getNearestGridLine(pos, gridSize) {
  // Calculate the nearest grid line to the current position
  let snapTo = Math.round(pos / gridSize) * gridSize;
  let distanceToSnapTo = Math.abs(pos - snapTo);
  let distanceToNext = Math.abs(pos - (snapTo + gridSize));
  let distanceToPrev = Math.abs(pos - (snapTo - gridSize));

  if (
    distanceToSnapTo <= distanceToNext &&
    distanceToSnapTo <= distanceToPrev
  ) {
    return snapTo;
  } else if (distanceToNext <= distanceToPrev) {
    return snapTo + gridSize;
  } else {
    return snapTo - gridSize;
  }
}
