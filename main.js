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

      newCell.textContent = `${rows} - ${cols}`;
      this.board.appendChild(newCell);
      cols++;
      if (cols >= 8) {
        cols = 0;
        rows++;
      }
    }
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

  // async moveKnight(r1, c1, r2, c2) {
  //   // r1 and c1 are the init values where the knight must be
  //   // r2, c2 are the final values where the knight is gonna be put
  //   let knight = document.getElementById(`knight-${r1}-${c1}`);
  //   let cell = document.getElementById(`cell-${r2}-${c2}`);
  //   console.log(cell);
  //   await sleep(900); // load web, remember to delete

  //   if (r1-r2 < 0)

  //     await moveRight(knight);

  //   knight.remove();
  //   let knight2 = this.setKnight(r2, c2);

  //   await moveUp(knight2);
  //   knight2.remove();
  //   let knight3 = this.setKnight(3, 5);

  //   await moveUp(knight3);
  //   knight3.remove();
  //   let knight4 = this.setKnight(2, 5);

  //   await sleep(1);
  // }

  async moveKnight(moves) {
    let knight = document.querySelector('[id^=knight');
    let iRow = knight.getAttribute('row');
    let iCol = knight.getAttribute('col');
    for (let i = 0; i < moves.length; i++) {
      await this.xmoveKnight(knight, iRow, iCol, moves[i].row, moves[i].col);
      iRow = moves[i].row;
      iCol = moves[i].col;
      knight = document.querySelector('[id^=knight');
      await sleep(500);
    }
  }
  async xmoveKnight(knight, iRow, iCol, fRow, fCol) {
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
    for (i = diffRow; i < 0; i++) {
      currentRow--;
      await moveUp(knight);
      await knight.remove();
      knight = this.setKnight(currentRow, currentCol);
    }
    for (i = 0; i < diffRow; i++) {
      currentRow++;
      await moveDown(knight);
      await knight.remove();
      knight = this.setKnight(currentRow, currentCol);
    }
    for (i = diffCol; i < 0; i++) {
      currentCol--;
      await moveLeft(knight);
      await knight.remove();
      knight = this.setKnight(currentRow, currentCol);
    }
    for (i = 0; i < diffCol; i++) {
      currentCol++;
      await moveRight(knight);
      await knight.remove();
      knight = this.setKnight(currentRow, currentCol);
    }
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// async function moveRightUp(piece) {
//   await moveRight(piece);

//   await moveUp(piece);
// }

async function moveRight(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(${trans}px)`;
  console.log(transX);
  const effect = [{
    transform: transX
  }];
  piece.animate(effect, getTiming());
  await sleep(499);
}
async function moveLeft(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(-${trans}px)`;
  console.log(transX);
  const effect = [{
    transform: transX
  }];
  piece.animate(effect, getTiming());
  await sleep(499);
}
async function moveUp(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(-${trans}px)`;
  console.log(transY);
  const effect = [{
    transform: transY
  }];
  piece.animate(effect, getTiming());
  await sleep(499);
}
async function moveDown(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(${Math.floor(trans)}px)`;
  console.log(transY);
  const effect = [{
    transform: transY
  }];
  piece.animate(effect, getTiming());
  await sleep(499);
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
    this.row = r;
    this.col = c;
  }
  compare(coords) {
    if (this.row === coords.row && this.col === coords.col) return true;else return false;
  }
  add(coords) {
    // We add two coords together
    this.row += coords.row;
    this.col += coords.col;
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
    this.row = coords.row;
    this.col = coords.col;
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

  // am I even using this?
  addPath(node) {
    if (node == null) {
      console.log('null node: ' + node);
    }
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
  //   setDestination(v) {
  //     if (!v) this.destination = false;
  //     else this.destination = true;
  //   }
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
      console.log('so this is the beginning');
      this.buildTree([this.root], 0, dC);
      this.root = this.trimTree(this.root, dC);
    }
    console.log(this.root);
    console.log(this.listOfCoordinates);
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#chessboard {\n  position: relative;\n  background-color: bisque;\n  width: 60vw;\n  border: 1px black solid;\n  display: grid;\n  grid-gap: 0;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(8, 1fr);\n  grid-auto-flow: row;\n}\n\n.cell {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  aspect-ratio: 1;\n}\n\n.white {\n  background-color: rgba(245, 245, 245, 0.459);\n}\n\n.black {\n  background-color: rgb(226, 123, 123);\n}\n\n.knight {\n  position: relative;\n  width: 80%;\n}", "",{"version":3,"sources":["webpack://./src/styles/chess.scss"],"names":[],"mappings":"AAEA;EACE,kBAAA;EACA,wBAAA;EACA,WAAA;EACA,uBAAA;EACA,aAAA;EACA,WAAA;EACA,qCAAA;EACA,kCAAA;EACA,mBAAA;AADF;;AAWA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;AARF;;AAWA;EACE,4CAAA;AARF;;AAWA;EACE,oCAAA;AARF;;AAWA;EACE,kBAAA;EACA,UAAA;AARF","sourcesContent":["//For our chess board we have the chessboard container, the cell class, the black class, the white class\n\n#chessboard {\n  position: relative;\n  background-color: bisque;\n  width: 60vw;\n  border: 1px black solid;\n  display: grid;\n  grid-gap: 0;\n  grid-template-columns: repeat(8, 1fr);\n  grid-template-rows: repeat(8, 1fr);\n  grid-auto-flow: row;\n  //  justify-items: center;\n  //align-items: center;\n}\n// .cell {\n//   border: 1px black dashed;\n//   height: 5vh;\n//   width: 5vw;\n// }\n\n.cell {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  aspect-ratio: 1;\n}\n\n.white {\n  background-color: rgba(245, 245, 245, 0.459);\n}\n\n.black {\n  background-color: rgb(226, 123, 123);\n}\n\n.knight {\n  position: relative;\n  width: 80%;\n  //animation: 4s ease-in-out 0s move-knight1;\n}\n\n// @keyframes move-knight1 {\n//   //   0% {\n//   //     left: 0;\n//   //   }\n//   //   25% {\n//   //     left: 20%;\n//   //   }\n//   //   50% {\n//   //     top: 33%;\n//   //   }\n//   //   75% {\n//   //     top: 66%;\n//   //   }\n//   //   100% {\n//   //     top: 100%;\n//   //   }\n//   from {\n//     left: 0%;\n//   }\n//   to {\n//     left: 100%;\n//   }\n//   from {\n//     left: 100%;\n//     bottom: 0%;\n//   }\n//   to {\n//     left: 100%;\n//     bottom: 200%;\n//   }\n// }\n"],"sourceRoot":""}]);
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
/* harmony import */ var _styles_chess_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/chess.scss */ "./src/styles/chess.scss");
/* harmony import */ var _code_knight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./code/knight.js */ "./src/code/knight.js");
/* harmony import */ var _code_chessboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code/chessboard.js */ "./src/code/chessboard.js");
/* eslint-disable */
//'use strict';




