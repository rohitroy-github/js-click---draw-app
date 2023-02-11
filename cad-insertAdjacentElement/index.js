let isDrawing = false;
let currentX;
let currentY;
let initialX;
let initialY;

let container = document.getElementById("container");
const resetButton = document.getElementById("resetButton");
const drawRectangle = document.getElementById("drawRectangle");

let rect = document.createElement("div");

container.addEventListener("mousedown", drawStart);
container.addEventListener("mouseup", drawEnd);
// container.addEventListener("mouseout", drawEnd);
container.addEventListener("mousemove", drawing);
resetButton.addEventListener("click", resetCanvas);
drawRectangle.addEventListener("click", shapeRectangle);

// makeColorRedByDefault
drawRectangle.style.backgroundColor = "red";

function shapeRectangle(e) {
  if (isDrawing == false) {
    isDrawing = true;
    drawRectangle.style.backgroundColor = "green";
  } else {
    isDrawing = false;
    drawRectangle.style.backgroundColor = "red";
  }
}

function drawStart(e) {
  if (isDrawing) {
    rect.style.border = "3px solid black";
    rect.style.position = "relative";
    // rect.style.width = "50px";
    // rect.style.height = "25px";
    rect.style.width = "0px";
    rect.style.height = "0px";

    initialX = e.clientX;
    initialY = e.clientY;

    rect.style.left = initialX + "px";
    rect.style.top = initialY + "px";

    // container.appendChild(rect);
    container.insertAdjacentElement("beforeend", rect);
    // isDrawing = true;
  }
}

function drawEnd(e) {
  isDrawing = false;
  drawRectangle.style.backgroundColor = "red";
}

function drawing(e) {
  if (isDrawing) {
    e.preventDefault();
    currentX = e.clientX;
    currentY = e.clientY;

    let width = currentX - initialX;
    let height = currentY - initialY;

    rect.style.width = Math.abs(width) + "px";
    rect.style.height = Math.abs(height) + "px";

    if (width < 0) {
      rect.style.left = currentX + "px";
    }

    if (height < 0) {
      rect.style.top = currentY + "px";
    }
  }
}

// functionToResetCanvas
function resetCanvas() {
  isDrawing = false;
  console.log("reset-fired");
  container.innerHTML = " ";
  drawRectangle.style.backgroundColor = "red";
}
