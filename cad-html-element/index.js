const resetButton = document.getElementById("resetButton");

const myDiv = document.getElementById("myDiv");
const drawBtn = document.getElementById("draw-btn");

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
  newDivElement = `<div class="html-element" style="width: ${currentX}px; height: ${currentY}px;"></div>`;
  myDiv.innerHTML = newDivElement;
});

function clearCanvas() {
  currentX = 0;
  currentY = 0;
  initialX = 0;
  initialY = 0;
  drawHTMLElement();
}

// function drawRectangle() {
//   console.log(startX, startY);
//   console.log(endX, endY);

//   ctx.beginPath();
//   ctx.rect(startX, startY, endX - startX, endY - startY);
//   ctx.stroke();
// }

// resetButton.addEventListener("click", () => {
//   canvas.width = canvas.width;
//   canvas.classList.remove("rectangle");
// });
