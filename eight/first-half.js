import { promises as fs } from "fs";

const rawData = await fs.readFile("data.txt", "utf-8");
const matrix = rawData.split("\n").map((row) => row.split(""));
const map = Array.from({ length: matrix.length }, () =>
  Array(matrix[0].length).fill(".")
);

// const matrix = [
//   [".", ".", ".", "."],
//   [".", "0", ".", "B"],
//   [".", ".", "0", "B"],
//   [".", ".", ".", "."],
// ];

// * Find all instances of any specific character
// * map out antinodes for each individual character
// * If antinode is within matrix, increment counter

// * Add coordinates of each character to an array?
// * If i is the same, only increment and decrement j
// * if j is the same, increment and decrement i
// * otherwise do both?

const dict = {};
let counter = 0;

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[i][j] !== ".") {
      if (dict[matrix[i][j]]) {
        dict[matrix[i][j]].push([i, j]);
      } else {
        dict[matrix[i][j]] = [[i, j]];
      }
    }
  }
}

// * Loop through each dict entry
// * Check spacial difference between each node
// * Use difference to determine new coordinates
// * If new coords in matix:
// * Add coords to map if not there and increment counter
// * If space already marked, continue

for (let group of Object.values(dict)) {
  for (let i = 0; i < group.length - 1; i++) {
    for (let j = i + 1; j < group.length; j++) {
      const xDiff = group[i][0] - group[j][0];
      const yDiff = group[i][1] - group[j][1];

      const x1 = group[i][0] + xDiff;
      const y1 = group[i][1] + yDiff;

      const x2 = group[j][0] - xDiff;
      const y2 = group[j][1] - yDiff;

      if (matrix[x1] && matrix[x1][y1]) {
        if (map[x1][y1] === ".") {
          map[x1][y1] = "#";
          counter += 1;
        }
      }
      if (matrix[x2] && matrix[x2][y2]) {
        if (map[x2][y2] === ".") {
          map[x2][y2] = "#";
          counter += 1;
        }
      }
    }
  }
}
console.log(map);
console.log("Final Count: ", counter);
