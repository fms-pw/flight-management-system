const seatLetters = {
  First: ['A', 'D', 'G', 'K'],
  Business: ['A', 'C', 'D', 'F', 'H', 'K'],
  Economy: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K']
};

const seatTypeMap = {
  A: "window", K: "window",
  C: "aisle", H: "aisle",
  D: "aisle", F: "aisle",
  B: "middle", E: "middle", G: "middle", J: "middle"
};

let seats = [];

// First Class (1-2-1)
for (let row = 1; row <= 2; row++) {
  seatLetters.First.forEach(letter => {
    seats.push({
      number: `${row}${letter}`,
      Class: "First",
      seatType: seatTypeMap[letter] || "middle"
    });
  });
}

// Business Class (2-2-2)
for (let row = 3; row <= 7; row++) {
  seatLetters.Business.forEach(letter => {
    seats.push({
      number: `${row}${letter}`,
      Class: "Business",
      seatType: seatTypeMap[letter] || "middle"
    });
  });
}

// Economy Class (3-4-3)
for (let row = 10; row <= 44; row++) {
  seatLetters.Economy.forEach(letter => {
    seats.push({
      number: `${row}${letter}`,
      Class: "Economy",
      seatType: seatTypeMap[letter] || "middle"
    });
  });
}
console.log(seats);
