const drawBtn = document.querySelector("#drawBtn");
const resetBtn = document.querySelector("#resetBtn");
const rectList = document.querySelector("#rectList");
const drawingCanvas = document.querySelector("#drawingCanvas");

let isDrawing = false;
let startX, startY;
let currentRect;

drawBtn.style.backgroundColor = "red";

resetBtn.addEventListener("click", () => {
  isDrawing = false;
  // console.log("reset-fired");
  document.body.removeChild(currentRect);
});

drawBtn.addEventListener("click", () => {
  drawBtn.style.backgroundColor = "green";
  isDrawing = true;
});

drawBtn.addEventListener("click", (e) => {
  const selectedRect = document.querySelector(".selected");
  if (selectedRect) {
    selectedRect.classList.remove("selected");
  }
  const rectId = e.target.dataset.rectId;
  if (rectId) {
    const rect = document.querySelector(`[data-rect="${rectId}"]`);
    rect.classList.add("selected");
  }
});

drawingCanvas.addEventListener("mousedown", (e) => {
  if (isDrawing) {
    startX = e.clientX;
    startY = e.clientY;
    currentRect = document.createElement("div");
    currentRect.classList.add("rect");
    currentRect.style.left = startX + "px";
    currentRect.style.top = startY + "px";
    // document.body.appendChild(currentRect);
    drawingCanvas.appendChild(currentRect);
  }
});

drawingCanvas.addEventListener("mousemove", (e) => {
  if (currentRect && isDrawing) {
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    currentRect.style.width = deltaX + "px";
    currentRect.style.height = deltaY + "px";
  }
});

drawingCanvas.addEventListener("mouseup", (e) => {
  if (currentRect) {
    drawBtn.style.backgroundColor = "red";
    isDrawing = false;
    const rect = {
      x: parseInt(currentRect.style.left),
      y: parseInt(currentRect.style.top),
      width: parseInt(currentRect.style.width),
      height: parseInt(currentRect.style.height),
    };
    const rectId = Date.now();
    currentRect.setAttribute("data-rect", rectId);
    const rectItem = document.createElement("li");
    rectItem.innerHTML = `Rectangle (${rect.x}, ${rect.y}) - (${
      rect.x + rect.width
    }, ${rect.y + rect.height})`;
    rectItem.setAttribute("data-rect-id", rectId);
    rectList.appendChild(rectItem);
    currentRect = null;
  }
});
