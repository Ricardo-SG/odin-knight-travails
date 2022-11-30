'use strict';
/* eslint-disable */
class Coords {
  // Coords object contain row and col
  constructor(r, c) {
    this.row = r;
    this.col = c;
  }

  compare(coords) {
    if (this.row === coords.row && this.col === coords.col) return true;
    else return false;
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
      this.nextNodes.forEach((node) => {
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

  listOfCoordinates = [];
  destinationReached = false;

  constructor(oC, dC, type) {
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
    return arr2.some((e) => {
      if (e.row === value.row && e.col === value.col) return true;
      else return false;
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

    movements.forEach((move) => {
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

      if (node.nextNodes != null)
        node = node.nextNodes[0]; // should only have one path
      else node = null;
    }

    return path;
  }
}

export { Coords, Chesstree };
