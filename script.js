function createGrid(size){
    gridElement = document.querySelector('.grid');

    // Delete children of grid
    while (gridElement.firstChild) {
        gridElement.removeChild(gridElement.firstChild);
    }

    // Manipulate grid element to have the right number of rows + cols
    templateCols = `repeat(${size}, 1fr)`;
    templateRows = `repeat(${size}, 1fr)`;
    gridElement.style.gridTemplateColumns = templateCols;
    gridElement.style.gridTemplateRows = templateRows;

    // Create nxn nodes to act as boxes within grid
    const gridRows = size;
    const gridCols = size;
    for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
            let gridSquare = document.createElement("div");
            gridSquare.classList.add("grid-square");
            gridSquare.style.gridRow = i;
            gridSquare.style.gridCol = j;
            gridElement.appendChild(gridSquare);
        }
    }

    addListeners();
}

// Create mouseenter listeners for any grid square element present
function addListeners() {
    const gridSquares = document.querySelectorAll('.grid-square')
    gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseenter', hoverOn));
}

// Tags node being hovered on with hover class + create listener for mouseleave
function hoverOn(e) {
    this.classList.add("hover");
    this.removeEventListener('mouseenter', hoverOn);
    this.addEventListener('mouseleave', hoverOff);
}

// Untags hovered node with hover class + create listener for mouseon
function hoverOff(e) {
    this.classList.remove("hover");
    this.classList.add("hovered");
    this.removeEventListener('mouseenter', hoverOff);
    this.addEventListener('mouseleave', hoverOn);
}

// Create listener for the grid-size button
function sizeButtonListener() {
    const sizeButton = document.querySelector('.size-button');
    sizeButton.addEventListener('click', sizeButtonClick);
}

function sizeButtonClick(e) {
    newSize = window.prompt("Enter a grid size!");
    if (newSize > 100) {newSize = 100;}
    else if (newSize < 10) {newSize = 10;}
    createGrid(newSize);
}

createGrid(16);
sizeButtonListener();