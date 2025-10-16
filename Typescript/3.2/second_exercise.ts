class DataStorage1<T extends Record<string,any>>{
    private items:T[]=[];

    constructor(private identifierKey:keyof T){
        
    }
    addItem(item: T): void {
        this.items.push(item);
    }

    removeItem(item: T): void {
        this.items = this.items.filter(
            i => i[this.identifierKey] !== item[this.identifierKey]
        );
    }

    getItems(): T[] {
        return [...this.items];
    }

    // ✅ New method to return the last item
    getLastItem(): T | undefined {
        return this.items.length > 0 ? this.items[this.items.length - 1] : undefined;
    }   
}

type User1 = { id: number; name: string };

const storage = new DataStorage1<User1>('id');

storage.addItem({ id: 1, name: "Alice" });
storage.addItem({ id: 2, name: "Bob" });

console.log(storage.getLastItem()); 