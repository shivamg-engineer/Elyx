// Exercise 4: Implementing Intersection Types


// TODO:

// Define two types and merge them into a single object type.

type Person={
    name:string,
    age:number
};

type Employee={
employeeId:number,
department:string
};

type EmployeeDetails = Person & Employee;

const employee: EmployeeDetails={
    name:"Alice",
    age:30,
    employeeId:101,
    department:"HR"
}
console.log(employee);