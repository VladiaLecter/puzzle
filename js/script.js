//obtener elementos principales del HTML
var containerCell = document.getElementById("container-cell");
var containerPiece = document.getElementById("container-piece");
var dialogElement = document.getElementById("dialog");
var selectedPiece = null;

document.onkeypress = keypress;

//crear casillas en el contenedor de celdas
createBoard();
createPieces();

function createCell(width, height, position) {
  var cellElement = document.createElement("div");
  cellElement.style.width = width;
  cellElement.style.height = height;
  cellElement.style.border = "1px solid black";
  cellElement.style.backgroundColor = "pink";
  cellElement.dataset.position = position;
  cellElement.dataset.fill = false;

  //configurar eventos
  cellElement.onclick = clickCell; //click en la celda
  cellElement.ondrop = dropCell; // drop (soltar) en la celda
  cellElement.ondragover = allowDrop;

  return cellElement;
}
function createPiece(width, height, piece) {
  var cellElement = document.createElement("div");
  var pieceElement = document.createElement("img");

  //configurando la celda para la pieza dentro del contenedor de piezas
  cellElement.style.width = width;
  cellElement.style.height = height;
  cellElement.dataset.fill = false;

  //configurando propiedades de la pieza dentro del contenedor piezas
  pieceElement.width = width;
  pieceElement.height = height;
  pieceElement.style.border = "1px solid black";
  pieceElement.src = piece.image;
  pieceElement.dataset.position = piece.position;
  pieceElement.id = "img" + piece.position;
  pieceElement.draggable = true;

  //configurando eventos
  cellElement.ondrop = dropCell;
  cellElement.ondragover = allowDrop;

  pieceElement.onclick = clickPiece;
  pieceElement.ondragstart = dragPiece;

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
    let cellElement = createCell(width, height, i);
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
function keypress(ke) {
  if (ke.keyCode == 101 || ke.keyCode == 69) {
    let result = evaluateBoard();
    showDialog(result);
  }
}
function showDialog(result) {
  var imgElement = dialogElement.children[0];
  var textContent = dialogElement.children[1];
  if (result) {
    imgElement.src =
      "https://eslamoda.com/wp-content/uploads/sites/2/2014/12/te-los-ganaste.jpg";
    textContent.innerText = "Ganaste!";
  } else {
    imgElement.src =
      "https://lh3.googleusercontent.com/proxy/DtGHKB5Nyn4tuDdNFSKMG-z2dUYFpCgCTiKQc8mAyF7NbxIkHzofrMf8rhgjgaX9nAbqjWeavkV_bJ_-qXaxCcgp7QXs0d23nmygaWKOmUFhsw";
    textContent.innerText = "Perdiste ):";
    returnPieces();
  }
  dialogElement.style.display = "block";
}

function evaluateBoard() {
  var cells = containerCell.children;
  for (cell of cells) {
    let piece = cell.children[0];
    if (piece.dataset.position != cell.dataset.position) {
      return false;
    }
  }
  return true;
}

function returnPieces() {
  let cells = containerCell.children;
  let cellPieces = containerPiece.children;

  for (cell of cells) {
    let position = cell.dataset.position;
    let piece = cell.children[0];
    cellPieces[piece.dataset.position].appendChild(piece);
  }
}
function dragPiece(ev) {
  console.log(ev);
  let piece = ev.target;
  ev.dataTransfer.setData("text", piece.id);
}

function dropCell(ev) {
  //ignorar el evento de drop
  ev.preventDefault();
  //recuperando el id de la pieza que viene en el evento drag
  let dataId = ev.dataTransfer.getData("text");
  //recuperando el elemento donde voy a soltar otro elemento
  let cell = ev.target;
  //aqui recupero la pieza a traves de su id (propiedad)
  let piece = document.getElementById(dataId);
  //agregamos el elemento pieza a el elemento celda

  if (cell.dataset.fill == "false") {
    cell.dataset.fill = true;
    cell.appendChild(piece);
  } else if (cell.dataset.fill == "true") {
    cell.dataset.fill = false;
    cell.appendChild(piece);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}
