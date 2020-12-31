/*****************************
 * --- Day 23: Crab Cups --- *
 *****************************/

const INPUT_TEST = 389125467;
const INPUT = 925176834;

const PICK_UP_COUNT = 3;

/** Classes */

class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.count = 0;
    }

    // insert a node and make it the head
    add(node) {
        if (this.head === null) {
            this.head = node;
            this.head.next = node;
        } else {
            node.next = this.head.next;
            this.head.next = node;
            this.head = node;
        }

        this.count++;
    }

    // print linked list
    print() {
        let values = [];
        let curr = this.head;

        do {
            values.push(curr.value);
            curr = curr.next;
        } while (curr !== this.head);

        console.log(values.join("->"));
    }

    // return node with matching value
    get(value) {
        if (this.head.value === value) {
            return this.head;
        }

        let curr = this.head;
        do {
            curr = curr.next;
        } while (curr.next !== this.head && curr.value !== value);

        if (curr === this.head) {
            return null;
        }
        return curr;
    }

    // return cup values in order starting from the head
    getValues() {
        const values = new Set();

        if (this.head !== null) {
            let curr = this.head;

            do {
                values.add(curr.value);
                curr = curr.next;
            } while (curr !== this.head);
        }

        return values;
    }

    // remove nodes from the linked list. The n adjacent nodes from the start node will be removed
    // return the head node for the extracted adjacent nodes
    extract(start, count) {
        // find start's preceding node
        let prev = this.head;
        while (prev.next !== start) {
            prev = prev.next;
        }

        // extract nodes
        let end = start;
        for (let i = 0; i < count - 1; i++) {
            end = end.next;
        }
        let next = end.next;
        end.next = null;

        // rejoin linked list
        prev.next = next;

        this.count -= count;

        return start;
    }

    // insert nodes in linked list after the start node
    emplace(start, emplaceHead) {
        let prev = emplaceHead;
        let count = 1;
        while (prev.next !== null) {
            prev = prev.next;
            count++;
        }
        prev.next = start.next;
        start.next = emplaceHead;

        this.count += count;
    }

    // make the head point to the current head's next node
    next() {
        this.head = this.head.next;
    }

    // return the head's next node
    getNext() {
        return this.head.next;
    }
}

/** Functions */

const getLabels = (head) => {
    let curr = head;
    const values = new Set();
    while (curr !== null && curr.next !== head) {
        values.add(curr.value);
        curr = curr.next;
    }

    return values;
};

function play(input) {
    const values = input.toString().split("").map(Number);

    const cups = new CircularLinkedList();

    for (const value of values) {
        cups.add(new Node(value, null));
    }

    for (let i = 0; i < 100; i++) {
        cups.next();
        executeMove(cups);
    }

    console.log([...cups.getValues()].join(""));
}

const executeMove = (cups) => {
    // pick up cups
    const pickedUpCups = cups.extract(cups.getNext(), PICK_UP_COUNT);
    const pickedUpLabels = getLabels(pickedUpCups);

    // select destination cup
    let destinationCupLabel = cups.head.value;

    do {
        destinationCupLabel--;
        if (destinationCupLabel < 1) {
            destinationCupLabel = cups.count + PICK_UP_COUNT;
        }
    } while (pickedUpLabels.has(destinationCupLabel));

    const destinationCup = cups.get(destinationCupLabel);

    // place picked up cups
    cups.emplace(destinationCup, pickedUpCups);
};

play(INPUT);
