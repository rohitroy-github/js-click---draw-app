var parent = document.getElementById("parent");
var children = document.getElementsByClassName("child");
var selectedChild = null;
var isDragging = false;
var mouseOffset = {x: 0, y: 0};

for (var i = 0; i < children.length; i++) {
  children[i].addEventListener("mousedown", function (event) {
    selectedChild = event.target;
    isDragging = true;
    mouseOffset.x = event.offsetX;
    mouseOffset.y = event.offsetY;
  });
}

document.addEventListener("mousemove", function (event) {
  if (isDragging) {
    var newX = event.pageX - mouseOffset.x - parent.offsetLeft;
    var newY = event.pageY - mouseOffset.y - parent.offsetTop;
    selectedChild.style.left = newX + "px";
    selectedChild.style.top = newY + "px";
  }
});

document.addEventListener("mouseup", function (event) {
  isDragging = false;
});
