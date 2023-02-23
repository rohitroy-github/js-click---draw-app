// Get the parent and child div elements
const parentDiv = document.getElementById("parentDiv");
const childDiv = document.getElementById("childDiv");

// Add an event listener to the child div element for when it is clicked on
childDiv.addEventListener("mousedown", dragStart);

// Set the initial position of the child div element
let initialX;
let initialY;
let currentX;
let currentY;
let xOffset = 0;
let yOffset = 0;
let active = false;

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;

  if (e.target === childDiv) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {
    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, childDiv);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// Add event listeners to the document for when the mouse is moved and released
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);
