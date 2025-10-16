// Exercise 2: Filtering and Finding Data

// Create an array of objects representing students with name and marks.
// Use find() to get the student with the highest marks.
// Use some() to check if any student scored below 40.
// Use every() to verify if all students scored above 30.

const students = [
    { name: "Alice", score: 85 },
    { name: "Bob", score: 92 },
    { name: "Charlie", score: 78 },
    { name: "Diana", score: 99 },
    { name: "Eve", score: 67 }

]

const highestMarks=Math.max(...students.map(student=>student.score));

const topStudent =students.find(student=> student.score===highestMarks);
const hasPassed=students.some((student)=>student.score>=40);
const allPassed=students.every((student)=>student.score>=30);

console.log(highestMarks,topStudent,hasPassed,allPassed);