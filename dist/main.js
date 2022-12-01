/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/code/chessboard.js":
/*!********************************!*\
  !*** ./src/code/chessboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chessboard": () => (/* binding */ Chessboard)
/* harmony export */ });
/* harmony import */ var _img_unicorn_knight_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/unicorn knight.png */ "./src/img/unicorn knight.png");
/* eslint-disable */

class Chessboard {
  constructor(node) {
    this.board = node;
  }
  createBoard() {
    let cols = 0;
    let rows = 0;
    const objboard = this;
    while (cols < 8 && rows < 8) {
      let newCell = document.createElement('div');
      newCell.id = `cell-${String(rows)}-${String(cols)}`;
      newCell.classList.add('cell');
      if (rows % 2 === 0 && cols % 2 === 0 || rows % 2 !== 0 && cols % 2 !== 0) {
        newCell.classList.add('white');
        //chessCoords[cols][rows] = 'W';
      } else {
        newCell.classList.add('black');
        //chessCoords[cols][rows] = 'B';
      }

      newCell.setAttribute('row', rows);
      newCell.setAttribute('col', cols);
      // newCell.textContent = `${rows} - ${cols}`;
      this.board.appendChild(newCell);
      cols++;
      if (cols >= 8) {
        cols = 0;
        rows++;
      }
    }
  }
  reset() {
    const node = this.board;
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
    this.createBoard();
  }
  setKnight(r, c) {
    // r stands for row
    // c stands for col
    let cell = document.getElementById(`cell-${r}-${c}`);
    let knight = this.createKnight(r, c);
    cell.append(knight);
    return knight;
  }
  createKnight(r, c) {
    let knight = document.createElement('img');
    knight.src = _img_unicorn_knight_png__WEBPACK_IMPORTED_MODULE_0__;
    knight.classList.add('knight');
    knight.id = `knight-${r}-${c}`;
    knight.setAttribute('row', r);
    knight.setAttribute('col', c);
    return knight;
  }
  async moveKnight(moves) {
    let knight = document.querySelector('[id^=knight');
    let iRow = knight.getAttribute('row');
    let iCol = knight.getAttribute('col');
    let attilaCount = {
      count: 0
    };
    this.attila(iRow, iCol, attilaCount);
    for (let i = 0; i < moves.length; i++) {
      await this.xmoveKnight(knight, iRow, iCol, moves[i].row, moves[i].col, attilaCount);
      iRow = moves[i].row;
      iCol = moves[i].col;
      knight = document.querySelector('[id^=knight');
      await sleep(500);
    }
  }
  attila(r, c, count) {
    // "The grass did not grow where Attila had passed"
    let cell = document.getElementById(`cell-${String(r)}-${String(c)}`);
    cell.classList.remove('white');
    cell.classList.remove('black');
    if (count.count === 0) {
      cell.classList.add('attila-red');
      cell.classList.remove('attila-black');
    } else if (count.count % 3 === 0) {
      cell.classList.remove('attila-red');
      cell.classList.add('attila-black');
    } else {
      cell.classList.add('attila-red');
      cell.classList.remove('attila-black');
    }
    count.count++;
  }
  async xmoveKnight(knight, iRow, iCol, fRow, fCol, attilaCount) {
    // iRow --> initial row
    // iCol --> initial Col
    // fRow --> final row
    // fCol --> final col
    let i;
    //let knight = document.querySelector('[id^=knight');
    //let knight = document.getElementById(`knight-${iRow}-${iCol}`);
    let diffRow = fRow - iRow; // offset in x axis
    let diffCol = fCol - iCol; // offset in y axis
    let currentRow = iRow;
    let currentCol = iCol;

    //this.attila(currentRow, currentCol, attilaCount);

    for (i = diffRow; i < 0; i++) {
      currentRow--;
      await moveUp(knight);
      knight.remove();
      knight = this.setKnight(currentRow, currentCol);
      this.attila(currentRow, currentCol, attilaCount);
    }
    for (i = 0; i < diffRow; i++) {
      currentRow++;
      await moveDown(knight);
      knight.remove();
      knight = this.setKnight(currentRow, currentCol);
      this.attila(currentRow, currentCol, attilaCount);
    }
    for (i = diffCol; i < 0; i++) {
      currentCol--;
      await moveLeft(knight);
      knight.remove();
      knight = this.setKnight(currentRow, currentCol);
      this.attila(currentRow, currentCol, attilaCount);
    }
    for (i = 0; i < diffCol; i++) {
      currentCol++;
      await moveRight(knight);
      knight.remove();
      knight = this.setKnight(currentRow, currentCol);
      this.attila(currentRow, currentCol, attilaCount);
    }
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function moveRight(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(${trans}px)`;
  const effect = [{
    transform: transX
  }];
  piece.animate(effect, getTiming());
  await sleep(495);
}
async function moveLeft(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(-${trans}px)`;
  const effect = [{
    transform: transX
  }];
  piece.animate(effect, getTiming());
  await sleep(495);
}
async function moveUp(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(-${trans}px)`;
  const effect = [{
    transform: transY
  }];
  piece.animate(effect, getTiming());
  await sleep(495);
}
async function moveDown(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(${Math.floor(trans)}px)`;
  const effect = [{
    transform: transY
  }];
  piece.animate(effect, getTiming());
  await sleep(485);
}
function getTiming() {
  const timing = {
    duration: 500,
    iterations: 1
  };
  return timing;
}
function calcTranslate(piece) {
  // it seems the div width + 30 % makes the animation smoother
  let positionInfo = piece.getBoundingClientRect();
  let trans = Math.floor(parseInt(positionInfo.width) * 1.3);
  return trans;
}


/***/ }),

/***/ "./src/code/knight.js":
/*!****************************!*\
  !*** ./src/code/knight.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chesstree": () => (/* binding */ Chesstree),
/* harmony export */   "Coords": () => (/* binding */ Coords)
/* harmony export */ });


/* eslint-disable */
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class Coords {
  // Coords object contain row and col
  constructor(r, c) {
    this.row = parseInt(r);
    this.col = parseInt(c);
  }
  compare(coords) {
    if (this.row === coords.row && this.col === coords.col) return true;else return false;
  }
  add(coords) {
    // We add two coords together
    this.row += parseInt(coords.row);
    this.col += parseInt(coords.col);
  }

  // the tree is the one who defines the bounds of what is valid and what not depending on its own rules (right now, Knight chess movement)
  //   valid() {
  //     // we validate the coordinates of this object
  //     if (this.row < 0 || this.col < 0 || this.row > 7 || this.col > 7)
  //       return false;

  //     return true;
  //   }

  toString() {
    return 'row: ' + this.row + ' | col: ' + this.col;
  }
  copy(coords) {
    this.row = parseInt(coords.row);
    this.col = parseInt(coords.col);
  }
}
class Node {
  // A node is formed of an object coords and an array of connected nodes
  // essentially we get coords pathing to other coords until null.
  constructor(coords, depth, nextNodes) {
    if (coords != null) this.coords = coords;
    if (depth != null) this.depth = depth;
    if (nextNodes != null) this.nextNodes = nextNodes;
  }
  addPath(node) {
    if (this.nextNodes == null || this.nextNodes.length < 1) {
      this.nextNodes = [node];
    } else {
      this.nextNodes.push(node);
    }
  }
  removeNulls() {
    if (this.nextNodes == null) {
      this.nextNodes = [];
    } else {
      let auxList = [];
      this.nextNodes.forEach(node => {
        if (node != null) auxList.push(node);
      });
      this.nextNodes = auxList;
    }
  }
}
class Chesstree {
  // the Chesstree receives this parameters to work:
  // 1-> Origin Coordinates, our starting point.
  // 2-> Destiniy Coordinates, our final point.
  // 3-> type (for now, only Knight is available), defines the rules which will evaluate if coordinates are valid or not

