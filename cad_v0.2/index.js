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

drawBtn.style.backgroundColor = "red";

// resetButton
resetBtn.addEventListener("click", () => {
  drawBtn.style.backgroundColor = "red";
  allowedToDraw = false;
  isDrawing = false;

  // check
  console.log("reset-fired");

  // clearingRectangleData
  rectList.innerHTML = "";
  // clearingDrawingCanvas
  drawingCanvas.innerHTML = "";
});

// deleteButton
deleteBtn.addEventListener("click", () => {
  // removeTheSelectedDivElementFromCanvas;
  drawingCanvas.removeChild(rectangleToBeDelete);

  // fetchingIDOfTheSelectedDivElementToDelete
  const matchingAttributeElement = rectList.querySelector(
    `li[data-rect-id="${rectIdToBeDeleted}"]`
  );

  // removingSpecificIdListElementFromRectangleList
  rectList.removeChild(matchingAttributeElement);

  // check
  // console.log("deleted : ", rectIdToBeDeleted);
});

// drawButton
drawBtn.addEventListener("click", () => {
  // checkIfAlreadyClickedBefore?
  if (allowedToDraw) {
    // ifGreen
    drawBtn.style.backgroundColor = "red";
    allowedToDraw = false;
    isDrawing = false;
  } else {
    // IfRed
    drawBtn.style.backgroundColor = "green";
    allowedToDraw = true;
    isDrawing = true;
  }
});

// rectListEventListener(selectRectanglesOnSideBar)
rectList.addEventListener("click", (e) => {
  const selectedRect = document.querySelector(".selected");

  if (selectedRect) {
    selectedRect.classList.remove("selected");
  }

  const rectId = e.target.dataset.rectId;

  // selectingSameRectangleIDToBeDeleted?
  rectIdToBeDeleted = e.target.dataset.rectId;

  // ifRectSelected?
  if (rectId) {
    const rect = document.querySelector(`[data-rect="${rectId}"]`);

    // selectingSameRectangleToBeDeleted?
    rectangleToBeDelete = document.querySelector(`[data-rect="${rectId}"]`);

    rect.classList.add("selected");
  }
});

// canvasOperation/mousedown
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

// canvasOperation/mousemove
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

// htmlElementMenuItemButtons
const addDiv = document.querySelector("#addDiv");
const addHeading = document.querySelector("#addHeading");
const addParagraph = document.querySelector("#drawBtn");
const addImage = document.querySelector("#addImage");
const addTable = document.querySelector("#addTable");
const addForm = document.querySelector("#addForm");

// addingANewDivvElementOnButttonPress

addDiv.addEventListener("click", () => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("newlyCreatedDivElement"); // add class to new div
  drawingCanvas.appendChild(newDiv);
});
