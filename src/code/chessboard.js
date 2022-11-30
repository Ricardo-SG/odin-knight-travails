/* eslint-disable */
import unicorn from '../img/unicorn knight.png';

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
    knight.src = unicorn;
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
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// async function moveRightUp(piece) {
//   await moveRight(piece);

//   await moveUp(piece);
// }

async function moveRight(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(${trans}px)`;

  console.log(transX);

  const effect = [{ transform: transX }];

  piece.animate(effect, getTiming());
  await sleep(501);
}

async function moveLeft(piece) {
  let trans = calcTranslate(piece);
  let transX = `translateX(-${trans}px)`;
  console.log(transX);

  const effect = [{ transform: transX }];

  piece.animate(effect, getTiming());
  await sleep(501);
}

async function moveUp(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(-${trans}px)`;
  console.log(transY);

  const effect = [{ transform: transY }];

  piece.animate(effect, getTiming());
  await sleep(501);
}

async function moveDown(piece) {
  let trans = calcTranslate(piece);
  let transY = `translateY(${Math.floor(trans)}px)`;
  console.log(transY);

  const effect = [{ transform: transY }];

  piece.animate(effect, getTiming());
  await sleep(501);
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
