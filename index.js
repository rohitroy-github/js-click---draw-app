const body = document.getElementById("body");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// resetButton
const resetButton = document.getElementById("resetButton");

// shapeSelectionButtons
const Circle = document.getElementById("shapeSelectionCircle");
const Square = document.getElementById("shapeSelectionSquare");
const Rectangle = document.getElementById("shapeSelectionRectangle");

// addEventListenersForShapeSelectionButtons
Circle.addEventListener("click", () => {
  console.log("Shape chosen > Circle");
});
Square.addEventListener("click", () => {
  canvas.classList.add("square");
  console.log("Shape chosen > Square");
});
Rectangle.addEventListener("click", () => {
  canvas.classList.remove("square");
  canvas.classList.add("rectangle");
  console.log("Shape chosen > Rectangle");
});

// rectangle
let startX, startY, endX, endY, isDrawing;
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  startX = e.clientX - canvas.offsetLeft;
  startY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  endX = e.clientX - canvas.offsetLeft;
  endY = e.clientY - canvas.offsetTop;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  //   checkForRectangle?Square?
  if (canvas.classList.contains("rectangle")) {
    ctx.rect(startX, startY, endX - startX, endY - startY);
  } else if (canvas.classList.contains("square")) {
    ctx.rect(startX, startY, endX - startX, endX - startX);
  } else {
    alert("Choose a shape !");
  }
  ctx.stroke();
});

// square
// let isDrawing = false;
// let x = 0;
// let y = 0;
// let size = 50;

// canvas.addEventListener("mousedown", (e) => {
//   isDrawing = true;
//   x = e.clientX;
//   y = e.clientY;
// });

// canvas.addEventListener("mouseup", (e) => {
//   isDrawing = false;
// });

// canvas.addEventListener("mousemove", (e) => {
//   if (!isDrawing) return;

//   ctx.beginPath();
//   ctx.rect(x - size / 2, y - size / 2, size, size);
//   ctx.fillStyle = "red";
//   ctx.fill();

//   size += 5;
// });

// circle
// let isDrawing = false;
// let x = 0;
// let y = 0;
// let radius = 1;

// canvas.addEventListener("mousedown", (e) => {
//   isDrawing = true;
//   x = e.clientX;
//   y = e.clientY;
// });

// canvas.addEventListener("mouseup", (e) => {
//   isDrawing = false;
// });

// canvas.addEventListener("mousemove", (e) => {
//   if (!isDrawing) return;

//   ctx.beginPath();
//   ctx.arc(x, y, radius, 0, 2 * Math.PI);
//   ctx.stroke();

//   radius += 1;
// });

resetButton.addEventListener("click", () => {
  canvas.width = canvas.width;
  canvas.classList.remove("rectangle");
  canvas.classList.remove("square");
});
