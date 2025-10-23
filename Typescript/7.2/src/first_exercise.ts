class User {
  constructor(public name: string, private age: number) {
    this.name=name;
    this.age=age;
  }
  getAge() {
    return this.age;
  }
}
const user = new User("Alice", 25); // Error!
console.log(user.getAge());
