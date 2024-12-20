import { promises as fs } from "fs";

const rawData = await fs.readFile("data.txt", "utf-8");

const data = rawData
  .split("\n")
  .map((row) => row.split(" ").map((num) => parseInt(num)));

// ? Strangely, answer is correct on AoC site without having to perform any equateForConcat functions. With test data however, tests don't pass when operations need to be performed on both sides of an array before concatting in the middle. Left in for more complete functionality, but for my official data set the algorithm runs much faster when the equateForConcat section is taken out.

const testData = [
  [25, 5, 5],
  [25, 2, 5, 15],
  [25, 6, 6.5, 2],
  [25, 5, 5, 5, 5, 5],
  [123, 1, 2, 3],
  [810, 4, 4, 3, 7],
  [1621, 4, 4, 3, 7],
  [2525, 5, 5, 5, 5, 5, 5, 5],
];

// * For each row, determine if row[0] can be reached by adding or multiplying remaining row numbers together
// * Loop over rows in data
// * Recursion seems best?
// * At each point in row call function with both + and *
// * If current num is over total, exit recursion
// * If current num is equal to total, add row[0] to running total
// * Need a way to fully end all recursion if total is found once.
// * create a dictionary with row and wether solution has been found
// * Check at beginning of function if row is true in dict. End if so

function main() {
  let counter = 0;
  const dict = {};

  for (let index in data) {
    dict[index] = false;
  }

  for (let [i, row] of data.entries()) {
    function equate(currentTotal, currentArray) {
      if (dict[i] === true) return;
      if (currentTotal > row[0]) return;
      if (currentTotal === row[0] && currentArray.length === 0) {
        dict[i] = true;
        counter += row[0];
        return;
      }
      if (currentArray.length === 0) return;

      const newSum = currentTotal + currentArray[0];
      const newProduct = currentTotal * currentArray[0];

      equate(newSum, currentArray.slice(1));
      equate(newProduct, currentArray.slice(1));

      // * Easy to concat everything on left side of array
      // * Need a way to concat current position, with sums and products on remainder of array.
      // * Make a solutions array
      // * run full evaluate on all paths
      // * once array = [], add current total to possibilities
      // * Now back in original loop, call evaluate with current total concatted with all possibilities
      // * also need to call evaluate with current total, and currentArray[0] concated, passing in remaining array

      const possibilities = [];

      function equateForConcat(currentTotal, currentArray) {
        if (currentArray.length === 0) {
          possibilities.push(currentTotal);
          return;
        }
        const newSum = currentTotal + currentArray[0];
        const newProduct = currentTotal * currentArray[0];

        equateForConcat(newSum, currentArray.slice(1));
        equateForConcat(newProduct, currentArray.slice(1));
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
  console.log("Total = ", counter);
}

console.time("execution time");
main();
console.timeEnd("execution time"); // 18ms
