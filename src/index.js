/* eslint-disable */
//'use strict';

import './styles/chess.scss';
import { Coords, Chesstree } from './code/knight.js';
import { Chessboard } from './code/chessboard.js';

const sp = new Coords(4, 3); // starting point
const fp = new Coords(0, 7); // final point
let cp = new Coords(); // current point
const knightTree = new Chesstree(sp, fp, 'knight');
let moves = knightTree.getPath();

const chessboard = new Chessboard(document.getElementById('chessboard'));
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
