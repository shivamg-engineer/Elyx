interface Person {
  name: string;
  age: number;
}

interface Employee1 extends Person {
  employeeId: number;
  department: string;
}

const emp: Employee1 = {
  name: "Alice",
  age: 30,
  employeeId: 12345,
  department: "IT"
};

console.log(emp);