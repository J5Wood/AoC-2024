import { promises as fs } from "fs";

// * Turn data into matrix
// * Loop through matrix, searching for X
// * Anytime you find an x, branch out looking for matches
// * Check every cardinal direction for subsuquent letters
// * If you reach S, increment counter

const rawData = await fs.readFile("data.txt", "utf-8");

const dataArray = rawData.split("\n");
const matrix = dataArray.map((row) => {
  return row.split("");
});

const xmas = ["X", "M", "A", "S"];
let counter = 0;
const leftBuffer = 3;
const topBuffer = 3;
const rightBuffer = matrix[0].length - 4;
const bottomBuffer = matrix.length - 4;

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === "X") matchSearch(i, j);
  }
}

console.log("Final count: ", counter);

function matchSearch(row, column) {
  if (column >= leftBuffer) checkLeft(row, column, 0);
  if (row >= topBuffer && column >= leftBuffer) checkLeftUp(row, column, 0);
  if (row >= topBuffer) checkUp(row, column, 0);
  if (row >= topBuffer && column <= rightBuffer) checkRightUp(row, column, 0);
  if (column <= rightBuffer) checkRight(row, column, 0);
  if (row <= bottomBuffer && column <= rightBuffer)
    checkRightDown(row, column, 0);
  if (row <= bottomBuffer) checkDown(row, column, 0);
  if (row <= bottomBuffer && column >= leftBuffer)
    checkLeftDown(row, column, 0);
}

function checkLeft(row, column, current) {
  // * x / y - 1
  if (current === 2 && matrix[row][column - 1] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row][column - 1] === xmas[current + 1]) {
    checkLeft(row, column - 1, current + 1);
  }
}

function checkLeftUp(row, column, current) {
  // * x - 1 / y - 1
  if (current === 2 && matrix[row - 1][column - 1] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row - 1][column - 1] === xmas[current + 1]) {
    checkLeftUp(row - 1, column - 1, current + 1);
  }
}

function checkUp(row, column, current) {
  // * x - 1 / y
  if (current === 2 && matrix[row - 1][column] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row - 1][column] === xmas[current + 1]) {
    checkUp(row - 1, column, current + 1);
  }
}

function checkRightUp(row, column, current) {
  // * x - 1 / y + 1
  if (current === 2 && matrix[row - 1][column + 1] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row - 1][column + 1] === xmas[current + 1]) {
    checkRightUp(row - 1, column + 1, current + 1);
  }
}

function checkRight(row, column, current) {
  // * x / y + 1
  if (current === 2 && matrix[row][column + 1] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row][column + 1] === xmas[current + 1]) {
    checkRight(row, column + 1, current + 1);
  }
}

function checkRightDown(row, column, current) {
  // * x + 1 / y + 1
  if (current === 2 && matrix[row + 1][column + 1] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row + 1][column + 1] === xmas[current + 1]) {
    checkRightDown(row + 1, column + 1, current + 1);
  }
}

function checkDown(row, column, current) {
  // * x + 1 / y
  if (current === 2 && matrix[row + 1][column] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row + 1][column] === xmas[current + 1]) {
    checkDown(row + 1, column, current + 1);
  }
}

function checkLeftDown(row, column, current) {
  // * x + 1 / y - 1
  if (current === 2 && matrix[row + 1][column - 1] === xmas[current + 1]) {
    counter += 1;
    return;
  }
  if (matrix[row + 1][column - 1] === xmas[current + 1]) {
    checkLeftDown(row + 1, column - 1, current + 1);
  }
}
