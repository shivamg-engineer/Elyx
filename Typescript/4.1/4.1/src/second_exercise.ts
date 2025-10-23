class Person {
name:string;
age:number;

constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): void {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
  }

}
class Student extends Person{
grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age); // call parent constructor
    this.grade = grade;
  }

  study(): void {
    console.log(`${this.name} is studying for grade ${this.grade}.`);
  }

  // override introduce()
  introduce(): void {
    console.log(`Hi, I'm ${this.name}, a student in grade ${this.grade}.`);
  }
}

class Teacher extends Person{
 subject: string;

  constructor(name: string, age: number, subject: string) {
    super(name, age);
    this.subject = subject;
  }

  teach(): void {
    console.log(`${this.name} is teaching ${this.subject}.`);
  }

  // override introduce()
  introduce(): void {
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