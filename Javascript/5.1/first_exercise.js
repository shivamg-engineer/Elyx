// Create an object representing a student with properties name, age, grade, and subjects (array).
// Modify the grade property.
// Add a new property school.
// Delete the age property.
// Print the final object.

const student={
    name:"sia",
    age:22,
    grade:"A",
    subjects:[]
}
student.subjects.push("Maths","science");

student.grade="B";
student.school="DY Patil College";

delete student.age;
console.log(student);