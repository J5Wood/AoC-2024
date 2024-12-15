import { promises as fs } from "fs";

const rawData = await fs.readFile("data.txt", "utf-8");

const [ruleSet, pageSet] = rawData.split("\n\n");

const rules = {};
ruleSet.split("\n").forEach((set) => {
  let [k, v] = set.split("|");
  if (rules[k]) {
    rules[k].push(v);
  } else {
    rules[k] = [v];
  }
});

const pages = pageSet.split("\n").map((page) => page.split(","));

// * Double loop backwards through pages
// * Verify at each step that no previous page numbers are in the dictionary for the current number
// * If everything is in the correct order, find center num of that page, add to counter

let counter = 0;
main: for (let page of pages) {
  for (let i = page.length - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (rules[page[i]].includes(page[j])) continue main;
    }
  }
  counter += parseInt(page[Math.trunc(page.length / 2)]);
}

console.log("Final count: ", counter);
