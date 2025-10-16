type Address={
street:string,
city:string
}

type UserProfile={
    id:number,
    name: string,
    email ?:string,
    address:Address
}

const user3: UserProfile={
    id:1,
    name:"Alice",
     address: { street: "123 Main St", city: "New York" },
}
console.log(user3);