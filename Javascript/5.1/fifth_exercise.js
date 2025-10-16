// Exercise 5: Real-World Application

// Create an object representing an e-commerce cart.
// Implement methods to addItem, removeItem, and calculateTotal.
// Demonstrate usage by adding and removing items and logging the final cart total.


const cart={
items:[],
    addItem(item){
        this.items.push(item)
    },
    removeItem(itemName){
     const initialLength=this.items.length;
     this.items= this.items.filter(item => item.name !== itemName);

     if(this.items.length < initialLength){
        console.log(`${itemName} removed from the cart.`);
     }else{
         console.log(`${itemName} not found in the cart.`);
     }
    },

    calculateTotal(){
        const total=this.items.reduce((sum,item)=> sum+item.price,0);
        return total.toFixed(2);
    }
}

cart.addItem({ name: "Laptop", price: 999.99 });
cart.addItem({ name: "Headphones", price: 199.99 });
cart.addItem({ name: "Mouse", price: 49.99 });

cart.removeItem("Headphones");

console.log(`Final cart total: $${cart.calculateTotal()}`);

console.log("Items in cart:", cart.items);