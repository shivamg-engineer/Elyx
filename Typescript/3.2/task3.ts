// class DataStorage<T>{
//     private items: T[]=[];

//     addItem(item:T){
//        this.items.push(item);
//     }
//     removeItem(item:T){
//     this.items= this.items.filter((i)=>i != item);
//     }
//     getItems():T[]{
//       return [...this.items];
//     }
// }

// const numberStorage= new DataStorage<number>();
// numberStorage.addItem(34);
// numberStorage.addItem(44);

// console.log(numberStorage.getItems());

// Challenge:

// Modify the DataStorage class to support objects while preserving type safety.

class DataStorage<T extends Record<string, any>> {
    private items: T[] = [];

   constructor(private identifierKey: keyof T) {}

    addItem(item:T):void{
        this.items.push(item);
    }
    removeItem(item: T):void{
        this.items= this.items.filter(
            i => i[this.identifierKey]!== item[this.identifierKey]
        );
    }

     getItems(): T[] {
        return [...this.items];
    }
}

type User = {
    id: number;
    name: string;
};  



const userStorage = new DataStorage<User>('id');

userStorage.addItem({ id: 1, name: "Alice" });
userStorage.addItem({ id: 2, name: "Bob" });

console.log(userStorage.getItems()); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]

userStorage.removeItem({ id: 1, name: "Alice" });

console.log(userStorage.getItems()); // [{ id: 2, name: "Bob" }]