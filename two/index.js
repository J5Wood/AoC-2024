import { promises as fs } from "fs";

let rawData = await fs.readFile("data.txt", "utf8");
const data = rawData.split("\n").map((row) => {
  return row.split(" ").map((num) => parseInt(num));
});

// *find safe reports in data
// * For each row of data, loop through array
// * Verify numbers are either only incrasing, or only decreasing
// * also verify numbers don't jump by more than 3
// * If row is safe, increment safe counter

let safe = 0;

main: for (let row of data) {
  let current = row[0];
  let increment = false;
  let decrement = false;
  for (let i = 1; i < row.length; i++) {
    if (Math.abs(row[i] - current) > 3 || row[i] === current) {
      let pass = relevel(row);
      if (pass) safe += 1;
      continue main;
    }
    if (row[i] > current) increment = true;
    if (row[i] < current) decrement = true;
    current = row[i];
  }
  if (increment === true && decrement == true) {
    let pass = relevel(row);
    if (pass) safe += 1;
    continue main;
  }
  safe += 1;
}

function relevel(row) {
  let pass = false;
  for (let i in row) {
    let n = parseInt(i);
    let r = row.slice(0, n).concat(row.slice(n + 1));
    reattempt(r);
  }

  function reattempt(row) {
    let current = row[0];
    let increment = false;
    let decrement = false;
    for (let i = 1; i < row.length; i++) {
      if (Math.abs(row[i] - current) > 3 || row[i] === current) {
        return;
      }
      if (row[i] > current) increment = true;
      if (row[i] < current) decrement = true;
      current = row[i];
    }
    if (increment === true && decrement == true) return;
    pass = true;
  }

  return pass;
}
console.log("Result: ", safe);
