let isDrawing = false;
let currentX;
let currentY;
let initialX;
let initialY;

let container = document.getElementById("container");
const resetBtn = document.getElementById("resetBtn");

let rect = document.createElement("div");

container.addEventListener("mousedown", drawStart);
container.addEventListener("mouseup", drawEnd);
container.addEventListener("mouseout", drawEnd);
container.addEventListener("mousemove", drawing);
resetBtn.addEventListener("click", resetCanvas);

function drawStart(e) {
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

  isDrawing = true;
}

function drawEnd(e) {
  isDrawing = false;
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
  container.innerHTML = "";
}
