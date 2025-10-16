// 7. Function That Filters and Transforms Data
// Given an array of student objects, return only the names of students who scored above 80 using filter() and map().

const students = [
  { name: "Alice", score: 90 },
  { name: "Bob", score: 75 },
  { name: "Charlie", score: 85 },
  { name: "David", score: 60 },
];

const filtered=students.filter(students=>students.score>80).map((students)=>students.name);
console.log(filtered);