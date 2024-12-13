import { promises as fs } from "fs";

// * Match valid mul() expressions with regex.
// * Extract nums from mul expressions, multiply and add to counter

let rawData = await fs.readFile("data.txt", "utf8");

const matchedData = rawData.matchAll(/mul\({1}[0-9]{1,3},[0-9]{1,3}\)/gm);

const mulStrings = [];

for (let match of matchedData) {
  mulStrings.push(match[0]);
}

let sum = 0;
for (let equation of mulStrings) {
  const numbers = equation.slice(4, -1).split(",");
  let product = parseInt(numbers[0]) * parseInt(numbers[1]);
  sum += product;
}

console.log("Final sum: ", sum);
