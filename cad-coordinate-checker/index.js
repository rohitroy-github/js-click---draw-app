const resetButton = document.getElementById("resetButton");

const myDiv = document.getElementById("myDiv");
const drawBtn = document.getElementById("draw-btn");

const xCoordinateInitialValue = document.getElementById(
  "xCoordinateInitialValue"
);
const yCoordinateInitialValue = document.getElementById(
  "yCoordinateInitialValue"
);
const xCoordinateFinalValue = document.getElementById("xCoordinateFinalValue");
const yCoordinateFinalValue = document.getElementById("yCoordinateFinalValue");

let htmlElement;

let isDragging = false;
let currentX, currentY, initialX, initialY;

let newDivElement;

myDiv.addEventListener("mousedown", (e) => {
  isDragging = true;
  initialX = e.clientX - myDiv.offsetLeft;
  initialY = e.clientY - myDiv.offsetTop;
});

myDiv.addEventListener("mouseup", () => {
  isDragging = false;
});

myDiv.addEventListener("mousemove", (e) => {
  if (isDragging) {
    console.log(initialX, initialY);
    console.log(currentX, currentY);

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    // drawHTMLElement();
    // myDiv.style.top = currentY + "px";
    // myDiv.style.left = currentX + "px";
  }
});

drawBtn.addEventListener("click", () => {
  drawHTMLElement();
  xCoordinateInitialValue.innerHTML = `Inital X-Coordinate : ${initialX}`;
  yCoordinateInitialValue.innerHTML = `Inital Y-Coordinate : ${initialY}`;
  xCoordinateFinalValue.innerHTML = `Final Y-Coordinate : ${currentX}`;
  yCoordinateFinalValue.innerHTML = `Final Y-Coordinate : ${currentY}`;
});

function clearCanvas() {
  currentX = 0;
  currentY = 0;
  initialX = 0;
  initialY = 0;
  myDiv.removeChild(htmlElement);
}

function drawHTMLElement() {
  newDivElement = `<div id="htmlElement" class="htmlElement" style="width: ${currentX}px; height: ${currentY}px; top: ${initialY}px; left: ${initialX}px;"></div>`;
  htmlElement = document.getElementById("htmlElement");
  myDiv.innerHTML = newDivElement;
}

// function drawRectangle() {
//   console.log(startX, startY);
//   console.log(endX, endY);

//   ctx.beginPath();
//   ctx.rect(startX, startY, endX - startX, endY - startY);
//   ctx.stroke();
// }

resetButton.addEventListener("click", () => {
  clearCanvas();
});
