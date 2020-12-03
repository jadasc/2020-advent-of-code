//https://adventofcode.com/2020/day/1

const fs = require("fs");

const INPUT_FILE_PATH = "./input.txt";

var myEntriesMap = new Map();

const parseEntries = (filePath) => {
  fs.readFileSync(filePath, "utf-8")
    .split("\r\n")
    .forEach((token) => {
      let value = parseInt(token);
      if (value === NaN) {
        throw console.error(`Error parsing file. "${token} is not a number.`);
      }
      let occurrences = myEntriesMap.get(value) ?? 0;
      myEntriesMap.set(value, ++occurrences);
    });
};

const validateResult = (values) => {
  return (
    values.length === 3 &&
    values[0] !== values[1] &&
    values[0] !== values[2] &&
    values[1] !== values[2]
  );
};

const findTwoEntries = (entriesMap, sum) => {
  let complement;
  for (const [key] of entriesMap) {
    complement = sum - key;

    if (entriesMap.has(complement)) {
      return [key, complement];
    }
  }
  return [];
};

const findThreeEntries = (entriesMap, sum) => {
  for (const [key] of entriesMap) {
    let result = findTwoEntries(entriesMap, sum - key);
    if (result.length === 2) {
      result.push(key);
      return result;
    }
  }
  return [];
};

// Solve
parseEntries(INPUT_FILE_PATH);

let multiplicands = findThreeEntries(myEntriesMap, 2020);

if (validateResult) {
  let product = multiplicands.reduce(
    (accumulator, currVal) => accumulator * currVal
  );
  console.log(
    `${multiplicands[0]} x ${multiplicands[1]} x ${multiplicands[2]} = ${product}`
  );
} else {
  console.log("No triplets found :(");
}
