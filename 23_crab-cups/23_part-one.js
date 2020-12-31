/*****************************
 * --- Day 23: Crab Cups --- *
 *****************************/

const INPUT_TEST = 389125467; // max label will be the # of digits since the labels are sequential
const INPUT = 925176834;

const PICK_UP_COUNT = 3;

class Node {
    constructor(label, next) {
        this.label = label;
        this.next = next;
    }
}

// remove nodes from the linked list. The n adjacent nodes from the start node will be removed
// return the head node for the extracted adjacent nodes
function extract(start, count) {
    // extract nodes
    const extractedHead = start.next;
    let end = start;
    for (let i = 0; i < count; i++) {
        end = end.next;
    }
    let next = end.next;
    end.next = null;

    // rejoin linked list
    start.next = next;
    this.count -= count;
    return extractedHead;
}

// insert nodes in linked list after the start node
function emplace(start, emplaceHead) {
    let prev = emplaceHead;
    while (prev.next !== null) {
        prev = prev.next;
    }
    prev.next = start.next;
    start.next = emplaceHead;
}

// return cup labels in order starting from the head
const getLabels = (head) => {
    let curr = head;
    const labels = new Set();
    while (curr !== null && curr.next !== head) {
        labels.add(curr.label);
        curr = curr.next;
    }

    return labels;
};

// return node with matching value
const findCup = (head, label) => {
    if (head.label === label) {
        return head;
    }

    let curr = head;
    while (curr.next !== head && curr.label !== label) {
        curr = curr.next;
    }

    if (curr === head) {
        return null;
    }
    return curr;
};

const executeMove = (selectedCup, maxCupLabel) => {
    // pick up cups
    const pickedUpCups = extract(selectedCup, PICK_UP_COUNT);
    const extractedLabels = getLabels(pickedUpCups);

    // select destination cup
    let destinationCupLabel = selectedCup.label;

    do {
        destinationCupLabel--;
        if (destinationCupLabel < 1) {
            destinationCupLabel = maxCupLabel;
        }
    } while (extractedLabels.has(destinationCupLabel));

    const destinationCup = findCup(selectedCup, destinationCupLabel);

    // place picked up cups
    emplace(destinationCup, pickedUpCups);

    return selectedCup.next;
};

// print (circular) linked list
function print(head) {
    let values = [];

    let curr = head;
    do {
        values.push(curr.label);
        curr = curr.next;
    } while (curr !== null && curr !== head);

    console.log(values.join("->"));
}

function play(input) {
    const cups = input.toString().split("").map(Number);

    let prev, next;
    let head;

    for (const cup of cups) {
        next = new Node(cup, null);

        if (!prev) {
            head = next;
        } else {
            prev.next = next;
        }

        prev = next;
    }

    // create circular list
    prev.next = head;

    let selectedCup = head;
    for (let i = 0; i < 100; i++) {
        selectedCup = executeMove(selectedCup, cups.length);
    }

    print(findCup(selectedCup, 1));
}

play(INPUT);
