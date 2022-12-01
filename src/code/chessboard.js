/* eslint-disable */
import unicorn from '../img/unicorn knight.png';

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

      if (
        (rows % 2 === 0 && cols % 2 === 0) ||
        (rows % 2 !== 0 && cols % 2 !== 0)
      ) {
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
    knight.src = unicorn;
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
    let attilaCount = { count: 0 };
    this.attila(iRow, iCol, attilaCount);
    for (let i = 0; i < moves.length; i++) {
      await this.xmoveKnight(
        knight,
        iRow,
        iCol,
        moves[i].row,
        moves[i].col,
        attilaCount
      );

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
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function moveRight(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(${trans}px)`;

  const effect = [{ transform: transX }];

  piece.animate(effect, getTiming());
  await sleep(495);
}

async function moveLeft(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(-${trans}px)`;

  const effect = [{ transform: transX }];

  piece.animate(effect, getTiming());
  await sleep(495);
}

async function moveUp(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(-${trans}px)`;

  const effect = [{ transform: transY }];

  piece.animate(effect, getTiming());
  await sleep(495);
}

async function moveDown(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(${Math.floor(trans)}px)`;

  const effect = [{ transform: transY }];

  piece.animate(effect, getTiming());
  await sleep(485);
}

function getTiming() {
  const timing = {
    duration: 500,
    iterations: 1,
  };
  return timing;
}

function calcTranslate(piece) {
  // it seems the div width + 30 % makes the animation smoother
  let positionInfo = piece.getBoundingClientRect();
  let trans = Math.floor(parseInt(positionInfo.width) * 1.3);

  return trans;
}

export { Chessboard };
