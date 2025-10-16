type Owner = {
    name: string;
    licenseNumber: string;
};


type Car = {
    model: string;
    year: number;
    owner: Owner;// nested object
}


const myCar: Car = {
    model: "Toyota Corolla",
    year: 2020,
    owner: {
        name: "John Doe",
        licenseNumber: "AB1234567"
    }
}

console.log(myCar);