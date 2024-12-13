import { promises as fs } from "fs";

// * Split data between do and dont statements
// * Perform same steps as first-half to evaluate and sum mul expressions

let rawData = await fs.readFile("data.txt", "utf8");

const doStatements = rawData.split("do()");

const validStatements = [];
for (let statement of doStatements) {
  validStatements.push(statement.split("don't()")[0]);
}

const validData = validStatements.join("");

const matchedData = validData.matchAll(/mul\({1}[0-9]{1,3},[0-9]{1,3}\)/gm);

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
