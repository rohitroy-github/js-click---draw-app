class DragDrop {
  constructor(container) {
    this.container = container;
    // this.active = false;

    // Bind class methods to this instance
    // this.handleDragStart = this.handleDragStart.bind(this);
    // this.handleDragOver = this.handleDragOver.bind(this);
    // this.handleDrop = this.handleDrop.bind(this);

    this.drag = this.drag.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.setTranslate = this.setTranslate.bind(this);

    this.initialX;
    this.initialY;
    this.currentX;
    this.currentY;
    this.xOffset = 0;
    this.yOffset = 0;
    this.active = false;
    this.selectedChild = null;
    // this.mouseOffset.x = 0;
    // this.mouseOffset.y = 0;
  }

  // Activate drag and drop for all child elements
  activateChildElements() {
    const childElements = this.container.querySelectorAll("*");

    console.log(childElements);

    childElements.forEach((element) => {
      element.addEventListener("mousedown", dragStart);
    });

    this.document.addEventListener("mousemove", drag);
    this.document.addEventListener("mouseup", dragEnd);
  }

  dragStart(e) {
    console.log("mousedown triggered");
    this.selectedChild = e.target;

    console.log(this.selectedChild);

    this.initialX = e.clientX - xOffset;
    this.initialY = e.clientY - yOffset;

    if (e.target === this.selectedChild) {
      this.active = true;
    }
  }

  dragEnd(e) {
    console.log("mouseup triggered");

    this.initialX = this.currentX;
    this.initialY = this.currentY;

    this.active = false;
  }

  drag(e) {
    //   console.log(this.active);
    if (this.active) {
      console.log("mousemove triggered");

      this.currentX = e.clientX - this.initialX;
      this.currentY = e.clientY - this.initialY;

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      this.setTranslate(this.currentX, this.currentY, this.selectedChild);
    }
  }

  setTranslate(xPos, yPos, element) {
    element.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }

  // Activate drag and drop functionality
  // activate() {
  //   if (!this.active) {
  //     this.container.addEventListener("dragstart", this.handleDragStart);
  //     this.container.addEventListener("dragover", this.handleDragOver);
  //     this.container.addEventListener("drop", this.handleDrop);
  //     this.active = true;
  //   }
  // }

  // // Deactivate drag and drop functionality
  // deactivate() {
  //   if (this.active) {
  //     this.container.removeEventListener("dragstart", this.handleDragStart);
  //     this.container.removeEventListener("dragover", this.handleDragOver);
  //     this.container.removeEventListener("drop", this.handleDrop);
  //     this.active = false;
  //   }
  // }

  // Handle the dragstart event
  // handleDragStart(event) {
  //   event.dataTransfer.setData("text/plain", event.target.id);
  //   event.dropEffect = "move";
  // }

  // Handle the dragover event
  // handleDragOver(event) {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // }

  // Handle the drop event
  // handleDrop(event) {
  //   event.preventDefault();
  //   const data = event.dataTransfer.getData("text/plain");
  //   const draggedElement = document.getElementById(data);
  //   event.target.appendChild(draggedElement);
  // }
}

export {DragDrop};

// const container = document.getElementById("container");
// const dragDrop = new DragDrop(container);

// // Activate drag and drop for all child elements of the container
// dragDrop.activateChildElements();

// // Activate drag and drop functionality
// dragDrop.activate();

// // Deactivate drag and drop functionality
// dragDrop.deactivate();