  constructor(oC, dC, type) {
    _defineProperty(this, "listOfCoordinates", []);
    _defineProperty(this, "destinationReached", false);
    // oC -> Origin Coords, dC --> Destiny Coords
    this.type = type;
    this.root = this.createNode(oC, null);
    if (oC !== dC) {
      this.buildTree([this.root], 0, dC);
      this.root = this.trimTree(this.root, dC);
    }
  }
  buildTree(nodeList, depth, dC) {
    if (nodeList == null) return; // guard clause
    let nextNodeList = [];
    let i, j;
    for (i = 0; i < nodeList.length; i++) {
      let node = nodeList[i];
      // For each node of the node list we're gonna check if any of the childs is our destination.
      // then we will stop in our tracks.

      let moves = this.getMovements(node.coords);
      if (moves.length > 0) {
        for (j = 0; j < moves.length; j++) {
          let move = moves[j];
          if (!this.isDuplicate(move, this.listOfCoordinates)) {
            this.addList(move); // we put this coords as alreadry treated

            let child = this.createNode(move, depth + 1, null);
            node.addPath(child);
            // we check if it's our destination
            if (child.coords.compare(dC)) {
              // We reached our destination, hoorray
              return;
            }
            nextNodeList.push(child);
          }
        }
      }
    }
    // since we have not found the destination, we must travel to the next level
    if (nextNodeList.length > 0) {
      this.buildTree(nextNodeList, depth + 1, dC);
    }
  }
  trimTree(node, dC) {
    if (node.coords.compare(dC)) {
      return node;
    }
    if (node.nextNodes != null) {
      for (let i = 0; i < node.nextNodes.length; i++) {
        node.nextNodes[i] = this.trimTree(node.nextNodes[i], dC);
      }
      node.removeNulls();
      if (node.nextNodes.length > 0) {
        return node;
      } else {
        return null;
      }
    }
  }
  isDuplicate(value, arr2) {
    // we check if array 2 has value in its elements
    return arr2.some(e => {
      if (e.row === value.row && e.col === value.col) return true;else return false;
    });
  }
  valid(c) {
    if (this.type === 'knight')
      // personal rules of the knight piece (in this case, rules of the chessboard)
      return this.validKnight(c);

    // if not returned true till here, it's false
    return false;
  }
  validKnight(c) {
    // we validate the coordinates of this object
    if (c.row < 0 || c.col < 0 || c.row > 7 || c.col > 7) return false;
    return true;
  }
  getMovements(c) {
    // c --> coords
    if (this.type === 'knight') return this.getKnightMovements(c);

    // if we have reached here and not found a valid type, we should throw an error.
    // since we're too lazy for that, we're gonna return null. Our tree will be very short.
    return [];
  }
  getKnightMovements(c) {
    // The knight can move to eight positions:
    // +1 row, +2 col
    // +1 row, -2 col
    // +2 row, +1 col
    // +2 row, -1 col
    // -1 row, +2 col
    // -1 row, -2 col
    // -2 row, +1 col
    // -2 row, -1 col
    const movements = [];
    const result = [];
    movements.push(new Coords(-2, -1));
    movements.push(new Coords(-2, +1));
    movements.push(new Coords(-1, -2));
    movements.push(new Coords(-1, +2));
    movements.push(new Coords(+1, -2));
    movements.push(new Coords(+1, +2));
    movements.push(new Coords(+2, -1));
    movements.push(new Coords(+2, +1));
    movements.forEach(move => {
      const auxCoords = new Coords();
      auxCoords.copy(c);
      auxCoords.add(move);
      if (this.valid(auxCoords)) {
        result.push(auxCoords);
      }
    });
    return result.length > 0 ? result : null;
  }
  createNode(coords, depth, nextCoords) {
    // it used to do things before new Node lol.
    return new Node(coords, depth, nextCoords);
  }
  addList(coords) {
    this.listOfCoordinates.push(coords);
    this.sortList();
  }
  sortList() {
    this.listOfCoordinates.sort(function (a, b) {
      if (a.row < b.row) return -1;
      if (a.row > b.row) return 1;
      if (a.col < b.col) return -1;
      if (a.col > b.col) return 1;
      return 0;
    });
  }
  getPath() {
    let path = [];
    let node = this.root;
    while (node != null) {
      path.push(node.coords);
      if (node.nextNodes != null) node = node.nextNodes[0]; // should only have one path
      else node = null;
    }
    return path;
  }
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/chess.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/chess.scss ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../img/path.png */ "./src/img/path.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#chessboard {\n  background-color: rgb(156, 153, 150);\n  width: 60vw;\n  max-width: 600px;\n  border: 1px black solid;\n  display: grid;\n  grid-gap: 0;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(8, 1fr);\n  grid-auto-flow: row;\n}\n\n.cell {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  aspect-ratio: 1;\n}\n\n.white {\n  background-color: rgba(245, 245, 245, 0.459);\n}\n\n.black {\n  background-color: rgba(49, 47, 47, 0.644);\n}\n\n.attila-red {\n  background-color: #a6a6a6;\n}\n\n.attila-black {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n}\n\n.knight {\n  position: relative;\n  width: 80%;\n  float: inline-end;\n}", "",{"version":3,"sources":["webpack://./src/styles/chess.scss"],"names":[],"mappings":"AAEA;EACE,oCAAA;EACA,WAAA;EACA,gBAAA;EACA,uBAAA;EACA,aAAA;EACA,WAAA;EACA,qCAAA;EACA,kCAAA;EACA,mBAAA;AADF;;AAWA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;AARF;;AAWA;EACE,4CAAA;AARF;;AAWA;EACE,yCAAA;AARF;;AAUA;EACE,yBAAA;AAPF;;AASA;EACE,yDAAA;EACA,sBAAA;AANF;;AASA;EACE,kBAAA;EACA,UAAA;EACA,iBAAA;AANF","sourcesContent":["//For our chess board we have the chessboard container, the cell class, the black class, the white class\n\n#chessboard {\n  background-color: rgb(156, 153, 150);\n  width: 60vw;\n  max-width: 600px;\n  border: 1px black solid;\n  display: grid;\n  grid-gap: 0;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(8, 1fr);\n  grid-auto-flow: row;\n  //  justify-items: center;\n  //align-items: center;\n}\n// .cell {\n//   border: 1px black dashed;\n//   height: 5vh;\n//   width: 5vw;\n// }\n\n.cell {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  aspect-ratio: 1;\n}\n\n.white {\n  background-color: rgba(245, 245, 245, 0.459);\n}\n\n.black {\n  background-color: rgba(49, 47, 47, 0.644);\n}\n.attila-red {\n  background-color: #a6a6a6;\n}\n.attila-black {\n  background-image: url('../img/path.png');\n  background-size: cover;\n}\n\n.knight {\n  position: relative;\n  width: 80%;\n  float: inline-end;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/general.scss":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/general.scss ***!
  \**************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../img/background.jpg */ "./src/img/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.cdnfonts.com/css/norse);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  height: 100vh;\n  overflow-y: hidden;\n  margin: 0px;\n}\n\n#main-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#header {\n  display: flex;\n  align-items: center;\n  background-color: rgb(19, 19, 46);\n  padding: 25px;\n}\n#header #logo > img {\n  height: 10vh;\n}\n#header #logo {\n  margin-left: 10px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n}\n#header #title-text {\n  color: whitesmoke;\n  font-size: 5vh;\n  font-family: \"Norse\", sans-serif;\n  margin-left: 35px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n}\n\n#text-explain {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: whitesmoke;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  background-color: rgba(0, 0, 0, 0.452);\n  padding-left: 10px;\n  padding-bottom: 5px;\n  padding-top: 10px;\n  padding-right: 10px;\n}\n\n#user-feedback {\n  padding: 10px;\n  margin-top: 30px;\n  background-color: grey;\n  width: 85vw;\n  min-height: 10vh;\n  color: whitesmoke;\n  font-family: \"Courier New\", Courier, monospace;\n}\n\n#restart {\n  margin-top: 10px;\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  height: 40px;\n  padding: 12px 17px;\n  border-radius: 50px;\n  background-color: rgba(216, 216, 216, 0.8156862745);\n  color: #222;\n  font-size: 16px;\n  font-weight: 500;\n}\n#restart:hover {\n  background-color: rgba(34, 34, 34, 0.9450980392);\n  color: whitesmoke;\n}", "",{"version":3,"sources":["webpack://./src/styles/general.scss"],"names":[],"mappings":"AAEA;EACE,yDAAA;EACA,sBAAA;EACA,4BAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;AAAF;;AAGA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AAAF;;AAGA;EACE,aAAA;EACA,mBAAA;EACA,iCAAA;EACA,aAAA;AAAF;AAEE;EACE,YAAA;AAAJ;AAEE;EACE,iBAAA;EACA,gBAAA;EACA,kBAAA;AAAJ;AAEE;EACE,iBAAA;EACA,cAAA;EACA,gCAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;AAAJ;;AAIA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;EACA,sCAAA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;EACA,mBAAA;AADF;;AAIA;EACE,aAAA;EACA,gBAAA;EACA,sBAAA;EACA,WAAA;EACA,gBAAA;EACA,iBAAA;EACA,8CAAA;AADF;;AAIA;EACE,gBAAA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;EACA,eAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,mDAAA;EACA,WAAA;EACA,eAAA;EACA,gBAAA;AADF;AAGE;EACE,gDAAA;EACA,iBAAA;AADJ","sourcesContent":["@import url('https://fonts.cdnfonts.com/css/norse');\n\nbody {\n  background-image: url('../img/background.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n  height: 100vh;\n  overflow-y: hidden;\n  margin: 0px;\n}\n\n#main-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#header {\n  display: flex;\n  align-items: center;\n  background-color: rgb(19, 19, 46);\n  padding: 25px;\n\n  #logo > img {\n    height: 10vh;\n  }\n  #logo {\n    margin-left: 10px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n  }\n  #title-text {\n    color: whitesmoke;\n    font-size: 5vh;\n    font-family: 'Norse', sans-serif;\n    margin-left: 35px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n  }\n}\n\n#text-explain {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: whitesmoke;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  background-color: rgba(0, 0, 0, 0.452);\n  padding-left: 10px;\n  padding-bottom: 5px;\n  padding-top: 10px;\n  padding-right: 10px;\n}\n\n#user-feedback {\n  padding: 10px;\n  margin-top: 30px;\n  background-color: grey;\n  width: 85vw;\n  min-height: 10vh;\n  color: whitesmoke;\n  font-family: 'Courier New', Courier, monospace;\n}\n\n#restart {\n  margin-top: 10px;\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  height: 40px;\n  padding: 12px 17px;\n  border-radius: 50px;\n  background-color: #d8d8d8d0;\n  color: #222;\n  font-size: 16px;\n  font-weight: 500;\n\n  &:hover {\n    background-color: #222222f1;\n    color: whitesmoke;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/chess.scss":
/*!*******************************!*\
  !*** ./src/styles/chess.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chess_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./chess.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/chess.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chess_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chess_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chess_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_chess_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/general.scss":
/*!*********************************!*\
  !*** ./src/styles/general.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_general_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./general.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/general.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_general_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_general_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_general_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_general_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/img/background.jpg":
/*!********************************!*\
  !*** ./src/img/background.jpg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "8265a7b75ab8256ece92.jpg";

/***/ }),

/***/ "./src/img/odin.png":
/*!**************************!*\
  !*** ./src/img/odin.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4f0f495b2f256748749f.png";

/***/ }),

/***/ "./src/img/path.png":
/*!**************************!*\
  !*** ./src/img/path.png ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2fd49a000f5941ad508f.png";

/***/ }),