const sp = new _code_knight_js__WEBPACK_IMPORTED_MODULE_1__.Coords(4, 3); // starting point
const fp = new _code_knight_js__WEBPACK_IMPORTED_MODULE_1__.Coords(0, 7); // final point
let cp = new _code_knight_js__WEBPACK_IMPORTED_MODULE_1__.Coords(); // current point
const knightTree = new _code_knight_js__WEBPACK_IMPORTED_MODULE_1__.Chesstree(sp, fp, 'knight');
let moves = knightTree.getPath();
const chessboard = new _code_chessboard_js__WEBPACK_IMPORTED_MODULE_2__.Chessboard(document.getElementById('chessboard'));
chessboard.createBoard();
chessboard.setKnight(sp.row, sp.col);
chessboard.moveKnight(moves);
// cp.copy(sp);

// moves.forEach((move) => {
//   // let row = cp.row - move.row;
//   // let col = cp.col - move.col;
//   chessboard.moveKnight(cp.row, cp.col, move.row, move.col);
//   cp.copy(move);
// });
// chessboard.moveKnight(cp.row, cp.col, moves[1].row, moves[1].col);

//chessboard.setKnight(0, 7);
//chessboard.moveKnight(4, 3, 5, 5);

// let chessCoords = [];
// chessCoords.push(['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B']); // row 0
// chessCoords.push(['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W']);
// chessCoords.push(['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B']);
// chessCoords.push(['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W']);
// chessCoords.push(['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B']);
// chessCoords.push(['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W']);
// chessCoords.push(['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B']);
// chessCoords.push(['B', 'W', 'B', 'W', 'B', 'W', 'B', 'W']); // row 7
// chessboard.setKnight(4, 5);
//setKnight(4, 4); // creates knight in the board

// function createBoard() {
//   console.log('ola ke ase');

//   let cols = 0,
//     rows = 0;

//   while (cols < 8 && rows < 8) {
//     let newCell = document.createElement('div');
//     newCell.id = `cell-${String(rows)}-${String(cols)}`;
//     newCell.classList.add('cell');
//     if (
//       (rows % 2 === 0 && cols % 2 === 0) ||
//       (rows % 2 !== 0 && cols % 2 !== 0)
//     ) {
//       newCell.classList.add('white');
//       chessCoords[cols][rows] = 'W';
//     } else {
//       newCell.classList.add('black');
//       chessCoords[cols][rows] = 'B';
//     }
//     chessBoard.appendChild(newCell);
//     cols++;
//     if (cols >= 8) {
//       cols = 0;
//       rows++;
//     }
//   }
// }

