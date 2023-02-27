class DragDrop {
  constructor(container) {
    this.container = container;
    this.active = false;

    // Bind class methods to this instance
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  // Activate drag and drop functionality
  activate() {
    if (!this.active) {
      this.container.addEventListener("dragstart", this.handleDragStart);
      this.container.addEventListener("dragover", this.handleDragOver);
      this.container.addEventListener("drop", this.handleDrop);
      this.active = true;
    }
  }

  // Deactivate drag and drop functionality
  deactivate() {
    if (this.active) {
      this.container.removeEventListener("dragstart", this.handleDragStart);
      this.container.removeEventListener("dragover", this.handleDragOver);
      this.container.removeEventListener("drop", this.handleDrop);
      this.active = false;
    }
  }

  // Handle the dragstart event
  handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dropEffect = "move";
  }

  // Handle the dragover event
  handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  // Handle the drop event
  handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
  }

  // Activate drag and drop for all child elements
  activateChildElements() {
    const childElements = this.container.querySelectorAll("*");
    childElements.forEach((element) => {
      element.setAttribute("draggable", true);
    });
  }
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
