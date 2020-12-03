//https://adventofcode.com/2020/day/1

const fs = require("fs");

const INPUT_FILE_PATH = "./input.txt";

const parseEntries = (filePath) => {
  return fs
    .readFileSync(filePath, "utf-8")
    .split("\r\n")
    .map((token) => {
      let value = parseInt(token);
      if (value == NaN) {
        throw console.error(`Error parsing file. "${token} is not a number.`);
      }
      return value;
    });
};

const findEntries = (sum) => {
  let entries = parseEntries(INPUT_FILE_PATH);

  let entriesMap = new Map();
  let complement;
  for (let entry of entries) {
    complement = sum - parseInt(entry);

    if (entriesMap.has(complement)) {
      return [entry, complement];
    }

    entriesMap.set(entry, {});
  }
  return [];
};

// Solve
let multiplicands = findEntries(2020);
console.log(multiplicands);

if (multiplicands.length == 2) {
  console.log(
    `${multiplicands[0]} x ${multiplicands[1]} = ${
      multiplicands[0] * multiplicands[1]
    }`
  );
} else {
  console.log("No pairs found :(");
}
