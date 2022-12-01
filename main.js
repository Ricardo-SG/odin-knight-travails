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
    if (oC != dC) {
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  height: 100vh;\n  overflow-y: hidden;\n  margin: 0px;\n}\n\n#main-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#header {\n  display: flex;\n  align-items: center;\n  background-color: rgb(19, 19, 46);\n}\n#header #logo > img {\n  height: 10vh;\n}\n#header #logo {\n  margin-left: 10px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n}\n#header #title-text {\n  color: whitesmoke;\n  font-size: 5vh;\n  font-family: \"Norse\", sans-serif;\n  margin-left: 35px;\n  margin-top: 10px;\n  margin-bottom: 5px;\n}\n\n#text-explain {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: whitesmoke;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  background-color: rgba(0, 0, 0, 0.452);\n  padding-left: 10px;\n  padding-bottom: 5px;\n  padding-top: 10px;\n  padding-right: 10px;\n}\n\n#user-feedback {\n  padding: 10px;\n  margin-top: 30px;\n  background-color: grey;\n  width: 85vw;\n  min-height: 10vh;\n  color: whitesmoke;\n  font-family: \"Courier New\", Courier, monospace;\n}\n\n#restart {\n  margin-top: 10px;\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  height: 40px;\n  padding: 12px 17px;\n  border-radius: 50px;\n  background-color: rgba(241, 238, 238, 0.1019607843);\n  color: #222;\n  font-size: 16px;\n  font-weight: 500;\n}\n#restart:hover {\n  background-color: rgba(34, 34, 34, 0.1019607843);\n}", "",{"version":3,"sources":["webpack://./src/styles/general.scss"],"names":[],"mappings":"AAEA;EACE,yDAAA;EACA,sBAAA;EACA,4BAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;AAAF;;AAGA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;AAAF;;AAGA;EACE,aAAA;EACA,mBAAA;EACA,iCAAA;AAAF;AAEE;EACE,YAAA;AAAJ;AAEE;EACE,iBAAA;EACA,gBAAA;EACA,kBAAA;AAAJ;AAEE;EACE,iBAAA;EACA,cAAA;EACA,gCAAA;EACA,iBAAA;EACA,gBAAA;EACA,kBAAA;AAAJ;;AAIA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;EACA,sCAAA;EACA,kBAAA;EACA,mBAAA;EACA,iBAAA;EACA,mBAAA;AADF;;AAIA;EACE,aAAA;EACA,gBAAA;EACA,sBAAA;EACA,WAAA;EACA,gBAAA;EACA,iBAAA;EACA,8CAAA;AADF;;AAIA;EACE,gBAAA;EACA,qBAAA;EACA,UAAA;EACA,YAAA;EACA,eAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,mDAAA;EACA,WAAA;EACA,eAAA;EACA,gBAAA;AADF;AAGE;EACE,gDAAA;AADJ","sourcesContent":["@import url('https://fonts.cdnfonts.com/css/norse');\n\nbody {\n  background-image: url('../img/background.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n  height: 100vh;\n  overflow-y: hidden;\n  margin: 0px;\n}\n\n#main-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n#header {\n  display: flex;\n  align-items: center;\n  background-color: rgb(19, 19, 46);\n\n  #logo > img {\n    height: 10vh;\n  }\n  #logo {\n    margin-left: 10px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n  }\n  #title-text {\n    color: whitesmoke;\n    font-size: 5vh;\n    font-family: 'Norse', sans-serif;\n    margin-left: 35px;\n    margin-top: 10px;\n    margin-bottom: 5px;\n  }\n}\n\n#text-explain {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: whitesmoke;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  background-color: rgba(0, 0, 0, 0.452);\n  padding-left: 10px;\n  padding-bottom: 5px;\n  padding-top: 10px;\n  padding-right: 10px;\n}\n\n#user-feedback {\n  padding: 10px;\n  margin-top: 30px;\n  background-color: grey;\n  width: 85vw;\n  min-height: 10vh;\n  color: whitesmoke;\n  font-family: 'Courier New', Courier, monospace;\n}\n\n#restart {\n  margin-top: 10px;\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  height: 40px;\n  padding: 12px 17px;\n  border-radius: 50px;\n  background-color: #f1eeee1a;\n  color: #222;\n  font-size: 16px;\n  font-weight: 500;\n\n  &:hover {\n    background-color: #2222221a;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dEI0QyxJQUFJLElBQUssSUFBRzVDLElBQUksQ0FBQzdELEdBQUksSUFBRzZELElBQUksQ0FBQzVELEdBQUksSUFBRztJQUNwQ3lHLEVBQUUsRUFBRTtFQUNOLENBQUMsQ0FBQztFQUVGRixJQUFJLEdBQUksb0JBQW1CRSxFQUFHLDRCQUEyQjtFQUV6RCxPQUFPSCxJQUFJLEdBQUdDLElBQUksR0FBR0MsSUFBSTtBQUMzQjtBQUVBLFNBQVN2RyxLQUFLLENBQUNZLEVBQUUsRUFBRTtFQUNqQixPQUFPLElBQUlDLE9BQU8sQ0FBRUMsT0FBTyxJQUFLQyxVQUFVLENBQUNELE9BQU8sRUFBRUYsRUFBRSxDQUFDLENBQUM7QUFDMUQsQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL2NvZGUvY2hlc3Nib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9jb2RlL2tuaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvY2hlc3Muc2NzcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvZ2VuZXJhbC5zY3NzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvY2hlc3Muc2Nzcz9lOTIwIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL3N0eWxlcy9nZW5lcmFsLnNjc3M/YmIyNCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCB1bmljb3JuIGZyb20gJy4uL2ltZy91bmljb3JuIGtuaWdodC5wbmcnO1xuXG5jbGFzcyBDaGVzc2JvYXJkIHtcbiAgY29uc3RydWN0b3Iobm9kZSkge1xuICAgIHRoaXMuYm9hcmQgPSBub2RlO1xuICB9XG5cbiAgY3JlYXRlQm9hcmQoKSB7XG4gICAgbGV0IGNvbHMgPSAwO1xuICAgIGxldCByb3dzID0gMDtcbiAgICBjb25zdCBvYmpib2FyZCA9IHRoaXM7XG5cbiAgICB3aGlsZSAoY29scyA8IDggJiYgcm93cyA8IDgpIHtcbiAgICAgIGxldCBuZXdDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBuZXdDZWxsLmlkID0gYGNlbGwtJHtTdHJpbmcocm93cyl9LSR7U3RyaW5nKGNvbHMpfWA7XG4gICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcblxuICAgICAgaWYgKFxuICAgICAgICAocm93cyAlIDIgPT09IDAgJiYgY29scyAlIDIgPT09IDApIHx8XG4gICAgICAgIChyb3dzICUgMiAhPT0gMCAmJiBjb2xzICUgMiAhPT0gMClcbiAgICAgICkge1xuICAgICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoJ3doaXRlJyk7XG4gICAgICAgIC8vY2hlc3NDb29yZHNbY29sc11bcm93c10gPSAnVyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoJ2JsYWNrJyk7XG4gICAgICAgIC8vY2hlc3NDb29yZHNbY29sc11bcm93c10gPSAnQic7XG4gICAgICB9XG4gICAgICBuZXdDZWxsLnNldEF0dHJpYnV0ZSgncm93Jywgcm93cyk7XG4gICAgICBuZXdDZWxsLnNldEF0dHJpYnV0ZSgnY29sJywgY29scyk7XG4gICAgICAvLyBuZXdDZWxsLnRleHRDb250ZW50ID0gYCR7cm93c30gLSAke2NvbHN9YDtcbiAgICAgIHRoaXMuYm9hcmQuYXBwZW5kQ2hpbGQobmV3Q2VsbCk7XG4gICAgICBjb2xzKys7XG5cbiAgICAgIGlmIChjb2xzID49IDgpIHtcbiAgICAgICAgY29scyA9IDA7XG4gICAgICAgIHJvd3MrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5ib2FyZDtcbiAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlQm9hcmQoKTtcbiAgfVxuXG4gIHNldEtuaWdodChyLCBjKSB7XG4gICAgLy8gciBzdGFuZHMgZm9yIHJvd1xuICAgIC8vIGMgc3RhbmRzIGZvciBjb2xcbiAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjZWxsLSR7cn0tJHtjfWApO1xuICAgIGxldCBrbmlnaHQgPSB0aGlzLmNyZWF0ZUtuaWdodChyLCBjKTtcbiAgICBjZWxsLmFwcGVuZChrbmlnaHQpO1xuICAgIHJldHVybiBrbmlnaHQ7XG4gIH1cblxuICBjcmVhdGVLbmlnaHQociwgYykge1xuICAgIGxldCBrbmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBrbmlnaHQuc3JjID0gdW5pY29ybjtcbiAgICBrbmlnaHQuY2xhc3NMaXN0LmFkZCgna25pZ2h0Jyk7XG4gICAga25pZ2h0LmlkID0gYGtuaWdodC0ke3J9LSR7Y31gO1xuICAgIGtuaWdodC5zZXRBdHRyaWJ1dGUoJ3JvdycsIHIpO1xuICAgIGtuaWdodC5zZXRBdHRyaWJ1dGUoJ2NvbCcsIGMpO1xuICAgIHJldHVybiBrbmlnaHQ7XG4gIH1cblxuICBhc3luYyBtb3ZlS25pZ2h0KG1vdmVzKSB7XG4gICAgbGV0IGtuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpZF49a25pZ2h0Jyk7XG4gICAgbGV0IGlSb3cgPSBrbmlnaHQuZ2V0QXR0cmlidXRlKCdyb3cnKTtcbiAgICBsZXQgaUNvbCA9IGtuaWdodC5nZXRBdHRyaWJ1dGUoJ2NvbCcpO1xuICAgIGxldCBhdHRpbGFDb3VudCA9IHsgY291bnQ6IDAgfTtcbiAgICB0aGlzLmF0dGlsYShpUm93LCBpQ29sLCBhdHRpbGFDb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXdhaXQgdGhpcy54bW92ZUtuaWdodChcbiAgICAgICAga25pZ2h0LFxuICAgICAgICBpUm93LFxuICAgICAgICBpQ29sLFxuICAgICAgICBtb3Zlc1tpXS5yb3csXG4gICAgICAgIG1vdmVzW2ldLmNvbCxcbiAgICAgICAgYXR0aWxhQ291bnRcbiAgICAgICk7XG5cbiAgICAgIGlSb3cgPSBtb3Zlc1tpXS5yb3c7XG4gICAgICBpQ29sID0gbW92ZXNbaV0uY29sO1xuXG4gICAgICBrbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbaWRePWtuaWdodCcpO1xuICAgICAgYXdhaXQgc2xlZXAoNTAwKTtcbiAgICB9XG4gIH1cblxuICBhdHRpbGEociwgYywgY291bnQpIHtcbiAgICAvLyBcIlRoZSBncmFzcyBkaWQgbm90IGdyb3cgd2hlcmUgQXR0aWxhIGhhZCBwYXNzZWRcIlxuICAgIGxldCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGNlbGwtJHtTdHJpbmcocil9LSR7U3RyaW5nKGMpfWApO1xuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnd2hpdGUnKTtcbiAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2JsYWNrJyk7XG5cbiAgICBpZiAoY291bnQuY291bnQgPT09IDApIHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnYXR0aWxhLXJlZCcpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdhdHRpbGEtYmxhY2snKTtcbiAgICB9IGVsc2UgaWYgKGNvdW50LmNvdW50ICUgMyA9PT0gMCkge1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdhdHRpbGEtcmVkJyk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2F0dGlsYS1ibGFjaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2F0dGlsYS1yZWQnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnYXR0aWxhLWJsYWNrJyk7XG4gICAgfVxuICAgIGNvdW50LmNvdW50Kys7XG4gIH1cblxuICBhc3luYyB4bW92ZUtuaWdodChrbmlnaHQsIGlSb3csIGlDb2wsIGZSb3csIGZDb2wsIGF0dGlsYUNvdW50KSB7XG4gICAgLy8gaVJvdyAtLT4gaW5pdGlhbCByb3dcbiAgICAvLyBpQ29sIC0tPiBpbml0aWFsIENvbFxuICAgIC8vIGZSb3cgLS0+IGZpbmFsIHJvd1xuICAgIC8vIGZDb2wgLS0+IGZpbmFsIGNvbFxuICAgIGxldCBpO1xuICAgIC8vbGV0IGtuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpZF49a25pZ2h0Jyk7XG4gICAgLy9sZXQga25pZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGtuaWdodC0ke2lSb3d9LSR7aUNvbH1gKTtcbiAgICBsZXQgZGlmZlJvdyA9IGZSb3cgLSBpUm93OyAvLyBvZmZzZXQgaW4geCBheGlzXG4gICAgbGV0IGRpZmZDb2wgPSBmQ29sIC0gaUNvbDsgLy8gb2Zmc2V0IGluIHkgYXhpc1xuICAgIGxldCBjdXJyZW50Um93ID0gaVJvdztcbiAgICBsZXQgY3VycmVudENvbCA9IGlDb2w7XG5cbiAgICAvL3RoaXMuYXR0aWxhKGN1cnJlbnRSb3csIGN1cnJlbnRDb2wsIGF0dGlsYUNvdW50KTtcblxuICAgIGZvciAoaSA9IGRpZmZSb3c7IGkgPCAwOyBpKyspIHtcbiAgICAgIGN1cnJlbnRSb3ctLTtcbiAgICAgIGF3YWl0IG1vdmVVcChrbmlnaHQpO1xuICAgICAga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgICB0aGlzLmF0dGlsYShjdXJyZW50Um93LCBjdXJyZW50Q29sLCBhdHRpbGFDb3VudCk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBkaWZmUm93OyBpKyspIHtcbiAgICAgIGN1cnJlbnRSb3crKztcbiAgICAgIGF3YWl0IG1vdmVEb3duKGtuaWdodCk7XG4gICAgICBrbmlnaHQucmVtb3ZlKCk7XG4gICAgICBrbmlnaHQgPSB0aGlzLnNldEtuaWdodChjdXJyZW50Um93LCBjdXJyZW50Q29sKTtcbiAgICAgIHRoaXMuYXR0aWxhKGN1cnJlbnRSb3csIGN1cnJlbnRDb2wsIGF0dGlsYUNvdW50KTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBkaWZmQ29sOyBpIDwgMDsgaSsrKSB7XG4gICAgICBjdXJyZW50Q29sLS07XG4gICAgICBhd2FpdCBtb3ZlTGVmdChrbmlnaHQpO1xuICAgICAga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgICB0aGlzLmF0dGlsYShjdXJyZW50Um93LCBjdXJyZW50Q29sLCBhdHRpbGFDb3VudCk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBkaWZmQ29sOyBpKyspIHtcbiAgICAgIGN1cnJlbnRDb2wrKztcbiAgICAgIGF3YWl0IG1vdmVSaWdodChrbmlnaHQpO1xuICAgICAga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgICB0aGlzLmF0dGlsYShjdXJyZW50Um93LCBjdXJyZW50Q29sLCBhdHRpbGFDb3VudCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbW92ZVJpZ2h0KHBpZWNlKSB7XG4gIGxldCB0cmFucyA9IGNhbGNUcmFuc2xhdGUocGllY2UpO1xuICBsZXQgdHJhbnNYID0gYHRyYW5zbGF0ZVgoJHt0cmFuc31weClgO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNYIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDQ5NSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVMZWZ0KHBpZWNlKSB7XG4gIGxldCB0cmFucyA9IGNhbGNUcmFuc2xhdGUocGllY2UpO1xuICBsZXQgdHJhbnNYID0gYHRyYW5zbGF0ZVgoLSR7dHJhbnN9cHgpYDtcblxuICBjb25zdCBlZmZlY3QgPSBbeyB0cmFuc2Zvcm06IHRyYW5zWCB9XTtcblxuICBwaWVjZS5hbmltYXRlKGVmZmVjdCwgZ2V0VGltaW5nKCkpO1xuICBhd2FpdCBzbGVlcCg0OTUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtb3ZlVXAocGllY2UpIHtcbiAgbGV0IHRyYW5zID0gY2FsY1RyYW5zbGF0ZShwaWVjZSk7XG4gIGxldCB0cmFuc1kgPSBgdHJhbnNsYXRlWSgtJHt0cmFuc31weClgO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNZIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDQ5NSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVEb3duKHBpZWNlKSB7XG4gIGxldCB0cmFucyA9IGNhbGNUcmFuc2xhdGUocGllY2UpO1xuICBsZXQgdHJhbnNZID0gYHRyYW5zbGF0ZVkoJHtNYXRoLmZsb29yKHRyYW5zKX1weClgO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNZIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDQ4NSk7XG59XG5cbmZ1bmN0aW9uIGdldFRpbWluZygpIHtcbiAgY29uc3QgdGltaW5nID0ge1xuICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgaXRlcmF0aW9uczogMSxcbiAgfTtcbiAgcmV0dXJuIHRpbWluZztcbn1cblxuZnVuY3Rpb24gY2FsY1RyYW5zbGF0ZShwaWVjZSkge1xuICAvLyBpdCBzZWVtcyB0aGUgZGl2IHdpZHRoICsgMzAgJSBtYWtlcyB0aGUgYW5pbWF0aW9uIHNtb290aGVyXG4gIGxldCBwb3NpdGlvbkluZm8gPSBwaWVjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgbGV0IHRyYW5zID0gTWF0aC5mbG9vcihwYXJzZUludChwb3NpdGlvbkluZm8ud2lkdGgpICogMS4zKTtcblxuICByZXR1cm4gdHJhbnM7XG59XG5cbmV4cG9ydCB7IENoZXNzYm9hcmQgfTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlICovXG5jbGFzcyBDb29yZHMge1xuICAvLyBDb29yZHMgb2JqZWN0IGNvbnRhaW4gcm93IGFuZCBjb2xcbiAgY29uc3RydWN0b3IociwgYykge1xuICAgIHRoaXMucm93ID0gcGFyc2VJbnQocik7XG4gICAgdGhpcy5jb2wgPSBwYXJzZUludChjKTtcbiAgfVxuXG4gIGNvbXBhcmUoY29vcmRzKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBjb29yZHMucm93ICYmIHRoaXMuY29sID09PSBjb29yZHMuY29sKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFkZChjb29yZHMpIHtcbiAgICAvLyBXZSBhZGQgdHdvIGNvb3JkcyB0b2dldGhlclxuICAgIHRoaXMucm93ICs9IHBhcnNlSW50KGNvb3Jkcy5yb3cpO1xuICAgIHRoaXMuY29sICs9IHBhcnNlSW50KGNvb3Jkcy5jb2wpO1xuICB9XG5cbiAgLy8gdGhlIHRyZWUgaXMgdGhlIG9uZSB3aG8gZGVmaW5lcyB0aGUgYm91bmRzIG9mIHdoYXQgaXMgdmFsaWQgYW5kIHdoYXQgbm90IGRlcGVuZGluZyBvbiBpdHMgb3duIHJ1bGVzIChyaWdodCBub3csIEtuaWdodCBjaGVzcyBtb3ZlbWVudClcbiAgLy8gICB2YWxpZCgpIHtcbiAgLy8gICAgIC8vIHdlIHZhbGlkYXRlIHRoZSBjb29yZGluYXRlcyBvZiB0aGlzIG9iamVjdFxuICAvLyAgICAgaWYgKHRoaXMucm93IDwgMCB8fCB0aGlzLmNvbCA8IDAgfHwgdGhpcy5yb3cgPiA3IHx8IHRoaXMuY29sID4gNylcbiAgLy8gICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vICAgICByZXR1cm4gdHJ1ZTtcbiAgLy8gICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuICdyb3c6ICcgKyB0aGlzLnJvdyArICcgfCBjb2w6ICcgKyB0aGlzLmNvbDtcbiAgfVxuXG4gIGNvcHkoY29vcmRzKSB7XG4gICAgdGhpcy5yb3cgPSBwYXJzZUludChjb29yZHMucm93KTtcbiAgICB0aGlzLmNvbCA9IHBhcnNlSW50KGNvb3Jkcy5jb2wpO1xuICB9XG59XG5cbmNsYXNzIE5vZGUge1xuICAvLyBBIG5vZGUgaXMgZm9ybWVkIG9mIGFuIG9iamVjdCBjb29yZHMgYW5kIGFuIGFycmF5IG9mIGNvbm5lY3RlZCBub2Rlc1xuICAvLyBlc3NlbnRpYWxseSB3ZSBnZXQgY29vcmRzIHBhdGhpbmcgdG8gb3RoZXIgY29vcmRzIHVudGlsIG51bGwuXG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGVwdGgsIG5leHROb2Rlcykge1xuICAgIGlmIChjb29yZHMgIT0gbnVsbCkgdGhpcy5jb29yZHMgPSBjb29yZHM7XG4gICAgaWYgKGRlcHRoICE9IG51bGwpIHRoaXMuZGVwdGggPSBkZXB0aDtcbiAgICBpZiAobmV4dE5vZGVzICE9IG51bGwpIHRoaXMubmV4dE5vZGVzID0gbmV4dE5vZGVzO1xuICB9XG5cbiAgYWRkUGF0aChub2RlKSB7XG4gICAgaWYgKHRoaXMubmV4dE5vZGVzID09IG51bGwgfHwgdGhpcy5uZXh0Tm9kZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhpcy5uZXh0Tm9kZXMgPSBbbm9kZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV4dE5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG4gIHJlbW92ZU51bGxzKCkge1xuICAgIGlmICh0aGlzLm5leHROb2RlcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLm5leHROb2RlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgYXV4TGlzdCA9IFtdO1xuICAgICAgdGhpcy5uZXh0Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSBhdXhMaXN0LnB1c2gobm9kZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubmV4dE5vZGVzID0gYXV4TGlzdDtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgQ2hlc3N0cmVlIHtcbiAgLy8gdGhlIENoZXNzdHJlZSByZWNlaXZlcyB0aGlzIHBhcmFtZXRlcnMgdG8gd29yazpcbiAgLy8gMS0+IE9yaWdpbiBDb29yZGluYXRlcywgb3VyIHN0YXJ0aW5nIHBvaW50LlxuICAvLyAyLT4gRGVzdGluaXkgQ29vcmRpbmF0ZXMsIG91ciBmaW5hbCBwb2ludC5cbiAgLy8gMy0+IHR5cGUgKGZvciBub3csIG9ubHkgS25pZ2h0IGlzIGF2YWlsYWJsZSksIGRlZmluZXMgdGhlIHJ1bGVzIHdoaWNoIHdpbGwgZXZhbHVhdGUgaWYgY29vcmRpbmF0ZXMgYXJlIHZhbGlkIG9yIG5vdFxuXG4gIGxpc3RPZkNvb3JkaW5hdGVzID0gW107XG4gIGRlc3RpbmF0aW9uUmVhY2hlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG9DLCBkQywgdHlwZSkge1xuICAgIC8vIG9DIC0+IE9yaWdpbiBDb29yZHMsIGRDIC0tPiBEZXN0aW55IENvb3Jkc1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5yb290ID0gdGhpcy5jcmVhdGVOb2RlKG9DLCBudWxsKTtcbiAgICBpZiAob0MgIT0gZEMpIHtcbiAgICAgIHRoaXMuYnVpbGRUcmVlKFt0aGlzLnJvb3RdLCAwLCBkQyk7XG4gICAgICB0aGlzLnJvb3QgPSB0aGlzLnRyaW1UcmVlKHRoaXMucm9vdCwgZEMpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkVHJlZShub2RlTGlzdCwgZGVwdGgsIGRDKSB7XG4gICAgaWYgKG5vZGVMaXN0ID09IG51bGwpIHJldHVybjsgLy8gZ3VhcmQgY2xhdXNlXG4gICAgbGV0IG5leHROb2RlTGlzdCA9IFtdO1xuICAgIGxldCBpLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbm9kZSA9IG5vZGVMaXN0W2ldO1xuICAgICAgLy8gRm9yIGVhY2ggbm9kZSBvZiB0aGUgbm9kZSBsaXN0IHdlJ3JlIGdvbm5hIGNoZWNrIGlmIGFueSBvZiB0aGUgY2hpbGRzIGlzIG91ciBkZXN0aW5hdGlvbi5cbiAgICAgIC8vIHRoZW4gd2Ugd2lsbCBzdG9wIGluIG91ciB0cmFja3MuXG5cbiAgICAgIGxldCBtb3ZlcyA9IHRoaXMuZ2V0TW92ZW1lbnRzKG5vZGUuY29vcmRzKTtcblxuICAgICAgaWYgKG1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG1vdmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgbGV0IG1vdmUgPSBtb3Zlc1tqXTtcblxuICAgICAgICAgIGlmICghdGhpcy5pc0R1cGxpY2F0ZShtb3ZlLCB0aGlzLmxpc3RPZkNvb3JkaW5hdGVzKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRMaXN0KG1vdmUpOyAvLyB3ZSBwdXQgdGhpcyBjb29yZHMgYXMgYWxyZWFkcnkgdHJlYXRlZFxuXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNyZWF0ZU5vZGUobW92ZSwgZGVwdGggKyAxLCBudWxsKTtcbiAgICAgICAgICAgIG5vZGUuYWRkUGF0aChjaGlsZCk7XG4gICAgICAgICAgICAvLyB3ZSBjaGVjayBpZiBpdCdzIG91ciBkZXN0aW5hdGlvblxuICAgICAgICAgICAgaWYgKGNoaWxkLmNvb3Jkcy5jb21wYXJlKGRDKSkge1xuICAgICAgICAgICAgICAvLyBXZSByZWFjaGVkIG91ciBkZXN0aW5hdGlvbiwgaG9vcnJheVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHROb2RlTGlzdC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc2luY2Ugd2UgaGF2ZSBub3QgZm91bmQgdGhlIGRlc3RpbmF0aW9uLCB3ZSBtdXN0IHRyYXZlbCB0byB0aGUgbmV4dCBsZXZlbFxuICAgIGlmIChuZXh0Tm9kZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5idWlsZFRyZWUobmV4dE5vZGVMaXN0LCBkZXB0aCArIDEsIGRDKTtcbiAgICB9XG4gIH1cblxuICB0cmltVHJlZShub2RlLCBkQykge1xuICAgIGlmIChub2RlLmNvb3Jkcy5jb21wYXJlKGRDKSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubmV4dE5vZGVzICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5uZXh0Tm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZS5uZXh0Tm9kZXNbaV0gPSB0aGlzLnRyaW1UcmVlKG5vZGUubmV4dE5vZGVzW2ldLCBkQyk7XG4gICAgICB9XG4gICAgICBub2RlLnJlbW92ZU51bGxzKCk7XG4gICAgICBpZiAobm9kZS5uZXh0Tm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzRHVwbGljYXRlKHZhbHVlLCBhcnIyKSB7XG4gICAgLy8gd2UgY2hlY2sgaWYgYXJyYXkgMiBoYXMgdmFsdWUgaW4gaXRzIGVsZW1lbnRzXG4gICAgcmV0dXJuIGFycjIuc29tZSgoZSkgPT4ge1xuICAgICAgaWYgKGUucm93ID09PSB2YWx1ZS5yb3cgJiYgZS5jb2wgPT09IHZhbHVlLmNvbCkgcmV0dXJuIHRydWU7XG4gICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkKGMpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAna25pZ2h0JylcbiAgICAgIC8vIHBlcnNvbmFsIHJ1bGVzIG9mIHRoZSBrbmlnaHQgcGllY2UgKGluIHRoaXMgY2FzZSwgcnVsZXMgb2YgdGhlIGNoZXNzYm9hcmQpXG4gICAgICByZXR1cm4gdGhpcy52YWxpZEtuaWdodChjKTtcblxuICAgIC8vIGlmIG5vdCByZXR1cm5lZCB0cnVlIHRpbGwgaGVyZSwgaXQncyBmYWxzZVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkS25pZ2h0KGMpIHtcbiAgICAvLyB3ZSB2YWxpZGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhpcyBvYmplY3RcbiAgICBpZiAoYy5yb3cgPCAwIHx8IGMuY29sIDwgMCB8fCBjLnJvdyA+IDcgfHwgYy5jb2wgPiA3KSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldE1vdmVtZW50cyhjKSB7XG4gICAgLy8gYyAtLT4gY29vcmRzXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2tuaWdodCcpIHJldHVybiB0aGlzLmdldEtuaWdodE1vdmVtZW50cyhjKTtcblxuICAgIC8vIGlmIHdlIGhhdmUgcmVhY2hlZCBoZXJlIGFuZCBub3QgZm91bmQgYSB2YWxpZCB0eXBlLCB3ZSBzaG91bGQgdGhyb3cgYW4gZXJyb3IuXG4gICAgLy8gc2luY2Ugd2UncmUgdG9vIGxhenkgZm9yIHRoYXQsIHdlJ3JlIGdvbm5hIHJldHVybiBudWxsLiBPdXIgdHJlZSB3aWxsIGJlIHZlcnkgc2hvcnQuXG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGdldEtuaWdodE1vdmVtZW50cyhjKSB7XG4gICAgLy8gVGhlIGtuaWdodCBjYW4gbW92ZSB0byBlaWdodCBwb3NpdGlvbnM6XG4gICAgLy8gKzEgcm93LCArMiBjb2xcbiAgICAvLyArMSByb3csIC0yIGNvbFxuICAgIC8vICsyIHJvdywgKzEgY29sXG4gICAgLy8gKzIgcm93LCAtMSBjb2xcbiAgICAvLyAtMSByb3csICsyIGNvbFxuICAgIC8vIC0xIHJvdywgLTIgY29sXG4gICAgLy8gLTIgcm93LCArMSBjb2xcbiAgICAvLyAtMiByb3csIC0xIGNvbFxuICAgIGNvbnN0IG1vdmVtZW50cyA9IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMiwgLTEpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKC0yLCArMSkpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoLTEsIC0yKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMSwgKzIpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsxLCAtMikpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoKzEsICsyKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygrMiwgLTEpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsyLCArMSkpO1xuXG4gICAgbW92ZW1lbnRzLmZvckVhY2goKG1vdmUpID0+IHtcbiAgICAgIGNvbnN0IGF1eENvb3JkcyA9IG5ldyBDb29yZHMoKTtcbiAgICAgIGF1eENvb3Jkcy5jb3B5KGMpO1xuICAgICAgYXV4Q29vcmRzLmFkZChtb3ZlKTtcbiAgICAgIGlmICh0aGlzLnZhbGlkKGF1eENvb3JkcykpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXV4Q29vcmRzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdCA6IG51bGw7XG4gIH1cblxuICBjcmVhdGVOb2RlKGNvb3JkcywgZGVwdGgsIG5leHRDb29yZHMpIHtcbiAgICAvLyBpdCB1c2VkIHRvIGRvIHRoaW5ncyBiZWZvcmUgbmV3IE5vZGUgbG9sLlxuICAgIHJldHVybiBuZXcgTm9kZShjb29yZHMsIGRlcHRoLCBuZXh0Q29vcmRzKTtcbiAgfVxuXG4gIGFkZExpc3QoY29vcmRzKSB7XG4gICAgdGhpcy5saXN0T2ZDb29yZGluYXRlcy5wdXNoKGNvb3Jkcyk7XG4gICAgdGhpcy5zb3J0TGlzdCgpO1xuICB9XG5cbiAgc29ydExpc3QoKSB7XG4gICAgdGhpcy5saXN0T2ZDb29yZGluYXRlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBpZiAoYS5yb3cgPCBiLnJvdykgcmV0dXJuIC0xO1xuICAgICAgaWYgKGEucm93ID4gYi5yb3cpIHJldHVybiAxO1xuICAgICAgaWYgKGEuY29sIDwgYi5jb2wpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmNvbCA+IGIuY29sKSByZXR1cm4gMTtcblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGxldCBwYXRoID0gW107XG4gICAgbGV0IG5vZGUgPSB0aGlzLnJvb3Q7XG5cbiAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICBwYXRoLnB1c2gobm9kZS5jb29yZHMpO1xuXG4gICAgICBpZiAobm9kZS5uZXh0Tm9kZXMgIT0gbnVsbClcbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dE5vZGVzWzBdOyAvLyBzaG91bGQgb25seSBoYXZlIG9uZSBwYXRoXG4gICAgICBlbHNlIG5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoO1xuICB9XG59XG5cbmV4cG9ydCB7IENvb3JkcywgQ2hlc3N0cmVlIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vaW1nL3BhdGgucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiI2NoZXNzYm9hcmQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE1NiwgMTUzLCAxNTApO1xcbiAgd2lkdGg6IDYwdnc7XFxuICBtYXgtd2lkdGg6IDYwMHB4O1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1nYXA6IDA7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XFxufVxcblxcbi5jZWxsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxufVxcblxcbi53aGl0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NSwgMjQ1LCAyNDUsIDAuNDU5KTtcXG59XFxuXFxuLmJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDksIDQ3LCA0NywgMC42NDQpO1xcbn1cXG5cXG4uYXR0aWxhLXJlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTZhNmE2O1xcbn1cXG5cXG4uYXR0aWxhLWJsYWNrIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG4ua25pZ2h0IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA4MCU7XFxuICBmbG9hdDogaW5saW5lLWVuZDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9jaGVzcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0Usb0NBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EscUNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0FBREY7O0FBV0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFSRjs7QUFXQTtFQUNFLDRDQUFBO0FBUkY7O0FBV0E7RUFDRSx5Q0FBQTtBQVJGOztBQVVBO0VBQ0UseUJBQUE7QUFQRjs7QUFTQTtFQUNFLHlEQUFBO0VBQ0Esc0JBQUE7QUFORjs7QUFTQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0FBTkZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLy9Gb3Igb3VyIGNoZXNzIGJvYXJkIHdlIGhhdmUgdGhlIGNoZXNzYm9hcmQgY29udGFpbmVyLCB0aGUgY2VsbCBjbGFzcywgdGhlIGJsYWNrIGNsYXNzLCB0aGUgd2hpdGUgY2xhc3NcXG5cXG4jY2hlc3Nib2FyZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTU2LCAxNTMsIDE1MCk7XFxuICB3aWR0aDogNjB2dztcXG4gIG1heC13aWR0aDogNjAwcHg7XFxuICBib3JkZXI6IDFweCBibGFjayBzb2xpZDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWdhcDogMDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC1hdXRvLWZsb3c6IHJvdztcXG4gIC8vICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICAvL2FsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi8vIC5jZWxsIHtcXG4vLyAgIGJvcmRlcjogMXB4IGJsYWNrIGRhc2hlZDtcXG4vLyAgIGhlaWdodDogNXZoO1xcbi8vICAgd2lkdGg6IDV2dztcXG4vLyB9XFxuXFxuLmNlbGwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGFzcGVjdC1yYXRpbzogMTtcXG59XFxuXFxuLndoaXRlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQ1LCAyNDUsIDI0NSwgMC40NTkpO1xcbn1cXG5cXG4uYmxhY2sge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0OSwgNDcsIDQ3LCAwLjY0NCk7XFxufVxcbi5hdHRpbGEtcmVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNhNmE2YTY7XFxufVxcbi5hdHRpbGEtYmxhY2sge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9pbWcvcGF0aC5wbmcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbi5rbmlnaHQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDgwJTtcXG4gIGZsb2F0OiBpbmxpbmUtZW5kO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2ltZy9iYWNrZ3JvdW5kLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9ub3JzZSk7XCJdKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBtYXJnaW46IDBweDtcXG59XFxuXFxuI21haW4tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE5LCAxOSwgNDYpO1xcbn1cXG4jaGVhZGVyICNsb2dvID4gaW1nIHtcXG4gIGhlaWdodDogMTB2aDtcXG59XFxuI2hlYWRlciAjbG9nbyB7XFxuICBtYXJnaW4tbGVmdDogMTBweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxufVxcbiNoZWFkZXIgI3RpdGxlLXRleHQge1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LXNpemU6IDV2aDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiTm9yc2VcXFwiLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luLWxlZnQ6IDM1cHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG5cXG4jdGV4dC1leHBsYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjQ1Mik7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogNXB4O1xcbiAgcGFkZGluZy10b3A6IDEwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4jdXNlci1mZWVkYmFjayB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxuICB3aWR0aDogODV2dztcXG4gIG1pbi1oZWlnaHQ6IDEwdmg7XFxuICBjb2xvcjogd2hpdGVzbW9rZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ291cmllciBOZXdcXFwiLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxufVxcblxcbiNyZXN0YXJ0IHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBvdXRsaW5lOiAwO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgcGFkZGluZzogMTJweCAxN3B4O1xcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQxLCAyMzgsIDIzOCwgMC4xMDE5NjA3ODQzKTtcXG4gIGNvbG9yOiAjMjIyO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuI3Jlc3RhcnQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgzNCwgMzQsIDM0LCAwLjEwMTk2MDc4NDMpO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2dlbmVyYWwuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLHlEQUFBO0VBQ0Esc0JBQUE7RUFDQSw0QkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFBRjs7QUFHQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlDQUFBO0FBQUY7QUFFRTtFQUNFLFlBQUE7QUFBSjtBQUVFO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQUo7QUFFRTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNDQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSw4Q0FBQTtBQURGOztBQUlBO0VBQ0UsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbURBQUE7RUFDQSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBREY7QUFHRTtFQUNFLGdEQUFBO0FBREpcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuY2RuZm9udHMuY29tL2Nzcy9ub3JzZScpO1xcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcuLi9pbWcvYmFja2dyb3VuZC5qcGcnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gIG1hcmdpbjogMHB4O1xcbn1cXG5cXG4jbWFpbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiNoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTksIDE5LCA0Nik7XFxuXFxuICAjbG9nbyA+IGltZyB7XFxuICAgIGhlaWdodDogMTB2aDtcXG4gIH1cXG4gICNsb2dvIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG4gICN0aXRsZS10ZXh0IHtcXG4gICAgY29sb3I6IHdoaXRlc21va2U7XFxuICAgIGZvbnQtc2l6ZTogNXZoO1xcbiAgICBmb250LWZhbWlseTogJ05vcnNlJywgc2Fucy1zZXJpZjtcXG4gICAgbWFyZ2luLWxlZnQ6IDM1cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIH1cXG59XFxuXFxuI3RleHQtZXhwbGFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40NTIpO1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDVweDtcXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMTBweDtcXG59XFxuXFxuI3VzZXItZmVlZGJhY2sge1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcbiAgd2lkdGg6IDg1dnc7XFxuICBtaW4taGVpZ2h0OiAxMHZoO1xcbiAgY29sb3I6IHdoaXRlc21va2U7XFxuICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgQ291cmllciwgbW9ub3NwYWNlO1xcbn1cXG5cXG4jcmVzdGFydCB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGhlaWdodDogNDBweDtcXG4gIHBhZGRpbmc6IDEycHggMTdweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFlZWVlMWE7XFxuICBjb2xvcjogIzIyMjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuXFxuICAmOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzIyMjIyMjFhO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NoZXNzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jaGVzcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nZW5lcmFsLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nZW5lcmFsLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyd1c2Ugc3RyaWN0JztcbmltcG9ydCAnLi9zdHlsZXMvZ2VuZXJhbC5zY3NzJztcbmltcG9ydCAnLi9zdHlsZXMvY2hlc3Muc2Nzcyc7XG5pbXBvcnQgb2RpbiBmcm9tICcuL2ltZy9vZGluLnBuZyc7XG5pbXBvcnQgeyBDb29yZHMsIENoZXNzdHJlZSB9IGZyb20gJy4vY29kZS9rbmlnaHQuanMnO1xuaW1wb3J0IHsgQ2hlc3Nib2FyZCB9IGZyb20gJy4vY29kZS9jaGVzc2JvYXJkLmpzJztcblxuLy8gd2UgZGVmaW5lIHRoZSB2YXJpYWJsZXMgdGhhdCBhcmUgZ29ubmEgbWFrZSBhbGwgdGhpcyB3b3JrXG5sZXQgc3RhcnRDZWxsID0ge307XG5sZXQgZmluYWxDZWxsID0ge307XG5jb25zdCBjaGVzc2JvYXJkID0gbmV3IENoZXNzYm9hcmQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZXNzYm9hcmQnKSk7XG5jaGVzc2JvYXJkLmNyZWF0ZUJvYXJkKCk7XG4vLyBXZSBzZXQgdGhlIGxpc3RlbmVycyBmb3IgZWFjaCBDZWxsXG5zZXRDZWxsTGlzdGVuZXJzKCk7XG5cbi8vIHdlIHNldCB0aGUgbG9nbyBzb3VyY2Ugd2l0aCB0aGlzLi4uc2VlbXMgdXNpbmcgbnBtIG1ha2VzIGl0IGhhcmQgdG8gZGlyZWN0bHkgaW5qZWN0IGl0IGluIHRoZSBodG1sXG5jb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29kaW4nKTtcbmxvZ28uc3JjID0gb2RpbjtcblxuLy8gd2Ugc2V0IHRoZSBsaXN0ZW5lciB0byB0aGUgcmVzdGFydCBidXR0b25cbmNvbnN0IHJlc3RhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydCcpO1xucmVzdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcmVzdGFydExpc3RlbmVyKCk7XG59KTtcblxuZnVuY3Rpb24gcmVzdGFydExpc3RlbmVyKCkge1xuICBjaGVzc2JvYXJkLnJlc2V0KCk7XG4gIHNldENlbGxMaXN0ZW5lcnMoKTtcbiAgY29uc3QgdXNlckZlZWRiYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXItZmVlZGJhY2snKTtcbiAgdXNlckZlZWRiYWNrLnRleHRDb250ZW50ID0gJ0Nob29zZSBhIGNlbGwgdG8gc3RhcnQhJztcbn1cbmZ1bmN0aW9uIHNldENlbGxMaXN0ZW5lcnMoKSB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2lkXj1jZWxsJyk7XG4gIGlmIChjZWxscyA9PSBudWxsKSByZXR1cm47XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRDZWxsKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV2ZW50Q2VsbChlKSB7XG4gIC8vIGlmIHRoZSB1c2VyIGNsaWNrZWQgb24gYSBjZWxsIHRoZXJlIGFyZSBwb3NzaWJsZSBzY2VuYXJpb3M6XG4gIC8vIEJvYXJkIGlzIGVtcHR5LCB3aGljaCBtZWFucyB3ZSdyZSBwdXR0aW5nIHRoZSBzdGFydGluZyBjb29yZGVuYXRlc1xuICAvLyBCb2FyZCBoYXMgb25lIGtuaWdodCwgd2hpY2ggbWVhbnMgd2UncmUgcHV0dGluZyB0aGUgZmluYWwgY29vcmRpbmF0ZXNcbiAgLy8gdXNlciBpcyBtZXNzaW5nIHdpdGggdGhlIGJvYXJkIGFuZCBjbGlja2luZyB3aGVuIGhlIHNob3VsZG50Li4uXG4gIGNvbnN0IHVzZXJGZWVkYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyLWZlZWRiYWNrJyk7XG4gIGNvbnN0IGN1cnJlbnRDZWxsID0gZS5jdXJyZW50VGFyZ2V0O1xuICBjb25zdCByb3cgPSBjdXJyZW50Q2VsbC5nZXRBdHRyaWJ1dGUoJ3JvdycpO1xuICBjb25zdCBjb2wgPSBjdXJyZW50Q2VsbC5nZXRBdHRyaWJ1dGUoJ2NvbCcpO1xuICBpZiAoY3VycmVudENlbGwuZmlyc3RDaGlsZCkge1xuICAgIC8vIHdlIGFscmVhZHkgaGF2ZSBhIGtuaWdodFxuICAgIHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9XG4gICAgICBcIlRoZSBkZXN0aW5hdGlvbiBjYW4ndCBiZSB0aGUgc2FtZSBhcyB0aGUgc3RhcnQhXCI7XG4gICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgdXNlckZlZWRiYWNrLnRleHRDb250ZW50ID0gJ0Nob29zZSBhIGRlc3RpbmF0aW9uISc7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9PT0gJ0Nob29zZSBhIGNlbGwgdG8gc3RhcnQhJykge1xuICAgIHN0YXJ0Q2VsbCA9IG5ldyBDb29yZHMocm93LCBjb2wpO1xuICAgIHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9ICdIaXJpbmcgYSBLbmlnaHQuLi4nO1xuICAgIGNoZXNzYm9hcmQuc2V0S25pZ2h0KHJvdywgY29sKTtcbiAgICBhd2FpdCBzbGVlcCgyNTApO1xuICAgIHVzZXJGZWVkYmFjay50ZXh0Q29udGVudCA9ICdDaG9vc2UgYSBkZXN0aW5hdGlvbiEnO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh1c2VyRmVlZGJhY2sudGV4dENvbnRlbnQgPT09ICdDaG9vc2UgYSBkZXN0aW5hdGlvbiEnKSB7XG4gICAgZmluYWxDZWxsID0gbmV3IENvb3Jkcyhyb3csIGNvbCk7XG5cbiAgICBjb25zdCBrbmlnaHRUcmVlID0gbmV3IENoZXNzdHJlZShzdGFydENlbGwsIGZpbmFsQ2VsbCwgJ2tuaWdodCcpO1xuICAgIGxldCBtb3ZlcyA9IGtuaWdodFRyZWUuZ2V0UGF0aCgpO1xuXG4gICAgdXNlckZlZWRiYWNrLnRleHRDb250ZW50ID0gbW92ZXNUZXh0KG1vdmVzKTtcbiAgICBjaGVzc2JvYXJkLm1vdmVLbmlnaHQobW92ZXMpO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3Zlc1RleHQobW92ZXMpIHtcbiAgbGV0IHNwID0gJ1snICsgc3RhcnRDZWxsLnJvdyArICcsJyArIHN0YXJ0Q2VsbC5jb2wgKyAnXSc7XG4gIGxldCBmcCA9ICdbJyArIGZpbmFsQ2VsbC5yb3cgKyAnLCcgKyBmaW5hbENlbGwuY29sICsgJ10nO1xuICBsZXQgc3RyMSA9IGA+IGtuaWdodE1vdmVzKCR7c3B9LCAke2ZwfSkgPT4gXFxuYDtcbiAgbGV0IHN0cjIgPSAnJztcbiAgbGV0IHN0cjMgPSAnXFxuJztcbiAgbGV0IGNtID0gLTE7IC8vIGNvdW50IG1vdmVzLCAtMSB0byBub3QgY291bnQgc3RhcnRpbmcgcG9zaXRpb25cblxuICBtb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgc3RyMyArPSBgWyR7bW92ZS5yb3d9LCR7bW92ZS5jb2x9XSBgO1xuICAgIGNtKys7XG4gIH0pO1xuXG4gIHN0cjIgPSBgXFxuWW91IG1hZGUgaXQgaW4gJHtjbX0gbW92ZXMhIEhlcmUncyB5b3VyIHBhdGg6IGA7XG5cbiAgcmV0dXJuIHN0cjEgKyBzdHIyICsgc3RyMztcbn1cblxuZnVuY3Rpb24gc2xlZXAobXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG59XG4iXSwibmFtZXMiOlsidW5pY29ybiIsIkNoZXNzYm9hcmQiLCJjb25zdHJ1Y3RvciIsIm5vZGUiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiY29scyIsInJvd3MiLCJvYmpib2FyZCIsIm5ld0NlbGwiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsIlN0cmluZyIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicmVzZXQiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJzZXRLbmlnaHQiLCJyIiwiYyIsImNlbGwiLCJnZXRFbGVtZW50QnlJZCIsImtuaWdodCIsImNyZWF0ZUtuaWdodCIsImFwcGVuZCIsInNyYyIsIm1vdmVLbmlnaHQiLCJtb3ZlcyIsInF1ZXJ5U2VsZWN0b3IiLCJpUm93IiwiZ2V0QXR0cmlidXRlIiwiaUNvbCIsImF0dGlsYUNvdW50IiwiY291bnQiLCJhdHRpbGEiLCJpIiwibGVuZ3RoIiwieG1vdmVLbmlnaHQiLCJyb3ciLCJjb2wiLCJzbGVlcCIsInJlbW92ZSIsImZSb3ciLCJmQ29sIiwiZGlmZlJvdyIsImRpZmZDb2wiLCJjdXJyZW50Um93IiwiY3VycmVudENvbCIsIm1vdmVVcCIsIm1vdmVEb3duIiwibW92ZUxlZnQiLCJtb3ZlUmlnaHQiLCJtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInBpZWNlIiwidHJhbnMiLCJjYWxjVHJhbnNsYXRlIiwidHJhbnNYIiwiZWZmZWN0IiwidHJhbnNmb3JtIiwiYW5pbWF0ZSIsImdldFRpbWluZyIsInRyYW5zWSIsIk1hdGgiLCJmbG9vciIsInRpbWluZyIsImR1cmF0aW9uIiwiaXRlcmF0aW9ucyIsInBvc2l0aW9uSW5mbyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInBhcnNlSW50Iiwid2lkdGgiLCJDb29yZHMiLCJjb21wYXJlIiwiY29vcmRzIiwidG9TdHJpbmciLCJjb3B5IiwiTm9kZSIsImRlcHRoIiwibmV4dE5vZGVzIiwiYWRkUGF0aCIsInB1c2giLCJyZW1vdmVOdWxscyIsImF1eExpc3QiLCJmb3JFYWNoIiwiQ2hlc3N0cmVlIiwib0MiLCJkQyIsInR5cGUiLCJyb290IiwiY3JlYXRlTm9kZSIsImJ1aWxkVHJlZSIsInRyaW1UcmVlIiwibm9kZUxpc3QiLCJuZXh0Tm9kZUxpc3QiLCJqIiwiZ2V0TW92ZW1lbnRzIiwibW92ZSIsImlzRHVwbGljYXRlIiwibGlzdE9mQ29vcmRpbmF0ZXMiLCJhZGRMaXN0IiwiY2hpbGQiLCJ2YWx1ZSIsImFycjIiLCJzb21lIiwiZSIsInZhbGlkIiwidmFsaWRLbmlnaHQiLCJnZXRLbmlnaHRNb3ZlbWVudHMiLCJtb3ZlbWVudHMiLCJyZXN1bHQiLCJhdXhDb29yZHMiLCJuZXh0Q29vcmRzIiwic29ydExpc3QiLCJzb3J0IiwiYSIsImIiLCJnZXRQYXRoIiwicGF0aCIsIm9kaW4iLCJzdGFydENlbGwiLCJmaW5hbENlbGwiLCJjaGVzc2JvYXJkIiwic2V0Q2VsbExpc3RlbmVycyIsImxvZ28iLCJyZXN0YXJ0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3RhcnRMaXN0ZW5lciIsInVzZXJGZWVkYmFjayIsInRleHRDb250ZW50IiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlbnRDZWxsIiwiY3VycmVudENlbGwiLCJjdXJyZW50VGFyZ2V0Iiwia25pZ2h0VHJlZSIsIm1vdmVzVGV4dCIsInNwIiwiZnAiLCJzdHIxIiwic3RyMiIsInN0cjMiLCJjbSJdLCJzb3VyY2VSb290IjoiIn0=