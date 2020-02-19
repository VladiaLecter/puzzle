//obtener elementos principales del HTML
var containerCell = document.getElementById("container-cell");
var containerPiece = document.getElementById("container-piece");
var selectedPiece = null;

//crear casillas en el contenedor de celdas
createBoard();
createPieces();

function createCell(width, height) {
  var cellElement = document.createElement("div");
  cellElement.style.width = width;
  cellElement.style.height = height;
  cellElement.style.border = "1px solid black";
  cellElement.style.backgroundColor = "pink";
  cellElement.onclick = clickCell;

  return cellElement;
}
function createPiece(width, height, piece) {
  var cellElement = document.createElement("div");
  var pieceElement = document.createElement("img");

  //configurando la celda para la pieza dentro del contenedor de piezas
  cellElement.style.width = width;
  cellElement.style.height = height;

  //configurando la pieza dentro del contenedor piezas
  pieceElement.width = width;
  pieceElement.height = height;
  pieceElement.style.border = "1px solid black";
  pieceElement.src = piece.image;
  pieceElement.onclick = clickPiece;
  //mandar la pieza a la celda- agregar elementos al documento
  cellElement.appendChild(pieceElement);

  return cellElement;
}

function createBoard() {
  var width = containerCell.offsetWidth;
  var height = containerCell.offsetHeight;

  width /= 4;
  height /= 4;
  for (var i = 0; i < 16; i++) {
    let cellElement = createCell(width, height);
    addCell(cellElement);
  }
}
function createPieces() {
  var width = containerPiece.offsetWidth;
  var height = containerPiece.offsetHeight; //evuelve el alto de un elemento, incluyendo el padding vertical y los bordes, en píxeles, como un número entero.
  width /= 4;
  height /= 4;
  var pieces = generatePieceData();
  for (let i = 0; i < 16; i++) {
    let pieceElement = createPiece(width, height, pieces[i]);
    addPiece(pieceElement);
  }
}
function addCell(element) {
  containerCell.appendChild(element);
}

function addPiece(element) {
  containerPiece.appendChild(element);
}
function generatePieceData() {
  //se genero una lista de piezas
  var pieces = [];
  for (let i = 0; i < 16; i++) {
    let piece = {
      image: "img/" + (i + 1) + ".jpg",
      position: i
    };
    pieces.push(piece);
  }
  return pieces;
}
function clickPiece(e) {
  var piece = e.target;
  selectedPiece = piece;
}

function clickCell(e) {
  if (selectedPiece) {
    let cell = e.target;
    cell.appendChild(selectedPiece);
  } else {
    console.log("selecciona una pieza");
  }
}
