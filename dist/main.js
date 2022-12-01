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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  height: 100vh;\n  overflow-y: hidden;\n  margin: 0px;\n}\n\n#main-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#header {\n  display: flex;\n  align-items: center;\n  background-color: rgb(19, 19, 46);\n}\n#header #logo > img {\n  height: 10vh;\n}\n#header #logo {\n  margin-left: 10px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n}\n#header #title-text {\n  color: whitesmoke;\n  font-size: 5vh;\n  font-family: \"Norse\", sans-serif;\n  margin-left: 35px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n}\n\n#text-explain {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: whitesmoke;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  background-color: rgba(0, 0, 0, 0.452);\n  padding-left: 10px;\n  padding-bottom: 5px;\n  padding-top: 10px;\n  padding-right: 10px;\n}\n\n#user-feedback {\n  padding: 10px;\n  margin-top: 30px;\n  background-color: grey;\n  width: 85vw;\n  min-height: 10vh;\n  color: whitesmoke;\n  font-family: \"Courier New\", Courier, monospace;\n}\n\n#restart {\n  margin-top: 10px;\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  height: 40px;\n  padding: 12px 17px;\n  border-radius: 50px;\n  background-color: rgba(216, 216, 216, 0.8156862745);\n  color: #222;\n  font-size: 16px;\n  font-weight: 500;\n}\n#restart:hover {\n  background-color: rgba(34, 34, 34, 0.9450980392);\n  color: whitesmoke;\n}", "",{"version":3,"sources":["webpack://./src/styles/general.scss"],"names":[],"mappings":"AAEA;EACE,yDAAA;EACA,sBAAA;EACA,4BAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;AAAF;;AAGA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AAAF;;AAGA;EACE,aAAA;EACA,mBAAA;EACA,iCAAA;AAAF;AAEE;EACE,YAAA;AAAJ;AAEE;EACE,iBAAA;EACA,gBAAA;EACA,kBAAA;AAAJ;AAEE;EACE,iBAAA;EACA,cAAA;EACA,gCAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;AAAJ;;AAIA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;EACA,sCAAA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;EACA,mBAAA;AADF;;AAIA;EACE,aAAA;EACA,gBAAA;EACA,sBAAA;EACA,WAAA;EACA,gBAAA;EACA,iBAAA;EACA,8CAAA;AADF;;AAIA;EACE,gBAAA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;EACA,eAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,mDAAA;EACA,WAAA;EACA,eAAA;EACA,gBAAA;AADF;AAGE;EACE,gDAAA;EACA,iBAAA;AADJ","sourcesContent":["@import url('https://fonts.cdnfonts.com/css/norse');\n\nbody {\n  background-image: url('../img/background.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n  height: 100vh;\n  overflow-y: hidden;\n  margin: 0px;\n}\n\n#main-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#header {\n  display: flex;\n  align-items: center;\n  background-color: rgb(19, 19, 46);\n\n  #logo > img {\n    height: 10vh;\n  }\n  #logo {\n    margin-left: 10px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n  }\n  #title-text {\n    color: whitesmoke;\n    font-size: 5vh;\n    font-family: 'Norse', sans-serif;\n    margin-left: 35px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n  }\n}\n\n#text-explain {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: whitesmoke;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  background-color: rgba(0, 0, 0, 0.452);\n  padding-left: 10px;\n  padding-bottom: 5px;\n  padding-top: 10px;\n  padding-right: 10px;\n}\n\n#user-feedback {\n  padding: 10px;\n  margin-top: 30px;\n  background-color: grey;\n  width: 85vw;\n  min-height: 10vh;\n  color: whitesmoke;\n  font-family: 'Courier New', Courier, monospace;\n}\n\n#restart {\n  margin-top: 10px;\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  height: 40px;\n  padding: 12px 17px;\n  border-radius: 50px;\n  background-color: #d8d8d8d0;\n  color: #222;\n  font-size: 16px;\n  font-weight: 500;\n\n  &:hover {\n    background-color: #222222f1;\n    color: whitesmoke;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBRWEsSUFBSSxJQUFLO0lBQ3RCNEMsSUFBSSxJQUFLLElBQUc1QyxJQUFJLENBQUM3RCxHQUFJLElBQUc2RCxJQUFJLENBQUM1RCxHQUFJLElBQUc7SUFDcEN5RyxFQUFFLEVBQUU7RUFDTixDQUFDLENBQUM7RUFFRkYsSUFBSSxHQUFJLG9CQUFtQkUsRUFBRyw0QkFBMkI7RUFFekQsT0FBT0gsSUFBSSxHQUFHQyxJQUFJLEdBQUdDLElBQUk7QUFDM0I7QUFFQSxTQUFTdkcsS0FBSyxDQUFDWSxFQUFFLEVBQUU7RUFDakIsT0FBTyxJQUFJQyxPQUFPLENBQUVDLE9BQU8sSUFBS0MsVUFBVSxDQUFDRCxPQUFPLEVBQUVGLEVBQUUsQ0FBQyxDQUFDO0FBQzFELEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9jb2RlL2NoZXNzYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9zcmMvY29kZS9rbmlnaHQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9zcmMvc3R5bGVzL2NoZXNzLnNjc3MiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9zcmMvc3R5bGVzL2dlbmVyYWwuc2NzcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9zcmMvc3R5bGVzL2NoZXNzLnNjc3M/ZTkyMCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvZ2VuZXJhbC5zY3NzP2JiMjQiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5pbXBvcnQgdW5pY29ybiBmcm9tICcuLi9pbWcvdW5pY29ybiBrbmlnaHQucG5nJztcblxuY2xhc3MgQ2hlc3Nib2FyZCB7XG4gIGNvbnN0cnVjdG9yKG5vZGUpIHtcbiAgICB0aGlzLmJvYXJkID0gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZUJvYXJkKCkge1xuICAgIGxldCBjb2xzID0gMDtcbiAgICBsZXQgcm93cyA9IDA7XG4gICAgY29uc3Qgb2JqYm9hcmQgPSB0aGlzO1xuXG4gICAgd2hpbGUgKGNvbHMgPCA4ICYmIHJvd3MgPCA4KSB7XG4gICAgICBsZXQgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbmV3Q2VsbC5pZCA9IGBjZWxsLSR7U3RyaW5nKHJvd3MpfS0ke1N0cmluZyhjb2xzKX1gO1xuICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHJvd3MgJSAyID09PSAwICYmIGNvbHMgJSAyID09PSAwKSB8fFxuICAgICAgICAocm93cyAlIDIgIT09IDAgJiYgY29scyAlIDIgIT09IDApXG4gICAgICApIHtcbiAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCd3aGl0ZScpO1xuICAgICAgICAvL2NoZXNzQ29vcmRzW2NvbHNdW3Jvd3NdID0gJ1cnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdibGFjaycpO1xuICAgICAgICAvL2NoZXNzQ29vcmRzW2NvbHNdW3Jvd3NdID0gJ0InO1xuICAgICAgfVxuICAgICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoJ3JvdycsIHJvd3MpO1xuICAgICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoJ2NvbCcsIGNvbHMpO1xuICAgICAgLy8gbmV3Q2VsbC50ZXh0Q29udGVudCA9IGAke3Jvd3N9IC0gJHtjb2xzfWA7XG4gICAgICB0aGlzLmJvYXJkLmFwcGVuZENoaWxkKG5ld0NlbGwpO1xuICAgICAgY29scysrO1xuXG4gICAgICBpZiAoY29scyA+PSA4KSB7XG4gICAgICAgIGNvbHMgPSAwO1xuICAgICAgICByb3dzKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMuYm9hcmQ7XG4gICAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICB0aGlzLmNyZWF0ZUJvYXJkKCk7XG4gIH1cblxuICBzZXRLbmlnaHQociwgYykge1xuICAgIC8vIHIgc3RhbmRzIGZvciByb3dcbiAgICAvLyBjIHN0YW5kcyBmb3IgY29sXG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2VsbC0ke3J9LSR7Y31gKTtcbiAgICBsZXQga25pZ2h0ID0gdGhpcy5jcmVhdGVLbmlnaHQociwgYyk7XG4gICAgY2VsbC5hcHBlbmQoa25pZ2h0KTtcbiAgICByZXR1cm4ga25pZ2h0O1xuICB9XG5cbiAgY3JlYXRlS25pZ2h0KHIsIGMpIHtcbiAgICBsZXQga25pZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAga25pZ2h0LnNyYyA9IHVuaWNvcm47XG4gICAga25pZ2h0LmNsYXNzTGlzdC5hZGQoJ2tuaWdodCcpO1xuICAgIGtuaWdodC5pZCA9IGBrbmlnaHQtJHtyfS0ke2N9YDtcbiAgICBrbmlnaHQuc2V0QXR0cmlidXRlKCdyb3cnLCByKTtcbiAgICBrbmlnaHQuc2V0QXR0cmlidXRlKCdjb2wnLCBjKTtcbiAgICByZXR1cm4ga25pZ2h0O1xuICB9XG5cbiAgYXN5bmMgbW92ZUtuaWdodChtb3Zlcykge1xuICAgIGxldCBrbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbaWRePWtuaWdodCcpO1xuICAgIGxldCBpUm93ID0ga25pZ2h0LmdldEF0dHJpYnV0ZSgncm93Jyk7XG4gICAgbGV0IGlDb2wgPSBrbmlnaHQuZ2V0QXR0cmlidXRlKCdjb2wnKTtcbiAgICBsZXQgYXR0aWxhQ291bnQgPSB7IGNvdW50OiAwIH07XG4gICAgdGhpcy5hdHRpbGEoaVJvdywgaUNvbCwgYXR0aWxhQ291bnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF3YWl0IHRoaXMueG1vdmVLbmlnaHQoXG4gICAgICAgIGtuaWdodCxcbiAgICAgICAgaVJvdyxcbiAgICAgICAgaUNvbCxcbiAgICAgICAgbW92ZXNbaV0ucm93LFxuICAgICAgICBtb3Zlc1tpXS5jb2wsXG4gICAgICAgIGF0dGlsYUNvdW50XG4gICAgICApO1xuXG4gICAgICBpUm93ID0gbW92ZXNbaV0ucm93O1xuICAgICAgaUNvbCA9IG1vdmVzW2ldLmNvbDtcblxuICAgICAga25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkXj1rbmlnaHQnKTtcbiAgICAgIGF3YWl0IHNsZWVwKDUwMCk7XG4gICAgfVxuICB9XG5cbiAgYXR0aWxhKHIsIGMsIGNvdW50KSB7XG4gICAgLy8gXCJUaGUgZ3Jhc3MgZGlkIG5vdCBncm93IHdoZXJlIEF0dGlsYSBoYWQgcGFzc2VkXCJcbiAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjZWxsLSR7U3RyaW5nKHIpfS0ke1N0cmluZyhjKX1gKTtcbiAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3doaXRlJyk7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdibGFjaycpO1xuXG4gICAgaWYgKGNvdW50LmNvdW50ID09PSAwKSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2F0dGlsYS1yZWQnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYXR0aWxhLWJsYWNrJyk7XG4gICAgfSBlbHNlIGlmIChjb3VudC5jb3VudCAlIDMgPT09IDApIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYXR0aWxhLXJlZCcpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdhdHRpbGEtYmxhY2snKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdhdHRpbGEtcmVkJyk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGlsYS1ibGFjaycpO1xuICAgIH1cbiAgICBjb3VudC5jb3VudCsrO1xuICB9XG5cbiAgYXN5bmMgeG1vdmVLbmlnaHQoa25pZ2h0LCBpUm93LCBpQ29sLCBmUm93LCBmQ29sLCBhdHRpbGFDb3VudCkge1xuICAgIC8vIGlSb3cgLS0+IGluaXRpYWwgcm93XG4gICAgLy8gaUNvbCAtLT4gaW5pdGlhbCBDb2xcbiAgICAvLyBmUm93IC0tPiBmaW5hbCByb3dcbiAgICAvLyBmQ29sIC0tPiBmaW5hbCBjb2xcbiAgICBsZXQgaTtcbiAgICAvL2xldCBrbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbaWRePWtuaWdodCcpO1xuICAgIC8vbGV0IGtuaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBrbmlnaHQtJHtpUm93fS0ke2lDb2x9YCk7XG4gICAgbGV0IGRpZmZSb3cgPSBmUm93IC0gaVJvdzsgLy8gb2Zmc2V0IGluIHggYXhpc1xuICAgIGxldCBkaWZmQ29sID0gZkNvbCAtIGlDb2w7IC8vIG9mZnNldCBpbiB5IGF4aXNcbiAgICBsZXQgY3VycmVudFJvdyA9IGlSb3c7XG4gICAgbGV0IGN1cnJlbnRDb2wgPSBpQ29sO1xuXG4gICAgLy90aGlzLmF0dGlsYShjdXJyZW50Um93LCBjdXJyZW50Q29sLCBhdHRpbGFDb3VudCk7XG5cbiAgICBmb3IgKGkgPSBkaWZmUm93OyBpIDwgMDsgaSsrKSB7XG4gICAgICBjdXJyZW50Um93LS07XG4gICAgICBhd2FpdCBtb3ZlVXAoa25pZ2h0KTtcbiAgICAgIGtuaWdodC5yZW1vdmUoKTtcbiAgICAgIGtuaWdodCA9IHRoaXMuc2V0S25pZ2h0KGN1cnJlbnRSb3csIGN1cnJlbnRDb2wpO1xuICAgICAgdGhpcy5hdHRpbGEoY3VycmVudFJvdywgY3VycmVudENvbCwgYXR0aWxhQ291bnQpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGlmZlJvdzsgaSsrKSB7XG4gICAgICBjdXJyZW50Um93Kys7XG4gICAgICBhd2FpdCBtb3ZlRG93bihrbmlnaHQpO1xuICAgICAga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgICB0aGlzLmF0dGlsYShjdXJyZW50Um93LCBjdXJyZW50Q29sLCBhdHRpbGFDb3VudCk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gZGlmZkNvbDsgaSA8IDA7IGkrKykge1xuICAgICAgY3VycmVudENvbC0tO1xuICAgICAgYXdhaXQgbW92ZUxlZnQoa25pZ2h0KTtcbiAgICAgIGtuaWdodC5yZW1vdmUoKTtcbiAgICAgIGtuaWdodCA9IHRoaXMuc2V0S25pZ2h0KGN1cnJlbnRSb3csIGN1cnJlbnRDb2wpO1xuICAgICAgdGhpcy5hdHRpbGEoY3VycmVudFJvdywgY3VycmVudENvbCwgYXR0aWxhQ291bnQpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGlmZkNvbDsgaSsrKSB7XG4gICAgICBjdXJyZW50Q29sKys7XG4gICAgICBhd2FpdCBtb3ZlUmlnaHQoa25pZ2h0KTtcbiAgICAgIGtuaWdodC5yZW1vdmUoKTtcbiAgICAgIGtuaWdodCA9IHRoaXMuc2V0S25pZ2h0KGN1cnJlbnRSb3csIGN1cnJlbnRDb2wpO1xuICAgICAgdGhpcy5hdHRpbGEoY3VycmVudFJvdywgY3VycmVudENvbCwgYXR0aWxhQ291bnQpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gc2xlZXAobXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVSaWdodChwaWVjZSkge1xuICBsZXQgdHJhbnMgPSBjYWxjVHJhbnNsYXRlKHBpZWNlKTtcbiAgbGV0IHRyYW5zWCA9IGB0cmFuc2xhdGVYKCR7dHJhbnN9cHgpYDtcblxuICBjb25zdCBlZmZlY3QgPSBbeyB0cmFuc2Zvcm06IHRyYW5zWCB9XTtcblxuICBwaWVjZS5hbmltYXRlKGVmZmVjdCwgZ2V0VGltaW5nKCkpO1xuICBhd2FpdCBzbGVlcCg0OTUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtb3ZlTGVmdChwaWVjZSkge1xuICBsZXQgdHJhbnMgPSBjYWxjVHJhbnNsYXRlKHBpZWNlKTtcbiAgbGV0IHRyYW5zWCA9IGB0cmFuc2xhdGVYKC0ke3RyYW5zfXB4KWA7XG5cbiAgY29uc3QgZWZmZWN0ID0gW3sgdHJhbnNmb3JtOiB0cmFuc1ggfV07XG5cbiAgcGllY2UuYW5pbWF0ZShlZmZlY3QsIGdldFRpbWluZygpKTtcbiAgYXdhaXQgc2xlZXAoNDk1KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbW92ZVVwKHBpZWNlKSB7XG4gIGxldCB0cmFucyA9IGNhbGNUcmFuc2xhdGUocGllY2UpO1xuICBsZXQgdHJhbnNZID0gYHRyYW5zbGF0ZVkoLSR7dHJhbnN9cHgpYDtcblxuICBjb25zdCBlZmZlY3QgPSBbeyB0cmFuc2Zvcm06IHRyYW5zWSB9XTtcblxuICBwaWVjZS5hbmltYXRlKGVmZmVjdCwgZ2V0VGltaW5nKCkpO1xuICBhd2FpdCBzbGVlcCg0OTUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtb3ZlRG93bihwaWVjZSkge1xuICBsZXQgdHJhbnMgPSBjYWxjVHJhbnNsYXRlKHBpZWNlKTtcbiAgbGV0IHRyYW5zWSA9IGB0cmFuc2xhdGVZKCR7TWF0aC5mbG9vcih0cmFucyl9cHgpYDtcblxuICBjb25zdCBlZmZlY3QgPSBbeyB0cmFuc2Zvcm06IHRyYW5zWSB9XTtcblxuICBwaWVjZS5hbmltYXRlKGVmZmVjdCwgZ2V0VGltaW5nKCkpO1xuICBhd2FpdCBzbGVlcCg0ODUpO1xufVxuXG5mdW5jdGlvbiBnZXRUaW1pbmcoKSB7XG4gIGNvbnN0IHRpbWluZyA9IHtcbiAgICBkdXJhdGlvbjogNTAwLFxuICAgIGl0ZXJhdGlvbnM6IDEsXG4gIH07XG4gIHJldHVybiB0aW1pbmc7XG59XG5cbmZ1bmN0aW9uIGNhbGNUcmFuc2xhdGUocGllY2UpIHtcbiAgLy8gaXQgc2VlbXMgdGhlIGRpdiB3aWR0aCArIDMwICUgbWFrZXMgdGhlIGFuaW1hdGlvbiBzbW9vdGhlclxuICBsZXQgcG9zaXRpb25JbmZvID0gcGllY2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGxldCB0cmFucyA9IE1hdGguZmxvb3IocGFyc2VJbnQocG9zaXRpb25JbmZvLndpZHRoKSAqIDEuMyk7XG5cbiAgcmV0dXJuIHRyYW5zO1xufVxuXG5leHBvcnQgeyBDaGVzc2JvYXJkIH07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuY2xhc3MgQ29vcmRzIHtcbiAgLy8gQ29vcmRzIG9iamVjdCBjb250YWluIHJvdyBhbmQgY29sXG4gIGNvbnN0cnVjdG9yKHIsIGMpIHtcbiAgICB0aGlzLnJvdyA9IHBhcnNlSW50KHIpO1xuICAgIHRoaXMuY29sID0gcGFyc2VJbnQoYyk7XG4gIH1cblxuICBjb21wYXJlKGNvb3Jkcykge1xuICAgIGlmICh0aGlzLnJvdyA9PT0gY29vcmRzLnJvdyAmJiB0aGlzLmNvbCA9PT0gY29vcmRzLmNvbCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhZGQoY29vcmRzKSB7XG4gICAgLy8gV2UgYWRkIHR3byBjb29yZHMgdG9nZXRoZXJcbiAgICB0aGlzLnJvdyArPSBwYXJzZUludChjb29yZHMucm93KTtcbiAgICB0aGlzLmNvbCArPSBwYXJzZUludChjb29yZHMuY29sKTtcbiAgfVxuXG4gIC8vIHRoZSB0cmVlIGlzIHRoZSBvbmUgd2hvIGRlZmluZXMgdGhlIGJvdW5kcyBvZiB3aGF0IGlzIHZhbGlkIGFuZCB3aGF0IG5vdCBkZXBlbmRpbmcgb24gaXRzIG93biBydWxlcyAocmlnaHQgbm93LCBLbmlnaHQgY2hlc3MgbW92ZW1lbnQpXG4gIC8vICAgdmFsaWQoKSB7XG4gIC8vICAgICAvLyB3ZSB2YWxpZGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhpcyBvYmplY3RcbiAgLy8gICAgIGlmICh0aGlzLnJvdyA8IDAgfHwgdGhpcy5jb2wgPCAwIHx8IHRoaXMucm93ID4gNyB8fCB0aGlzLmNvbCA+IDcpXG4gIC8vICAgICAgIHJldHVybiBmYWxzZTtcblxuICAvLyAgICAgcmV0dXJuIHRydWU7XG4gIC8vICAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAncm93OiAnICsgdGhpcy5yb3cgKyAnIHwgY29sOiAnICsgdGhpcy5jb2w7XG4gIH1cblxuICBjb3B5KGNvb3Jkcykge1xuICAgIHRoaXMucm93ID0gcGFyc2VJbnQoY29vcmRzLnJvdyk7XG4gICAgdGhpcy5jb2wgPSBwYXJzZUludChjb29yZHMuY29sKTtcbiAgfVxufVxuXG5jbGFzcyBOb2RlIHtcbiAgLy8gQSBub2RlIGlzIGZvcm1lZCBvZiBhbiBvYmplY3QgY29vcmRzIGFuZCBhbiBhcnJheSBvZiBjb25uZWN0ZWQgbm9kZXNcbiAgLy8gZXNzZW50aWFsbHkgd2UgZ2V0IGNvb3JkcyBwYXRoaW5nIHRvIG90aGVyIGNvb3JkcyB1bnRpbCBudWxsLlxuICBjb25zdHJ1Y3Rvcihjb29yZHMsIGRlcHRoLCBuZXh0Tm9kZXMpIHtcbiAgICBpZiAoY29vcmRzICE9IG51bGwpIHRoaXMuY29vcmRzID0gY29vcmRzO1xuICAgIGlmIChkZXB0aCAhPSBudWxsKSB0aGlzLmRlcHRoID0gZGVwdGg7XG4gICAgaWYgKG5leHROb2RlcyAhPSBudWxsKSB0aGlzLm5leHROb2RlcyA9IG5leHROb2RlcztcbiAgfVxuXG4gIGFkZFBhdGgobm9kZSkge1xuICAgIGlmICh0aGlzLm5leHROb2RlcyA9PSBudWxsIHx8IHRoaXMubmV4dE5vZGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRoaXMubmV4dE5vZGVzID0gW25vZGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5leHROb2Rlcy5wdXNoKG5vZGUpO1xuICAgIH1cbiAgfVxuICByZW1vdmVOdWxscygpIHtcbiAgICBpZiAodGhpcy5uZXh0Tm9kZXMgPT0gbnVsbCkge1xuICAgICAgdGhpcy5uZXh0Tm9kZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGF1eExpc3QgPSBbXTtcbiAgICAgIHRoaXMubmV4dE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgIT0gbnVsbCkgYXV4TGlzdC5wdXNoKG5vZGUpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm5leHROb2RlcyA9IGF1eExpc3Q7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENoZXNzdHJlZSB7XG4gIC8vIHRoZSBDaGVzc3RyZWUgcmVjZWl2ZXMgdGhpcyBwYXJhbWV0ZXJzIHRvIHdvcms6XG4gIC8vIDEtPiBPcmlnaW4gQ29vcmRpbmF0ZXMsIG91ciBzdGFydGluZyBwb2ludC5cbiAgLy8gMi0+IERlc3Rpbml5IENvb3JkaW5hdGVzLCBvdXIgZmluYWwgcG9pbnQuXG4gIC8vIDMtPiB0eXBlIChmb3Igbm93LCBvbmx5IEtuaWdodCBpcyBhdmFpbGFibGUpLCBkZWZpbmVzIHRoZSBydWxlcyB3aGljaCB3aWxsIGV2YWx1YXRlIGlmIGNvb3JkaW5hdGVzIGFyZSB2YWxpZCBvciBub3RcblxuICBsaXN0T2ZDb29yZGluYXRlcyA9IFtdO1xuICBkZXN0aW5hdGlvblJlYWNoZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihvQywgZEMsIHR5cGUpIHtcbiAgICAvLyBvQyAtPiBPcmlnaW4gQ29vcmRzLCBkQyAtLT4gRGVzdGlueSBDb29yZHNcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuY3JlYXRlTm9kZShvQywgbnVsbCk7XG4gICAgaWYgKG9DICE9PSBkQykge1xuICAgICAgdGhpcy5idWlsZFRyZWUoW3RoaXMucm9vdF0sIDAsIGRDKTtcbiAgICAgIHRoaXMucm9vdCA9IHRoaXMudHJpbVRyZWUodGhpcy5yb290LCBkQyk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRUcmVlKG5vZGVMaXN0LCBkZXB0aCwgZEMpIHtcbiAgICBpZiAobm9kZUxpc3QgPT0gbnVsbCkgcmV0dXJuOyAvLyBndWFyZCBjbGF1c2VcbiAgICBsZXQgbmV4dE5vZGVMaXN0ID0gW107XG4gICAgbGV0IGksIGo7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBub2RlID0gbm9kZUxpc3RbaV07XG4gICAgICAvLyBGb3IgZWFjaCBub2RlIG9mIHRoZSBub2RlIGxpc3Qgd2UncmUgZ29ubmEgY2hlY2sgaWYgYW55IG9mIHRoZSBjaGlsZHMgaXMgb3VyIGRlc3RpbmF0aW9uLlxuICAgICAgLy8gdGhlbiB3ZSB3aWxsIHN0b3AgaW4gb3VyIHRyYWNrcy5cblxuICAgICAgbGV0IG1vdmVzID0gdGhpcy5nZXRNb3ZlbWVudHMobm9kZS5jb29yZHMpO1xuXG4gICAgICBpZiAobW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgbW92ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBsZXQgbW92ZSA9IG1vdmVzW2pdO1xuXG4gICAgICAgICAgaWYgKCF0aGlzLmlzRHVwbGljYXRlKG1vdmUsIHRoaXMubGlzdE9mQ29vcmRpbmF0ZXMpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3QobW92ZSk7IC8vIHdlIHB1dCB0aGlzIGNvb3JkcyBhcyBhbHJlYWRyeSB0cmVhdGVkXG5cbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuY3JlYXRlTm9kZShtb3ZlLCBkZXB0aCArIDEsIG51bGwpO1xuICAgICAgICAgICAgbm9kZS5hZGRQYXRoKGNoaWxkKTtcbiAgICAgICAgICAgIC8vIHdlIGNoZWNrIGlmIGl0J3Mgb3VyIGRlc3RpbmF0aW9uXG4gICAgICAgICAgICBpZiAoY2hpbGQuY29vcmRzLmNvbXBhcmUoZEMpKSB7XG4gICAgICAgICAgICAgIC8vIFdlIHJlYWNoZWQgb3VyIGRlc3RpbmF0aW9uLCBob29ycmF5XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV4dE5vZGVMaXN0LnB1c2goY2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBzaW5jZSB3ZSBoYXZlIG5vdCBmb3VuZCB0aGUgZGVzdGluYXRpb24sIHdlIG11c3QgdHJhdmVsIHRvIHRoZSBuZXh0IGxldmVsXG4gICAgaWYgKG5leHROb2RlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmJ1aWxkVHJlZShuZXh0Tm9kZUxpc3QsIGRlcHRoICsgMSwgZEMpO1xuICAgIH1cbiAgfVxuXG4gIHRyaW1UcmVlKG5vZGUsIGRDKSB7XG4gICAgaWYgKG5vZGUuY29vcmRzLmNvbXBhcmUoZEMpKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5uZXh0Tm9kZXMgIT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLm5leHROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBub2RlLm5leHROb2Rlc1tpXSA9IHRoaXMudHJpbVRyZWUobm9kZS5uZXh0Tm9kZXNbaV0sIGRDKTtcbiAgICAgIH1cbiAgICAgIG5vZGUucmVtb3ZlTnVsbHMoKTtcbiAgICAgIGlmIChub2RlLm5leHROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNEdXBsaWNhdGUodmFsdWUsIGFycjIpIHtcbiAgICAvLyB3ZSBjaGVjayBpZiBhcnJheSAyIGhhcyB2YWx1ZSBpbiBpdHMgZWxlbWVudHNcbiAgICByZXR1cm4gYXJyMi5zb21lKChlKSA9PiB7XG4gICAgICBpZiAoZS5yb3cgPT09IHZhbHVlLnJvdyAmJiBlLmNvbCA9PT0gdmFsdWUuY29sKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgdmFsaWQoYykge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdrbmlnaHQnKVxuICAgICAgLy8gcGVyc29uYWwgcnVsZXMgb2YgdGhlIGtuaWdodCBwaWVjZSAoaW4gdGhpcyBjYXNlLCBydWxlcyBvZiB0aGUgY2hlc3Nib2FyZClcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkS25pZ2h0KGMpO1xuXG4gICAgLy8gaWYgbm90IHJldHVybmVkIHRydWUgdGlsbCBoZXJlLCBpdCdzIGZhbHNlXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFsaWRLbmlnaHQoYykge1xuICAgIC8vIHdlIHZhbGlkYXRlIHRoZSBjb29yZGluYXRlcyBvZiB0aGlzIG9iamVjdFxuICAgIGlmIChjLnJvdyA8IDAgfHwgYy5jb2wgPCAwIHx8IGMucm93ID4gNyB8fCBjLmNvbCA+IDcpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZ2V0TW92ZW1lbnRzKGMpIHtcbiAgICAvLyBjIC0tPiBjb29yZHNcbiAgICBpZiAodGhpcy50eXBlID09PSAna25pZ2h0JykgcmV0dXJuIHRoaXMuZ2V0S25pZ2h0TW92ZW1lbnRzKGMpO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSByZWFjaGVkIGhlcmUgYW5kIG5vdCBmb3VuZCBhIHZhbGlkIHR5cGUsIHdlIHNob3VsZCB0aHJvdyBhbiBlcnJvci5cbiAgICAvLyBzaW5jZSB3ZSdyZSB0b28gbGF6eSBmb3IgdGhhdCwgd2UncmUgZ29ubmEgcmV0dXJuIG51bGwuIE91ciB0cmVlIHdpbGwgYmUgdmVyeSBzaG9ydC5cbiAgICByZXR1cm4gW107XG4gIH1cbiAgZ2V0S25pZ2h0TW92ZW1lbnRzKGMpIHtcbiAgICAvLyBUaGUga25pZ2h0IGNhbiBtb3ZlIHRvIGVpZ2h0IHBvc2l0aW9uczpcbiAgICAvLyArMSByb3csICsyIGNvbFxuICAgIC8vICsxIHJvdywgLTIgY29sXG4gICAgLy8gKzIgcm93LCArMSBjb2xcbiAgICAvLyArMiByb3csIC0xIGNvbFxuICAgIC8vIC0xIHJvdywgKzIgY29sXG4gICAgLy8gLTEgcm93LCAtMiBjb2xcbiAgICAvLyAtMiByb3csICsxIGNvbFxuICAgIC8vIC0yIHJvdywgLTEgY29sXG4gICAgY29uc3QgbW92ZW1lbnRzID0gW107XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKC0yLCAtMSkpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoLTIsICsxKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMSwgLTIpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKC0xLCArMikpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoKzEsIC0yKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygrMSwgKzIpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsyLCAtMSkpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoKzIsICsxKSk7XG5cbiAgICBtb3ZlbWVudHMuZm9yRWFjaCgobW92ZSkgPT4ge1xuICAgICAgY29uc3QgYXV4Q29vcmRzID0gbmV3IENvb3JkcygpO1xuICAgICAgYXV4Q29vcmRzLmNvcHkoYyk7XG4gICAgICBhdXhDb29yZHMuYWRkKG1vdmUpO1xuICAgICAgaWYgKHRoaXMudmFsaWQoYXV4Q29vcmRzKSkge1xuICAgICAgICByZXN1bHQucHVzaChhdXhDb29yZHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPiAwID8gcmVzdWx0IDogbnVsbDtcbiAgfVxuXG4gIGNyZWF0ZU5vZGUoY29vcmRzLCBkZXB0aCwgbmV4dENvb3Jkcykge1xuICAgIC8vIGl0IHVzZWQgdG8gZG8gdGhpbmdzIGJlZm9yZSBuZXcgTm9kZSBsb2wuXG4gICAgcmV0dXJuIG5ldyBOb2RlKGNvb3JkcywgZGVwdGgsIG5leHRDb29yZHMpO1xuICB9XG5cbiAgYWRkTGlzdChjb29yZHMpIHtcbiAgICB0aGlzLmxpc3RPZkNvb3JkaW5hdGVzLnB1c2goY29vcmRzKTtcbiAgICB0aGlzLnNvcnRMaXN0KCk7XG4gIH1cblxuICBzb3J0TGlzdCgpIHtcbiAgICB0aGlzLmxpc3RPZkNvb3JkaW5hdGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIGlmIChhLnJvdyA8IGIucm93KSByZXR1cm4gLTE7XG4gICAgICBpZiAoYS5yb3cgPiBiLnJvdykgcmV0dXJuIDE7XG4gICAgICBpZiAoYS5jb2wgPCBiLmNvbCkgcmV0dXJuIC0xO1xuICAgICAgaWYgKGEuY29sID4gYi5jb2wpIHJldHVybiAxO1xuXG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgbGV0IHBhdGggPSBbXTtcbiAgICBsZXQgbm9kZSA9IHRoaXMucm9vdDtcblxuICAgIHdoaWxlIChub2RlICE9IG51bGwpIHtcbiAgICAgIHBhdGgucHVzaChub2RlLmNvb3Jkcyk7XG5cbiAgICAgIGlmIChub2RlLm5leHROb2RlcyAhPSBudWxsKVxuICAgICAgICBub2RlID0gbm9kZS5uZXh0Tm9kZXNbMF07IC8vIHNob3VsZCBvbmx5IGhhdmUgb25lIHBhdGhcbiAgICAgIGVsc2Ugbm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbn1cblxuZXhwb3J0IHsgQ29vcmRzLCBDaGVzc3RyZWUgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9pbWcvcGF0aC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIjY2hlc3Nib2FyZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTU2LCAxNTMsIDE1MCk7XFxuICB3aWR0aDogNjB2dztcXG4gIG1heC13aWR0aDogNjAwcHg7XFxuICBib3JkZXI6IDFweCBibGFjayBzb2xpZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWdhcDogMDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IHJvdztcXG59XFxuXFxuLmNlbGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG59XFxuXFxuLndoaXRlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ1LCAyNDUsIDI0NSwgMC40NTkpO1xcbn1cXG5cXG4uYmxhY2sge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0OSwgNDcsIDQ3LCAwLjY0NCk7XFxufVxcblxcbi5hdHRpbGEtcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhNmE2YTY7XFxufVxcblxcbi5hdHRpbGEtYmxhY2sge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbi5rbmlnaHQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDgwJTtcXG4gIGZsb2F0OiBpbmxpbmUtZW5kO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2NoZXNzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxvQ0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxxQ0FBQTtFQUNBLGtDQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFXQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQVJGOztBQVdBO0VBQ0UsNENBQUE7QUFSRjs7QUFXQTtFQUNFLHlDQUFBO0FBUkY7O0FBVUE7RUFDRSx5QkFBQTtBQVBGOztBQVNBO0VBQ0UseURBQUE7RUFDQSxzQkFBQTtBQU5GOztBQVNBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsaUJBQUE7QUFORlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvL0ZvciBvdXIgY2hlc3MgYm9hcmQgd2UgaGF2ZSB0aGUgY2hlc3Nib2FyZCBjb250YWluZXIsIHRoZSBjZWxsIGNsYXNzLCB0aGUgYmxhY2sgY2xhc3MsIHRoZSB3aGl0ZSBjbGFzc1xcblxcbiNjaGVzc2JvYXJkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNTYsIDE1MywgMTUwKTtcXG4gIHdpZHRoOiA2MHZ3O1xcbiAgbWF4LXdpZHRoOiA2MDBweDtcXG4gIGJvcmRlcjogMXB4IGJsYWNrIHNvbGlkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtZ2FwOiAwO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLWF1dG8tZmxvdzogcm93O1xcbiAgLy8gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIC8vYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLy8gLmNlbGwge1xcbi8vICAgYm9yZGVyOiAxcHggYmxhY2sgZGFzaGVkO1xcbi8vICAgaGVpZ2h0OiA1dmg7XFxuLy8gICB3aWR0aDogNXZ3O1xcbi8vIH1cXG5cXG4uY2VsbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbn1cXG5cXG4ud2hpdGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDI0NSwgMjQ1LCAwLjQ1OSk7XFxufVxcblxcbi5ibGFjayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQ5LCA0NywgNDcsIDAuNjQ0KTtcXG59XFxuLmF0dGlsYS1yZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2E2YTZhNjtcXG59XFxuLmF0dGlsYS1ibGFjayB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy4uL2ltZy9wYXRoLnBuZycpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuXFxuLmtuaWdodCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogODAlO1xcbiAgZmxvYXQ6IGlubGluZS1lbmQ7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vaW1nL2JhY2tncm91bmQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5jZG5mb250cy5jb20vY3NzL25vcnNlKTtcIl0pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIG1hcmdpbjogMHB4O1xcbn1cXG5cXG4jbWFpbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTksIDE5LCA0Nik7XFxufVxcbiNoZWFkZXIgI2xvZ28gPiBpbWcge1xcbiAgaGVpZ2h0OiAxMHZoO1xcbn1cXG4jaGVhZGVyICNsb2dvIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG59XFxuI2hlYWRlciAjdGl0bGUtdGV4dCB7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtc2l6ZTogNXZoO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJOb3JzZVxcXCIsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW4tbGVmdDogMzVweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcblxcbiN0ZXh0LWV4cGxhaW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNDUyKTtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIHBhZGRpbmctYm90dG9tOiA1cHg7XFxuICBwYWRkaW5nLXRvcDogMTBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XFxufVxcblxcbiN1c2VyLWZlZWRiYWNrIHtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG4gIHdpZHRoOiA4NXZ3O1xcbiAgbWluLWhlaWdodDogMTB2aDtcXG4gIGNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDb3VyaWVyIE5ld1xcXCIsIENvdXJpZXIsIG1vbm9zcGFjZTtcXG59XFxuXFxuI3Jlc3RhcnQge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG91dGxpbmU6IDA7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBwYWRkaW5nOiAxMnB4IDE3cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMTYsIDIxNiwgMjE2LCAwLjgxNTY4NjI3NDUpO1xcbiAgY29sb3I6ICMyMjI7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBmb250LXdlaWdodDogNTAwO1xcbn1cXG4jcmVzdGFydDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM0LCAzNCwgMzQsIDAuOTQ1MDk4MDM5Mik7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9nZW5lcmFsLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSx5REFBQTtFQUNBLHNCQUFBO0VBQ0EsNEJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQ0FBQTtBQUFGO0FBRUU7RUFDRSxZQUFBO0FBQUo7QUFFRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUFKO0FBRUU7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxnQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUFKOztBQUlBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsOENBQUE7QUFERjs7QUFJQTtFQUNFLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1EQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQURGO0FBR0U7RUFDRSxnREFBQTtFQUNBLGlCQUFBO0FBREpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9ub3JzZScpO1xcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9pbWcvYmFja2dyb3VuZC5qcGcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIG1hcmdpbjogMHB4O1xcbn1cXG5cXG4jbWFpbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTksIDE5LCA0Nik7XFxuXFxuICAjbG9nbyA+IGltZyB7XFxuICAgIGhlaWdodDogMTB2aDtcXG4gIH1cXG4gICNsb2dvIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG4gICN0aXRsZS10ZXh0IHtcXG4gICAgY29sb3I6IHdoaXRlc21va2U7XFxuICAgIGZvbnQtc2l6ZTogNXZoO1xcbiAgICBmb250LWZhbWlseTogJ05vcnNlJywgc2Fucy1zZXJpZjtcXG4gICAgbWFyZ2luLWxlZnQ6IDM1cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG59XFxuXFxuI3RleHQtZXhwbGFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NTIpO1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDVweDtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuXFxuI3VzZXItZmVlZGJhY2sge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgd2lkdGg6IDg1dnc7XFxuICBtaW4taGVpZ2h0OiAxMHZoO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgQ291cmllciwgbW9ub3NwYWNlO1xcbn1cXG5cXG4jcmVzdGFydCB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGhlaWdodDogNDBweDtcXG4gIHBhZGRpbmc6IDEycHggMTdweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDhkOGQ4ZDA7XFxuICBjb2xvcjogIzIyMjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuXFxuICAmOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjIyMmYxO1xcbiAgICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jaGVzcy5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY2hlc3Muc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2VuZXJhbC5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vZ2VuZXJhbC5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8ndXNlIHN0cmljdCc7XG5pbXBvcnQgJy4vc3R5bGVzL2dlbmVyYWwuc2Nzcyc7XG5pbXBvcnQgJy4vc3R5bGVzL2NoZXNzLnNjc3MnO1xuaW1wb3J0IG9kaW4gZnJvbSAnLi9pbWcvb2Rpbi5wbmcnO1xuaW1wb3J0IHsgQ29vcmRzLCBDaGVzc3RyZWUgfSBmcm9tICcuL2NvZGUva25pZ2h0LmpzJztcbmltcG9ydCB7IENoZXNzYm9hcmQgfSBmcm9tICcuL2NvZGUvY2hlc3Nib2FyZC5qcyc7XG5cbi8vIHdlIGRlZmluZSB0aGUgdmFyaWFibGVzIHRoYXQgYXJlIGdvbm5hIG1ha2UgYWxsIHRoaXMgd29ya1xubGV0IHN0YXJ0Q2VsbCA9IHt9O1xubGV0IGZpbmFsQ2VsbCA9IHt9O1xuY29uc3QgY2hlc3Nib2FyZCA9IG5ldyBDaGVzc2JvYXJkKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVzc2JvYXJkJykpO1xuY2hlc3Nib2FyZC5jcmVhdGVCb2FyZCgpO1xuLy8gV2Ugc2V0IHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggQ2VsbFxuc2V0Q2VsbExpc3RlbmVycygpO1xuXG4vLyB3ZSBzZXQgdGhlIGxvZ28gc291cmNlIHdpdGggdGhpcy4uLnNlZW1zIHVzaW5nIG5wbSBtYWtlcyBpdCBoYXJkIHRvIGRpcmVjdGx5IGluamVjdCBpdCBpbiB0aGUgaHRtbFxuY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvZGluJyk7XG5sb2dvLnNyYyA9IG9kaW47XG5cbi8vIHdlIHNldCB0aGUgbGlzdGVuZXIgdG8gdGhlIHJlc3RhcnQgYnV0dG9uXG5jb25zdCByZXN0YXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQnKTtcbnJlc3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIHJlc3RhcnRMaXN0ZW5lcigpO1xufSk7XG5cbmZ1bmN0aW9uIHJlc3RhcnRMaXN0ZW5lcigpIHtcbiAgY2hlc3Nib2FyZC5yZXNldCgpO1xuICBzZXRDZWxsTGlzdGVuZXJzKCk7XG4gIGNvbnN0IHVzZXJGZWVkYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLWZlZWRiYWNrJyk7XG4gIHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9ICdDaG9vc2UgYSBjZWxsIHRvIHN0YXJ0ISc7XG59XG5mdW5jdGlvbiBzZXRDZWxsTGlzdGVuZXJzKCkge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tpZF49Y2VsbCcpO1xuICBpZiAoY2VsbHMgPT0gbnVsbCkgcmV0dXJuO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50Q2VsbCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBldmVudENlbGwoZSkge1xuICAvLyBpZiB0aGUgdXNlciBjbGlja2VkIG9uIGEgY2VsbCB0aGVyZSBhcmUgcG9zc2libGUgc2NlbmFyaW9zOlxuICAvLyBCb2FyZCBpcyBlbXB0eSwgd2hpY2ggbWVhbnMgd2UncmUgcHV0dGluZyB0aGUgc3RhcnRpbmcgY29vcmRlbmF0ZXNcbiAgLy8gQm9hcmQgaGFzIG9uZSBrbmlnaHQsIHdoaWNoIG1lYW5zIHdlJ3JlIHB1dHRpbmcgdGhlIGZpbmFsIGNvb3JkaW5hdGVzXG4gIC8vIHVzZXIgaXMgbWVzc2luZyB3aXRoIHRoZSBib2FyZCBhbmQgY2xpY2tpbmcgd2hlbiBoZSBzaG91bGRudC4uLlxuICBjb25zdCB1c2VyRmVlZGJhY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlci1mZWVkYmFjaycpO1xuICBjb25zdCBjdXJyZW50Q2VsbCA9IGUuY3VycmVudFRhcmdldDtcbiAgY29uc3Qgcm93ID0gY3VycmVudENlbGwuZ2V0QXR0cmlidXRlKCdyb3cnKTtcbiAgY29uc3QgY29sID0gY3VycmVudENlbGwuZ2V0QXR0cmlidXRlKCdjb2wnKTtcbiAgaWYgKGN1cnJlbnRDZWxsLmZpcnN0Q2hpbGQpIHtcbiAgICAvLyB3ZSBhbHJlYWR5IGhhdmUgYSBrbmlnaHRcbiAgICB1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPVxuICAgICAgXCJUaGUgZGVzdGluYXRpb24gY2FuJ3QgYmUgdGhlIHNhbWUgYXMgdGhlIHN0YXJ0IVwiO1xuICAgIGF3YWl0IHNsZWVwKDEwMDApO1xuICAgIHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9ICdDaG9vc2UgYSBkZXN0aW5hdGlvbiEnO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPT09ICdDaG9vc2UgYSBjZWxsIHRvIHN0YXJ0IScpIHtcbiAgICBzdGFydENlbGwgPSBuZXcgQ29vcmRzKHJvdywgY29sKTtcbiAgICB1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPSAnSGlyaW5nIGEgS25pZ2h0Li4uJztcbiAgICBjaGVzc2JvYXJkLnNldEtuaWdodChyb3csIGNvbCk7XG4gICAgYXdhaXQgc2xlZXAoMjUwKTtcbiAgICB1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPSAnQ2hvb3NlIGEgZGVzdGluYXRpb24hJztcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodXNlckZlZWRiYWNrLnRleHRDb250ZW50ID09PSAnQ2hvb3NlIGEgZGVzdGluYXRpb24hJykge1xuICAgIGZpbmFsQ2VsbCA9IG5ldyBDb29yZHMocm93LCBjb2wpO1xuXG4gICAgY29uc3Qga25pZ2h0VHJlZSA9IG5ldyBDaGVzc3RyZWUoc3RhcnRDZWxsLCBmaW5hbENlbGwsICdrbmlnaHQnKTtcbiAgICBsZXQgbW92ZXMgPSBrbmlnaHRUcmVlLmdldFBhdGgoKTtcblxuICAgIHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9IG1vdmVzVGV4dChtb3Zlcyk7XG4gICAgY2hlc3Nib2FyZC5tb3ZlS25pZ2h0KG1vdmVzKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZnVuY3Rpb24gbW92ZXNUZXh0KG1vdmVzKSB7XG4gIGxldCBzcCA9ICdbJyArIHN0YXJ0Q2VsbC5yb3cgKyAnLCcgKyBzdGFydENlbGwuY29sICsgJ10nO1xuICBsZXQgZnAgPSAnWycgKyBmaW5hbENlbGwucm93ICsgJywnICsgZmluYWxDZWxsLmNvbCArICddJztcbiAgbGV0IHN0cjEgPSBgPiBrbmlnaHRNb3Zlcygke3NwfSwgJHtmcH0pID0+IFxcbmA7XG4gIGxldCBzdHIyID0gJyc7XG4gIGxldCBzdHIzID0gJ1xcbic7XG4gIGxldCBjbSA9IC0xOyAvLyBjb3VudCBtb3ZlcywgLTEgdG8gbm90IGNvdW50IHN0YXJ0aW5nIHBvc2l0aW9uXG5cbiAgbW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xuICAgIHN0cjMgKz0gYFske21vdmUucm93fSwke21vdmUuY29sfV0gYDtcbiAgICBjbSsrO1xuICB9KTtcblxuICBzdHIyID0gYFxcbllvdSBtYWRlIGl0IGluICR7Y219IG1vdmVzISBIZXJlJ3MgeW91ciBwYXRoOiBgO1xuXG4gIHJldHVybiBzdHIxICsgc3RyMiArIHN0cjM7XG59XG5cbmZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuIl0sIm5hbWVzIjpbInVuaWNvcm4iLCJDaGVzc2JvYXJkIiwiY29uc3RydWN0b3IiLCJub2RlIiwiYm9hcmQiLCJjcmVhdGVCb2FyZCIsImNvbHMiLCJyb3dzIiwib2JqYm9hcmQiLCJuZXdDZWxsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJTdHJpbmciLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInJlc2V0IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwic2V0S25pZ2h0IiwiciIsImMiLCJjZWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJrbmlnaHQiLCJjcmVhdGVLbmlnaHQiLCJhcHBlbmQiLCJzcmMiLCJtb3ZlS25pZ2h0IiwibW92ZXMiLCJxdWVyeVNlbGVjdG9yIiwiaVJvdyIsImdldEF0dHJpYnV0ZSIsImlDb2wiLCJhdHRpbGFDb3VudCIsImNvdW50IiwiYXR0aWxhIiwiaSIsImxlbmd0aCIsInhtb3ZlS25pZ2h0Iiwicm93IiwiY29sIiwic2xlZXAiLCJyZW1vdmUiLCJmUm93IiwiZkNvbCIsImRpZmZSb3ciLCJkaWZmQ29sIiwiY3VycmVudFJvdyIsImN1cnJlbnRDb2wiLCJtb3ZlVXAiLCJtb3ZlRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwibXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJwaWVjZSIsInRyYW5zIiwiY2FsY1RyYW5zbGF0ZSIsInRyYW5zWCIsImVmZmVjdCIsInRyYW5zZm9ybSIsImFuaW1hdGUiLCJnZXRUaW1pbmciLCJ0cmFuc1kiLCJNYXRoIiwiZmxvb3IiLCJ0aW1pbmciLCJkdXJhdGlvbiIsIml0ZXJhdGlvbnMiLCJwb3NpdGlvbkluZm8iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYXJzZUludCIsIndpZHRoIiwiQ29vcmRzIiwiY29tcGFyZSIsImNvb3JkcyIsInRvU3RyaW5nIiwiY29weSIsIk5vZGUiLCJkZXB0aCIsIm5leHROb2RlcyIsImFkZFBhdGgiLCJwdXNoIiwicmVtb3ZlTnVsbHMiLCJhdXhMaXN0IiwiZm9yRWFjaCIsIkNoZXNzdHJlZSIsIm9DIiwiZEMiLCJ0eXBlIiwicm9vdCIsImNyZWF0ZU5vZGUiLCJidWlsZFRyZWUiLCJ0cmltVHJlZSIsIm5vZGVMaXN0IiwibmV4dE5vZGVMaXN0IiwiaiIsImdldE1vdmVtZW50cyIsIm1vdmUiLCJpc0R1cGxpY2F0ZSIsImxpc3RPZkNvb3JkaW5hdGVzIiwiYWRkTGlzdCIsImNoaWxkIiwidmFsdWUiLCJhcnIyIiwic29tZSIsImUiLCJ2YWxpZCIsInZhbGlkS25pZ2h0IiwiZ2V0S25pZ2h0TW92ZW1lbnRzIiwibW92ZW1lbnRzIiwicmVzdWx0IiwiYXV4Q29vcmRzIiwibmV4dENvb3JkcyIsInNvcnRMaXN0Iiwic29ydCIsImEiLCJiIiwiZ2V0UGF0aCIsInBhdGgiLCJvZGluIiwic3RhcnRDZWxsIiwiZmluYWxDZWxsIiwiY2hlc3Nib2FyZCIsInNldENlbGxMaXN0ZW5lcnMiLCJsb2dvIiwicmVzdGFydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXN0YXJ0TGlzdGVuZXIiLCJ1c2VyRmVlZGJhY2siLCJ0ZXh0Q29udGVudCIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZW50Q2VsbCIsImN1cnJlbnRDZWxsIiwiY3VycmVudFRhcmdldCIsImtuaWdodFRyZWUiLCJtb3Zlc1RleHQiLCJzcCIsImZwIiwic3RyMSIsInN0cjIiLCJzdHIzIiwiY20iXSwic291cmNlUm9vdCI6IiJ9