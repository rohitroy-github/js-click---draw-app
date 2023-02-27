// import {DragDrop} from "./MyDNDClass.js";

const drawBtn = document.querySelector("#drawBtn");
const resetBtn = document.querySelector("#resetBtn");
const dragBtn = document.querySelector("#dragBtn");
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
dragBtn.style.backgroundColor = "red";

// dragging
// settingIsDraggingToFalseInitially
// let isDragging = false;
// let allowedToDrag = false;
let xOffset = 0;
let yOffset = 0;
// settingAnElementToDragToBeChangedOnEveryClickOnAnElement
let elementToDrag;

// resetButton
resetBtn.addEventListener("click", () => {
  drawBtn.style.backgroundColor = "red";
  // allowedToDraw = false;
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
    // allowedToDrag = true;
    // console.log("drawingCanvas", drawingCanvas);
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

    rect.classList.add("selected");

    // selectingSameRectangleToBeDragged
    // elementToDrag = document.querySelector(`[data-rect="${rectId}"]`);
    // adding"draggable"ClassToTheSelectedElement
    rect.classList.add("draggable");
    // allowedToDrag = true;
    // console.log("allowedToDrag", allowedToDrag);
    console.log("selectedRect", rect);

    // selectingSameRectangleToBeDeleted?
    rectangleToBeDelete = document.querySelector(`[data-rect="${rectId}"]`);
    console.log("rectangleToBeDelete", rectangleToBeDelete);
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// draggingModule1
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// // yogiSolution
// if (allowedToDrag) {
//   // draggingFunctionalities

//   // selectingDivElementToDragFromTheCanvas
//   elementToDrag = document.querySelector(".draggable");

//   console.log("elementToDrag", elementToDrag);

//   elementToDrag.addEventListener("mousedown", (e) => {
//     console.log("mousedown, dragging");
//     console.log(e.target);

//     initialX = e.clientX - xOffset;
//     initialY = e.clientY - yOffset;
//     if (e.target === elementToDrag) {
//       isDragging = true;
//     }
//   });

//   elementToDrag.addEventListener("mouseup", (e) => {
//     console.log("mouseup, dragging");

//     initialX = currentX;
//     initialY = currentY;
//     isDragging = false;
//   });

//   elementToDrag.addEventListener("mousemove", (e) => {
//     console.log("mousemove, dragging");

//     if (isDragging) {
//       currentX = e.clientX - initialX;
//       currentY = e.clientY - initialY;

//       xOffset = currentX;
//       yOffset = currentY;

//       setTranslate(currentX, currentY, elementToDrag);
//     }
//   });

//   function setTranslate(xPos, yPos, element) {
//     element.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
//   }
// } else {
//   console.log("no element selected, not allowed to drag either");
// }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// draggingModule2
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// dragBtn.addEventListener("click", () => {
//   // selectingChildDivWithAttribute=draggable
//   const childDiv = document.querySelector(".draggable");

//   // switchingDrawButtonToFalse
//   drawBtn.style.backgroundColor = "red";
//   allowedToDraw = false;
//   isDrawing = false;

//   // Add an event listener to the child div element for when it is clicked on
//   childDiv.addEventListener("mousedown", dragStart);

//   // Set the initial position of the child div element
//   let initialX;
//   let initialY;
//   let currentX;
//   let currentY;
//   let xOffset = 0;
//   let yOffset = 0;
//   let active = false;

//   function dragStart(e) {
//     initialX = e.clientX - xOffset;
//     initialY = e.clientY - yOffset;

//     if (e.target === childDiv) {
//       active = true;
//     }
//   }

//   function dragEnd(e) {
//     initialX = currentX;
//     initialY = currentY;

//     active = false;
//   }

//   function drag(e) {
//     if (active) {
//       e.preventDefault();

//       currentX = e.clientX - initialX;
//       currentY = e.clientY - initialY;

//       xOffset = currentX;
//       yOffset = currentY;

//       setTranslate(currentX, currentY, childDiv);
//     }
//   }

//   function setTranslate(xPos, yPos, el) {
//     el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
//   }

//   // Add event listeners to the document for when the mouse is moved and released
//   document.addEventListener("mousemove", drag);
//   document.addEventListener("mouseup", dragEnd);
// });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// draggingModule3
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// dragBtn.addEventListener("click", () => {
//   if (allowedToDrag) {
//     const DragDropAB = new DragDrop(drawingCanvas);

//     DragDropAB.activateChildElements();
//   }

//   // if (allowedToDrag) {
//   // Activate drag and drop for all child elements of the container
//   DragDropAB.activateChildElements();

//   // Activate drag and drop functionality
//   // DragDropAB.activate();
//   // } else {
//   //   // Deactivate drag and drop functionality
//   //   DragDropAB.deactivate();
//   // }
// });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// draggingModule4
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var selectedChild = null;
var isDragging = false;
var mouseOffset = {x: 0, y: 0};
let allowedToDrag = false;

// onClickingDragBtn
dragBtn.addEventListener("click", () => {
  var children = document.getElementsByClassName("rect");
  if (allowedToDrag) {
    console.log("Stop Dragging !");
    allowedToDrag = false;
    dragBtn.style.backgroundColor = "red";
  } else {
    console.log("Start Dragging !");
    console.log(children);
    allowedToDrag = true;
    dragBtn.style.backgroundColor = "green";
  }

  for (var i = 0; i < children.length; i++) {
    children[i].addEventListener("mousedown", function (event) {
      if (allowedToDrag) {
        selectedChild = event.target;
        selectedChild.classList.add("draggingElement");
        selectedChild.addC;
        console.log(selectedChild);
        isDragging = true;
        mouseOffset.x = event.offsetX;
        mouseOffset.y = event.offsetY;
      }
    });
  }

  document.addEventListener("mousemove", function (event) {
    if (isDragging) {
      var newX = event.pageX - mouseOffset.x - drawingCanvas.offsetLeft;
      var newY = event.pageY - mouseOffset.y - drawingCanvas.offsetTop;
      selectedChild.style.left = newX + "px";
      selectedChild.style.top = newY + "px";
    }
  });

  document.addEventListener("mouseup", function (event) {
    isDragging = false;
    selectedChild.classList.remove("draggingElement");
  });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// htmlElementMenuItemButtons
const addDiv = document.querySelector("#addDiv");
const addHeading = document.querySelector("#addHeading");
const addParagraph = document.querySelector("#addParagraph");
const addImage = document.querySelector("#addImage");
const addTable = document.querySelector("#addTable");
const addForm = document.querySelector("#addForm");

// addingANewDivElementOnButttonPress

addDiv.addEventListener("click", () => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("newlyCreatedDivElement"); // add class to new div
  drawingCanvas.appendChild(newDiv);
});

// addingANewHeadingElementOnButttonPress
addHeading.addEventListener("click", () => {
  const newHeading = document.createElement("h3");
  newHeading.classList.add("newlyCreatedHeadingElement"); // add class to new div
  newHeading.textContent = "New heading <h3>";
  drawingCanvas.appendChild(newHeading);
});

// addingANewParagraphElementOnButttonPress
addParagraph.addEventListener("click", () => {
  const newParagraph = document.createElement("p");
  newParagraph.textContent = "New paragraph";
  newParagraph.classList.add("newlyCreatedParagraphElement"); // add class to new paragraph
  drawingCanvas.appendChild(newParagraph);
});

// addingANewImageElementOnButttonPress
addImage.addEventListener("click", () => {
  const img = document.createElement("img");
  img.src = "./demoImage.jpg";
  img.classList.add("newlyCreatedImageElement");
  drawingCanvas.appendChild(img);
});

//addingANewTableElementOnButttonPress
addTable.addEventListener("click", () => {
  var table = document.createElement("table");
  table.classList.add("newlyCreatedFormElement");
  var rows = 2; // Set the number of rows
  var cols = 3; // Set the number of columns
  for (var i = 0; i < rows; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < cols; j++) {
      var cell = row.insertCell(j);
      cell.innerHTML = "Row " + i + ", Column " + j;
    }
  }
  drawingCanvas.appendChild(table);
});

// addingANewFormElementOnButttonPress
addForm.addEventListener("click", () => {
  // Create a new form element
  const form = document.createElement("form");
  form.classList.add("newlyCreatedFormElement");

  // Add form fields
  const usernameLabel = document.createElement("label");
  usernameLabel.setAttribute("for", "username");
  usernameLabel.innerText = "Username";
  form.appendChild(usernameLabel);

  const usernameInput = document.createElement("input");
  usernameInput.setAttribute("type", "text");
  usernameInput.setAttribute("id", "username");
  usernameInput.setAttribute("name", "username");
  form.appendChild(usernameInput);

  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.innerText = "Password";
  form.appendChild(passwordLabel);

  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("name", "password");
  form.appendChild(passwordInput);

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Login";
  form.appendChild(submitButton);

  // Add the form to the login form container
  drawingCanvas.appendChild(form);
});
