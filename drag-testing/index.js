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

child.addEventListener("mousedown", dragStart);
child.addEventListener("mouseup", dragEnd);
child.addEventListener("mousemove", drag);

function dragStart(e) {
  console.log(child);
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  if (e.target === child) {
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

    setTranslate(currentX, currentY, child);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
