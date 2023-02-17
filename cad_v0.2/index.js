const drawBtn = document.querySelector("#drawBtn");
const resetBtn = document.querySelector("#resetBtn");
const rectList = document.querySelector("#rectList");
const drawingCanvas = document.querySelector("#drawingCanvas");

//deleteBtn
const deleteBtn = document.querySelector("#deleteBtn");

let isDrawing = false;
let allowedToDraw = false;
let startX, startY;
let currentRect;
let rectItem;

let rectIdToBeDeleted;
let rectangleToBeDelete;
// let matchingAttributeElement;

drawBtn.style.backgroundColor = "red";

resetBtn.addEventListener("click", () => {
  isDrawing = false;
  console.log("reset-fired");
  // clearingRectangleData
  rectList.innerHTML = "";
  // clearingDrawingCanvas
  drawingCanvas.innerHTML = "";
});

drawBtn.addEventListener("click", () => {
  if (allowedToDraw) {
    drawBtn.style.backgroundColor = "red";
    allowedToDraw = false;
    isDrawing = false;
  } else {
    drawBtn.style.backgroundColor = "green";
    allowedToDraw = true;
    isDrawing = true;
  }
});

const selectRectangle = (e) => {
  const selectedRect = document.querySelector(".selected");

  if (selectedRect) {
    selectedRect.classList.remove("selected");
  }

  const rectId = e.target.dataset.rectId;

  rectIdToBeDeleted = e.target.dataset.rectId;

  console.log("selected : ", rectId);
  console.log("rectIdToBeDeleted : ", rectIdToBeDeleted);

  //selectRectangleToDelete

  if (rectId) {
    const rect = document.querySelector(`[data-rect="${rectId}"]`);

    rectangleToBeDelete = document.querySelector(`[data-rect="${rectId}"]`);

    rect.classList.add("selected");
  }
};

deleteBtn.addEventListener("click", () => {
  drawingCanvas.removeChild(rectangleToBeDelete);

  const matchingAttributeElement = rectList.querySelector(
    `li[data-rect-id="${rectIdToBeDeleted}"]`
  );

  console.log(matchingAttributeElement);

  rectList.removeChild(matchingAttributeElement);

  console.log("deleted : ", rectIdToBeDeleted);
  // deleteBtn = false;
});

// rectList.addEventListener("click", (e) => {
//   const selectedRect = document.querySelector(".selected");
//   if (selectedRect) {
//     selectedRect.classList.remove("selected");
//   }
//   const rectId = e.target.dataset.rectId;
//   if (rectId) {
//     const rect = document.querySelector(`[data-rect="${rectId}"]`);
//     rect.classList.add("selected");
//   }
// });

rectList.addEventListener("click", (e) => selectRectangle(e));

drawingCanvas.addEventListener("mousedown", (e) => {
  if (isDrawing && allowedToDraw) {
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
  if (currentRect && isDrawing && allowedToDraw) {
    // console.log("e.clientX = " + e.clientX);
    // console.log("e.clientY = " + e.clientY);

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    currentRect.style.width = Math.abs(deltaX) + "px";
    currentRect.style.height = Math.abs(deltaY) + "px";

    if (deltaX < 0) {
      currentRect.style.left = e.clientX + "px";
    }
    if (deltaY < 0) {
      currentRect.style.top = e.clientY + "px";
    }
  }
});

drawingCanvas.addEventListener("mouseup", (e) => {
  if (currentRect && allowedToDraw) {
    // stopDrawing
    // drawBtn.style.backgroundColor = "red";

    // fetchingDivDimentions
    const rect = {
      x: parseInt(currentRect.style.left),
      y: parseInt(currentRect.style.top),
      width: parseInt(currentRect.style.width),
      height: parseInt(currentRect.style.height),
    };

    // printingDivDetails
    const rectId = Date.now();
    currentRect.setAttribute("data-rect", rectId);
    rectItem = document.createElement("li");
    rectItem.innerHTML = `> Rectangle (${rect.x}, ${rect.y}) - (${
      rect.x + rect.width
    }, ${rect.y + rect.height})`;
    rectItem.setAttribute("data-rect-id", rectId);
    rectList.appendChild(rectItem);
    currentRect = null;
  }
});
