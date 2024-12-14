import { promises as fs } from "fs";

// * Turn data into matrix
// * Loop through matrix, searching for M
// * Check for "AS" in diagonal directions.
// * If found, use A as anchor to check other diagonal for an M and an S

const rawData = await fs.readFile("data.txt", "utf-8");

const dataArray = rawData.split("\n");
const matrix = dataArray.map((row) => {
  return row.split("");
});

const mas = ["M", "A", "S"];
let counter = 0;
const leftBuffer = 2;
const topBuffer = 2;
const rightBuffer = matrix[0].length - 3;
const bottomBuffer = matrix.length - 3;

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === "M") matchSearch(i, j);
  }
}

console.log("Final count: ", counter / 2);

function matchSearch(row, column) {
  if (row >= topBuffer && column >= leftBuffer) checkLeftUp(row, column, 0);
  if (row >= topBuffer && column <= rightBuffer) checkRightUp(row, column, 0);
  if (row <= bottomBuffer && column <= rightBuffer)
    checkRightDown(row, column, 0);
  if (row <= bottomBuffer && column >= leftBuffer)
    checkLeftDown(row, column, 0);
}

function checkLeftUp(row, column, current) {
  // * x - 1 / y - 1
  if (current === 1 && matrix[row - 1][column - 1] === mas[current + 1]) {
    checkForX(row + 1, column - 1, row - 1, column + 1);
    return;
  }
  if (matrix[row - 1][column - 1] === mas[current + 1]) {
    checkLeftUp(row - 1, column - 1, current + 1);
  }
}

function checkRightUp(row, column, current) {
  // * x - 1 / y + 1
  if (current === 1 && matrix[row - 1][column + 1] === mas[current + 1]) {
    checkForX(row - 1, column - 1, row + 1, column + 1);
    return;
  }
  if (matrix[row - 1][column + 1] === mas[current + 1]) {
    checkRightUp(row - 1, column + 1, current + 1);
  }
}

function checkRightDown(row, column, current) {
  // * x + 1 / y + 1
  if (current === 1 && matrix[row + 1][column + 1] === mas[current + 1]) {
    checkForX(row - 1, column + 1, row + 1, column - 1);
    return;
  }
  if (matrix[row + 1][column + 1] === mas[current + 1]) {
    checkRightDown(row + 1, column + 1, current + 1);
  }
}

function checkLeftDown(row, column, current) {
  // * x + 1 / y - 1
  if (current === 1 && matrix[row + 1][column - 1] === mas[current + 1]) {
    checkForX(row - 1, column - 1, row + 1, column + 1);
    return;
  }
  if (matrix[row + 1][column - 1] === mas[current + 1]) {
    checkLeftDown(row + 1, column - 1, current + 1);
  }
}

function checkForX(rowOne, columnOne, rowTwo, columnTwo) {
  const one = matrix[rowOne][columnOne];
  const two = matrix[rowTwo][columnTwo];
  if (one === "M" && two === "S") counter += 1;
  if (one === "S" && two === "M") counter += 1;
}
