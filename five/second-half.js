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

// * Remove bad pages from list
// * Loop through bad pages again
// * When out of order is found, reorder list
// * Out of order number moves to current position
// * Shift current to the left
// * Continue until page has been ordered
// * Grab middle value of ordered page, add to counter

let counter = 0;

const badPages = [];

main: for (let page of pages) {
  for (let i = page.length - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (rules[page[i]].includes(page[j])) {
        badPages.push(page);
        continue main;
      }
    }
  }
}

for (let page of badPages) {
  for (let i = page.length - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (rules[page[i]].includes(page[j])) {
        page = page
          .slice(0, j)
          .concat(page.slice(j + 1, i + 1))
          .concat(page[j])
          .concat(page.slice(i + 1));
      }
    }
  }
  counter += parseInt(page[Math.trunc(page.length / 2)]);
}

console.log("Final count: ", counter);
