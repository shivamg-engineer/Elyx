"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
    }
}
class Student extends Person {
    grade;
    constructor(name, age, grade) {
        super(name, age); // call parent constructor
        this.grade = grade;
    }
    study() {
        console.log(`${this.name} is studying for grade ${this.grade}.`);
    }
    // override introduce()
    introduce() {
        console.log(`Hi, I'm ${this.name}, a student in grade ${this.grade}.`);
    }
}
class Teacher extends Person {
    subject;
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
    teach() {
        console.log(`${this.name} is teaching ${this.subject}.`);
    }
    // override introduce()
    introduce() {
        console.log(`Hello, I'm ${this.name}, and I teach ${this.subject}.`);
    }
}
const person = new Person("Amit", 40);
const student = new Student("Shivam", 18, "12th");
const teacher = new Teacher("Mr. Verma", 35, "Mathematics");
person.introduce();
student.introduce();
teacher.introduce();
student.study();
teacher.teach();
//# sourceMappingURL=second_exercise.js.map