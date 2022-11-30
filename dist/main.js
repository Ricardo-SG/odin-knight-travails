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

      //newCell.textContent = `${rows} - ${cols}`;
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
      knight.remove();
      knight = this.setKnight(currentRow, currentCol);
    }
    for (i = 0; i < diffRow; i++) {
      currentRow++;
      await moveDown(knight);
      knight.remove();
      knight = this.setKnight(currentRow, currentCol);
    }
    for (i = diffCol; i < 0; i++) {
      currentCol--;
      await moveLeft(knight);
      knight.remove();
      knight = this.setKnight(currentRow, currentCol);
    }
    for (i = 0; i < diffCol; i++) {
      currentCol++;
      await moveRight(knight);
      knight.remove();
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
  await sleep(501);
}
async function moveLeft(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(-${trans}px)`;
  console.log(transX);
  const effect = [{
    transform: transX
  }];
  piece.animate(effect, getTiming());
  await sleep(501);
}
async function moveUp(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(-${trans}px)`;
  console.log(transY);
  const effect = [{
    transform: transY
  }];
  piece.animate(effect, getTiming());
  await sleep(501);
}
async function moveDown(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(${Math.floor(trans)}px)`;
  console.log(transY);
  const effect = [{
    transform: transY
  }];
  piece.animate(effect, getTiming());
  await sleep(501);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNnRDtBQUVoRCxNQUFNQyxVQUFVLENBQUM7RUFDZkMsV0FBVyxDQUFDQyxJQUFJLEVBQUU7SUFDaEIsSUFBSSxDQUFDQyxLQUFLLEdBQUdELElBQUk7RUFDbkI7RUFFQUUsV0FBVyxHQUFHO0lBQ1osSUFBSUMsSUFBSSxHQUFHLENBQUM7SUFDWixJQUFJQyxJQUFJLEdBQUcsQ0FBQztJQUVaLE9BQU9ELElBQUksR0FBRyxDQUFDLElBQUlDLElBQUksR0FBRyxDQUFDLEVBQUU7TUFDM0IsSUFBSUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDM0NGLE9BQU8sQ0FBQ0csRUFBRSxHQUFJLFFBQU9DLE1BQU0sQ0FBQ0wsSUFBSSxDQUFFLElBQUdLLE1BQU0sQ0FBQ04sSUFBSSxDQUFFLEVBQUM7TUFDbkRFLE9BQU8sQ0FBQ0ssU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BRTdCLElBQ0dQLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFDaENDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUUsRUFDbEM7UUFDQUUsT0FBTyxDQUFDSyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDOUI7TUFDRixDQUFDLE1BQU07UUFDTE4sT0FBTyxDQUFDSyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDOUI7TUFDRjs7TUFFQTtNQUNBLElBQUksQ0FBQ1YsS0FBSyxDQUFDVyxXQUFXLENBQUNQLE9BQU8sQ0FBQztNQUMvQkYsSUFBSSxFQUFFO01BRU4sSUFBSUEsSUFBSSxJQUFJLENBQUMsRUFBRTtRQUNiQSxJQUFJLEdBQUcsQ0FBQztRQUNSQyxJQUFJLEVBQUU7TUFDUjtJQUNGO0VBQ0Y7RUFFQVMsU0FBUyxDQUFDQyxDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUNkO0lBQ0E7SUFDQSxJQUFJQyxJQUFJLEdBQUdWLFFBQVEsQ0FBQ1csY0FBYyxDQUFFLFFBQU9ILENBQUUsSUFBR0MsQ0FBRSxFQUFDLENBQUM7SUFDcEQsSUFBSUcsTUFBTSxHQUFHLElBQUksQ0FBQ0MsWUFBWSxDQUFDTCxDQUFDLEVBQUVDLENBQUMsQ0FBQztJQUNwQ0MsSUFBSSxDQUFDSSxNQUFNLENBQUNGLE1BQU0sQ0FBQztJQUNuQixPQUFPQSxNQUFNO0VBQ2Y7RUFFQUMsWUFBWSxDQUFDTCxDQUFDLEVBQUVDLENBQUMsRUFBRTtJQUNqQixJQUFJRyxNQUFNLEdBQUdaLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUMxQ1csTUFBTSxDQUFDRyxHQUFHLEdBQUd4QixvREFBTztJQUNwQnFCLE1BQU0sQ0FBQ1IsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzlCTyxNQUFNLENBQUNWLEVBQUUsR0FBSSxVQUFTTSxDQUFFLElBQUdDLENBQUUsRUFBQztJQUM5QkcsTUFBTSxDQUFDSSxZQUFZLENBQUMsS0FBSyxFQUFFUixDQUFDLENBQUM7SUFDN0JJLE1BQU0sQ0FBQ0ksWUFBWSxDQUFDLEtBQUssRUFBRVAsQ0FBQyxDQUFDO0lBQzdCLE9BQU9HLE1BQU07RUFDZjs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTs7RUFFQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQSxNQUFNSyxVQUFVLENBQUNDLEtBQUssRUFBRTtJQUN0QixJQUFJTixNQUFNLEdBQUdaLFFBQVEsQ0FBQ21CLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDbEQsSUFBSUMsSUFBSSxHQUFHUixNQUFNLENBQUNTLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDckMsSUFBSUMsSUFBSSxHQUFHVixNQUFNLENBQUNTLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFFckMsS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdMLEtBQUssQ0FBQ00sTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtNQUNyQyxNQUFNLElBQUksQ0FBQ0UsV0FBVyxDQUFDYixNQUFNLEVBQUVRLElBQUksRUFBRUUsSUFBSSxFQUFFSixLQUFLLENBQUNLLENBQUMsQ0FBQyxDQUFDRyxHQUFHLEVBQUVSLEtBQUssQ0FBQ0ssQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQztNQUN0RVAsSUFBSSxHQUFHRixLQUFLLENBQUNLLENBQUMsQ0FBQyxDQUFDRyxHQUFHO01BQ25CSixJQUFJLEdBQUdKLEtBQUssQ0FBQ0ssQ0FBQyxDQUFDLENBQUNJLEdBQUc7TUFDbkJmLE1BQU0sR0FBR1osUUFBUSxDQUFDbUIsYUFBYSxDQUFDLGFBQWEsQ0FBQztNQUM5QyxNQUFNUyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2xCO0VBQ0Y7RUFFQSxNQUFNSCxXQUFXLENBQUNiLE1BQU0sRUFBRVEsSUFBSSxFQUFFRSxJQUFJLEVBQUVPLElBQUksRUFBRUMsSUFBSSxFQUFFO0lBQ2hEO0lBQ0E7SUFDQTtJQUNBO0lBQ0EsSUFBSVAsQ0FBQztJQUNMO0lBQ0E7SUFDQSxJQUFJUSxPQUFPLEdBQUdGLElBQUksR0FBR1QsSUFBSSxDQUFDLENBQUM7SUFDM0IsSUFBSVksT0FBTyxHQUFHRixJQUFJLEdBQUdSLElBQUksQ0FBQyxDQUFDO0lBQzNCLElBQUlXLFVBQVUsR0FBR2IsSUFBSTtJQUNyQixJQUFJYyxVQUFVLEdBQUdaLElBQUk7SUFFckIsS0FBS0MsQ0FBQyxHQUFHUSxPQUFPLEVBQUVSLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsRUFBRSxFQUFFO01BQzVCVSxVQUFVLEVBQUU7TUFDWixNQUFNRSxNQUFNLENBQUN2QixNQUFNLENBQUM7TUFDcEJBLE1BQU0sQ0FBQ3dCLE1BQU0sRUFBRTtNQUNmeEIsTUFBTSxHQUFHLElBQUksQ0FBQ0wsU0FBUyxDQUFDMEIsVUFBVSxFQUFFQyxVQUFVLENBQUM7SUFDakQ7SUFDQSxLQUFLWCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdRLE9BQU8sRUFBRVIsQ0FBQyxFQUFFLEVBQUU7TUFDNUJVLFVBQVUsRUFBRTtNQUNaLE1BQU1JLFFBQVEsQ0FBQ3pCLE1BQU0sQ0FBQztNQUN0QkEsTUFBTSxDQUFDd0IsTUFBTSxFQUFFO01BQ2Z4QixNQUFNLEdBQUcsSUFBSSxDQUFDTCxTQUFTLENBQUMwQixVQUFVLEVBQUVDLFVBQVUsQ0FBQztJQUNqRDtJQUVBLEtBQUtYLENBQUMsR0FBR1MsT0FBTyxFQUFFVCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUM1QlcsVUFBVSxFQUFFO01BQ1osTUFBTUksUUFBUSxDQUFDMUIsTUFBTSxDQUFDO01BQ3RCQSxNQUFNLENBQUN3QixNQUFNLEVBQUU7TUFDZnhCLE1BQU0sR0FBRyxJQUFJLENBQUNMLFNBQVMsQ0FBQzBCLFVBQVUsRUFBRUMsVUFBVSxDQUFDO0lBQ2pEO0lBQ0EsS0FBS1gsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUyxPQUFPLEVBQUVULENBQUMsRUFBRSxFQUFFO01BQzVCVyxVQUFVLEVBQUU7TUFDWixNQUFNSyxTQUFTLENBQUMzQixNQUFNLENBQUM7TUFDdkJBLE1BQU0sQ0FBQ3dCLE1BQU0sRUFBRTtNQUNmeEIsTUFBTSxHQUFHLElBQUksQ0FBQ0wsU0FBUyxDQUFDMEIsVUFBVSxFQUFFQyxVQUFVLENBQUM7SUFDakQ7RUFDRjtBQUNGO0FBQ0EsU0FBU04sS0FBSyxDQUFDWSxFQUFFLEVBQUU7RUFDakIsT0FBTyxJQUFJQyxPQUFPLENBQUVDLE9BQU8sSUFBS0MsVUFBVSxDQUFDRCxPQUFPLEVBQUVGLEVBQUUsQ0FBQyxDQUFDO0FBQzFEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGVBQWVELFNBQVMsQ0FBQ0ssS0FBSyxFQUFFO0VBQzlCLElBQUlDLEtBQUssR0FBR0MsYUFBYSxDQUFDRixLQUFLLENBQUM7RUFDaEMsSUFBSUcsTUFBTSxHQUFJLGNBQWFGLEtBQU0sS0FBSTtFQUVyQ0csT0FBTyxDQUFDQyxHQUFHLENBQUNGLE1BQU0sQ0FBQztFQUVuQixNQUFNRyxNQUFNLEdBQUcsQ0FBQztJQUFFQyxTQUFTLEVBQUVKO0VBQU8sQ0FBQyxDQUFDO0VBRXRDSCxLQUFLLENBQUNRLE9BQU8sQ0FBQ0YsTUFBTSxFQUFFRyxTQUFTLEVBQUUsQ0FBQztFQUNsQyxNQUFNekIsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUNsQjtBQUVBLGVBQWVVLFFBQVEsQ0FBQ00sS0FBSyxFQUFFO0VBQzdCLElBQUlDLEtBQUssR0FBR0MsYUFBYSxDQUFDRixLQUFLLENBQUM7RUFDaEMsSUFBSUcsTUFBTSxHQUFJLGVBQWNGLEtBQU0sS0FBSTtFQUN0Q0csT0FBTyxDQUFDQyxHQUFHLENBQUNGLE1BQU0sQ0FBQztFQUVuQixNQUFNRyxNQUFNLEdBQUcsQ0FBQztJQUFFQyxTQUFTLEVBQUVKO0VBQU8sQ0FBQyxDQUFDO0VBRXRDSCxLQUFLLENBQUNRLE9BQU8sQ0FBQ0YsTUFBTSxFQUFFRyxTQUFTLEVBQUUsQ0FBQztFQUNsQyxNQUFNekIsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUNsQjtBQUVBLGVBQWVPLE1BQU0sQ0FBQ1MsS0FBSyxFQUFFO0VBQzNCLElBQUlDLEtBQUssR0FBR0MsYUFBYSxDQUFDRixLQUFLLENBQUM7RUFDaEMsSUFBSVUsTUFBTSxHQUFJLGVBQWNULEtBQU0sS0FBSTtFQUN0Q0csT0FBTyxDQUFDQyxHQUFHLENBQUNLLE1BQU0sQ0FBQztFQUVuQixNQUFNSixNQUFNLEdBQUcsQ0FBQztJQUFFQyxTQUFTLEVBQUVHO0VBQU8sQ0FBQyxDQUFDO0VBRXRDVixLQUFLLENBQUNRLE9BQU8sQ0FBQ0YsTUFBTSxFQUFFRyxTQUFTLEVBQUUsQ0FBQztFQUNsQyxNQUFNekIsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUNsQjtBQUVBLGVBQWVTLFFBQVEsQ0FBQ08sS0FBSyxFQUFFO0VBQzdCLElBQUlDLEtBQUssR0FBR0MsYUFBYSxDQUFDRixLQUFLLENBQUM7RUFDaEMsSUFBSVUsTUFBTSxHQUFJLGNBQWFDLElBQUksQ0FBQ0MsS0FBSyxDQUFDWCxLQUFLLENBQUUsS0FBSTtFQUNqREcsT0FBTyxDQUFDQyxHQUFHLENBQUNLLE1BQU0sQ0FBQztFQUVuQixNQUFNSixNQUFNLEdBQUcsQ0FBQztJQUFFQyxTQUFTLEVBQUVHO0VBQU8sQ0FBQyxDQUFDO0VBRXRDVixLQUFLLENBQUNRLE9BQU8sQ0FBQ0YsTUFBTSxFQUFFRyxTQUFTLEVBQUUsQ0FBQztFQUNsQyxNQUFNekIsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUNsQjtBQUVBLFNBQVN5QixTQUFTLEdBQUc7RUFDbkIsTUFBTUksTUFBTSxHQUFHO0lBQ2JDLFFBQVEsRUFBRSxHQUFHO0lBQ2JDLFVBQVUsRUFBRTtFQUNkLENBQUM7RUFDRCxPQUFPRixNQUFNO0FBQ2Y7QUFFQSxTQUFTWCxhQUFhLENBQUNGLEtBQUssRUFBRTtFQUM1QjtFQUNBLElBQUlnQixZQUFZLEdBQUdoQixLQUFLLENBQUNpQixxQkFBcUIsRUFBRTtFQUNoRCxJQUFJaEIsS0FBSyxHQUFHVSxJQUFJLENBQUNDLEtBQUssQ0FBQ00sUUFBUSxDQUFDRixZQUFZLENBQUNHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUUxRCxPQUFPbEIsS0FBSztBQUNkOzs7Ozs7Ozs7Ozs7Ozs7O0FDOU1hOztBQUNiO0FBQUE7QUFDQSxNQUFNbUIsTUFBTSxDQUFDO0VBQ1g7RUFDQXZFLFdBQVcsQ0FBQ2UsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7SUFDaEIsSUFBSSxDQUFDaUIsR0FBRyxHQUFHbEIsQ0FBQztJQUNaLElBQUksQ0FBQ21CLEdBQUcsR0FBR2xCLENBQUM7RUFDZDtFQUVBd0QsT0FBTyxDQUFDQyxNQUFNLEVBQUU7SUFDZCxJQUFJLElBQUksQ0FBQ3hDLEdBQUcsS0FBS3dDLE1BQU0sQ0FBQ3hDLEdBQUcsSUFBSSxJQUFJLENBQUNDLEdBQUcsS0FBS3VDLE1BQU0sQ0FBQ3ZDLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxLQUMvRCxPQUFPLEtBQUs7RUFDbkI7RUFFQXRCLEdBQUcsQ0FBQzZELE1BQU0sRUFBRTtJQUNWO0lBQ0EsSUFBSSxDQUFDeEMsR0FBRyxJQUFJd0MsTUFBTSxDQUFDeEMsR0FBRztJQUN0QixJQUFJLENBQUNDLEdBQUcsSUFBSXVDLE1BQU0sQ0FBQ3ZDLEdBQUc7RUFDeEI7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBOztFQUVBd0MsUUFBUSxHQUFHO0lBQ1QsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDekMsR0FBRyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUNDLEdBQUc7RUFDbkQ7RUFFQXlDLElBQUksQ0FBQ0YsTUFBTSxFQUFFO0lBQ1gsSUFBSSxDQUFDeEMsR0FBRyxHQUFHd0MsTUFBTSxDQUFDeEMsR0FBRztJQUNyQixJQUFJLENBQUNDLEdBQUcsR0FBR3VDLE1BQU0sQ0FBQ3ZDLEdBQUc7RUFDdkI7QUFDRjtBQUVBLE1BQU0wQyxJQUFJLENBQUM7RUFDVDtFQUNBO0VBQ0E1RSxXQUFXLENBQUN5RSxNQUFNLEVBQUVJLEtBQUssRUFBRUMsU0FBUyxFQUFFO0lBQ3BDLElBQUlMLE1BQU0sSUFBSSxJQUFJLEVBQUUsSUFBSSxDQUFDQSxNQUFNLEdBQUdBLE1BQU07SUFDeEMsSUFBSUksS0FBSyxJQUFJLElBQUksRUFBRSxJQUFJLENBQUNBLEtBQUssR0FBR0EsS0FBSztJQUNyQyxJQUFJQyxTQUFTLElBQUksSUFBSSxFQUFFLElBQUksQ0FBQ0EsU0FBUyxHQUFHQSxTQUFTO0VBQ25EOztFQUVBO0VBQ0FDLE9BQU8sQ0FBQzlFLElBQUksRUFBRTtJQUNaLElBQUlBLElBQUksSUFBSSxJQUFJLEVBQUU7TUFDaEJzRCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxhQUFhLEdBQUd2RCxJQUFJLENBQUM7SUFDbkM7SUFDQSxJQUFJLElBQUksQ0FBQzZFLFNBQVMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDQSxTQUFTLENBQUMvQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3ZELElBQUksQ0FBQytDLFNBQVMsR0FBRyxDQUFDN0UsSUFBSSxDQUFDO0lBQ3pCLENBQUMsTUFBTTtNQUNMLElBQUksQ0FBQzZFLFNBQVMsQ0FBQ0UsSUFBSSxDQUFDL0UsSUFBSSxDQUFDO0lBQzNCO0VBQ0Y7RUFDQWdGLFdBQVcsR0FBRztJQUNaLElBQUksSUFBSSxDQUFDSCxTQUFTLElBQUksSUFBSSxFQUFFO01BQzFCLElBQUksQ0FBQ0EsU0FBUyxHQUFHLEVBQUU7SUFDckIsQ0FBQyxNQUFNO01BQ0wsSUFBSUksT0FBTyxHQUFHLEVBQUU7TUFDaEIsSUFBSSxDQUFDSixTQUFTLENBQUNLLE9BQU8sQ0FBRWxGLElBQUksSUFBSztRQUMvQixJQUFJQSxJQUFJLElBQUksSUFBSSxFQUFFaUYsT0FBTyxDQUFDRixJQUFJLENBQUMvRSxJQUFJLENBQUM7TUFDdEMsQ0FBQyxDQUFDO01BQ0YsSUFBSSxDQUFDNkUsU0FBUyxHQUFHSSxPQUFPO0lBQzFCO0VBQ0Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNGOztBQUVBLE1BQU1FLFNBQVMsQ0FBQztFQUNkO0VBQ0E7RUFDQTtFQUNBOztFQUtBcEYsV0FBVyxDQUFDcUYsRUFBRSxFQUFFQyxFQUFFLEVBQUVDLElBQUksRUFBRTtJQUFBLDJDQUhOLEVBQUU7SUFBQSw0Q0FDRCxLQUFLO0lBR3hCO0lBQ0EsSUFBSSxDQUFDQSxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxVQUFVLENBQUNKLEVBQUUsRUFBRSxJQUFJLENBQUM7SUFDckMsSUFBSUEsRUFBRSxJQUFJQyxFQUFFLEVBQUU7TUFDWi9CLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDBCQUEwQixDQUFDO01BQ3ZDLElBQUksQ0FBQ2tDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQ0YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFRixFQUFFLENBQUM7TUFDbEMsSUFBSSxDQUFDRSxJQUFJLEdBQUcsSUFBSSxDQUFDRyxRQUFRLENBQUMsSUFBSSxDQUFDSCxJQUFJLEVBQUVGLEVBQUUsQ0FBQztJQUMxQztJQUNBL0IsT0FBTyxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDZ0MsSUFBSSxDQUFDO0lBQ3RCakMsT0FBTyxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDb0MsaUJBQWlCLENBQUM7RUFDckM7RUFFQUYsU0FBUyxDQUFDRyxRQUFRLEVBQUVoQixLQUFLLEVBQUVTLEVBQUUsRUFBRTtJQUM3QixJQUFJTyxRQUFRLElBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQztJQUM5QixJQUFJQyxZQUFZLEdBQUcsRUFBRTtJQUNyQixJQUFJaEUsQ0FBQyxFQUFFaUUsQ0FBQztJQUVSLEtBQUtqRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcrRCxRQUFRLENBQUM5RCxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ3BDLElBQUk3QixJQUFJLEdBQUc0RixRQUFRLENBQUMvRCxDQUFDLENBQUM7TUFDdEI7TUFDQTs7TUFFQSxJQUFJTCxLQUFLLEdBQUcsSUFBSSxDQUFDdUUsWUFBWSxDQUFDL0YsSUFBSSxDQUFDd0UsTUFBTSxDQUFDO01BRTFDLElBQUloRCxLQUFLLENBQUNNLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDcEIsS0FBS2dFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3RFLEtBQUssQ0FBQ00sTUFBTSxFQUFFZ0UsQ0FBQyxFQUFFLEVBQUU7VUFDakMsSUFBSUUsSUFBSSxHQUFHeEUsS0FBSyxDQUFDc0UsQ0FBQyxDQUFDO1VBRW5CLElBQUksQ0FBQyxJQUFJLENBQUNHLFdBQVcsQ0FBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQ0wsaUJBQWlCLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUNPLE9BQU8sQ0FBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQzs7WUFFcEIsSUFBSUcsS0FBSyxHQUFHLElBQUksQ0FBQ1gsVUFBVSxDQUFDUSxJQUFJLEVBQUVwQixLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUNsRDVFLElBQUksQ0FBQzhFLE9BQU8sQ0FBQ3FCLEtBQUssQ0FBQztZQUNuQjtZQUNBLElBQUlBLEtBQUssQ0FBQzNCLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDYyxFQUFFLENBQUMsRUFBRTtjQUM1QjtjQUNBO1lBQ0Y7WUFFQVEsWUFBWSxDQUFDZCxJQUFJLENBQUNvQixLQUFLLENBQUM7VUFDMUI7UUFDRjtNQUNGO0lBQ0Y7SUFDQTtJQUNBLElBQUlOLFlBQVksQ0FBQy9ELE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDM0IsSUFBSSxDQUFDMkQsU0FBUyxDQUFDSSxZQUFZLEVBQUVqQixLQUFLLEdBQUcsQ0FBQyxFQUFFUyxFQUFFLENBQUM7SUFDN0M7RUFDRjtFQUVBSyxRQUFRLENBQUMxRixJQUFJLEVBQUVxRixFQUFFLEVBQUU7SUFDakIsSUFBSXJGLElBQUksQ0FBQ3dFLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDYyxFQUFFLENBQUMsRUFBRTtNQUMzQixPQUFPckYsSUFBSTtJQUNiO0lBRUEsSUFBSUEsSUFBSSxDQUFDNkUsU0FBUyxJQUFJLElBQUksRUFBRTtNQUMxQixLQUFLLElBQUloRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc3QixJQUFJLENBQUM2RSxTQUFTLENBQUMvQyxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO1FBQzlDN0IsSUFBSSxDQUFDNkUsU0FBUyxDQUFDaEQsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDNkQsUUFBUSxDQUFDMUYsSUFBSSxDQUFDNkUsU0FBUyxDQUFDaEQsQ0FBQyxDQUFDLEVBQUV3RCxFQUFFLENBQUM7TUFDMUQ7TUFDQXJGLElBQUksQ0FBQ2dGLFdBQVcsRUFBRTtNQUNsQixJQUFJaEYsSUFBSSxDQUFDNkUsU0FBUyxDQUFDL0MsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM3QixPQUFPOUIsSUFBSTtNQUNiLENBQUMsTUFBTTtRQUNMLE9BQU8sSUFBSTtNQUNiO0lBQ0Y7RUFDRjtFQUVBaUcsV0FBVyxDQUFDRyxLQUFLLEVBQUVDLElBQUksRUFBRTtJQUN2QjtJQUNBLE9BQU9BLElBQUksQ0FBQ0MsSUFBSSxDQUFFQyxDQUFDLElBQUs7TUFDdEIsSUFBSUEsQ0FBQyxDQUFDdkUsR0FBRyxLQUFLb0UsS0FBSyxDQUFDcEUsR0FBRyxJQUFJdUUsQ0FBQyxDQUFDdEUsR0FBRyxLQUFLbUUsS0FBSyxDQUFDbkUsR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLEtBQ3ZELE9BQU8sS0FBSztJQUNuQixDQUFDLENBQUM7RUFDSjtFQUVBdUUsS0FBSyxDQUFDekYsQ0FBQyxFQUFFO0lBQ1AsSUFBSSxJQUFJLENBQUN1RSxJQUFJLEtBQUssUUFBUTtNQUN4QjtNQUNBLE9BQU8sSUFBSSxDQUFDbUIsV0FBVyxDQUFDMUYsQ0FBQyxDQUFDOztJQUU1QjtJQUNBLE9BQU8sS0FBSztFQUNkO0VBRUEwRixXQUFXLENBQUMxRixDQUFDLEVBQUU7SUFDYjtJQUNBLElBQUlBLENBQUMsQ0FBQ2lCLEdBQUcsR0FBRyxDQUFDLElBQUlqQixDQUFDLENBQUNrQixHQUFHLEdBQUcsQ0FBQyxJQUFJbEIsQ0FBQyxDQUFDaUIsR0FBRyxHQUFHLENBQUMsSUFBSWpCLENBQUMsQ0FBQ2tCLEdBQUcsR0FBRyxDQUFDLEVBQUUsT0FBTyxLQUFLO0lBRWxFLE9BQU8sSUFBSTtFQUNiO0VBRUE4RCxZQUFZLENBQUNoRixDQUFDLEVBQUU7SUFDZDtJQUNBLElBQUksSUFBSSxDQUFDdUUsSUFBSSxLQUFLLFFBQVEsRUFBRSxPQUFPLElBQUksQ0FBQ29CLGtCQUFrQixDQUFDM0YsQ0FBQyxDQUFDOztJQUU3RDtJQUNBO0lBQ0EsT0FBTyxFQUFFO0VBQ1g7RUFDQTJGLGtCQUFrQixDQUFDM0YsQ0FBQyxFQUFFO0lBQ3BCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBLE1BQU00RixTQUFTLEdBQUcsRUFBRTtJQUNwQixNQUFNQyxNQUFNLEdBQUcsRUFBRTtJQUVqQkQsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDcUMsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDcUMsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDcUMsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDcUMsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDcUMsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDcUMsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xDcUMsU0FBUyxDQUFDNUIsSUFBSSxDQUFDLElBQUlULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxDcUMsU0FBUyxDQUFDekIsT0FBTyxDQUFFYyxJQUFJLElBQUs7TUFDMUIsTUFBTWEsU0FBUyxHQUFHLElBQUl2QyxNQUFNLEVBQUU7TUFDOUJ1QyxTQUFTLENBQUNuQyxJQUFJLENBQUMzRCxDQUFDLENBQUM7TUFDakI4RixTQUFTLENBQUNsRyxHQUFHLENBQUNxRixJQUFJLENBQUM7TUFDbkIsSUFBSSxJQUFJLENBQUNRLEtBQUssQ0FBQ0ssU0FBUyxDQUFDLEVBQUU7UUFDekJELE1BQU0sQ0FBQzdCLElBQUksQ0FBQzhCLFNBQVMsQ0FBQztNQUN4QjtJQUNGLENBQUMsQ0FBQztJQUVGLE9BQU9ELE1BQU0sQ0FBQzlFLE1BQU0sR0FBRyxDQUFDLEdBQUc4RSxNQUFNLEdBQUcsSUFBSTtFQUMxQztFQUVBcEIsVUFBVSxDQUFDaEIsTUFBTSxFQUFFSSxLQUFLLEVBQUVrQyxVQUFVLEVBQUU7SUFDcEM7SUFDQSxPQUFPLElBQUluQyxJQUFJLENBQUNILE1BQU0sRUFBRUksS0FBSyxFQUFFa0MsVUFBVSxDQUFDO0VBQzVDO0VBRUFaLE9BQU8sQ0FBQzFCLE1BQU0sRUFBRTtJQUNkLElBQUksQ0FBQ21CLGlCQUFpQixDQUFDWixJQUFJLENBQUNQLE1BQU0sQ0FBQztJQUNuQyxJQUFJLENBQUN1QyxRQUFRLEVBQUU7RUFDakI7RUFFQUEsUUFBUSxHQUFHO0lBQ1QsSUFBSSxDQUFDcEIsaUJBQWlCLENBQUNxQixJQUFJLENBQUMsVUFBVUMsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFDMUMsSUFBSUQsQ0FBQyxDQUFDakYsR0FBRyxHQUFHa0YsQ0FBQyxDQUFDbEYsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO01BQzVCLElBQUlpRixDQUFDLENBQUNqRixHQUFHLEdBQUdrRixDQUFDLENBQUNsRixHQUFHLEVBQUUsT0FBTyxDQUFDO01BQzNCLElBQUlpRixDQUFDLENBQUNoRixHQUFHLEdBQUdpRixDQUFDLENBQUNqRixHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7TUFDNUIsSUFBSWdGLENBQUMsQ0FBQ2hGLEdBQUcsR0FBR2lGLENBQUMsQ0FBQ2pGLEdBQUcsRUFBRSxPQUFPLENBQUM7TUFFM0IsT0FBTyxDQUFDO0lBQ1YsQ0FBQyxDQUFDO0VBQ0o7RUFFQWtGLE9BQU8sR0FBRztJQUNSLElBQUlDLElBQUksR0FBRyxFQUFFO0lBQ2IsSUFBSXBILElBQUksR0FBRyxJQUFJLENBQUN1RixJQUFJO0lBRXBCLE9BQU92RixJQUFJLElBQUksSUFBSSxFQUFFO01BQ25Cb0gsSUFBSSxDQUFDckMsSUFBSSxDQUFDL0UsSUFBSSxDQUFDd0UsTUFBTSxDQUFDO01BRXRCLElBQUl4RSxJQUFJLENBQUM2RSxTQUFTLElBQUksSUFBSSxFQUN4QjdFLElBQUksR0FBR0EsSUFBSSxDQUFDNkUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFBQSxLQUN2QjdFLElBQUksR0FBRyxJQUFJO0lBQ2xCO0lBRUEsT0FBT29ILElBQUk7RUFDYjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1BBO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSx1REFBdUQsdUJBQXVCLDZCQUE2QixnQkFBZ0IsNEJBQTRCLGtCQUFrQixnQkFBZ0IsMENBQTBDLHVDQUF1Qyx3QkFBd0IsR0FBRyxXQUFXLGtCQUFrQiw0QkFBNEIsd0JBQXdCLG9CQUFvQixHQUFHLFlBQVksaURBQWlELEdBQUcsWUFBWSx5Q0FBeUMsR0FBRyxhQUFhLHVCQUF1QixlQUFlLEdBQUcsT0FBTyx3RkFBd0YsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsTUFBTSxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsTUFBTSxLQUFLLFdBQVcsTUFBTSxLQUFLLFdBQVcsTUFBTSxLQUFLLFdBQVcsVUFBVSxrSkFBa0osdUJBQXVCLDZCQUE2QixnQkFBZ0IsNEJBQTRCLGtCQUFrQixnQkFBZ0IsMENBQTBDLHVDQUF1Qyx3QkFBd0IsOEJBQThCLDBCQUEwQixHQUFHLFlBQVksZ0NBQWdDLG1CQUFtQixrQkFBa0IsTUFBTSxXQUFXLGtCQUFrQiw0QkFBNEIsd0JBQXdCLG9CQUFvQixHQUFHLFlBQVksaURBQWlELEdBQUcsWUFBWSx5Q0FBeUMsR0FBRyxhQUFhLHVCQUF1QixlQUFlLGdEQUFnRCxHQUFHLGdDQUFnQyxnQkFBZ0Isc0JBQXNCLGFBQWEsaUJBQWlCLHdCQUF3QixhQUFhLGlCQUFpQix1QkFBdUIsYUFBYSxpQkFBaUIsdUJBQXVCLGFBQWEsa0JBQWtCLHdCQUF3QixhQUFhLGFBQWEsa0JBQWtCLFFBQVEsV0FBVyxvQkFBb0IsUUFBUSxhQUFhLG9CQUFvQixvQkFBb0IsUUFBUSxXQUFXLG9CQUFvQixzQkFBc0IsUUFBUSxNQUFNLHFCQUFxQjtBQUM3dEU7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7QUNQMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3BGYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELGNBQWM7QUFDckU7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJBLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQWtKO0FBQ2xKO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsNEhBQU87Ozs7QUFJNEY7QUFDcEgsT0FBTyxpRUFBZSw0SEFBTyxJQUFJLG1JQUFjLEdBQUcsbUlBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3ZHYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTs7QUFFNkI7QUFDd0I7QUFDSDtBQUVsRCxNQUFNQyxFQUFFLEdBQUcsSUFBSS9DLG1EQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsTUFBTWdELEVBQUUsR0FBRyxJQUFJaEQsbURBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixJQUFJaUQsRUFBRSxHQUFHLElBQUlqRCxtREFBTSxFQUFFLENBQUMsQ0FBQztBQUN2QixNQUFNa0QsVUFBVSxHQUFHLElBQUlyQyxzREFBUyxDQUFDa0MsRUFBRSxFQUFFQyxFQUFFLEVBQUUsUUFBUSxDQUFDO0FBQ2xELElBQUk5RixLQUFLLEdBQUdnRyxVQUFVLENBQUNMLE9BQU8sRUFBRTtBQUVoQyxNQUFNTSxVQUFVLEdBQUcsSUFBSTNILDJEQUFVLENBQUNRLFFBQVEsQ0FBQ1csY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hFd0csVUFBVSxDQUFDdkgsV0FBVyxFQUFFO0FBQ3hCdUgsVUFBVSxDQUFDNUcsU0FBUyxDQUFDd0csRUFBRSxDQUFDckYsR0FBRyxFQUFFcUYsRUFBRSxDQUFDcEYsR0FBRyxDQUFDO0FBQ3BDd0YsVUFBVSxDQUFDbEcsVUFBVSxDQUFDQyxLQUFLLENBQUM7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vc3JjL2NvZGUvY2hlc3Nib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9jb2RlL2tuaWdodC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvY2hlc3Muc2NzcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9zdHlsZXMvY2hlc3Muc2Nzcz9lOTIwIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vb2Rpbi1rbmlnaHQtdHJhdmFpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL29kaW4ta25pZ2h0LXRyYXZhaWxzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9vZGluLWtuaWdodC10cmF2YWlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IHVuaWNvcm4gZnJvbSAnLi4vaW1nL3VuaWNvcm4ga25pZ2h0LnBuZyc7XG5cbmNsYXNzIENoZXNzYm9hcmQge1xuICBjb25zdHJ1Y3Rvcihub2RlKSB7XG4gICAgdGhpcy5ib2FyZCA9IG5vZGU7XG4gIH1cblxuICBjcmVhdGVCb2FyZCgpIHtcbiAgICBsZXQgY29scyA9IDA7XG4gICAgbGV0IHJvd3MgPSAwO1xuXG4gICAgd2hpbGUgKGNvbHMgPCA4ICYmIHJvd3MgPCA4KSB7XG4gICAgICBsZXQgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbmV3Q2VsbC5pZCA9IGBjZWxsLSR7U3RyaW5nKHJvd3MpfS0ke1N0cmluZyhjb2xzKX1gO1xuICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdjZWxsJyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHJvd3MgJSAyID09PSAwICYmIGNvbHMgJSAyID09PSAwKSB8fFxuICAgICAgICAocm93cyAlIDIgIT09IDAgJiYgY29scyAlIDIgIT09IDApXG4gICAgICApIHtcbiAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCd3aGl0ZScpO1xuICAgICAgICAvL2NoZXNzQ29vcmRzW2NvbHNdW3Jvd3NdID0gJ1cnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdibGFjaycpO1xuICAgICAgICAvL2NoZXNzQ29vcmRzW2NvbHNdW3Jvd3NdID0gJ0InO1xuICAgICAgfVxuXG4gICAgICAvL25ld0NlbGwudGV4dENvbnRlbnQgPSBgJHtyb3dzfSAtICR7Y29sc31gO1xuICAgICAgdGhpcy5ib2FyZC5hcHBlbmRDaGlsZChuZXdDZWxsKTtcbiAgICAgIGNvbHMrKztcblxuICAgICAgaWYgKGNvbHMgPj0gOCkge1xuICAgICAgICBjb2xzID0gMDtcbiAgICAgICAgcm93cysrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldEtuaWdodChyLCBjKSB7XG4gICAgLy8gciBzdGFuZHMgZm9yIHJvd1xuICAgIC8vIGMgc3RhbmRzIGZvciBjb2xcbiAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjZWxsLSR7cn0tJHtjfWApO1xuICAgIGxldCBrbmlnaHQgPSB0aGlzLmNyZWF0ZUtuaWdodChyLCBjKTtcbiAgICBjZWxsLmFwcGVuZChrbmlnaHQpO1xuICAgIHJldHVybiBrbmlnaHQ7XG4gIH1cblxuICBjcmVhdGVLbmlnaHQociwgYykge1xuICAgIGxldCBrbmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBrbmlnaHQuc3JjID0gdW5pY29ybjtcbiAgICBrbmlnaHQuY2xhc3NMaXN0LmFkZCgna25pZ2h0Jyk7XG4gICAga25pZ2h0LmlkID0gYGtuaWdodC0ke3J9LSR7Y31gO1xuICAgIGtuaWdodC5zZXRBdHRyaWJ1dGUoJ3JvdycsIHIpO1xuICAgIGtuaWdodC5zZXRBdHRyaWJ1dGUoJ2NvbCcsIGMpO1xuICAgIHJldHVybiBrbmlnaHQ7XG4gIH1cblxuICAvLyBhc3luYyBtb3ZlS25pZ2h0KHIxLCBjMSwgcjIsIGMyKSB7XG4gIC8vICAgLy8gcjEgYW5kIGMxIGFyZSB0aGUgaW5pdCB2YWx1ZXMgd2hlcmUgdGhlIGtuaWdodCBtdXN0IGJlXG4gIC8vICAgLy8gcjIsIGMyIGFyZSB0aGUgZmluYWwgdmFsdWVzIHdoZXJlIHRoZSBrbmlnaHQgaXMgZ29ubmEgYmUgcHV0XG4gIC8vICAgbGV0IGtuaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBrbmlnaHQtJHtyMX0tJHtjMX1gKTtcbiAgLy8gICBsZXQgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBjZWxsLSR7cjJ9LSR7YzJ9YCk7XG4gIC8vICAgY29uc29sZS5sb2coY2VsbCk7XG4gIC8vICAgYXdhaXQgc2xlZXAoOTAwKTsgLy8gbG9hZCB3ZWIsIHJlbWVtYmVyIHRvIGRlbGV0ZVxuXG4gIC8vICAgaWYgKHIxLXIyIDwgMClcblxuICAvLyAgICAgYXdhaXQgbW92ZVJpZ2h0KGtuaWdodCk7XG5cbiAgLy8gICBrbmlnaHQucmVtb3ZlKCk7XG4gIC8vICAgbGV0IGtuaWdodDIgPSB0aGlzLnNldEtuaWdodChyMiwgYzIpO1xuXG4gIC8vICAgYXdhaXQgbW92ZVVwKGtuaWdodDIpO1xuICAvLyAgIGtuaWdodDIucmVtb3ZlKCk7XG4gIC8vICAgbGV0IGtuaWdodDMgPSB0aGlzLnNldEtuaWdodCgzLCA1KTtcblxuICAvLyAgIGF3YWl0IG1vdmVVcChrbmlnaHQzKTtcbiAgLy8gICBrbmlnaHQzLnJlbW92ZSgpO1xuICAvLyAgIGxldCBrbmlnaHQ0ID0gdGhpcy5zZXRLbmlnaHQoMiwgNSk7XG5cbiAgLy8gICBhd2FpdCBzbGVlcCgxKTtcbiAgLy8gfVxuXG4gIGFzeW5jIG1vdmVLbmlnaHQobW92ZXMpIHtcbiAgICBsZXQga25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkXj1rbmlnaHQnKTtcbiAgICBsZXQgaVJvdyA9IGtuaWdodC5nZXRBdHRyaWJ1dGUoJ3JvdycpO1xuICAgIGxldCBpQ29sID0ga25pZ2h0LmdldEF0dHJpYnV0ZSgnY29sJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhd2FpdCB0aGlzLnhtb3ZlS25pZ2h0KGtuaWdodCwgaVJvdywgaUNvbCwgbW92ZXNbaV0ucm93LCBtb3Zlc1tpXS5jb2wpO1xuICAgICAgaVJvdyA9IG1vdmVzW2ldLnJvdztcbiAgICAgIGlDb2wgPSBtb3Zlc1tpXS5jb2w7XG4gICAgICBrbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbaWRePWtuaWdodCcpO1xuICAgICAgYXdhaXQgc2xlZXAoNTAwKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB4bW92ZUtuaWdodChrbmlnaHQsIGlSb3csIGlDb2wsIGZSb3csIGZDb2wpIHtcbiAgICAvLyBpUm93IC0tPiBpbml0aWFsIHJvd1xuICAgIC8vIGlDb2wgLS0+IGluaXRpYWwgQ29sXG4gICAgLy8gZlJvdyAtLT4gZmluYWwgcm93XG4gICAgLy8gZkNvbCAtLT4gZmluYWwgY29sXG4gICAgbGV0IGk7XG4gICAgLy9sZXQga25pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2lkXj1rbmlnaHQnKTtcbiAgICAvL2xldCBrbmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChga25pZ2h0LSR7aVJvd30tJHtpQ29sfWApO1xuICAgIGxldCBkaWZmUm93ID0gZlJvdyAtIGlSb3c7IC8vIG9mZnNldCBpbiB4IGF4aXNcbiAgICBsZXQgZGlmZkNvbCA9IGZDb2wgLSBpQ29sOyAvLyBvZmZzZXQgaW4geSBheGlzXG4gICAgbGV0IGN1cnJlbnRSb3cgPSBpUm93O1xuICAgIGxldCBjdXJyZW50Q29sID0gaUNvbDtcblxuICAgIGZvciAoaSA9IGRpZmZSb3c7IGkgPCAwOyBpKyspIHtcbiAgICAgIGN1cnJlbnRSb3ctLTtcbiAgICAgIGF3YWl0IG1vdmVVcChrbmlnaHQpO1xuICAgICAga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBkaWZmUm93OyBpKyspIHtcbiAgICAgIGN1cnJlbnRSb3crKztcbiAgICAgIGF3YWl0IG1vdmVEb3duKGtuaWdodCk7XG4gICAgICBrbmlnaHQucmVtb3ZlKCk7XG4gICAgICBrbmlnaHQgPSB0aGlzLnNldEtuaWdodChjdXJyZW50Um93LCBjdXJyZW50Q29sKTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSBkaWZmQ29sOyBpIDwgMDsgaSsrKSB7XG4gICAgICBjdXJyZW50Q29sLS07XG4gICAgICBhd2FpdCBtb3ZlTGVmdChrbmlnaHQpO1xuICAgICAga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBkaWZmQ29sOyBpKyspIHtcbiAgICAgIGN1cnJlbnRDb2wrKztcbiAgICAgIGF3YWl0IG1vdmVSaWdodChrbmlnaHQpO1xuICAgICAga25pZ2h0LnJlbW92ZSgpO1xuICAgICAga25pZ2h0ID0gdGhpcy5zZXRLbmlnaHQoY3VycmVudFJvdywgY3VycmVudENvbCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbn1cbi8vIGFzeW5jIGZ1bmN0aW9uIG1vdmVSaWdodFVwKHBpZWNlKSB7XG4vLyAgIGF3YWl0IG1vdmVSaWdodChwaWVjZSk7XG5cbi8vICAgYXdhaXQgbW92ZVVwKHBpZWNlKTtcbi8vIH1cblxuYXN5bmMgZnVuY3Rpb24gbW92ZVJpZ2h0KHBpZWNlKSB7XG4gIGxldCB0cmFucyA9IGNhbGNUcmFuc2xhdGUocGllY2UpO1xuICBsZXQgdHJhbnNYID0gYHRyYW5zbGF0ZVgoJHt0cmFuc31weClgO1xuXG4gIGNvbnNvbGUubG9nKHRyYW5zWCk7XG5cbiAgY29uc3QgZWZmZWN0ID0gW3sgdHJhbnNmb3JtOiB0cmFuc1ggfV07XG5cbiAgcGllY2UuYW5pbWF0ZShlZmZlY3QsIGdldFRpbWluZygpKTtcbiAgYXdhaXQgc2xlZXAoNTAxKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbW92ZUxlZnQocGllY2UpIHtcbiAgbGV0IHRyYW5zID0gY2FsY1RyYW5zbGF0ZShwaWVjZSk7XG4gIGxldCB0cmFuc1ggPSBgdHJhbnNsYXRlWCgtJHt0cmFuc31weClgO1xuICBjb25zb2xlLmxvZyh0cmFuc1gpO1xuXG4gIGNvbnN0IGVmZmVjdCA9IFt7IHRyYW5zZm9ybTogdHJhbnNYIH1dO1xuXG4gIHBpZWNlLmFuaW1hdGUoZWZmZWN0LCBnZXRUaW1pbmcoKSk7XG4gIGF3YWl0IHNsZWVwKDUwMSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1vdmVVcChwaWVjZSkge1xuICBsZXQgdHJhbnMgPSBjYWxjVHJhbnNsYXRlKHBpZWNlKTtcbiAgbGV0IHRyYW5zWSA9IGB0cmFuc2xhdGVZKC0ke3RyYW5zfXB4KWA7XG4gIGNvbnNvbGUubG9nKHRyYW5zWSk7XG5cbiAgY29uc3QgZWZmZWN0ID0gW3sgdHJhbnNmb3JtOiB0cmFuc1kgfV07XG5cbiAgcGllY2UuYW5pbWF0ZShlZmZlY3QsIGdldFRpbWluZygpKTtcbiAgYXdhaXQgc2xlZXAoNTAxKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbW92ZURvd24ocGllY2UpIHtcbiAgbGV0IHRyYW5zID0gY2FsY1RyYW5zbGF0ZShwaWVjZSk7XG4gIGxldCB0cmFuc1kgPSBgdHJhbnNsYXRlWSgke01hdGguZmxvb3IodHJhbnMpfXB4KWA7XG4gIGNvbnNvbGUubG9nKHRyYW5zWSk7XG5cbiAgY29uc3QgZWZmZWN0ID0gW3sgdHJhbnNmb3JtOiB0cmFuc1kgfV07XG5cbiAgcGllY2UuYW5pbWF0ZShlZmZlY3QsIGdldFRpbWluZygpKTtcbiAgYXdhaXQgc2xlZXAoNTAxKTtcbn1cblxuZnVuY3Rpb24gZ2V0VGltaW5nKCkge1xuICBjb25zdCB0aW1pbmcgPSB7XG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBpdGVyYXRpb25zOiAxLFxuICB9O1xuICByZXR1cm4gdGltaW5nO1xufVxuXG5mdW5jdGlvbiBjYWxjVHJhbnNsYXRlKHBpZWNlKSB7XG4gIC8vIGl0IHNlZW1zIHRoZSBkaXYgd2lkdGggKyAzMCAlIG1ha2VzIHRoZSBhbmltYXRpb24gc21vb3RoZXJcbiAgbGV0IHBvc2l0aW9uSW5mbyA9IHBpZWNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBsZXQgdHJhbnMgPSBNYXRoLmZsb29yKHBhcnNlSW50KHBvc2l0aW9uSW5mby53aWR0aCkgKiAxLjMpO1xuXG4gIHJldHVybiB0cmFucztcbn1cblxuZXhwb3J0IHsgQ2hlc3Nib2FyZCB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgKi9cbmNsYXNzIENvb3JkcyB7XG4gIC8vIENvb3JkcyBvYmplY3QgY29udGFpbiByb3cgYW5kIGNvbFxuICBjb25zdHJ1Y3RvcihyLCBjKSB7XG4gICAgdGhpcy5yb3cgPSByO1xuICAgIHRoaXMuY29sID0gYztcbiAgfVxuXG4gIGNvbXBhcmUoY29vcmRzKSB7XG4gICAgaWYgKHRoaXMucm93ID09PSBjb29yZHMucm93ICYmIHRoaXMuY29sID09PSBjb29yZHMuY29sKSByZXR1cm4gdHJ1ZTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFkZChjb29yZHMpIHtcbiAgICAvLyBXZSBhZGQgdHdvIGNvb3JkcyB0b2dldGhlclxuICAgIHRoaXMucm93ICs9IGNvb3Jkcy5yb3c7XG4gICAgdGhpcy5jb2wgKz0gY29vcmRzLmNvbDtcbiAgfVxuXG4gIC8vIHRoZSB0cmVlIGlzIHRoZSBvbmUgd2hvIGRlZmluZXMgdGhlIGJvdW5kcyBvZiB3aGF0IGlzIHZhbGlkIGFuZCB3aGF0IG5vdCBkZXBlbmRpbmcgb24gaXRzIG93biBydWxlcyAocmlnaHQgbm93LCBLbmlnaHQgY2hlc3MgbW92ZW1lbnQpXG4gIC8vICAgdmFsaWQoKSB7XG4gIC8vICAgICAvLyB3ZSB2YWxpZGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhpcyBvYmplY3RcbiAgLy8gICAgIGlmICh0aGlzLnJvdyA8IDAgfHwgdGhpcy5jb2wgPCAwIHx8IHRoaXMucm93ID4gNyB8fCB0aGlzLmNvbCA+IDcpXG4gIC8vICAgICAgIHJldHVybiBmYWxzZTtcblxuICAvLyAgICAgcmV0dXJuIHRydWU7XG4gIC8vICAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAncm93OiAnICsgdGhpcy5yb3cgKyAnIHwgY29sOiAnICsgdGhpcy5jb2w7XG4gIH1cblxuICBjb3B5KGNvb3Jkcykge1xuICAgIHRoaXMucm93ID0gY29vcmRzLnJvdztcbiAgICB0aGlzLmNvbCA9IGNvb3Jkcy5jb2w7XG4gIH1cbn1cblxuY2xhc3MgTm9kZSB7XG4gIC8vIEEgbm9kZSBpcyBmb3JtZWQgb2YgYW4gb2JqZWN0IGNvb3JkcyBhbmQgYW4gYXJyYXkgb2YgY29ubmVjdGVkIG5vZGVzXG4gIC8vIGVzc2VudGlhbGx5IHdlIGdldCBjb29yZHMgcGF0aGluZyB0byBvdGhlciBjb29yZHMgdW50aWwgbnVsbC5cbiAgY29uc3RydWN0b3IoY29vcmRzLCBkZXB0aCwgbmV4dE5vZGVzKSB7XG4gICAgaWYgKGNvb3JkcyAhPSBudWxsKSB0aGlzLmNvb3JkcyA9IGNvb3JkcztcbiAgICBpZiAoZGVwdGggIT0gbnVsbCkgdGhpcy5kZXB0aCA9IGRlcHRoO1xuICAgIGlmIChuZXh0Tm9kZXMgIT0gbnVsbCkgdGhpcy5uZXh0Tm9kZXMgPSBuZXh0Tm9kZXM7XG4gIH1cblxuICAvLyBhbSBJIGV2ZW4gdXNpbmcgdGhpcz9cbiAgYWRkUGF0aChub2RlKSB7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coJ251bGwgbm9kZTogJyArIG5vZGUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZXh0Tm9kZXMgPT0gbnVsbCB8fCB0aGlzLm5leHROb2Rlcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLm5leHROb2RlcyA9IFtub2RlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uZXh0Tm9kZXMucHVzaChub2RlKTtcbiAgICB9XG4gIH1cbiAgcmVtb3ZlTnVsbHMoKSB7XG4gICAgaWYgKHRoaXMubmV4dE5vZGVzID09IG51bGwpIHtcbiAgICAgIHRoaXMubmV4dE5vZGVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBhdXhMaXN0ID0gW107XG4gICAgICB0aGlzLm5leHROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIGF1eExpc3QucHVzaChub2RlKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5uZXh0Tm9kZXMgPSBhdXhMaXN0O1xuICAgIH1cbiAgfVxuICAvLyAgIHNldERlc3RpbmF0aW9uKHYpIHtcbiAgLy8gICAgIGlmICghdikgdGhpcy5kZXN0aW5hdGlvbiA9IGZhbHNlO1xuICAvLyAgICAgZWxzZSB0aGlzLmRlc3RpbmF0aW9uID0gdHJ1ZTtcbiAgLy8gICB9XG59XG5cbmNsYXNzIENoZXNzdHJlZSB7XG4gIC8vIHRoZSBDaGVzc3RyZWUgcmVjZWl2ZXMgdGhpcyBwYXJhbWV0ZXJzIHRvIHdvcms6XG4gIC8vIDEtPiBPcmlnaW4gQ29vcmRpbmF0ZXMsIG91ciBzdGFydGluZyBwb2ludC5cbiAgLy8gMi0+IERlc3Rpbml5IENvb3JkaW5hdGVzLCBvdXIgZmluYWwgcG9pbnQuXG4gIC8vIDMtPiB0eXBlIChmb3Igbm93LCBvbmx5IEtuaWdodCBpcyBhdmFpbGFibGUpLCBkZWZpbmVzIHRoZSBydWxlcyB3aGljaCB3aWxsIGV2YWx1YXRlIGlmIGNvb3JkaW5hdGVzIGFyZSB2YWxpZCBvciBub3RcblxuICBsaXN0T2ZDb29yZGluYXRlcyA9IFtdO1xuICBkZXN0aW5hdGlvblJlYWNoZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihvQywgZEMsIHR5cGUpIHtcbiAgICAvLyBvQyAtPiBPcmlnaW4gQ29vcmRzLCBkQyAtLT4gRGVzdGlueSBDb29yZHNcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuY3JlYXRlTm9kZShvQywgbnVsbCk7XG4gICAgaWYgKG9DICE9IGRDKSB7XG4gICAgICBjb25zb2xlLmxvZygnc28gdGhpcyBpcyB0aGUgYmVnaW5uaW5nJyk7XG4gICAgICB0aGlzLmJ1aWxkVHJlZShbdGhpcy5yb290XSwgMCwgZEMpO1xuICAgICAgdGhpcy5yb290ID0gdGhpcy50cmltVHJlZSh0aGlzLnJvb3QsIGRDKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2codGhpcy5yb290KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmxpc3RPZkNvb3JkaW5hdGVzKTtcbiAgfVxuXG4gIGJ1aWxkVHJlZShub2RlTGlzdCwgZGVwdGgsIGRDKSB7XG4gICAgaWYgKG5vZGVMaXN0ID09IG51bGwpIHJldHVybjsgLy8gZ3VhcmQgY2xhdXNlXG4gICAgbGV0IG5leHROb2RlTGlzdCA9IFtdO1xuICAgIGxldCBpLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbm9kZSA9IG5vZGVMaXN0W2ldO1xuICAgICAgLy8gRm9yIGVhY2ggbm9kZSBvZiB0aGUgbm9kZSBsaXN0IHdlJ3JlIGdvbm5hIGNoZWNrIGlmIGFueSBvZiB0aGUgY2hpbGRzIGlzIG91ciBkZXN0aW5hdGlvbi5cbiAgICAgIC8vIHRoZW4gd2Ugd2lsbCBzdG9wIGluIG91ciB0cmFja3MuXG5cbiAgICAgIGxldCBtb3ZlcyA9IHRoaXMuZ2V0TW92ZW1lbnRzKG5vZGUuY29vcmRzKTtcblxuICAgICAgaWYgKG1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG1vdmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgbGV0IG1vdmUgPSBtb3Zlc1tqXTtcblxuICAgICAgICAgIGlmICghdGhpcy5pc0R1cGxpY2F0ZShtb3ZlLCB0aGlzLmxpc3RPZkNvb3JkaW5hdGVzKSkge1xuICAgICAgICAgICAgdGhpcy5hZGRMaXN0KG1vdmUpOyAvLyB3ZSBwdXQgdGhpcyBjb29yZHMgYXMgYWxyZWFkcnkgdHJlYXRlZFxuXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNyZWF0ZU5vZGUobW92ZSwgZGVwdGggKyAxLCBudWxsKTtcbiAgICAgICAgICAgIG5vZGUuYWRkUGF0aChjaGlsZCk7XG4gICAgICAgICAgICAvLyB3ZSBjaGVjayBpZiBpdCdzIG91ciBkZXN0aW5hdGlvblxuICAgICAgICAgICAgaWYgKGNoaWxkLmNvb3Jkcy5jb21wYXJlKGRDKSkge1xuICAgICAgICAgICAgICAvLyBXZSByZWFjaGVkIG91ciBkZXN0aW5hdGlvbiwgaG9vcnJheVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHROb2RlTGlzdC5wdXNoKGNoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc2luY2Ugd2UgaGF2ZSBub3QgZm91bmQgdGhlIGRlc3RpbmF0aW9uLCB3ZSBtdXN0IHRyYXZlbCB0byB0aGUgbmV4dCBsZXZlbFxuICAgIGlmIChuZXh0Tm9kZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5idWlsZFRyZWUobmV4dE5vZGVMaXN0LCBkZXB0aCArIDEsIGRDKTtcbiAgICB9XG4gIH1cblxuICB0cmltVHJlZShub2RlLCBkQykge1xuICAgIGlmIChub2RlLmNvb3Jkcy5jb21wYXJlKGRDKSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUubmV4dE5vZGVzICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5uZXh0Tm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZS5uZXh0Tm9kZXNbaV0gPSB0aGlzLnRyaW1UcmVlKG5vZGUubmV4dE5vZGVzW2ldLCBkQyk7XG4gICAgICB9XG4gICAgICBub2RlLnJlbW92ZU51bGxzKCk7XG4gICAgICBpZiAobm9kZS5uZXh0Tm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzRHVwbGljYXRlKHZhbHVlLCBhcnIyKSB7XG4gICAgLy8gd2UgY2hlY2sgaWYgYXJyYXkgMiBoYXMgdmFsdWUgaW4gaXRzIGVsZW1lbnRzXG4gICAgcmV0dXJuIGFycjIuc29tZSgoZSkgPT4ge1xuICAgICAgaWYgKGUucm93ID09PSB2YWx1ZS5yb3cgJiYgZS5jb2wgPT09IHZhbHVlLmNvbCkgcmV0dXJuIHRydWU7XG4gICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhbGlkKGMpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAna25pZ2h0JylcbiAgICAgIC8vIHBlcnNvbmFsIHJ1bGVzIG9mIHRoZSBrbmlnaHQgcGllY2UgKGluIHRoaXMgY2FzZSwgcnVsZXMgb2YgdGhlIGNoZXNzYm9hcmQpXG4gICAgICByZXR1cm4gdGhpcy52YWxpZEtuaWdodChjKTtcblxuICAgIC8vIGlmIG5vdCByZXR1cm5lZCB0cnVlIHRpbGwgaGVyZSwgaXQncyBmYWxzZVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkS25pZ2h0KGMpIHtcbiAgICAvLyB3ZSB2YWxpZGF0ZSB0aGUgY29vcmRpbmF0ZXMgb2YgdGhpcyBvYmplY3RcbiAgICBpZiAoYy5yb3cgPCAwIHx8IGMuY29sIDwgMCB8fCBjLnJvdyA+IDcgfHwgYy5jb2wgPiA3KSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldE1vdmVtZW50cyhjKSB7XG4gICAgLy8gYyAtLT4gY29vcmRzXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2tuaWdodCcpIHJldHVybiB0aGlzLmdldEtuaWdodE1vdmVtZW50cyhjKTtcblxuICAgIC8vIGlmIHdlIGhhdmUgcmVhY2hlZCBoZXJlIGFuZCBub3QgZm91bmQgYSB2YWxpZCB0eXBlLCB3ZSBzaG91bGQgdGhyb3cgYW4gZXJyb3IuXG4gICAgLy8gc2luY2Ugd2UncmUgdG9vIGxhenkgZm9yIHRoYXQsIHdlJ3JlIGdvbm5hIHJldHVybiBudWxsLiBPdXIgdHJlZSB3aWxsIGJlIHZlcnkgc2hvcnQuXG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGdldEtuaWdodE1vdmVtZW50cyhjKSB7XG4gICAgLy8gVGhlIGtuaWdodCBjYW4gbW92ZSB0byBlaWdodCBwb3NpdGlvbnM6XG4gICAgLy8gKzEgcm93LCArMiBjb2xcbiAgICAvLyArMSByb3csIC0yIGNvbFxuICAgIC8vICsyIHJvdywgKzEgY29sXG4gICAgLy8gKzIgcm93LCAtMSBjb2xcbiAgICAvLyAtMSByb3csICsyIGNvbFxuICAgIC8vIC0xIHJvdywgLTIgY29sXG4gICAgLy8gLTIgcm93LCArMSBjb2xcbiAgICAvLyAtMiByb3csIC0xIGNvbFxuICAgIGNvbnN0IG1vdmVtZW50cyA9IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMiwgLTEpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKC0yLCArMSkpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoLTEsIC0yKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygtMSwgKzIpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsxLCAtMikpO1xuICAgIG1vdmVtZW50cy5wdXNoKG5ldyBDb29yZHMoKzEsICsyKSk7XG4gICAgbW92ZW1lbnRzLnB1c2gobmV3IENvb3JkcygrMiwgLTEpKTtcbiAgICBtb3ZlbWVudHMucHVzaChuZXcgQ29vcmRzKCsyLCArMSkpO1xuXG4gICAgbW92ZW1lbnRzLmZvckVhY2goKG1vdmUpID0+IHtcbiAgICAgIGNvbnN0IGF1eENvb3JkcyA9IG5ldyBDb29yZHMoKTtcbiAgICAgIGF1eENvb3Jkcy5jb3B5KGMpO1xuICAgICAgYXV4Q29vcmRzLmFkZChtb3ZlKTtcbiAgICAgIGlmICh0aGlzLnZhbGlkKGF1eENvb3JkcykpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goYXV4Q29vcmRzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQubGVuZ3RoID4gMCA/IHJlc3VsdCA6IG51bGw7XG4gIH1cblxuICBjcmVhdGVOb2RlKGNvb3JkcywgZGVwdGgsIG5leHRDb29yZHMpIHtcbiAgICAvLyBpdCB1c2VkIHRvIGRvIHRoaW5ncyBiZWZvcmUgbmV3IE5vZGUgbG9sLlxuICAgIHJldHVybiBuZXcgTm9kZShjb29yZHMsIGRlcHRoLCBuZXh0Q29vcmRzKTtcbiAgfVxuXG4gIGFkZExpc3QoY29vcmRzKSB7XG4gICAgdGhpcy5saXN0T2ZDb29yZGluYXRlcy5wdXNoKGNvb3Jkcyk7XG4gICAgdGhpcy5zb3J0TGlzdCgpO1xuICB9XG5cbiAgc29ydExpc3QoKSB7XG4gICAgdGhpcy5saXN0T2ZDb29yZGluYXRlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBpZiAoYS5yb3cgPCBiLnJvdykgcmV0dXJuIC0xO1xuICAgICAgaWYgKGEucm93ID4gYi5yb3cpIHJldHVybiAxO1xuICAgICAgaWYgKGEuY29sIDwgYi5jb2wpIHJldHVybiAtMTtcbiAgICAgIGlmIChhLmNvbCA+IGIuY29sKSByZXR1cm4gMTtcblxuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGxldCBwYXRoID0gW107XG4gICAgbGV0IG5vZGUgPSB0aGlzLnJvb3Q7XG5cbiAgICB3aGlsZSAobm9kZSAhPSBudWxsKSB7XG4gICAgICBwYXRoLnB1c2gobm9kZS5jb29yZHMpO1xuXG4gICAgICBpZiAobm9kZS5uZXh0Tm9kZXMgIT0gbnVsbClcbiAgICAgICAgbm9kZSA9IG5vZGUubmV4dE5vZGVzWzBdOyAvLyBzaG91bGQgb25seSBoYXZlIG9uZSBwYXRoXG4gICAgICBlbHNlIG5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoO1xuICB9XG59XG5cbmV4cG9ydCB7IENvb3JkcywgQ2hlc3N0cmVlIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIiNjaGVzc2JvYXJkIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcXG4gIHdpZHRoOiA2MHZ3O1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1nYXA6IDA7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XFxufVxcblxcbi5jZWxsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxufVxcblxcbi53aGl0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NSwgMjQ1LCAyNDUsIDAuNDU5KTtcXG59XFxuXFxuLmJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDEyMywgMTIzKTtcXG59XFxuXFxuLmtuaWdodCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogODAlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL2NoZXNzLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSxrQkFBQTtFQUNBLHdCQUFBO0VBQ0EsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7RUFDQSxxQ0FBQTtFQUNBLGtDQUFBO0VBQ0EsbUJBQUE7QUFERjs7QUFXQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQVJGOztBQVdBO0VBQ0UsNENBQUE7QUFSRjs7QUFXQTtFQUNFLG9DQUFBO0FBUkY7O0FBV0E7RUFDRSxrQkFBQTtFQUNBLFVBQUE7QUFSRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvL0ZvciBvdXIgY2hlc3MgYm9hcmQgd2UgaGF2ZSB0aGUgY2hlc3Nib2FyZCBjb250YWluZXIsIHRoZSBjZWxsIGNsYXNzLCB0aGUgYmxhY2sgY2xhc3MsIHRoZSB3aGl0ZSBjbGFzc1xcblxcbiNjaGVzc2JvYXJkIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJpc3F1ZTtcXG4gIHdpZHRoOiA2MHZ3O1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1nYXA6IDA7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg4LCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoOCwgMWZyKTtcXG4gIGdyaWQtYXV0by1mbG93OiByb3c7XFxuICAvLyAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAgLy9hbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4vLyAuY2VsbCB7XFxuLy8gICBib3JkZXI6IDFweCBibGFjayBkYXNoZWQ7XFxuLy8gICBoZWlnaHQ6IDV2aDtcXG4vLyAgIHdpZHRoOiA1dnc7XFxuLy8gfVxcblxcbi5jZWxsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBhc3BlY3QtcmF0aW86IDE7XFxufVxcblxcbi53aGl0ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0NSwgMjQ1LCAyNDUsIDAuNDU5KTtcXG59XFxuXFxuLmJsYWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyMjYsIDEyMywgMTIzKTtcXG59XFxuXFxuLmtuaWdodCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogODAlO1xcbiAgLy9hbmltYXRpb246IDRzIGVhc2UtaW4tb3V0IDBzIG1vdmUta25pZ2h0MTtcXG59XFxuXFxuLy8gQGtleWZyYW1lcyBtb3ZlLWtuaWdodDEge1xcbi8vICAgLy8gICAwJSB7XFxuLy8gICAvLyAgICAgbGVmdDogMDtcXG4vLyAgIC8vICAgfVxcbi8vICAgLy8gICAyNSUge1xcbi8vICAgLy8gICAgIGxlZnQ6IDIwJTtcXG4vLyAgIC8vICAgfVxcbi8vICAgLy8gICA1MCUge1xcbi8vICAgLy8gICAgIHRvcDogMzMlO1xcbi8vICAgLy8gICB9XFxuLy8gICAvLyAgIDc1JSB7XFxuLy8gICAvLyAgICAgdG9wOiA2NiU7XFxuLy8gICAvLyAgIH1cXG4vLyAgIC8vICAgMTAwJSB7XFxuLy8gICAvLyAgICAgdG9wOiAxMDAlO1xcbi8vICAgLy8gICB9XFxuLy8gICBmcm9tIHtcXG4vLyAgICAgbGVmdDogMCU7XFxuLy8gICB9XFxuLy8gICB0byB7XFxuLy8gICAgIGxlZnQ6IDEwMCU7XFxuLy8gICB9XFxuLy8gICBmcm9tIHtcXG4vLyAgICAgbGVmdDogMTAwJTtcXG4vLyAgICAgYm90dG9tOiAwJTtcXG4vLyAgIH1cXG4vLyAgIHRvIHtcXG4vLyAgICAgbGVmdDogMTAwJTtcXG4vLyAgICAgYm90dG9tOiAyMDAlO1xcbi8vICAgfVxcbi8vIH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY2hlc3Muc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2NoZXNzLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyd1c2Ugc3RyaWN0JztcblxuaW1wb3J0ICcuL3N0eWxlcy9jaGVzcy5zY3NzJztcbmltcG9ydCB7IENvb3JkcywgQ2hlc3N0cmVlIH0gZnJvbSAnLi9jb2RlL2tuaWdodC5qcyc7XG5pbXBvcnQgeyBDaGVzc2JvYXJkIH0gZnJvbSAnLi9jb2RlL2NoZXNzYm9hcmQuanMnO1xuXG5jb25zdCBzcCA9IG5ldyBDb29yZHMoNCwgMyk7IC8vIHN0YXJ0aW5nIHBvaW50XG5jb25zdCBmcCA9IG5ldyBDb29yZHMoMCwgNyk7IC8vIGZpbmFsIHBvaW50XG5sZXQgY3AgPSBuZXcgQ29vcmRzKCk7IC8vIGN1cnJlbnQgcG9pbnRcbmNvbnN0IGtuaWdodFRyZWUgPSBuZXcgQ2hlc3N0cmVlKHNwLCBmcCwgJ2tuaWdodCcpO1xubGV0IG1vdmVzID0ga25pZ2h0VHJlZS5nZXRQYXRoKCk7XG5cbmNvbnN0IGNoZXNzYm9hcmQgPSBuZXcgQ2hlc3Nib2FyZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlc3Nib2FyZCcpKTtcbmNoZXNzYm9hcmQuY3JlYXRlQm9hcmQoKTtcbmNoZXNzYm9hcmQuc2V0S25pZ2h0KHNwLnJvdywgc3AuY29sKTtcbmNoZXNzYm9hcmQubW92ZUtuaWdodChtb3Zlcyk7XG4vLyBjcC5jb3B5KHNwKTtcblxuLy8gbW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xuLy8gICAvLyBsZXQgcm93ID0gY3Aucm93IC0gbW92ZS5yb3c7XG4vLyAgIC8vIGxldCBjb2wgPSBjcC5jb2wgLSBtb3ZlLmNvbDtcbi8vICAgY2hlc3Nib2FyZC5tb3ZlS25pZ2h0KGNwLnJvdywgY3AuY29sLCBtb3ZlLnJvdywgbW92ZS5jb2wpO1xuLy8gICBjcC5jb3B5KG1vdmUpO1xuLy8gfSk7XG4vLyBjaGVzc2JvYXJkLm1vdmVLbmlnaHQoY3Aucm93LCBjcC5jb2wsIG1vdmVzWzFdLnJvdywgbW92ZXNbMV0uY29sKTtcblxuLy9jaGVzc2JvYXJkLnNldEtuaWdodCgwLCA3KTtcbi8vY2hlc3Nib2FyZC5tb3ZlS25pZ2h0KDQsIDMsIDUsIDUpO1xuXG4vLyBsZXQgY2hlc3NDb29yZHMgPSBbXTtcbi8vIGNoZXNzQ29vcmRzLnB1c2goWydXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InXSk7IC8vIHJvdyAwXG4vLyBjaGVzc0Nvb3Jkcy5wdXNoKFsnQicsICdXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJ10pO1xuLy8gY2hlc3NDb29yZHMucHVzaChbJ1cnLCAnQicsICdXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQiddKTtcbi8vIGNoZXNzQ29vcmRzLnB1c2goWydCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVycsICdCJywgJ1cnXSk7XG4vLyBjaGVzc0Nvb3Jkcy5wdXNoKFsnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVycsICdCJ10pO1xuLy8gY2hlc3NDb29yZHMucHVzaChbJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InLCAnVyddKTtcbi8vIGNoZXNzQ29vcmRzLnB1c2goWydXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJywgJ0InXSk7XG4vLyBjaGVzc0Nvb3Jkcy5wdXNoKFsnQicsICdXJywgJ0InLCAnVycsICdCJywgJ1cnLCAnQicsICdXJ10pOyAvLyByb3cgN1xuLy8gY2hlc3Nib2FyZC5zZXRLbmlnaHQoNCwgNSk7XG4vL3NldEtuaWdodCg0LCA0KTsgLy8gY3JlYXRlcyBrbmlnaHQgaW4gdGhlIGJvYXJkXG5cbi8vIGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xuLy8gICBjb25zb2xlLmxvZygnb2xhIGtlIGFzZScpO1xuXG4vLyAgIGxldCBjb2xzID0gMCxcbi8vICAgICByb3dzID0gMDtcblxuLy8gICB3aGlsZSAoY29scyA8IDggJiYgcm93cyA8IDgpIHtcbi8vICAgICBsZXQgbmV3Q2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICAgIG5ld0NlbGwuaWQgPSBgY2VsbC0ke1N0cmluZyhyb3dzKX0tJHtTdHJpbmcoY29scyl9YDtcbi8vICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoJ2NlbGwnKTtcbi8vICAgICBpZiAoXG4vLyAgICAgICAocm93cyAlIDIgPT09IDAgJiYgY29scyAlIDIgPT09IDApIHx8XG4vLyAgICAgICAocm93cyAlIDIgIT09IDAgJiYgY29scyAlIDIgIT09IDApXG4vLyAgICAgKSB7XG4vLyAgICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoJ3doaXRlJyk7XG4vLyAgICAgICBjaGVzc0Nvb3Jkc1tjb2xzXVtyb3dzXSA9ICdXJztcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdibGFjaycpO1xuLy8gICAgICAgY2hlc3NDb29yZHNbY29sc11bcm93c10gPSAnQic7XG4vLyAgICAgfVxuLy8gICAgIGNoZXNzQm9hcmQuYXBwZW5kQ2hpbGQobmV3Q2VsbCk7XG4vLyAgICAgY29scysrO1xuLy8gICAgIGlmIChjb2xzID49IDgpIHtcbi8vICAgICAgIGNvbHMgPSAwO1xuLy8gICAgICAgcm93cysrO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfVxuXG4vLyBmdW5jdGlvbiBzZXRLbmlnaHQocm93LCBjb2wpIHt9XG4iXSwibmFtZXMiOlsidW5pY29ybiIsIkNoZXNzYm9hcmQiLCJjb25zdHJ1Y3RvciIsIm5vZGUiLCJib2FyZCIsImNyZWF0ZUJvYXJkIiwiY29scyIsInJvd3MiLCJuZXdDZWxsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJTdHJpbmciLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInNldEtuaWdodCIsInIiLCJjIiwiY2VsbCIsImdldEVsZW1lbnRCeUlkIiwia25pZ2h0IiwiY3JlYXRlS25pZ2h0IiwiYXBwZW5kIiwic3JjIiwic2V0QXR0cmlidXRlIiwibW92ZUtuaWdodCIsIm1vdmVzIiwicXVlcnlTZWxlY3RvciIsImlSb3ciLCJnZXRBdHRyaWJ1dGUiLCJpQ29sIiwiaSIsImxlbmd0aCIsInhtb3ZlS25pZ2h0Iiwicm93IiwiY29sIiwic2xlZXAiLCJmUm93IiwiZkNvbCIsImRpZmZSb3ciLCJkaWZmQ29sIiwiY3VycmVudFJvdyIsImN1cnJlbnRDb2wiLCJtb3ZlVXAiLCJyZW1vdmUiLCJtb3ZlRG93biIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0IiwibXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJwaWVjZSIsInRyYW5zIiwiY2FsY1RyYW5zbGF0ZSIsInRyYW5zWCIsImNvbnNvbGUiLCJsb2ciLCJlZmZlY3QiLCJ0cmFuc2Zvcm0iLCJhbmltYXRlIiwiZ2V0VGltaW5nIiwidHJhbnNZIiwiTWF0aCIsImZsb29yIiwidGltaW5nIiwiZHVyYXRpb24iLCJpdGVyYXRpb25zIiwicG9zaXRpb25JbmZvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGFyc2VJbnQiLCJ3aWR0aCIsIkNvb3JkcyIsImNvbXBhcmUiLCJjb29yZHMiLCJ0b1N0cmluZyIsImNvcHkiLCJOb2RlIiwiZGVwdGgiLCJuZXh0Tm9kZXMiLCJhZGRQYXRoIiwicHVzaCIsInJlbW92ZU51bGxzIiwiYXV4TGlzdCIsImZvckVhY2giLCJDaGVzc3RyZWUiLCJvQyIsImRDIiwidHlwZSIsInJvb3QiLCJjcmVhdGVOb2RlIiwiYnVpbGRUcmVlIiwidHJpbVRyZWUiLCJsaXN0T2ZDb29yZGluYXRlcyIsIm5vZGVMaXN0IiwibmV4dE5vZGVMaXN0IiwiaiIsImdldE1vdmVtZW50cyIsIm1vdmUiLCJpc0R1cGxpY2F0ZSIsImFkZExpc3QiLCJjaGlsZCIsInZhbHVlIiwiYXJyMiIsInNvbWUiLCJlIiwidmFsaWQiLCJ2YWxpZEtuaWdodCIsImdldEtuaWdodE1vdmVtZW50cyIsIm1vdmVtZW50cyIsInJlc3VsdCIsImF1eENvb3JkcyIsIm5leHRDb29yZHMiLCJzb3J0TGlzdCIsInNvcnQiLCJhIiwiYiIsImdldFBhdGgiLCJwYXRoIiwic3AiLCJmcCIsImNwIiwia25pZ2h0VHJlZSIsImNoZXNzYm9hcmQiXSwic291cmNlUm9vdCI6IiJ9