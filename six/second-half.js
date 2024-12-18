// ! Unable to get solution to work

import { promises as fs } from "fs";

const rawData = await fs.readFile("data.txt", "utf-8");

// * Very un optimized solution. Check route after turning every position into blocker
// * add every position and direction to dictionary
// * If position and same direction are ever hit again, you're looping, increment block counter and continue

let initialX, initialY;
const matrixBase = rawData.split("\n").map((row, i) => {
  if (row.indexOf("^") > -1) [initialY, initialX] = [i, row.indexOf("^")];
  return row.split("");
});
let blockCounter = 0;

for (let i = 0; i < matrixBase.length; i++) {
  buh: for (let j = 0; j < matrixBase[0].length; j++) {
    const matrix = matrixBase;
    if (matrix[i][j] === "#" || matrix[i][j] === "^") continue;
    matrix[i][j] = "#";

    let guardY = initialY;
    let guardX = initialX;
    let dict = {};
    let dir = "up";

    main: while (matrix[guardY][guardX] !== undefined) {
      if (
        dict[guardX.toString() + "x" + guardY.toString() + "y" + dir] === true
      ) {
        blockCounter += 1;
        continue buh;
      }
      dict[guardX.toString() + "x" + guardY.toString() + "y" + dir] = true;

      if (dir === "up") {
        if (guardY === 0) continue buh;
        if (matrix[guardY - 1][guardX] === "#") {
          dir = "right";
          continue;
        }

        guardY -= 1;
      } else if (dir === "down") {
        if (guardY === matrix.length - 1) continue buh;
        if (matrix[guardY + 1][guardX] === "#") {
          dir = "left";
          continue;
        }
        guardY += 1;
      } else if (dir === "left") {
        if (guardX === 0) continue buh;
        if (matrix[guardY][guardX - 1] === "#") {
          dir = "up";
          continue;
        }
        guardX -= 1;
      } else if (dir === "right") {
        if (guardX === matrix[0].length - 1) continue buh;
        if (matrix[guardY][guardX + 1] === "#") {
          dir = "down";
          continue;
        }
        guardX += 1;
      }
    }
  }
}

console.log("Full block counter: ", blockCounter);
