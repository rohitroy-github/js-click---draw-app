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

  // startDivElementHere
  // newDivElement = `<div class="html-element" style="width: ${currentX}px; height: ${currentY}px; top: ${initialY}px; left: ${initialX}px;"></div>`;
});

myDiv.addEventListener("mouseup", () => {
  isDragging = false;
});

myDiv.addEventListener("mousemove", (e) => {
  if (isDragging) {
    // console.log(initialX, initialY);
    // console.log(currentX, currentY);

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    // drawHTMLElement();
    // myDiv.style.top = currentY + "px";
    // myDiv.style.left = currentX + "px";

    // updateTheHeightandWidthHere
    newDivElement = `<div class="childElement" id="childElement" style="width: ${currentX}px; height: ${currentY}px; top: ${initialY}px; left: ${initialX}px;"></div>`;
  }
});

drawBtn.addEventListener("click", () => {
  newDivElement = `<div class="childElement" id="childElement" style="width: ${currentX}px; height: ${currentY}px; top: ${initialY}px; left: ${initialX}px;"></div>`;

  myDiv.innerHTML = newDivElement;
});

// function drawRectangle() {
//   console.log(startX, startY);
//   console.log(endX, endY);

//   ctx.beginPath();
//   ctx.rect(startX, startY, endX - startX, endY - startY);
//   ctx.stroke();
// }

// functionToResetCanvas
resetButton.addEventListener("click", () => {
  var childElement = document.getElementById("childElement");

  myDiv.innerHTML = myDiv.innerHTML.replace(childElement.outerHTML, "");
});