// function setKnight(row, col) {}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQSxrQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL2NvZGUvY2hlc3Nib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9jb2RlL2tuaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvY2hlc3Muc2NzcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvY2hlc3Muc2Nzcz9lOTIwIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHVuaWNvcm4gZnJvbSAnLi4vaW1nL3VuaWNvcm4ga25pZ2h0LnBuZyc7XG5cbmNsYXNzIENoZXNzYm9hcmQge1xuICBjb25zdHJ1Y3Rvcihub2RlKSB7XG4gICAgdGhpcy5ib2FyZCA9IG5vZGU7XG4gIH1cblxuICBjcmVhdGVCb2FyZCgpIHtcbiAgICBsZXQgY29scyA9IDA7XG4gICAgbGV0IHJvd3MgPSAwO1xuXG4gICAgd2hpbGUgKGNvbHMgPCA4ICYmIHJvd3MgPCA4KSB7XG4gICAgICBsZXQgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbmV3Q2VsbC5pZCA9IGBjZWxsLSR7U3RyaW5nKHJvd3MpfS0ke1N0cmluZyhjb2xzKX1gO1xuICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHJvd3MgJSAyID09PSAwICYmIGNvbHMgJSAyID09PSAwKSB8fFxuICAgICAgICAocm93cyAlIDIgIT09IDAgJiYgY29scyAlIDIgIT09IDApXG4gICAgICApIHtcbiAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCd3aGl0ZScpO1xuICAgICAgICAvL2NoZXNzQ29vcmRzW2NvbHNdW3Jvd3NdID0gJ1cnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdibGFjaycpO1xuICAgICAgICAvL2NoZXNzQ29vcmRzW2NvbHNdW3Jvd3NdID0gJ0InO1xuICAgICAgfVxuXG4gICAgICBuZXdDZWxsLnRleHRDb250ZW50ID0gYCR7cm93c30gLSAke2NvbHN9YDtcbiAgICAgIHRoaXMuYm9hcmQuYXBwZW5kQ2hpbGQobmV3Q2VsbCk7XG4gICAgICBjb2xzKys7XG5cbiAgICAgIGlmIChjb2xzID49IDgpIHtcbiAgICAgICAgY29scyA9IDA7XG4gICAgICAgIHJvd3MrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRLbmlnaHQociwgYykge1xuICAgIC8vIHIgc3RhbmRzIGZvciByb3dcbiAgICAvLyBjIHN0YW5kcyBmb3IgY29sXG4gICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2VsbC0ke3J9LSR7Y31gKTtcbiAgICBsZXQga25pZ2h0ID0gdGhpcy5jcmVhdGVLbmlnaHQociwgYyk7XG4gICAgY2VsbC5hcHBlbmQoa25pZ2h0KTtcbiAgICByZXR1cm4ga25pZ2h0O1xuICB9XG5cbiAgY3JlYXRlS25pZ2h0KHIsIGMpIHtcbiAgICBsZXQga25pZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAga25pZ2h0LnNyYyA9IHVuaWNvcm47XG4gICAga25pZ2h0LmNsYXNzTGlzdC5hZGQoJ2tuaWdodCcpO1xuICAgIGtuaWdodC5pZCA9IGBrbmlnaHQtJHtyfS0ke2N9YDtcbiAgICBrbmlnaHQuc2V0QXR0cmlidXRlKCdyb3cnLCByKTtcbiAgICBrbmlnaHQuc2V0QXR0cmlidXRlKCdjb2wnLCBjKTtcbiAgICByZXR1cm4ga25pZ2h0O1xuICB9XG5cbiAgLy8gYXN5bmMgbW92ZUtuaWdodChyMSwgYzEsIHIyLCBjMikge1xuICAvLyAgIC8vIHIxIGFuZCBjMSBhcmUgdGhlIGluaXQgdmFsdWVzIHdoZXJlIHRoZSBrbmlnaHQgbXVzdCBiZVxuICAvLyAgIC8vIHIyLCBjMiBhcmUgdGhlIGZpbmFsIHZhbHVlcyB3aGVyZSB0aGUga25pZ2h0IGlzIGdvbm5hIGJlIHB1dFxuICAvLyAgIGxldCBrbmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChga25pZ2h0LSR7cjF9LSR7YzF9YCk7XG4gIC8vICAgbGV0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2VsbC0ke3IyfS0ke2MyfWApO1xuICAvLyAgIGNvbnNvbGUubG9nKGNlbGwpO1xuICAvLyAgIGF3YWl0IHNsZWVwKDkwMCk7IC8vIGxvYWQgd2ViLCByZW1lbWJlciB0byBkZWxldGVcblxuICAvLyAgIGlmIChyMS1yMiA8IDApXG5cbiAgLy8gICAgIGF3YWl0IG1vdmVSaWdodChrbmlnaHQpO1xuXG4gIC8vICAga25pZ2h0LnJlbW92ZSgpO1xuICAvLyAgIGxldCBrbmlnaHQyID0gdGhpcy5zZXRLbmlnaHQocjIsIGMyKTtcblxuICAvLyAgIGF3YWl0IG1vdmVVcChrbmlnaHQyKTtcbiAgLy8gICBrbmlnaHQyLnJlbW92ZSgpO1xuICAvLyAgIGxldCBrbmlnaHQzID0gdGhpcy5zZXRLbmlnaHQoMywgNSk7XG5cbiAgLy8gICBhd2FpdCBtb3ZlVXAoa25pZ2h0Myk7XG4gIC8vICAga25pZ2h0My5yZW1vdmUoKTtcbiAgLy8gICBsZXQga25pZ2h0NCA9IHRoaXMuc2V0S25pZ2h0KDIsIDUpO1xuXG4gIC8vICAgYXdhaXQgc2xlZXAoMSk7XG4gIC8vIH1cblxuICBhc3luYyBtb3ZlS25pZ2h0KG1vdmVzKSB7XG4gICAgbGV0IGtuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpZF49a25pZ2h0Jyk7XG4gICAgbGV0IGlSb3cgPSBrbmlnaHQuZ2V0QXR0cmlidXRlKCdyb3cnKTtcbiAgICBsZXQgaUNvbCA9IGtuaWdodC5nZXRBdHRyaWJ1dGUoJ2NvbCcpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgYXdhaXQgdGhpcy54bW92ZUtuaWdodChrbmlnaHQsIGlSb3csIGlDb2wsIG1vdmVzW2ldLnJvdywgbW92ZXNbaV0uY29sKTtcbiAgICAgIGlSb3cgPSBtb3Zlc1tpXS5yb3c7XG4gICAgICBpQ29sID0gbW92ZXNbaV0uY29sO1xuICAgICAga25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkXj1rbmlnaHQnKTtcbiAgICAgIGF3YWl0IHNsZWVwKDUwMCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgeG1vdmVLbmlnaHQoa25pZ2h0LCBpUm93LCBpQ29sLCBmUm93LCBmQ29sKSB7XG4gICAgLy8gaVJvdyAtLT4gaW5pdGlhbCByb3dcbiAgICAvLyBpQ29sIC0tPiBpbml0aWFsIENvbFxuICAgIC8vIGZSb3cgLS0+IGZpbmFsIHJvd1xuICAgIC8vIGZDb2wgLS0+IGZpbmFsIGNvbFxuICAgIGxldCBpO1xuICAgIC8vbGV0IGtuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpZF49a25pZ2h0Jyk7XG4gICAgLy9sZXQga25pZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGtuaWdodC0ke2lSb3d9LSR7aUNvbH1gKTtcbiAgICBsZXQgZGlmZlJvdyA9IGZSb3cgLSBpUm93OyAvLyBvZmZzZXQgaW4geCBheGlzXG4gICAgbGV0IGRpZmZDb2wgPSBmQ29sIC0gaUNvbDsgLy8gb2Zmc2V0IGluIHkgYXhpc1xuICAgIGxldCBjdXJyZW50Um93ID0gaVJvdztcbiAgICBsZXQgY3VycmVudENvbCA9IGlDb2w7XG5cbiAgICBmb3IgKGkgPSBkaWZmUm93OyBpIDwgMDsgaSsrKSB7XG4gICAgICBjdXJyZW50Um93LS07XG4gICAgICBhd2FpdCBtb3ZlVXAoa25pZ2h0KTtcbiAgICAgIGF3YWl0IGtuaWdodC5yZW1vdmUoKTtcbiAgICAgIGtuaWdodCA9IHRoaXMuc2V0S25pZ2h0KGN1cnJlbnRSb3csIGN1cnJlbnRDb2wpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGlmZlJvdzsgaSsrKSB7XG4gICAgICBjdXJyZW50Um93Kys7XG4gICAgICBhd2FpdCBtb3ZlRG93bihrbmlnaHQpO1xuICAgICAgYXdhaXQga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgfVxuXG4gICAgZm9yIChpID0gZGlmZkNvbDsgaSA8IDA7IGkrKykge1xuICAgICAgY3VycmVudENvbC0tO1xuICAgICAgYXdhaXQgbW92ZUxlZnQoa25pZ2h0KTtcbiAgICAgIGF3YWl0IGtuaWdodC5yZW1vdmUoKTtcbiAgICAgIGtuaWdodCA9IHRoaXMuc2V0S25pZ2h0KGN1cnJlbnRSb3csIGN1cnJlbnRDb2wpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGlmZkNvbDsgaSsrKSB7XG4gICAgICBjdXJyZW50Q29sKys7XG4gICAgICBhd2FpdCBtb3ZlUmlnaHQoa25pZ2h0KTtcbiAgICAgIGF3YWl0IGtuaWdodC5yZW1vdmUoKTtcbiAgICAgIGtuaWdodCA9IHRoaXMuc2V0S25pZ2h0KGN1cnJlbnRSb3csIGN1cnJlbnRDb2wpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gc2xlZXAobXMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG59XG4vLyBhc3luYyBmdW5jdGlvbiBtb3ZlUmlnaHRVcChwaWVjZSkge1xuLy8gICBhd2FpdCBtb3ZlUmlnaHQocGllY2UpO1xuXG4vLyAgIGF3YWl0IG1vdmVVcChwaWVjZSk7XG4vLyB9XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVSaWdodChwaWVjZSkge1xuICBsZXQgdHJhbnMgPSBjYWxjVHJhbnNsYXRlKHBpZWNlKTtcbiAgbGV0IHRyYW5zWCA9IGB0cmFuc2xhdGVYKCR7dHJhbnN9cHgpYDtcblxuICBjb25zb2xlLmxvZyh0cmFuc1gpO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNYIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDQ5OSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVMZWZ0KHBpZWNlKSB7XG4gIGxldCB0cmFucyA9IGNhbGNUcmFuc2xhdGUocGllY2UpO1xuICBsZXQgdHJhbnNYID0gYHRyYW5zbGF0ZVgoLSR7dHJhbnN9cHgpYDtcbiAgY29uc29sZS5sb2codHJhbnNYKTtcblxuICBjb25zdCBlZmZlY3QgPSBbeyB0cmFuc2Zvcm06IHRyYW5zWCB9XTtcblxuICBwaWVjZS5hbmltYXRlKGVmZmVjdCwgZ2V0VGltaW5nKCkpO1xuICBhd2FpdCBzbGVlcCg0OTkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBtb3ZlVXAocGllY2UpIHtcbiAgbGV0IHRyYW5zID0gY2FsY1RyYW5zbGF0ZShwaWVjZSk7XG4gIGxldCB0cmFuc1kgPSBgdHJhbnNsYXRlWSgtJHt0cmFuc31weClgO1xuICBjb25zb2xlLmxvZyh0cmFuc1kpO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNZIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDQ5OSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVEb3duKHBpZWNlKSB7XG4gIGxldCB0cmFucyA9IGNhbGNUcmFuc2xhdGUocGllY2UpO1xuICBsZXQgdHJhbnNZID0gYHRyYW5zbGF0ZVkoJHtNYXRoLmZsb29yKHRyYW5zKX1weClgO1xuICBjb25zb2xlLmxvZyh0cmFuc1kpO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNZIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDQ5OSk7XG59XG5cbmZ1bmN0aW9uIGdldFRpbWluZygpIHtcbiAgY29uc3QgdGltaW5nID0ge1xuICAgIGR1cmF0aW9uOiA1MDAsXG4gICAgaXRlcmF0aW9uczogMSxcbiAgfTtcbiAgcmV0dXJuIHRpbWluZztcbn1cblxuZnVuY3Rpb24gY2FsY1RyYW5zbGF0ZShwaWVjZSkge1xuICAvLyBpdCBzZWVtcyB0aGUgZGl2IHdpZHRoICsgMzAgJSBtYWtlcyB0aGUgYW5pbWF0aW9uIHNtb290aGVyXG4gIGxldCBwb3NpdGlvbkluZm8gPSBwaWVjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgbGV0IHRyYW5zID0gTWF0aC5mbG9vcihwYXJzZUludChwb3NpdGlvbkluZm8ud2lkdGgpICogMS4zKTtcblxuICByZXR1cm4gdHJhbnM7XG59XG5cbmV4cG9ydCB7IENoZXNzYm9hcmQgfTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlICovXG5jbGFzcyBDb29yZHMge1xuICAvLyBDb29yZHMgb2JqZWN0IGNvbnRhaW4gcm93IGFuZCBjb2xcbiAgY29uc3RydWN0b3IociwgYykge1xuICAgIHRoaXMucm93ID0gcjtcbiAgICB0aGlzLmNvbCA9IGM7XG4gIH1cblxuICBjb21wYXJlKGNvb3Jkcykge1xuICAgIGlmICh0aGlzLnJvdyA9PT0gY29vcmRzLnJvdyAmJiB0aGlzLmNvbCA9PT0gY29vcmRzLmNvbCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhZGQoY29vcmRzKSB7XG4gICAgLy8gV2UgYWRkIHR3byBjb29yZHMgdG9nZXRoZXJcbiAgICB0aGlzLnJvdyArPSBjb29yZHMucm93O1xuICAgIHRoaXMuY29sICs9IGNvb3Jkcy5jb2w7XG4gIH1cblxuICAvLyB0aGUgdHJlZSBpcyB0aGUgb25lIHdobyBkZWZpbmVzIHRoZSBib3VuZHMgb2Ygd2hhdCBpcyB2YWxpZCBhbmQgd2hhdCBub3QgZGVwZW5kaW5nIG9uIGl0cyBvd24gcnVsZXMgKHJpZ2h0IG5vdywgS25pZ2h0IGNoZXNzIG1vdmVtZW50KVxuICAvLyAgIHZhbGlkKCkge1xuICAvLyAgICAgLy8gd2UgdmFsaWRhdGUgdGhlIGNvb3JkaW5hdGVzIG9mIHRoaXMgb2JqZWN0XG4gIC8vICAgICBpZiAodGhpcy5yb3cgPCAwIHx8IHRoaXMuY29sIDwgMCB8fCB0aGlzLnJvdyA+IDcgfHwgdGhpcy5jb2wgPiA3KVxuICAvLyAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gICAgIHJldHVybiB0cnVlO1xuICAvLyAgIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJ3JvdzogJyArIHRoaXMucm93ICsgJyB8IGNvbDogJyArIHRoaXMuY29sO1xuICB9XG5cbiAgY29weShjb29yZHMpIHtcbiAgICB0aGlzLnJvdyA9IGNvb3Jkcy5yb3c7XG4gICAgdGhpcy5jb2wgPSBjb29yZHMuY29sO1xuICB9XG59XG5cbmNsYXNzIE5vZGUge1xuICAvLyBBIG5vZGUgaXMgZm9ybWVkIG9mIGFuIG9iamVjdCBjb29yZHMgYW5kIGFuIGFycmF5IG9mIGNvbm5lY3RlZCBub2Rlc1xuICAvLyBlc3NlbnRpYWxseSB3ZSBnZXQgY29vcmRzIHBhdGhpbmcgdG8gb3RoZXIgY29vcmRzIHVudGlsIG51bGwuXG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgZGVwdGgsIG5leHROb2Rlcykge1xuICAgIGlmIChjb29yZHMgIT0gbnVsbCkgdGhpcy5jb29yZHMgPSBjb29yZHM7XG4gICAgaWYgKGRlcHRoICE9IG51bGwpIHRoaXMuZGVwdGggPSBkZXB0aDtcbiAgICBpZiAobmV4dE5vZGVzICE9IG51bGwpIHRoaXMubmV4dE5vZGVzID0gbmV4dE5vZGVzO1xuICB9XG5cbiAgLy8gYW0gSSBldmVuIHVzaW5nIHRoaXM/XG4gIGFkZFBhdGgobm9kZSkge1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdudWxsIG5vZGU6ICcgKyBub2RlKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubmV4dE5vZGVzID09IG51bGwgfHwgdGhpcy5uZXh0Tm9kZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhpcy5uZXh0Tm9kZXMgPSBbbm9kZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmV4dE5vZGVzLnB1c2gobm9kZSk7XG4gICAgfVxuICB9XG4gIHJlbW92ZU51bGxzKCkge1xuICAgIGlmICh0aGlzLm5leHROb2RlcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLm5leHROb2RlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgYXV4TGlzdCA9IFtdO1xuICAgICAgdGhpcy5uZXh0Tm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSBhdXhMaXN0LnB1c2gobm9kZSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMubmV4dE5vZGVzID0gYXV4TGlzdDtcbiAgICB9XG4gIH1cbiAgLy8gICBzZXREZXN0aW5hdGlvbih2KSB7XG4gIC8vICAgICBpZiAoIXYpIHRoaXMuZGVzdGluYXRpb24gPSBmYWxzZTtcbiAgLy8gICAgIGVsc2UgdGhpcy5kZXN0aW5hdGlvbiA9IHRydWU7XG4gIC8vICAgfVxufVxuXG5jbGFzcyBDaGVzc3RyZWUge1xuICAvLyB0aGUgQ2hlc3N0cmVlIHJlY2VpdmVzIHRoaXMgcGFyYW1ldGVycyB0byB3b3JrOlxuICAvLyAxLT4gT3JpZ2luIENvb3JkaW5hdGVzLCBvdXIgc3RhcnRpbmcgcG9pbnQuXG4gIC8vIDItPiBEZXN0aW5peSBDb29yZGluYXRlcywgb3VyIGZpbmFsIHBvaW50LlxuICAvLyAzLT4gdHlwZSAoZm9yIG5vdywgb25seSBLbmlnaHQgaXMgYXZhaWxhYmxlKSwgZGVmaW5lcyB0aGUgcnVsZXMgd2hpY2ggd2lsbCBldmFsdWF0ZSBpZiBjb29yZGluYXRlcyBhcmUgdmFsaWQgb3Igbm90XG5cbiAgbGlzdE9mQ29vcmRpbmF0ZXMgPSBbXTtcbiAgZGVzdGluYXRpb25SZWFjaGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iob0MsIGRDLCB0eXBlKSB7XG4gICAgLy8gb0MgLT4gT3JpZ2luIENvb3JkcywgZEMgLS0+IERlc3RpbnkgQ29vcmRzXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmNyZWF0ZU5vZGUob0MsIG51bGwpO1xuICAgIGlmIChvQyAhPSBkQykge1xuICAgICAgY29uc29sZS5sb2coJ3NvIHRoaXMgaXMgdGhlIGJlZ2lubmluZycpO1xuICAgICAgdGhpcy5idWlsZFRyZWUoW3RoaXMucm9vdF0sIDAsIGRDKTtcbiAgICAgIHRoaXMucm9vdCA9IHRoaXMudHJpbVRyZWUodGhpcy5yb290LCBkQyk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMucm9vdCk7XG4gICAgY29uc29sZS5sb2codGhpcy5saXN0T2ZDb29yZGluYXRlcyk7XG4gIH1cblxuICBidWlsZFRyZWUobm9kZUxpc3QsIGRlcHRoLCBkQykge1xuICAgIGlmIChub2RlTGlzdCA9PSBudWxsKSByZXR1cm47IC8vIGd1YXJkIGNsYXVzZVxuICAgIGxldCBuZXh0Tm9kZUxpc3QgPSBbXTtcbiAgICBsZXQgaSwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBub2RlTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5vZGUgPSBub2RlTGlzdFtpXTtcbiAgICAgIC8vIEZvciBlYWNoIG5vZGUgb2YgdGhlIG5vZGUgbGlzdCB3ZSdyZSBnb25uYSBjaGVjayBpZiBhbnkgb2YgdGhlIGNoaWxkcyBpcyBvdXIgZGVzdGluYXRpb24uXG4gICAgICAvLyB0aGVuIHdlIHdpbGwgc3RvcCBpbiBvdXIgdHJhY2tzLlxuXG4gICAgICBsZXQgbW92ZXMgPSB0aGlzLmdldE1vdmVtZW50cyhub2RlLmNvb3Jkcyk7XG5cbiAgICAgIGlmIChtb3Zlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBtb3Zlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGxldCBtb3ZlID0gbW92ZXNbal07XG5cbiAgICAgICAgICBpZiAoIXRoaXMuaXNEdXBsaWNhdGUobW92ZSwgdGhpcy5saXN0T2ZDb29yZGluYXRlcykpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdChtb3ZlKTsgLy8gd2UgcHV0IHRoaXMgY29vcmRzIGFzIGFscmVhZHJ5IHRyZWF0ZWRcblxuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhpcy5jcmVhdGVOb2RlKG1vdmUsIGRlcHRoICsgMSwgbnVsbCk7XG4gICAgICAgICAgICBub2RlLmFkZFBhdGgoY2hpbGQpO1xuICAgICAgICAgICAgLy8gd2UgY2hlY2sgaWYgaXQncyBvdXIgZGVzdGluYXRpb25cbiAgICAgICAgICAgIGlmIChjaGlsZC5jb29yZHMuY29tcGFyZShkQykpIHtcbiAgICAgICAgICAgICAgLy8gV2UgcmVhY2hlZCBvdXIgZGVzdGluYXRpb24sIGhvb3JyYXlcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXh0Tm9kZUxpc3QucHVzaChjaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHNpbmNlIHdlIGhhdmUgbm90IGZvdW5kIHRoZSBkZXN0aW5hdGlvbiwgd2UgbXVzdCB0cmF2ZWwgdG8gdGhlIG5leHQgbGV2ZWxcbiAgICBpZiAobmV4dE5vZGVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYnVpbGRUcmVlKG5leHROb2RlTGlzdCwgZGVwdGggKyAxLCBkQyk7XG4gICAgfVxuICB9XG5cbiAgdHJpbVRyZWUobm9kZSwgZEMpIHtcbiAgICBpZiAobm9kZS5jb29yZHMuY29tcGFyZShkQykpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIGlmIChub2RlLm5leHROb2RlcyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUubmV4dE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5vZGUubmV4dE5vZGVzW2ldID0gdGhpcy50cmltVHJlZShub2RlLm5leHROb2Rlc1tpXSwgZEMpO1xuICAgICAgfVxuICAgICAgbm9kZS5yZW1vdmVOdWxscygpO1xuICAgICAgaWYgKG5vZGUubmV4dE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0R1cGxpY2F0ZSh2YWx1ZSwgYXJyMikge1xuICAgIC8vIHdlIGNoZWNrIGlmIGFycmF5IDIgaGFzIHZhbHVlIGluIGl0cyBlbGVtZW50c1xuICAgIHJldHVybiBhcnIyLnNvbWUoKGUpID0+IHtcbiAgICAgIGlmIChlLnJvdyA9PT0gdmFsdWUucm93ICYmIGUuY29sID09PSB2YWx1ZS5jb2wpIHJldHVybiB0cnVlO1xuICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICB2YWxpZChjKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2tuaWdodCcpXG4gICAgICAvLyBwZXJzb25hbCBydWxlcyBvZiB0aGUga25pZ2h0IHBpZWNlIChpbiB0aGlzIGNhc2UsIHJ1bGVzIG9mIHRoZSBjaGVzc2JvYXJkKVxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRLbmlnaHQoYyk7XG5cbiAgICAvLyBpZiBub3QgcmV0dXJuZWQgdHJ1ZSB0aWxsIGhlcmUsIGl0J3MgZmFsc2VcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YWxpZEtuaWdodChjKSB7XG4gICAgLy8gd2UgdmFsaWRhdGUgdGhlIGNvb3JkaW5hdGVzIG9mIHRoaXMgb2JqZWN0XG4gICAgaWYgKGMucm93IDwgMCB8fCBjLmNvbCA8IDAgfHwgYy5yb3cgPiA3IHx8IGMuY29sID4gNykgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXRNb3ZlbWVudHMoYykge1xuICAgIC8vIGMgLS0+IGNvb3Jkc1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdrbmlnaHQnKSByZXR1cm4gdGhpcy5nZXRLbmlnaHRNb3ZlbWVudHMoYyk7XG5cbiAgICAvLyBpZiB3ZSBoYXZlIHJlYWNoZWQgaGVyZSBhbmQgbm90IGZvdW5kIGEgdmFsaWQgdHlwZSwgd2Ugc2hvdWxkIHRocm93IGFuIGVycm9yLlxuICAgIC8vIHNpbmNlIHdlJ3JlIHRvbyBsYXp5IGZvciB0aGF0LCB3ZSdyZSBnb25uYSByZXR1cm4gbnVsbC4gT3VyIHRyZWUgd2lsbCBiZSB2ZXJ5IHNob3J0LlxuICAgIHJldHVybiBbXTtcbiAgfVxuICBnZXRLbmlnaHRNb3ZlbWVudHMoYykge1xuICAgIC8vIFRoZSBrbmlnaHQgY2FuIG1vdmUgdG8gZWlnaHQgcG9zaXRpb25zOlxuICAgIC8vICsxIHJvdywgKzIgY29sXG4gICAgLy8gKzEgcm93LCAtMiBjb2xcbiAgICAvLyArMiByb3csICsxIGNvbFxuICAgIC8vICsyIHJvdywgLTEgY29sXG4gICAgLy8gLTEgcm93LCArMiBjb2xcbiAgICAvLyAtMSByb3csIC0yIGNvbFxuICAgIC8vIC0yIHJvdywgKzEgY29sXG4gICAgLy8gLTIgcm93LCAtMSBjb2xcbiAgICBjb25zdCBtb3ZlbWVudHMgPSBbXTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoLTIsIC0xKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMiwgKzEpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKC0xLCAtMikpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoLTEsICsyKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygrMSwgLTIpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsxLCArMikpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoKzIsIC0xKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygrMiwgKzEpKTtcblxuICAgIG1vdmVtZW50cy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICBjb25zdCBhdXhDb29yZHMgPSBuZXcgQ29vcmRzKCk7XG4gICAgICBhdXhDb29yZHMuY29weShjKTtcbiAgICAgIGF1eENvb3Jkcy5hZGQobW92ZSk7XG4gICAgICBpZiAodGhpcy52YWxpZChhdXhDb29yZHMpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGF1eENvb3Jkcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA+IDAgPyByZXN1bHQgOiBudWxsO1xuICB9XG5cbiAgY3JlYXRlTm9kZShjb29yZHMsIGRlcHRoLCBuZXh0Q29vcmRzKSB7XG4gICAgLy8gaXQgdXNlZCB0byBkbyB0aGluZ3MgYmVmb3JlIG5ldyBOb2RlIGxvbC5cbiAgICByZXR1cm4gbmV3IE5vZGUoY29vcmRzLCBkZXB0aCwgbmV4dENvb3Jkcyk7XG4gIH1cblxuICBhZGRMaXN0KGNvb3Jkcykge1xuICAgIHRoaXMubGlzdE9mQ29vcmRpbmF0ZXMucHVzaChjb29yZHMpO1xuICAgIHRoaXMuc29ydExpc3QoKTtcbiAgfVxuXG4gIHNvcnRMaXN0KCkge1xuICAgIHRoaXMubGlzdE9mQ29vcmRpbmF0ZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGEucm93IDwgYi5yb3cpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLnJvdyA+IGIucm93KSByZXR1cm4gMTtcbiAgICAgIGlmIChhLmNvbCA8IGIuY29sKSByZXR1cm4gLTE7XG4gICAgICBpZiAoYS5jb2wgPiBiLmNvbCkgcmV0dXJuIDE7XG5cbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBsZXQgcGF0aCA9IFtdO1xuICAgIGxldCBub2RlID0gdGhpcy5yb290O1xuXG4gICAgd2hpbGUgKG5vZGUgIT0gbnVsbCkge1xuICAgICAgcGF0aC5wdXNoKG5vZGUuY29vcmRzKTtcblxuICAgICAgaWYgKG5vZGUubmV4dE5vZGVzICE9IG51bGwpXG4gICAgICAgIG5vZGUgPSBub2RlLm5leHROb2Rlc1swXTsgLy8gc2hvdWxkIG9ubHkgaGF2ZSBvbmUgcGF0aFxuICAgICAgZWxzZSBub2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxufVxuXG5leHBvcnQgeyBDb29yZHMsIENoZXNzdHJlZSB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIjY2hlc3Nib2FyZCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxuICB3aWR0aDogNjB2dztcXG4gIGJvcmRlcjogMXB4IGJsYWNrIHNvbGlkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtZ2FwOiAwO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLWF1dG8tZmxvdzogcm93O1xcbn1cXG5cXG4uY2VsbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbn1cXG5cXG4ud2hpdGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDI0NSwgMjQ1LCAwLjQ1OSk7XFxufVxcblxcbi5ibGFjayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI2LCAxMjMsIDEyMyk7XFxufVxcblxcbi5rbmlnaHQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDgwJTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9jaGVzcy5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0Usa0JBQUE7RUFDQSx3QkFBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EscUNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0FBREY7O0FBV0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFSRjs7QUFXQTtFQUNFLDRDQUFBO0FBUkY7O0FBV0E7RUFDRSxvQ0FBQTtBQVJGOztBQVdBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0FBUkZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLy9Gb3Igb3VyIGNoZXNzIGJvYXJkIHdlIGhhdmUgdGhlIGNoZXNzYm9hcmQgY29udGFpbmVyLCB0aGUgY2VsbCBjbGFzcywgdGhlIGJsYWNrIGNsYXNzLCB0aGUgd2hpdGUgY2xhc3NcXG5cXG4jY2hlc3Nib2FyZCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWU7XFxuICB3aWR0aDogNjB2dztcXG4gIGJvcmRlcjogMXB4IGJsYWNrIHNvbGlkO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtZ2FwOiAwO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDgsIDFmcik7XFxuICBncmlkLWF1dG8tZmxvdzogcm93O1xcbiAgLy8gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIC8vYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLy8gLmNlbGwge1xcbi8vICAgYm9yZGVyOiAxcHggYmxhY2sgZGFzaGVkO1xcbi8vICAgaGVpZ2h0OiA1dmg7XFxuLy8gICB3aWR0aDogNXZ3O1xcbi8vIH1cXG5cXG4uY2VsbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYXNwZWN0LXJhdGlvOiAxO1xcbn1cXG5cXG4ud2hpdGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNDUsIDI0NSwgMjQ1LCAwLjQ1OSk7XFxufVxcblxcbi5ibGFjayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI2LCAxMjMsIDEyMyk7XFxufVxcblxcbi5rbmlnaHQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDgwJTtcXG4gIC8vYW5pbWF0aW9uOiA0cyBlYXNlLWluLW91dCAwcyBtb3ZlLWtuaWdodDE7XFxufVxcblxcbi8vIEBrZXlmcmFtZXMgbW92ZS1rbmlnaHQxIHtcXG4vLyAgIC8vICAgMCUge1xcbi8vICAgLy8gICAgIGxlZnQ6IDA7XFxuLy8gICAvLyAgIH1cXG4vLyAgIC8vICAgMjUlIHtcXG4vLyAgIC8vICAgICBsZWZ0OiAyMCU7XFxuLy8gICAvLyAgIH1cXG4vLyAgIC8vICAgNTAlIHtcXG4vLyAgIC8vICAgICB0b3A6IDMzJTtcXG4vLyAgIC8vICAgfVxcbi8vICAgLy8gICA3NSUge1xcbi8vICAgLy8gICAgIHRvcDogNjYlO1xcbi8vICAgLy8gICB9XFxuLy8gICAvLyAgIDEwMCUge1xcbi8vICAgLy8gICAgIHRvcDogMTAwJTtcXG4vLyAgIC8vICAgfVxcbi8vICAgZnJvbSB7XFxuLy8gICAgIGxlZnQ6IDAlO1xcbi8vICAgfVxcbi8vICAgdG8ge1xcbi8vICAgICBsZWZ0OiAxMDAlO1xcbi8vICAgfVxcbi8vICAgZnJvbSB7XFxuLy8gICAgIGxlZnQ6IDEwMCU7XFxuLy8gICAgIGJvdHRvbTogMCU7XFxuLy8gICB9XFxuLy8gICB0byB7XFxuLy8gICAgIGxlZnQ6IDEwMCU7XFxuLy8gICAgIGJvdHRvbTogMjAwJTtcXG4vLyAgIH1cXG4vLyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NoZXNzLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jaGVzcy5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnLi9zdHlsZXMvY2hlc3Muc2Nzcyc7XG5pbXBvcnQgeyBDb29yZHMsIENoZXNzdHJlZSB9IGZyb20gJy4vY29kZS9rbmlnaHQuanMnO1xuaW1wb3J0IHsgQ2hlc3Nib2FyZCB9IGZyb20gJy4vY29kZS9jaGVzc2JvYXJkLmpzJztcblxuY29uc3Qgc3AgPSBuZXcgQ29vcmRzKDQsIDMpOyAvLyBzdGFydGluZyBwb2ludFxuY29uc3QgZnAgPSBuZXcgQ29vcmRzKDAsIDcpOyAvLyBmaW5hbCBwb2ludFxubGV0IGNwID0gbmV3IENvb3JkcygpOyAvLyBjdXJyZW50IHBvaW50XG5jb25zdCBrbmlnaHRUcmVlID0gbmV3IENoZXNzdHJlZShzcCwgZnAsICdrbmlnaHQnKTtcbmxldCBtb3ZlcyA9IGtuaWdodFRyZWUuZ2V0UGF0aCgpO1xuXG5jb25zdCBjaGVzc2JvYXJkID0gbmV3IENoZXNzYm9hcmQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZXNzYm9hcmQnKSk7XG5jaGVzc2JvYXJkLmNyZWF0ZUJvYXJkKCk7XG5jaGVzc2JvYXJkLnNldEtuaWdodChzcC5yb3csIHNwLmNvbCk7XG5jaGVzc2JvYXJkLm1vdmVLbmlnaHQobW92ZXMpO1xuLy8gY3AuY29weShzcCk7XG5cbi8vIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcbi8vICAgLy8gbGV0IHJvdyA9IGNwLnJvdyAtIG1vdmUucm93O1xuLy8gICAvLyBsZXQgY29sID0gY3AuY29sIC0gbW92ZS5jb2w7XG4vLyAgIGNoZXNzYm9hcmQubW92ZUtuaWdodChjcC5yb3csIGNwLmNvbCwgbW92ZS5yb3csIG1vdmUuY29sKTtcbi8vICAgY3AuY29weShtb3ZlKTtcbi8vIH0pO1xuLy8gY2hlc3Nib2FyZC5tb3ZlS25pZ2h0KGNwLnJvdywgY3AuY29sLCBtb3Zlc1sxXS5yb3csIG1vdmVzWzFdLmNvbCk7XG5cbi8vY2hlc3Nib2FyZC5zZXRLbmlnaHQoMCwgNyk7XG4vL2NoZXNzYm9hcmQubW92ZUtuaWdodCg0LCAzLCA1LCA1KTtcblxuLy8gbGV0IGNoZXNzQ29vcmRzID0gW107XG4vLyBjaGVzc0Nvb3Jkcy5wdXNoKFsnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVycsICdCJ10pOyAvLyByb3cgMFxuLy8gY2hlc3NDb29yZHMucHVzaChbJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVyddKTtcbi8vIGNoZXNzQ29vcmRzLnB1c2goWydXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InXSk7XG4vLyBjaGVzc0Nvb3Jkcy5wdXNoKFsnQicsICdXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJ10pO1xuLy8gY2hlc3NDb29yZHMucHVzaChbJ1cnLCAnQicsICdXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQiddKTtcbi8vIGNoZXNzQ29vcmRzLnB1c2goWydCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVycsICdCJywgJ1cnXSk7XG4vLyBjaGVzc0Nvb3Jkcy5wdXNoKFsnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVycsICdCJ10pO1xuLy8gY2hlc3NDb29yZHMucHVzaChbJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVyddKTsgLy8gcm93IDdcbi8vIGNoZXNzYm9hcmQuc2V0S25pZ2h0KDQsIDUpO1xuLy9zZXRLbmlnaHQoNCwgNCk7IC8vIGNyZWF0ZXMga25pZ2h0IGluIHRoZSBib2FyZFxuXG4vLyBmdW5jdGlvbiBjcmVhdGVCb2FyZCgpIHtcbi8vICAgY29uc29sZS5sb2coJ29sYSBrZSBhc2UnKTtcblxuLy8gICBsZXQgY29scyA9IDAsXG4vLyAgICAgcm93cyA9IDA7XG5cbi8vICAgd2hpbGUgKGNvbHMgPCA4ICYmIHJvd3MgPCA4KSB7XG4vLyAgICAgbGV0IG5ld0NlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICBuZXdDZWxsLmlkID0gYGNlbGwtJHtTdHJpbmcocm93cyl9LSR7U3RyaW5nKGNvbHMpfWA7XG4vLyAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG4vLyAgICAgaWYgKFxuLy8gICAgICAgKHJvd3MgJSAyID09PSAwICYmIGNvbHMgJSAyID09PSAwKSB8fFxuLy8gICAgICAgKHJvd3MgJSAyICE9PSAwICYmIGNvbHMgJSAyICE9PSAwKVxuLy8gICAgICkge1xuLy8gICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCd3aGl0ZScpO1xuLy8gICAgICAgY2hlc3NDb29yZHNbY29sc11bcm93c10gPSAnVyc7XG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIG5ld0NlbGwuY2xhc3NMaXN0LmFkZCgnYmxhY2snKTtcbi8vICAgICAgIGNoZXNzQ29vcmRzW2NvbHNdW3Jvd3NdID0gJ0InO1xuLy8gICAgIH1cbi8vICAgICBjaGVzc0JvYXJkLmFwcGVuZENoaWxkKG5ld0NlbGwpO1xuLy8gICAgIGNvbHMrKztcbi8vICAgICBpZiAoY29scyA+PSA4KSB7XG4vLyAgICAgICBjb2xzID0gMDtcbi8vICAgICAgIHJvd3MrKztcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gc2V0S25pZ2h0KHJvdywgY29sKSB7fVxuIl0sIm5hbWVzIjpbInVuaWNvcm4iLCJDaGVzc2JvYXJkIiwiY29uc3RydWN0b3IiLCJub2RlIiwiYm9hcmQiLCJjcmVhdGVCb2FyZCIsImNvbHMiLCJyb3dzIiwibmV3Q2VsbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlkIiwiU3RyaW5nIiwiY2xhc3NMaXN0IiwiYWRkIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInNldEtuaWdodCIsInIiLCJjIiwiY2VsbCIsImdldEVsZW1lbnRCeUlkIiwia25pZ2h0IiwiY3JlYXRlS25pZ2h0IiwiYXBwZW5kIiwic3JjIiwic2V0QXR0cmlidXRlIiwibW92ZUtuaWdodCIsIm1vdmVzIiwicXVlcnlTZWxlY3RvciIsImlSb3ciLCJnZXRBdHRyaWJ1dGUiLCJpQ29sIiwiaSIsImxlbmd0aCIsInhtb3ZlS25pZ2h0Iiwicm93IiwiY29sIiwic2xlZXAiLCJmUm93IiwiZkNvbCIsImRpZmZSb3ciLCJkaWZmQ29sIiwiY3VycmVudFJvdyIsImN1cnJlbnRDb2wiLCJtb3ZlVXAiLCJyZW1vdmUiLCJtb3ZlRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwibXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJwaWVjZSIsInRyYW5zIiwiY2FsY1RyYW5zbGF0ZSIsInRyYW5zWCIsImNvbnNvbGUiLCJsb2ciLCJlZmZlY3QiLCJ0cmFuc2Zvcm0iLCJhbmltYXRlIiwiZ2V0VGltaW5nIiwidHJhbnNZIiwiTWF0aCIsImZsb29yIiwidGltaW5nIiwiZHVyYXRpb24iLCJpdGVyYXRpb25zIiwicG9zaXRpb25JbmZvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFyc2VJbnQiLCJ3aWR0aCIsIkNvb3JkcyIsImNvbXBhcmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsImNvcHkiLCJOb2RlIiwiZGVwdGgiLCJuZXh0Tm9kZXMiLCJhZGRQYXRoIiwicHVzaCIsInJlbW92ZU51bGxzIiwiYXV4TGlzdCIsImZvckVhY2giLCJDaGVzc3RyZWUiLCJvQyIsImRDIiwidHlwZSIsInJvb3QiLCJjcmVhdGVOb2RlIiwiYnVpbGRUcmVlIiwidHJpbVRyZWUiLCJsaXN0T2ZDb29yZGluYXRlcyIsIm5vZGVMaXN0IiwibmV4dE5vZGVMaXN0IiwiaiIsImdldE1vdmVtZW50cyIsIm1vdmUiLCJpc0R1cGxpY2F0ZSIsImFkZExpc3QiLCJjaGlsZCIsInZhbHVlIiwiYXJyMiIsInNvbWUiLCJlIiwidmFsaWQiLCJ2YWxpZEtuaWdodCIsImdldEtuaWdodE1vdmVtZW50cyIsIm1vdmVtZW50cyIsInJlc3VsdCIsImF1eENvb3JkcyIsIm5leHRDb29yZHMiLCJzb3J0TGlzdCIsInNvcnQiLCJhIiwiYiIsImdldFBhdGgiLCJwYXRoIiwic3AiLCJmcCIsImNwIiwia25pZ2h0VHJlZSIsImNoZXNzYm9hcmQiXSwic291cmNlUm9vdCI6IiJ9