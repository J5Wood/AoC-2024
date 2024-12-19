// ! Unable to get working solution

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
// * Easy to concat everything on left side of array
// * Need a way to concat current position, with sums and products on remainder of array.

// const data = [
//   [25, 5, 5],
//   [25, 2, 5, 15],
//   [25, 6, 6.5, 2],
//   [25, 5, 5, 5, 5, 5],
//   [123, 1, 2, 3],
//   [810, 4, 4, 3, 7],
//   [1621, 4, 4, 3, 7],
//   [2525, 5, 5, 5, 5, 5, 5, 5],
//   [1234, 23, 69, 1, 142342],
// ];

let counter = 0;
const dict = {};

for (let index in data) {
  dict[index] = 0;
}

function sum(a, b) {
  return a + b;
}

function product(a, b) {
  return a * b;
}

for (let [i, row] of data.entries()) {
  function equate(currentTotal, currentArray) {
    if (dict[i] > 0) return;
    if (currentTotal > row[0]) return;
    if (currentTotal === row[0]) {
      dict[i] += 1;
      counter += row[0];
      return;
    }
    if (currentArray.length === 0) return;

    const newTotalAdd = sum(currentTotal, currentArray[0]);
    const newTotalProd = product(currentTotal, currentArray[0]);
    equate(newTotalAdd, currentArray.slice(1));
    equate(newTotalProd, currentArray.slice(1));

    const possibilities = [];

    // * Make a solutions array
    // * run full evaluate on all paths
    // * once array = [], add current total to possibilities
    // * Now back in original loop, call evaluate with current total concatted with all possibilities
    // * also need to call evaluate with current total, and currentArray[0] concated, passing in remaining array
    function equateForConcat(currentTotal, currentArray) {
      if (dict[i] === true) return;
      if (currentArray.length === 0) {
        possibilities.push(currentTotal);
        return;
      }
      const newTotalAdd = sum(currentTotal, currentArray[0]);
      const newTotalProd = product(currentTotal, currentArray[0]);
      equateForConcat(newTotalAdd, currentArray.slice(1));
      equateForConcat(newTotalProd, currentArray.slice(1));
    }

    equateForConcat(currentArray[0], currentArray.slice(1));
    for (let option of possibilities) {
      equate(parseInt(currentTotal.toString() + option.toString()), []);
    }
    equate(
      parseInt(currentTotal.toString() + currentArray[0].toString()),
      currentArray.slice(1)
    );
  }

  equate(row[1], row.slice(2));
}
console.log(Object.values(dict).includes(2));
console.log("My answer is ", counter);

// import { promises as fs } from "fs";

// const rawData = await fs.readFile("data.txt", "utf-8");

// var answer = 0;

// function main() {
//   processInput();

//   console.log("True answer is", answer);
// }

// function processInput() {
//   const lines = rawData.split("\n");

//   for (const line of lines) {
//     const parts = line.trim().split(":");

//     const target = parseInt(parts.shift());

//     const tokens = parts.shift().trim().split(" ");

//     const operands = [];

//     for (const token of tokens) {
//       operands.push(parseInt(token));
//     }

//     if (checkMath(target, operands, 0, 0, "+")) {
//       answer += target;
//       continue;
//     }
//     if (checkMath(target, operands, 0, 0, "*")) {
//       answer += target;
//       continue;
//     }

//     if (checkMathDeep(target, operands, 0, 0, "+")) {
//       answer += target;
//       continue;
//     }
//     if (checkMathDeep(target, operands, 0, 0, "*")) {
//       answer += target;
//       continue;
//     }
//     if (checkMathDeep(target, operands, 0, 0, "||")) {
//       answer += target;
//       continue;
//     }
//   }
// }

// function checkMath(target, operands, indexOfOperand, result, operator) {
//   const operand = operands[indexOfOperand];

//   if (operator == "+") {
//     result += operand;
//   } else {
//     result *= operand;
//   }

//   if (result > target) {
//     return false;
//   }

//   indexOfOperand += 1;

//   if (indexOfOperand == operands.length) {
//     return target == result;
//   }

//   if (checkMath(target, operands, indexOfOperand, result, "+")) {
//     return true;
//   }
//   if (checkMath(target, operands, indexOfOperand, result, "*")) {
//     return true;
//   }

//   return false;
// }

// function checkMathDeep(target, operands, indexOfOperand, result, operator) {
//   const operand = operands[indexOfOperand];

//   if (operator == "+") {
//     result += operand;
//   } else if (operator == "*") {
//     result *= operand;
//   } else {
//     result = parseInt(result.toString() + operand.toString());
//   }

//   if (result > target) {
//     return false;
//   }

//   indexOfOperand += 1;

//   if (indexOfOperand == operands.length) {
//     return target == result;
//   }

//   if (checkMathDeep(target, operands, indexOfOperand, result, "+")) {
//     return true;
//   }
//   if (checkMathDeep(target, operands, indexOfOperand, result, "*")) {
//     return true;
//   }
//   if (checkMathDeep(target, operands, indexOfOperand, result, "||")) {
//     return true;
//   }

//   return false;
// }

// console.time("execution time");
// main();
// console.timeEnd("execution time"); // 340ms
