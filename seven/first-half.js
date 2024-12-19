import { promises as fs } from "fs";

const rawData = await fs.readFile("data.txt", "utf-8");

const data = rawData
  .split("\n")
  .map((row) => row.split(" ").map((num) => parseInt(num)));

// * For each row, determine if row[0] can be reached by adding or multiplying remaining row numbers together
// * Loop over rows in data
// * Recursion seems best?
// * At each point in row call function with both + and *
// * If current num is over total, exit recursion
// * If current num is equal to total, add row[0] to running total
// * Need a way to fully end all recursion if total is found once.
// * create a dictionary with row and wether solution has been found
// * Check at beginning of function if row is true in dict. End if so

let counter = 0;
const dict = {};

for (let index in data) {
  dict[index] = false;
}

function sum(a, b) {
  return a + b;
}

function product(a, b) {
  return a * b;
}

for (let [i, row] of data.entries()) {
  function equate(currentTotal, currentArray) {
    if (dict[i] === true) return;
    if (currentTotal > row[0]) return;
    if (currentTotal === row[0]) {
      dict[i] = true;
      counter += row[0];
      return;
    }
    if (currentArray.length === 0) return;

    const newTotalAdd = sum(currentTotal, currentArray[0]);
    const newTotalProd = product(currentTotal, currentArray[0]);

    equate(newTotalAdd, currentArray.slice(1));
    equate(newTotalProd, currentArray.slice(1));
  }

  equate(row[1], row.slice(2));
}

console.log("Final count = ", counter);
