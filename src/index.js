/* eslint-disable */
//'use strict';
import './styles/general.scss';
import './styles/chess.scss';
import odin from './img/odin.png';
import { Coords, Chesstree } from './code/knight.js';
import { Chessboard } from './code/chessboard.js';

// we define the variables that are gonna make all this work
let startCell = {};
let finalCell = {};
const chessboard = new Chessboard(document.getElementById('chessboard'));
chessboard.createBoard();
// We set the listeners for each Cell
setCellListeners();

// we set the logo source with this...seems using npm makes it hard to directly inject it in the html
const logo = document.getElementById('odin');
logo.src = odin;

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
  cells.forEach((cell) => {
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
    userFeedback.textContent =
      "The destination can't be the same as the start!";
    await sleep(1000);
    userFeedback.textContent = 'Choose a destination!';
    return;
  }

  if (userFeedback.textContent === 'Choose a cell to start!') {
    startCell = new Coords(row, col);
    userFeedback.textContent = 'Hiring a Knight...';
    chessboard.setKnight(row, col);
    await sleep(250);
    userFeedback.textContent = 'Choose a destination!';
    return;
  }

  if (userFeedback.textContent === 'Choose a destination!') {
    finalCell = new Coords(row, col);

    const knightTree = new Chesstree(startCell, finalCell, 'knight');
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

  moves.forEach((move) => {
    str3 += `[${move.row},${move.col}] `;
    cm++;
  });

  str2 = `\nYou made it in ${cm} moves! Here's your path: `;

  return str1 + str2 + str3;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
