class Product1 {
    name:string;
    price:number;
    constructor(name:string, price:number) {
        this.name = name;
        this.price = price;
    }
}

class Electronics extends Product1 {
    warranty:string;
    constructor(name:string, price:number, warranty:string) {
        super(name, price);
        this.warranty = warranty;
    }
}
class Clothing extends Product1{

}
class Books extends Product1{
    
}
const phone = new Electronics("iPhone", 120000, "1 Year");
console.log(phone);
