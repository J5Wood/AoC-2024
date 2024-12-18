import { promises as fs } from "fs";

const rawData = await fs.readFile("data.txt", "utf-8");

// * Turn data into matrix
// * Find guard
//  * Move guard along path.
// *  Start goin up
// * If an obstacle is in front of you, turn right, move in that direction
// * Keep doing this until guard has moved out of matrix

let guardX, guardY;
const matrix = rawData.split("\n").map((row, i) => {
  if (row.indexOf("^") > -1) [guardY, guardX] = [i, row.indexOf("^")];
  return row.split("");
});
let dir = "up";
let counter = 0;

function markSpot(x, y) {
  if (matrix[y][x] !== "X") {
    matrix[y][x] = "X";
    counter += 1;
  }
}

main: while (matrix[guardY][guardX] !== undefined) {
  if (dir === "up") {
    if (matrix[guardY - 1][guardX] === "#") {
      dir = "right";
      continue main;
    }
    markSpot(guardX, guardY);
    guardY -= 1;
  } else if (dir === "down") {
    if (matrix[guardY + 1][guardX] === "#") {
      dir = "left";
      continue main;
    }
    markSpot(guardX, guardY);
    guardY += 1;
  } else if (dir === "left") {
    if (matrix[guardY][guardX - 1] === "#") {
      dir = "up";
      continue main;
    }
    markSpot(guardX, guardY);
    guardX -= 1;
  } else if (dir === "right") {
    if (matrix[guardY][guardX + 1] === "#") {
      dir = "down";
      continue main;
    }
    markSpot(guardX, guardY);
    guardX += 1;
  }
}

console.log("Final count: ", counter);