/***/ "./src/img/unicorn knight.png":
/*!************************************!*\
  !*** ./src/img/unicorn knight.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0cefe3cd7adc1092ab4b.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_general_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/general.scss */ "./src/styles/general.scss");
/* harmony import */ var _styles_chess_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/chess.scss */ "./src/styles/chess.scss");
/* harmony import */ var _img_odin_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./img/odin.png */ "./src/img/odin.png");
/* harmony import */ var _code_knight_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./code/knight.js */ "./src/code/knight.js");
/* harmony import */ var _code_chessboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./code/chessboard.js */ "./src/code/chessboard.js");
/* eslint-disable */
//'use strict';






// we define the variables that are gonna make all this work
let startCell = {};
let finalCell = {};
const chessboard = new _code_chessboard_js__WEBPACK_IMPORTED_MODULE_4__.Chessboard(document.getElementById('chessboard'));
chessboard.createBoard();
// We set the listeners for each Cell
setCellListeners();

// we set the logo source with this...seems using npm makes it hard to directly inject it in the html
const logo = document.getElementById('odin');
logo.src = _img_odin_png__WEBPACK_IMPORTED_MODULE_2__;

// we set the listener to the restart button
const restart = document.getElementById('restart');
restart.addEventListener('click', () => {
  restartListener();
});
function restartListener() {
  chessboard.reset();
  setCellListeners();
  const userFeedback = document.getElementById('user-feedback');
  userFeedback.textContent = 'Choose a cell to start!';
}
function setCellListeners() {
  const cells = document.querySelectorAll('[id^=cell');
  if (cells == null) return;
  cells.forEach(cell => {
    cell.addEventListener('click', eventCell);
  });
}
async function eventCell(e) {
  // if the user clicked on a cell there are possible scenarios:
  // Board is empty, which means we're putting the starting coordenates
  // Board has one knight, which means we're putting the final coordinates
  // user is messing with the board and clicking when he shouldnt...
  const userFeedback = document.getElementById('user-feedback');
  const currentCell = e.currentTarget;
  const row = currentCell.getAttribute('row');
  const col = currentCell.getAttribute('col');
  if (currentCell.firstChild) {
    // we already have a knight
    userFeedback.textContent = "The destination can't be the same as the start!";
    await sleep(1000);
    userFeedback.textContent = 'Choose a destination!';
    return;
  }
  if (userFeedback.textContent === 'Choose a cell to start!') {
    startCell = new _code_knight_js__WEBPACK_IMPORTED_MODULE_3__.Coords(row, col);
    userFeedback.textContent = 'Hiring a Knight...';
    chessboard.setKnight(row, col);
    await sleep(250);
    userFeedback.textContent = 'Choose a destination!';
    return;
  }
  if (userFeedback.textContent === 'Choose a destination!') {
    finalCell = new _code_knight_js__WEBPACK_IMPORTED_MODULE_3__.Coords(row, col);
    const knightTree = new _code_knight_js__WEBPACK_IMPORTED_MODULE_3__.Chesstree(startCell, finalCell, 'knight');
    let moves = knightTree.getPath();
    userFeedback.textContent = movesText(moves);
    chessboard.moveKnight(moves);
    return;
  }
}
function movesText(moves) {
  let sp = '[' + startCell.row + ',' + startCell.col + ']';
  let fp = '[' + finalCell.row + ',' + finalCell.col + ']';
  let str1 = `> knightMoves(${sp}, ${fp}) => \n`;
  let str2 = '';
  let str3 = '\n';
  let cm = -1; // count moves, -1 to not count starting position

  moves.forEach(move => {
    str3 += `[${move.row},${move.col}] `;
    cm++;
  });
  str2 = `\nYou made it in ${cm} moves! Here's your path: `;
  return str1 + str2 + str3;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SCxLQUFLLENBQUMyRCxPQUFPLENBQUVhLElBQUksSUFBSztJQUN0QjRDLElBQUksSUFBSyxJQUFHNUMsSUFBSSxDQUFDN0QsR0FBSSxJQUFHNkQsSUFBSSxDQUFDNUQsR0FBSSxJQUFHO0lBQ3BDeUcsRUFBRSxFQUFFO0VBQ04sQ0FBQyxDQUFDO0VBRUZGLElBQUksR0FBSSxvQkFBbUJFLEVBQUcsNEJBQTJCO0VBRXpELE9BQU9ILElBQUksR0FBR0MsSUFBSSxHQUFHQyxJQUFJO0FBQzNCO0FBRUEsU0FBU3ZHLEtBQUssQ0FBQ1ksRUFBRSxFQUFFO0VBQ2pCLE9BQU8sSUFBSUMsT0FBTyxDQUFFQyxPQUFPLElBQUtDLFVBQVUsQ0FBQ0QsT0FBTyxFQUFFRixFQUFFLENBQUMsQ0FBQztBQUMxRCxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9zcmMvY29kZS9jaGVzc2JvYXJkLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL2NvZGUva25pZ2h0LmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL3N0eWxlcy9jaGVzcy5zY3NzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL3N0eWxlcy9nZW5lcmFsLnNjc3MiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL3N0eWxlcy9jaGVzcy5zY3NzP2U5MjAiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9zcmMvc3R5bGVzL2dlbmVyYWwuc2Nzcz9iYjI0Iiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHVuaWNvcm4gZnJvbSAnLi4vaW1nL3VuaWNvcm4ga25pZ2h0LnBuZyc7XG5cbmNsYXNzIENoZXNzYm9hcmQge1xuICBjb25zdHJ1Y3Rvcihub2RlKSB7XG4gICAgdGhpcy5ib2FyZCA9IG5vZGU7XG4gIH1cblxuICBjcmVhdGVCb2FyZCgpIHtcbiAgICBsZXQgY29scyA9IDA7XG4gICAgbGV0IHJvd3MgPSAwO1xuICAgIGNvbnN0IG9iamJvYXJkID0gdGhpcztcblxuICAgIHdoaWxlIChjb2xzIDwgOCAmJiByb3dzIDwgOCkge1xuICAgICAgbGV0IG5ld0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG5ld0NlbGwuaWQgPSBgY2VsbC0ke1N0cmluZyhyb3dzKX0tJHtTdHJpbmcoY29scyl9YDtcbiAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIChyb3dzICUgMiA9PT0gMCAmJiBjb2xzICUgMiA9PT0gMCkgfHxcbiAgICAgICAgKHJvd3MgJSAyICE9PSAwICYmIGNvbHMgJSAyICE9PSAwKVxuICAgICAgKSB7XG4gICAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZCgnd2hpdGUnKTtcbiAgICAgICAgLy9jaGVzc0Nvb3Jkc1tjb2xzXVtyb3dzXSA9ICdXJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZCgnYmxhY2snKTtcbiAgICAgICAgLy9jaGVzc0Nvb3Jkc1tjb2xzXVtyb3dzXSA9ICdCJztcbiAgICAgIH1cbiAgICAgIG5ld0NlbGwuc2V0QXR0cmlidXRlKCdyb3cnLCByb3dzKTtcbiAgICAgIG5ld0NlbGwuc2V0QXR0cmlidXRlKCdjb2wnLCBjb2xzKTtcbiAgICAgIC8vIG5ld0NlbGwudGV4dENvbnRlbnQgPSBgJHtyb3dzfSAtICR7Y29sc31gO1xuICAgICAgdGhpcy5ib2FyZC5hcHBlbmRDaGlsZChuZXdDZWxsKTtcbiAgICAgIGNvbHMrKztcblxuICAgICAgaWYgKGNvbHMgPj0gOCkge1xuICAgICAgICBjb2xzID0gMDtcbiAgICAgICAgcm93cysrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLmJvYXJkO1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgdGhpcy5jcmVhdGVCb2FyZCgpO1xuICB9XG5cbiAgc2V0S25pZ2h0KHIsIGMpIHtcbiAgICAvLyByIHN0YW5kcyBmb3Igcm93XG4gICAgLy8gYyBzdGFuZHMgZm9yIGNvbFxuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNlbGwtJHtyfS0ke2N9YCk7XG4gICAgbGV0IGtuaWdodCA9IHRoaXMuY3JlYXRlS25pZ2h0KHIsIGMpO1xuICAgIGNlbGwuYXBwZW5kKGtuaWdodCk7XG4gICAgcmV0dXJuIGtuaWdodDtcbiAgfVxuXG4gIGNyZWF0ZUtuaWdodChyLCBjKSB7XG4gICAgbGV0IGtuaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGtuaWdodC5zcmMgPSB1bmljb3JuO1xuICAgIGtuaWdodC5jbGFzc0xpc3QuYWRkKCdrbmlnaHQnKTtcbiAgICBrbmlnaHQuaWQgPSBga25pZ2h0LSR7cn0tJHtjfWA7XG4gICAga25pZ2h0LnNldEF0dHJpYnV0ZSgncm93Jywgcik7XG4gICAga25pZ2h0LnNldEF0dHJpYnV0ZSgnY29sJywgYyk7XG4gICAgcmV0dXJuIGtuaWdodDtcbiAgfVxuXG4gIGFzeW5jIG1vdmVLbmlnaHQobW92ZXMpIHtcbiAgICBsZXQga25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkXj1rbmlnaHQnKTtcbiAgICBsZXQgaVJvdyA9IGtuaWdodC5nZXRBdHRyaWJ1dGUoJ3JvdycpO1xuICAgIGxldCBpQ29sID0ga25pZ2h0LmdldEF0dHJpYnV0ZSgnY29sJyk7XG4gICAgbGV0IGF0dGlsYUNvdW50ID0geyBjb3VudDogMCB9O1xuICAgIHRoaXMuYXR0aWxhKGlSb3csIGlDb2wsIGF0dGlsYUNvdW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhd2FpdCB0aGlzLnhtb3ZlS25pZ2h0KFxuICAgICAgICBrbmlnaHQsXG4gICAgICAgIGlSb3csXG4gICAgICAgIGlDb2wsXG4gICAgICAgIG1vdmVzW2ldLnJvdyxcbiAgICAgICAgbW92ZXNbaV0uY29sLFxuICAgICAgICBhdHRpbGFDb3VudFxuICAgICAgKTtcblxuICAgICAgaVJvdyA9IG1vdmVzW2ldLnJvdztcbiAgICAgIGlDb2wgPSBtb3Zlc1tpXS5jb2w7XG5cbiAgICAgIGtuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpZF49a25pZ2h0Jyk7XG4gICAgICBhd2FpdCBzbGVlcCg1MDApO1xuICAgIH1cbiAgfVxuXG4gIGF0dGlsYShyLCBjLCBjb3VudCkge1xuICAgIC8vIFwiVGhlIGdyYXNzIGRpZCBub3QgZ3JvdyB3aGVyZSBBdHRpbGEgaGFkIHBhc3NlZFwiXG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2VsbC0ke1N0cmluZyhyKX0tJHtTdHJpbmcoYyl9YCk7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCd3aGl0ZScpO1xuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYmxhY2snKTtcblxuICAgIGlmIChjb3VudC5jb3VudCA9PT0gMCkge1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdhdHRpbGEtcmVkJyk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGlsYS1ibGFjaycpO1xuICAgIH0gZWxzZSBpZiAoY291bnQuY291bnQgJSAzID09PSAwKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGlsYS1yZWQnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYXR0aWxhLWJsYWNrJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYXR0aWxhLXJlZCcpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdhdHRpbGEtYmxhY2snKTtcbiAgICB9XG4gICAgY291bnQuY291bnQrKztcbiAgfVxuXG4gIGFzeW5jIHhtb3ZlS25pZ2h0KGtuaWdodCwgaVJvdywgaUNvbCwgZlJvdywgZkNvbCwgYXR0aWxhQ291bnQpIHtcbiAgICAvLyBpUm93IC0tPiBpbml0aWFsIHJvd1xuICAgIC8vIGlDb2wgLS0+IGluaXRpYWwgQ29sXG4gICAgLy8gZlJvdyAtLT4gZmluYWwgcm93XG4gICAgLy8gZkNvbCAtLT4gZmluYWwgY29sXG4gICAgbGV0IGk7XG4gICAgLy9sZXQga25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkXj1rbmlnaHQnKTtcbiAgICAvL2xldCBrbmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChga25pZ2h0LSR7aVJvd30tJHtpQ29sfWApO1xuICAgIGxldCBkaWZmUm93ID0gZlJvdyAtIGlSb3c7IC8vIG9mZnNldCBpbiB4IGF4aXNcbiAgICBsZXQgZGlmZkNvbCA9IGZDb2wgLSBpQ29sOyAvLyBvZmZzZXQgaW4geSBheGlzXG4gICAgbGV0IGN1cnJlbnRSb3cgPSBpUm93O1xuICAgIGxldCBjdXJyZW50Q29sID0gaUNvbDtcblxuICAgIC8vdGhpcy5hdHRpbGEoY3VycmVudFJvdywgY3VycmVudENvbCwgYXR0aWxhQ291bnQpO1xuXG4gICAgZm9yIChpID0gZGlmZlJvdzsgaSA8IDA7IGkrKykge1xuICAgICAgY3VycmVudFJvdy0tO1xuICAgICAgYXdhaXQgbW92ZVVwKGtuaWdodCk7XG4gICAgICBrbmlnaHQucmVtb3ZlKCk7XG4gICAgICBrbmlnaHQgPSB0aGlzLnNldEtuaWdodChjdXJyZW50Um93LCBjdXJyZW50Q29sKTtcbiAgICAgIHRoaXMuYXR0aWxhKGN1cnJlbnRSb3csIGN1cnJlbnRDb2wsIGF0dGlsYUNvdW50KTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGRpZmZSb3c7IGkrKykge1xuICAgICAgY3VycmVudFJvdysrO1xuICAgICAgYXdhaXQgbW92ZURvd24oa25pZ2h0KTtcbiAgICAgIGtuaWdodC5yZW1vdmUoKTtcbiAgICAgIGtuaWdodCA9IHRoaXMuc2V0S25pZ2h0KGN1cnJlbnRSb3csIGN1cnJlbnRDb2wpO1xuICAgICAgdGhpcy5hdHRpbGEoY3VycmVudFJvdywgY3VycmVudENvbCwgYXR0aWxhQ291bnQpO1xuICAgIH1cblxuICAgIGZvciAoaSA9IGRpZmZDb2w7IGkgPCAwOyBpKyspIHtcbiAgICAgIGN1cnJlbnRDb2wtLTtcbiAgICAgIGF3YWl0IG1vdmVMZWZ0KGtuaWdodCk7XG4gICAgICBrbmlnaHQucmVtb3ZlKCk7XG4gICAgICBrbmlnaHQgPSB0aGlzLnNldEtuaWdodChjdXJyZW50Um93LCBjdXJyZW50Q29sKTtcbiAgICAgIHRoaXMuYXR0aWxhKGN1cnJlbnRSb3csIGN1cnJlbnRDb2wsIGF0dGlsYUNvdW50KTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGRpZmZDb2w7IGkrKykge1xuICAgICAgY3VycmVudENvbCsrO1xuICAgICAgYXdhaXQgbW92ZVJpZ2h0KGtuaWdodCk7XG4gICAgICBrbmlnaHQucmVtb3ZlKCk7XG4gICAgICBrbmlnaHQgPSB0aGlzLnNldEtuaWdodChjdXJyZW50Um93LCBjdXJyZW50Q29sKTtcbiAgICAgIHRoaXMuYXR0aWxhKGN1cnJlbnRSb3csIGN1cnJlbnRDb2wsIGF0dGlsYUNvdW50KTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtb3ZlUmlnaHQocGllY2UpIHtcbiAgbGV0IHRyYW5zID0gY2FsY1RyYW5zbGF0ZShwaWVjZSk7XG4gIGxldCB0cmFuc1ggPSBgdHJhbnNsYXRlWCgke3RyYW5zfXB4KWA7XG5cbiAgY29uc3QgZWZmZWN0ID0gW3sgdHJhbnNmb3JtOiB0cmFuc1ggfV07XG5cbiAgcGllY2UuYW5pbWF0ZShlZmZlY3QsIGdldFRpbWluZygpKTtcbiAgYXdhaXQgc2xlZXAoNDk1KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbW92ZUxlZnQocGllY2UpIHtcbiAgbGV0IHRyYW5zID0gY2FsY1RyYW5zbGF0ZShwaWVjZSk7XG4gIGxldCB0cmFuc1ggPSBgdHJhbnNsYXRlWCgtJHt0cmFuc31weClgO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNYIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDQ5NSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVVcChwaWVjZSkge1xuICBsZXQgdHJhbnMgPSBjYWxjVHJhbnNsYXRlKHBpZWNlKTtcbiAgbGV0IHRyYW5zWSA9IGB0cmFuc2xhdGVZKC0ke3RyYW5zfXB4KWA7XG5cbiAgY29uc3QgZWZmZWN0ID0gW3sgdHJhbnNmb3JtOiB0cmFuc1kgfV07XG5cbiAgcGllY2UuYW5pbWF0ZShlZmZlY3QsIGdldFRpbWluZygpKTtcbiAgYXdhaXQgc2xlZXAoNDk1KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbW92ZURvd24ocGllY2UpIHtcbiAgbGV0IHRyYW5zID0gY2FsY1RyYW5zbGF0ZShwaWVjZSk7XG4gIGxldCB0cmFuc1kgPSBgdHJhbnNsYXRlWSgke01hdGguZmxvb3IodHJhbnMpfXB4KWA7XG5cbiAgY29uc3QgZWZmZWN0ID0gW3sgdHJhbnNmb3JtOiB0cmFuc1kgfV07XG5cbiAgcGllY2UuYW5pbWF0ZShlZmZlY3QsIGdldFRpbWluZygpKTtcbiAgYXdhaXQgc2xlZXAoNDg1KTtcbn1cblxuZnVuY3Rpb24gZ2V0VGltaW5nKCkge1xuICBjb25zdCB0aW1pbmcgPSB7XG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBpdGVyYXRpb25zOiAxLFxuICB9O1xuICByZXR1cm4gdGltaW5nO1xufVxuXG5mdW5jdGlvbiBjYWxjVHJhbnNsYXRlKHBpZWNlKSB7XG4gIC8vIGl0IHNlZW1zIHRoZSBkaXYgd2lkdGggKyAzMCAlIG1ha2VzIHRoZSBhbmltYXRpb24gc21vb3RoZXJcbiAgbGV0IHBvc2l0aW9uSW5mbyA9IHBpZWNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBsZXQgdHJhbnMgPSBNYXRoLmZsb29yKHBhcnNlSW50KHBvc2l0aW9uSW5mby53aWR0aCkgKiAxLjMpO1xuXG4gIHJldHVybiB0cmFucztcbn1cblxuZXhwb3J0IHsgQ2hlc3Nib2FyZCB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmNsYXNzIENvb3JkcyB7XG4gIC8vIENvb3JkcyBvYmplY3QgY29udGFpbiByb3cgYW5kIGNvbFxuICBjb25zdHJ1Y3RvcihyLCBjKSB7XG4gICAgdGhpcy5yb3cgPSBwYXJzZUludChyKTtcbiAgICB0aGlzLmNvbCA9IHBhcnNlSW50KGMpO1xuICB9XG5cbiAgY29tcGFyZShjb29yZHMpIHtcbiAgICBpZiAodGhpcy5yb3cgPT09IGNvb3Jkcy5yb3cgJiYgdGhpcy5jb2wgPT09IGNvb3Jkcy5jb2wpIHJldHVybiB0cnVlO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWRkKGNvb3Jkcykge1xuICAgIC8vIFdlIGFkZCB0d28gY29vcmRzIHRvZ2V0aGVyXG4gICAgdGhpcy5yb3cgKz0gcGFyc2VJbnQoY29vcmRzLnJvdyk7XG4gICAgdGhpcy5jb2wgKz0gcGFyc2VJbnQoY29vcmRzLmNvbCk7XG4gIH1cblxuICAvLyB0aGUgdHJlZSBpcyB0aGUgb25lIHdobyBkZWZpbmVzIHRoZSBib3VuZHMgb2Ygd2hhdCBpcyB2YWxpZCBhbmQgd2hhdCBub3QgZGVwZW5kaW5nIG9uIGl0cyBvd24gcnVsZXMgKHJpZ2h0IG5vdywgS25pZ2h0IGNoZXNzIG1vdmVtZW50KVxuICAvLyAgIHZhbGlkKCkge1xuICAvLyAgICAgLy8gd2UgdmFsaWRhdGUgdGhlIGNvb3JkaW5hdGVzIG9mIHRoaXMgb2JqZWN0XG4gIC8vICAgICBpZiAodGhpcy5yb3cgPCAwIHx8IHRoaXMuY29sIDwgMCB8fCB0aGlzLnJvdyA+IDcgfHwgdGhpcy5jb2wgPiA3KVxuICAvLyAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gICAgIHJldHVybiB0cnVlO1xuICAvLyAgIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ3JvdzogJyArIHRoaXMucm93ICsgJyB8IGNvbDogJyArIHRoaXMuY29sO1xuICB9XG5cbiAgY29weShjb29yZHMpIHtcbiAgICB0aGlzLnJvdyA9IHBhcnNlSW50KGNvb3Jkcy5yb3cpO1xuICAgIHRoaXMuY29sID0gcGFyc2VJbnQoY29vcmRzLmNvbCk7XG4gIH1cbn1cblxuY2xhc3MgTm9kZSB7XG4gIC8vIEEgbm9kZSBpcyBmb3JtZWQgb2YgYW4gb2JqZWN0IGNvb3JkcyBhbmQgYW4gYXJyYXkgb2YgY29ubmVjdGVkIG5vZGVzXG4gIC8vIGVzc2VudGlhbGx5IHdlIGdldCBjb29yZHMgcGF0aGluZyB0byBvdGhlciBjb29yZHMgdW50aWwgbnVsbC5cbiAgY29uc3RydWN0b3IoY29vcmRzLCBkZXB0aCwgbmV4dE5vZGVzKSB7XG4gICAgaWYgKGNvb3JkcyAhPSBudWxsKSB0aGlzLmNvb3JkcyA9IGNvb3JkcztcbiAgICBpZiAoZGVwdGggIT0gbnVsbCkgdGhpcy5kZXB0aCA9IGRlcHRoO1xuICAgIGlmIChuZXh0Tm9kZXMgIT0gbnVsbCkgdGhpcy5uZXh0Tm9kZXMgPSBuZXh0Tm9kZXM7XG4gIH1cblxuICBhZGRQYXRoKG5vZGUpIHtcbiAgICBpZiAodGhpcy5uZXh0Tm9kZXMgPT0gbnVsbCB8fCB0aGlzLm5leHROb2Rlcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLm5leHROb2RlcyA9IFtub2RlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZXh0Tm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlTnVsbHMoKSB7XG4gICAgaWYgKHRoaXMubmV4dE5vZGVzID09IG51bGwpIHtcbiAgICAgIHRoaXMubmV4dE5vZGVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBhdXhMaXN0ID0gW107XG4gICAgICB0aGlzLm5leHROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIGF1eExpc3QucHVzaChub2RlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5uZXh0Tm9kZXMgPSBhdXhMaXN0O1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDaGVzc3RyZWUge1xuICAvLyB0aGUgQ2hlc3N0cmVlIHJlY2VpdmVzIHRoaXMgcGFyYW1ldGVycyB0byB3b3JrOlxuICAvLyAxLT4gT3JpZ2luIENvb3JkaW5hdGVzLCBvdXIgc3RhcnRpbmcgcG9pbnQuXG4gIC8vIDItPiBEZXN0aW5peSBDb29yZGluYXRlcywgb3VyIGZpbmFsIHBvaW50LlxuICAvLyAzLT4gdHlwZSAoZm9yIG5vdywgb25seSBLbmlnaHQgaXMgYXZhaWxhYmxlKSwgZGVmaW5lcyB0aGUgcnVsZXMgd2hpY2ggd2lsbCBldmFsdWF0ZSBpZiBjb29yZGluYXRlcyBhcmUgdmFsaWQgb3Igbm90XG5cbiAgbGlzdE9mQ29vcmRpbmF0ZXMgPSBbXTtcbiAgZGVzdGluYXRpb25SZWFjaGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iob0MsIGRDLCB0eXBlKSB7XG4gICAgLy8gb0MgLT4gT3JpZ2luIENvb3JkcywgZEMgLS0+IERlc3RpbnkgQ29vcmRzXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmNyZWF0ZU5vZGUob0MsIG51bGwpO1xuICAgIGlmIChvQyAhPT0gZEMpIHtcbiAgICAgIHRoaXMuYnVpbGRUcmVlKFt0aGlzLnJvb3RdLCAwLCBkQyk7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzLnRyaW1UcmVlKHRoaXMucm9vdCwgZEMpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkVHJlZShub2RlTGlzdCwgZGVwdGgsIGRDKSB7XG4gICAgaWYgKG5vZGVMaXN0ID09IG51bGwpIHJldHVybjsgLy8gZ3VhcmQgY2xhdXNlXG4gICAgbGV0IG5leHROb2RlTGlzdCA9IFtdO1xuICAgIGxldCBpLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbm9kZSA9IG5vZGVMaXN0W2ldO1xuICAgICAgLy8gRm9yIGVhY2ggbm9kZSBvZiB0aGUgbm9kZSBsaXN0IHdlJ3JlIGdvbm5hIGNoZWNrIGlmIGFueSBvZiB0aGUgY2hpbGRzIGlzIG91ciBkZXN0aW5hdGlvbi5cbiAgICAgIC8vIHRoZW4gd2Ugd2lsbCBzdG9wIGluIG91ciB0cmFja3MuXG5cbiAgICAgIGxldCBtb3ZlcyA9IHRoaXMuZ2V0TW92ZW1lbnRzKG5vZGUuY29vcmRzKTtcblxuICAgICAgaWYgKG1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG1vdmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgbGV0IG1vdmUgPSBtb3Zlc1tqXTtcblxuICAgICAgICAgIGlmICghdGhpcy5pc0R1cGxpY2F0ZShtb3ZlLCB0aGlzLmxpc3RPZkNvb3JkaW5hdGVzKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRMaXN0KG1vdmUpOyAvLyB3ZSBwdXQgdGhpcyBjb29yZHMgYXMgYWxyZWFkcnkgdHJlYXRlZFxuXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNyZWF0ZU5vZGUobW92ZSwgZGVwdGggKyAxLCBudWxsKTtcbiAgICAgICAgICAgIG5vZGUuYWRkUGF0aChjaGlsZCk7XG4gICAgICAgICAgICAvLyB3ZSBjaGVjayBpZiBpdCdzIG91ciBkZXN0aW5hdGlvblxuICAgICAgICAgICAgaWYgKGNoaWxkLmNvb3Jkcy5jb21wYXJlKGRDKSkge1xuICAgICAgICAgICAgICAvLyBXZSByZWFjaGVkIG91ciBkZXN0aW5hdGlvbiwgaG9vcnJheVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHROb2RlTGlzdC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc2luY2Ugd2UgaGF2ZSBub3QgZm91bmQgdGhlIGRlc3RpbmF0aW9uLCB3ZSBtdXN0IHRyYXZlbCB0byB0aGUgbmV4dCBsZXZlbFxuICAgIGlmIChuZXh0Tm9kZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5idWlsZFRyZWUobmV4dE5vZGVMaXN0LCBkZXB0aCArIDEsIGRDKTtcbiAgICB9XG4gIH1cblxuICB0cmltVHJlZShub2RlLCBkQykge1xuICAgIGlmIChub2RlLmNvb3Jkcy5jb21wYXJlKGRDKSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubmV4dE5vZGVzICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5uZXh0Tm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZS5uZXh0Tm9kZXNbaV0gPSB0aGlzLnRyaW1UcmVlKG5vZGUubmV4dE5vZGVzW2ldLCBkQyk7XG4gICAgICB9XG4gICAgICBub2RlLnJlbW92ZU51bGxzKCk7XG4gICAgICBpZiAobm9kZS5uZXh0Tm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzRHVwbGljYXRlKHZhbHVlLCBhcnIyKSB7XG4gICAgLy8gd2UgY2hlY2sgaWYgYXJyYXkgMiBoYXMgdmFsdWUgaW4gaXRzIGVsZW1lbnRzXG4gICAgcmV0dXJuIGFycjIuc29tZSgoZSkgPT4ge1xuICAgICAgaWYgKGUucm93ID09PSB2YWx1ZS5yb3cgJiYgZS5jb2wgPT09IHZhbHVlLmNvbCkgcmV0dXJuIHRydWU7XG4gICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkKGMpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAna25pZ2h0JylcbiAgICAgIC8vIHBlcnNvbmFsIHJ1bGVzIG9mIHRoZSBrbmlnaHQgcGllY2UgKGluIHRoaXMgY2FzZSwgcnVsZXMgb2YgdGhlIGNoZXNzYm9hcmQpXG4gICAgICByZXR1cm4gdGhpcy52YWxpZEtuaWdodChjKTtcblxuICAgIC8vIGlmIG5vdCByZXR1cm5lZCB0cnVlIHRpbGwgaGVyZSwgaXQncyBmYWxzZVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkS25pZ2h0KGMpIHtcbiAgICAvLyB3ZSB2YWxpZGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhpcyBvYmplY3RcbiAgICBpZiAoYy5yb3cgPCAwIHx8IGMuY29sIDwgMCB8fCBjLnJvdyA+IDcgfHwgYy5jb2wgPiA3KSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldE1vdmVtZW50cyhjKSB7XG4gICAgLy8gYyAtLT4gY29vcmRzXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2tuaWdodCcpIHJldHVybiB0aGlzLmdldEtuaWdodE1vdmVtZW50cyhjKTtcblxuICAgIC8vIGlmIHdlIGhhdmUgcmVhY2hlZCBoZXJlIGFuZCBub3QgZm91bmQgYSB2YWxpZCB0eXBlLCB3ZSBzaG91bGQgdGhyb3cgYW4gZXJyb3IuXG4gICAgLy8gc2luY2Ugd2UncmUgdG9vIGxhenkgZm9yIHRoYXQsIHdlJ3JlIGdvbm5hIHJldHVybiBudWxsLiBPdXIgdHJlZSB3aWxsIGJlIHZlcnkgc2hvcnQuXG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGdldEtuaWdodE1vdmVtZW50cyhjKSB7XG4gICAgLy8gVGhlIGtuaWdodCBjYW4gbW92ZSB0byBlaWdodCBwb3NpdGlvbnM6XG4gICAgLy8gKzEgcm93LCArMiBjb2xcbiAgICAvLyArMSByb3csIC0yIGNvbFxuICAgIC8vICsyIHJvdywgKzEgY29sXG4gICAgLy8gKzIgcm93LCAtMSBjb2xcbiAgICAvLyAtMSByb3csICsyIGNvbFxuICAgIC8vIC0xIHJvdywgLTIgY29sXG4gICAgLy8gLTIgcm93LCArMSBjb2xcbiAgICAvLyAtMiByb3csIC0xIGNvbFxuICAgIGNvbnN0IG1vdmVtZW50cyA9IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMiwgLTEpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKC0yLCArMSkpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoLTEsIC0yKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMSwgKzIpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsxLCAtMikpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoKzEsICsyKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygrMiwgLTEpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsyLCArMSkpO1xuXG4gICAgbW92ZW1lbnRzLmZvckVhY2goKG1vdmUpID0+IHtcbiAgICAgIGNvbnN0IGF1eENvb3JkcyA9IG5ldyBDb29yZHMoKTtcbiAgICAgIGF1eENvb3Jkcy5jb3B5KGMpO1xuICAgICAgYXV4Q29vcmRzLmFkZChtb3ZlKTtcbiAgICAgIGlmICh0aGlzLnZhbGlkKGF1eENvb3JkcykpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXV4Q29vcmRzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdCA6IG51bGw7XG4gIH1cblxuICBjcmVhdGVOb2RlKGNvb3JkcywgZGVwdGgsIG5leHRDb29yZHMpIHtcbiAgICAvLyBpdCB1c2VkIHRvIGRvIHRoaW5ncyBiZWZvcmUgbmV3IE5vZGUgbG9sLlxuICAgIHJldHVybiBuZXcgTm9kZShjb29yZHMsIGRlcHRoLCBuZXh0Q29vcmRzKTtcbiAgfVxuXG4gIGFkZExpc3QoY29vcmRzKSB7XG4gICAgdGhpcy5saXN0T2ZDb29yZGluYXRlcy5wdXNoKGNvb3Jkcyk7XG4gICAgdGhpcy5zb3J0TGlzdCgpO1xuICB9XG5cbiAgc29ydExpc3QoKSB7XG4gICAgdGhpcy5saXN0T2ZDb29yZGluYXRlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBpZiAoYS5yb3cgPCBiLnJvdykgcmV0dXJuIC0xO1xuICAgICAgaWYgKGEucm93ID4gYi5yb3cpIHJldHVybiAxO1xuICAgICAgaWYgKGEuY29sIDwgYi5jb2wpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmNvbCA+IGIuY29sKSByZXR1cm4gMTtcblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGxldCBwYXRoID0gW107XG4gICAgbGV0IG5vZGUgPSB0aGlzLnJvb3Q7XG5cbiAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICBwYXRoLnB1c2gobm9kZS5jb29yZHMpO1xuXG4gICAgICBpZiAobm9kZS5uZXh0Tm9kZXMgIT0gbnVsbClcbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dE5vZGVzWzBdOyAvLyBzaG91bGQgb25seSBoYXZlIG9uZSBwYXRoXG4gICAgICBlbHNlIG5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoO1xuICB9XG59XG5cbmV4cG9ydCB7IENvb3JkcywgQ2hlc3N0cmVlIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vaW1nL3BhdGgucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiI2NoZXNzYm9hcmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1NiwgMTUzLCAxNTApO1xcbiAgd2lkdGg6IDYwdnc7XFxuICBtYXgtd2lkdGg6IDYwMHB4O1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1nYXA6IDA7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XFxufVxcblxcbi5jZWxsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxufVxcblxcbi53aGl0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NSwgMjQ1LCAyNDUsIDAuNDU5KTtcXG59XFxuXFxuLmJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDksIDQ3LCA0NywgMC42NDQpO1xcbn1cXG5cXG4uYXR0aWxhLXJlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTZhNmE2O1xcbn1cXG5cXG4uYXR0aWxhLWJsYWNrIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG4ua25pZ2h0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA4MCU7XFxuICBmbG9hdDogaW5saW5lLWVuZDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9jaGVzcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0Usb0NBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EscUNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0FBREY7O0FBV0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFSRjs7QUFXQTtFQUNFLDRDQUFBO0FBUkY7O0FBV0E7RUFDRSx5Q0FBQTtBQVJGOztBQVVBO0VBQ0UseUJBQUE7QUFQRjs7QUFTQTtFQUNFLHlEQUFBO0VBQ0Esc0JBQUE7QUFORjs7QUFTQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0FBTkZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLy9Gb3Igb3VyIGNoZXNzIGJvYXJkIHdlIGhhdmUgdGhlIGNoZXNzYm9hcmQgY29udGFpbmVyLCB0aGUgY2VsbCBjbGFzcywgdGhlIGJsYWNrIGNsYXNzLCB0aGUgd2hpdGUgY2xhc3NcXG5cXG4jY2hlc3Nib2FyZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTU2LCAxNTMsIDE1MCk7XFxuICB3aWR0aDogNjB2dztcXG4gIG1heC13aWR0aDogNjAwcHg7XFxuICBib3JkZXI6IDFweCBibGFjayBzb2xpZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWdhcDogMDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IHJvdztcXG4gIC8vICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICAvL2FsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi8vIC5jZWxsIHtcXG4vLyAgIGJvcmRlcjogMXB4IGJsYWNrIGRhc2hlZDtcXG4vLyAgIGhlaWdodDogNXZoO1xcbi8vICAgd2lkdGg6IDV2dztcXG4vLyB9XFxuXFxuLmNlbGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG59XFxuXFxuLndoaXRlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ1LCAyNDUsIDI0NSwgMC40NTkpO1xcbn1cXG5cXG4uYmxhY2sge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0OSwgNDcsIDQ3LCAwLjY0NCk7XFxufVxcbi5hdHRpbGEtcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhNmE2YTY7XFxufVxcbi5hdHRpbGEtYmxhY2sge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9pbWcvcGF0aC5wbmcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbi5rbmlnaHQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDgwJTtcXG4gIGZsb2F0OiBpbmxpbmUtZW5kO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2ltZy9iYWNrZ3JvdW5kLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9ub3JzZSk7XCJdKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBtYXJnaW46IDBweDtcXG59XFxuXFxuI21haW4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5LCAxOSwgNDYpO1xcbiAgcGFkZGluZzogMjVweDtcXG59XFxuI2hlYWRlciAjbG9nbyA+IGltZyB7XFxuICBoZWlnaHQ6IDEwdmg7XFxufVxcbiNoZWFkZXIgI2xvZ28ge1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4jaGVhZGVyICN0aXRsZS10ZXh0IHtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1zaXplOiA1dmg7XFxuICBmb250LWZhbWlseTogXFxcIk5vcnNlXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbi1sZWZ0OiAzNXB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuXFxuI3RleHQtZXhwbGFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NTIpO1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDVweDtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuXFxuI3VzZXItZmVlZGJhY2sge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgd2lkdGg6IDg1dnc7XFxuICBtaW4taGVpZ2h0OiAxMHZoO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LWZhbWlseTogXFxcIkNvdXJpZXIgTmV3XFxcIiwgQ291cmllciwgbW9ub3NwYWNlO1xcbn1cXG5cXG4jcmVzdGFydCB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGhlaWdodDogNDBweDtcXG4gIHBhZGRpbmc6IDEycHggMTdweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIxNiwgMjE2LCAyMTYsIDAuODE1Njg2Mjc0NSk7XFxuICBjb2xvcjogIzIyMjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxufVxcbiNyZXN0YXJ0OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMzQsIDM0LCAzNCwgMC45NDUwOTgwMzkyKTtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2dlbmVyYWwuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLHlEQUFBO0VBQ0Esc0JBQUE7RUFDQSw0QkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlDQUFBO0VBQ0EsYUFBQTtBQUFGO0FBRUU7RUFDRSxZQUFBO0FBQUo7QUFFRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUFKO0FBRUU7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxnQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUFKOztBQUlBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsOENBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1EQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQURGO0FBR0U7RUFDRSxnREFBQTtFQUNBLGlCQUFBO0FBREpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9ub3JzZScpO1xcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9pbWcvYmFja2dyb3VuZC5qcGcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIG1hcmdpbjogMHB4O1xcbn1cXG5cXG4jbWFpbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTksIDE5LCA0Nik7XFxuICBwYWRkaW5nOiAyNXB4O1xcblxcbiAgI2xvZ28gPiBpbWcge1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxuICB9XFxuICAjbG9nbyB7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxuICAjdGl0bGUtdGV4dCB7XFxuICAgIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgICBmb250LXNpemU6IDV2aDtcXG4gICAgZm9udC1mYW1pbHk6ICdOb3JzZScsIHNhbnMtc2VyaWY7XFxuICAgIG1hcmdpbi1sZWZ0OiAzNXB4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICB9XFxufVxcblxcbiN0ZXh0LWV4cGxhaW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDUyKTtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XFxufVxcblxcbiN1c2VyLWZlZWRiYWNrIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIHdpZHRoOiA4NXZ3O1xcbiAgbWluLWhlaWdodDogMTB2aDtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1mYW1pbHk6ICdDb3VyaWVyIE5ldycsIENvdXJpZXIsIG1vbm9zcGFjZTtcXG59XFxuXFxuI3Jlc3RhcnQge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG91dGxpbmU6IDA7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBwYWRkaW5nOiAxMnB4IDE3cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q4ZDhkOGQwO1xcbiAgY29sb3I6ICMyMjI7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcblxcbiAgJjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjIyMjJmMTtcXG4gICAgY29sb3I6IHdoaXRlc21va2U7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY2hlc3Muc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NoZXNzLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dlbmVyYWwuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2dlbmVyYWwuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vJ3VzZSBzdHJpY3QnO1xuaW1wb3J0ICcuL3N0eWxlcy9nZW5lcmFsLnNjc3MnO1xuaW1wb3J0ICcuL3N0eWxlcy9jaGVzcy5zY3NzJztcbmltcG9ydCBvZGluIGZyb20gJy4vaW1nL29kaW4ucG5nJztcbmltcG9ydCB7IENvb3JkcywgQ2hlc3N0cmVlIH0gZnJvbSAnLi9jb2RlL2tuaWdodC5qcyc7XG5pbXBvcnQgeyBDaGVzc2JvYXJkIH0gZnJvbSAnLi9jb2RlL2NoZXNzYm9hcmQuanMnO1xuXG4vLyB3ZSBkZWZpbmUgdGhlIHZhcmlhYmxlcyB0aGF0IGFyZSBnb25uYSBtYWtlIGFsbCB0aGlzIHdvcmtcbmxldCBzdGFydENlbGwgPSB7fTtcbmxldCBmaW5hbENlbGwgPSB7fTtcbmNvbnN0IGNoZXNzYm9hcmQgPSBuZXcgQ2hlc3Nib2FyZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlc3Nib2FyZCcpKTtcbmNoZXNzYm9hcmQuY3JlYXRlQm9hcmQoKTtcbi8vIFdlIHNldCB0aGUgbGlzdGVuZXJzIGZvciBlYWNoIENlbGxcbnNldENlbGxMaXN0ZW5lcnMoKTtcblxuLy8gd2Ugc2V0IHRoZSBsb2dvIHNvdXJjZSB3aXRoIHRoaXMuLi5zZWVtcyB1c2luZyBucG0gbWFrZXMgaXQgaGFyZCB0byBkaXJlY3RseSBpbmplY3QgaXQgaW4gdGhlIGh0bWxcbmNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2RpbicpO1xubG9nby5zcmMgPSBvZGluO1xuXG4vLyB3ZSBzZXQgdGhlIGxpc3RlbmVyIHRvIHRoZSByZXN0YXJ0IGJ1dHRvblxuY29uc3QgcmVzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0Jyk7XG5yZXN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICByZXN0YXJ0TGlzdGVuZXIoKTtcbn0pO1xuXG5mdW5jdGlvbiByZXN0YXJ0TGlzdGVuZXIoKSB7XG4gIGNoZXNzYm9hcmQucmVzZXQoKTtcbiAgc2V0Q2VsbExpc3RlbmVycygpO1xuICBjb25zdCB1c2VyRmVlZGJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1mZWVkYmFjaycpO1xuICB1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPSAnQ2hvb3NlIGEgY2VsbCB0byBzdGFydCEnO1xufVxuZnVuY3Rpb24gc2V0Q2VsbExpc3RlbmVycygpIHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbaWRePWNlbGwnKTtcbiAgaWYgKGNlbGxzID09IG51bGwpIHJldHVybjtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudENlbGwpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZXZlbnRDZWxsKGUpIHtcbiAgLy8gaWYgdGhlIHVzZXIgY2xpY2tlZCBvbiBhIGNlbGwgdGhlcmUgYXJlIHBvc3NpYmxlIHNjZW5hcmlvczpcbiAgLy8gQm9hcmQgaXMgZW1wdHksIHdoaWNoIG1lYW5zIHdlJ3JlIHB1dHRpbmcgdGhlIHN0YXJ0aW5nIGNvb3JkZW5hdGVzXG4gIC8vIEJvYXJkIGhhcyBvbmUga25pZ2h0LCB3aGljaCBtZWFucyB3ZSdyZSBwdXR0aW5nIHRoZSBmaW5hbCBjb29yZGluYXRlc1xuICAvLyB1c2VyIGlzIG1lc3Npbmcgd2l0aCB0aGUgYm9hcmQgYW5kIGNsaWNraW5nIHdoZW4gaGUgc2hvdWxkbnQuLi5cbiAgY29uc3QgdXNlckZlZWRiYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItZmVlZGJhY2snKTtcbiAgY29uc3QgY3VycmVudENlbGwgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gIGNvbnN0IHJvdyA9IGN1cnJlbnRDZWxsLmdldEF0dHJpYnV0ZSgncm93Jyk7XG4gIGNvbnN0IGNvbCA9IGN1cnJlbnRDZWxsLmdldEF0dHJpYnV0ZSgnY29sJyk7XG4gIGlmIChjdXJyZW50Q2VsbC5maXJzdENoaWxkKSB7XG4gICAgLy8gd2UgYWxyZWFkeSBoYXZlIGEga25pZ2h0XG4gICAgdXNlckZlZWRiYWNrLnRleHRDb250ZW50ID1cbiAgICAgIFwiVGhlIGRlc3RpbmF0aW9uIGNhbid0IGJlIHRoZSBzYW1lIGFzIHRoZSBzdGFydCFcIjtcbiAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICB1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPSAnQ2hvb3NlIGEgZGVzdGluYXRpb24hJztcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodXNlckZlZWRiYWNrLnRleHRDb250ZW50ID09PSAnQ2hvb3NlIGEgY2VsbCB0byBzdGFydCEnKSB7XG4gICAgc3RhcnRDZWxsID0gbmV3IENvb3Jkcyhyb3csIGNvbCk7XG4gICAgdXNlckZlZWRiYWNrLnRleHRDb250ZW50ID0gJ0hpcmluZyBhIEtuaWdodC4uLic7XG4gICAgY2hlc3Nib2FyZC5zZXRLbmlnaHQocm93LCBjb2wpO1xuICAgIGF3YWl0IHNsZWVwKDI1MCk7XG4gICAgdXNlckZlZWRiYWNrLnRleHRDb250ZW50ID0gJ0Nob29zZSBhIGRlc3RpbmF0aW9uISc7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9PT0gJ0Nob29zZSBhIGRlc3RpbmF0aW9uIScpIHtcbiAgICBmaW5hbENlbGwgPSBuZXcgQ29vcmRzKHJvdywgY29sKTtcblxuICAgIGNvbnN0IGtuaWdodFRyZWUgPSBuZXcgQ2hlc3N0cmVlKHN0YXJ0Q2VsbCwgZmluYWxDZWxsLCAna25pZ2h0Jyk7XG4gICAgbGV0IG1vdmVzID0ga25pZ2h0VHJlZS5nZXRQYXRoKCk7XG5cbiAgICB1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPSBtb3Zlc1RleHQobW92ZXMpO1xuICAgIGNoZXNzYm9hcmQubW92ZUtuaWdodChtb3Zlcyk7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vdmVzVGV4dChtb3Zlcykge1xuICBsZXQgc3AgPSAnWycgKyBzdGFydENlbGwucm93ICsgJywnICsgc3RhcnRDZWxsLmNvbCArICddJztcbiAgbGV0IGZwID0gJ1snICsgZmluYWxDZWxsLnJvdyArICcsJyArIGZpbmFsQ2VsbC5jb2wgKyAnXSc7XG4gIGxldCBzdHIxID0gYD4ga25pZ2h0TW92ZXMoJHtzcH0sICR7ZnB9KSA9PiBcXG5gO1xuICBsZXQgc3RyMiA9ICcnO1xuICBsZXQgc3RyMyA9ICdcXG4nO1xuICBsZXQgY20gPSAtMTsgLy8gY291bnQgbW92ZXMsIC0xIHRvIG5vdCBjb3VudCBzdGFydGluZyBwb3NpdGlvblxuXG4gIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcbiAgICBzdHIzICs9IGBbJHttb3ZlLnJvd30sJHttb3ZlLmNvbH1dIGA7XG4gICAgY20rKztcbiAgfSk7XG5cbiAgc3RyMiA9IGBcXG5Zb3UgbWFkZSBpdCBpbiAke2NtfSBtb3ZlcyEgSGVyZSdzIHlvdXIgcGF0aDogYDtcblxuICByZXR1cm4gc3RyMSArIHN0cjIgKyBzdHIzO1xufVxuXG5mdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cbiJdLCJuYW1lcyI6WyJ1bmljb3JuIiwiQ2hlc3Nib2FyZCIsImNvbnN0cnVjdG9yIiwibm9kZSIsImJvYXJkIiwiY3JlYXRlQm9hcmQiLCJjb2xzIiwicm93cyIsIm9iamJvYXJkIiwibmV3Q2VsbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlkIiwiU3RyaW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJyZXNldCIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInNldEtuaWdodCIsInIiLCJjIiwiY2VsbCIsImdldEVsZW1lbnRCeUlkIiwia25pZ2h0IiwiY3JlYXRlS25pZ2h0IiwiYXBwZW5kIiwic3JjIiwibW92ZUtuaWdodCIsIm1vdmVzIiwicXVlcnlTZWxlY3RvciIsImlSb3ciLCJnZXRBdHRyaWJ1dGUiLCJpQ29sIiwiYXR0aWxhQ291bnQiLCJjb3VudCIsImF0dGlsYSIsImkiLCJsZW5ndGgiLCJ4bW92ZUtuaWdodCIsInJvdyIsImNvbCIsInNsZWVwIiwicmVtb3ZlIiwiZlJvdyIsImZDb2wiLCJkaWZmUm93IiwiZGlmZkNvbCIsImN1cnJlbnRSb3ciLCJjdXJyZW50Q29sIiwibW92ZVVwIiwibW92ZURvd24iLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsIm1zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwicGllY2UiLCJ0cmFucyIsImNhbGNUcmFuc2xhdGUiLCJ0cmFuc1giLCJlZmZlY3QiLCJ0cmFuc2Zvcm0iLCJhbmltYXRlIiwiZ2V0VGltaW5nIiwidHJhbnNZIiwiTWF0aCIsImZsb29yIiwidGltaW5nIiwiZHVyYXRpb24iLCJpdGVyYXRpb25zIiwicG9zaXRpb25JbmZvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFyc2VJbnQiLCJ3aWR0aCIsIkNvb3JkcyIsImNvbXBhcmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsImNvcHkiLCJOb2RlIiwiZGVwdGgiLCJuZXh0Tm9kZXMiLCJhZGRQYXRoIiwicHVzaCIsInJlbW92ZU51bGxzIiwiYXV4TGlzdCIsImZvckVhY2giLCJDaGVzc3RyZWUiLCJvQyIsImRDIiwidHlwZSIsInJvb3QiLCJjcmVhdGVOb2RlIiwiYnVpbGRUcmVlIiwidHJpbVRyZWUiLCJub2RlTGlzdCIsIm5leHROb2RlTGlzdCIsImoiLCJnZXRNb3ZlbWVudHMiLCJtb3ZlIiwiaXNEdXBsaWNhdGUiLCJsaXN0T2ZDb29yZGluYXRlcyIsImFkZExpc3QiLCJjaGlsZCIsInZhbHVlIiwiYXJyMiIsInNvbWUiLCJlIiwidmFsaWQiLCJ2YWxpZEtuaWdodCIsImdldEtuaWdodE1vdmVtZW50cyIsIm1vdmVtZW50cyIsInJlc3VsdCIsImF1eENvb3JkcyIsIm5leHRDb29yZHMiLCJzb3J0TGlzdCIsInNvcnQiLCJhIiwiYiIsImdldFBhdGgiLCJwYXRoIiwib2RpbiIsInN0YXJ0Q2VsbCIsImZpbmFsQ2VsbCIsImNoZXNzYm9hcmQiLCJzZXRDZWxsTGlzdGVuZXJzIiwibG9nbyIsInJlc3RhcnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzdGFydExpc3RlbmVyIiwidXNlckZlZWRiYWNrIiwidGV4dENvbnRlbnQiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVudENlbGwiLCJjdXJyZW50Q2VsbCIsImN1cnJlbnRUYXJnZXQiLCJrbmlnaHRUcmVlIiwibW92ZXNUZXh0Iiwic3AiLCJmcCIsInN0cjEiLCJzdHIyIiwic3RyMyIsImNtIl0sInNvdXJjZVJvb3QiOiIifQ==