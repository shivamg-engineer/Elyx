interface User {
    name: string,
    age: number,
    email?: string //If it's not provided, that's totally fine.
}
const user: User = {
    name: "Alice",
    age: 22,
    email: "alice@gmail.com"
}
const user1: User = {
    name: "Alice",
    age: 22
}

console.log(user);
console.log(user1);