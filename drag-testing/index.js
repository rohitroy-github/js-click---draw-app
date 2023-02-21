let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

let parent = document.querySelector(".parent");
let child = document.createElement("div");
child.classList.add("child");
child.setAttribute("data-rect", "12345");

parent.appendChild(child);

const rectId = 12345;

elementToDrag = document.querySelector(`[data-rect="${rectId}"]`);

elementToDrag.addEventListener("mousedown", dragStart);
elementToDrag.addEventListener("mouseup", dragEnd);
elementToDrag.addEventListener("mousemove", drag);

function dragStart(e) {
  console.log(elementToDrag);
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  if (e.target === elementToDrag) {
    isDragging = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, elementToDrag);
  }
}

function setTranslate(xPos, yPos, element) {
  element.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
