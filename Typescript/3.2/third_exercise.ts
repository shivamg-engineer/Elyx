// Implement a generic interface for a key-value store.

interface KeyValueStore<K, V> {
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    remove(key: K): void;
    has(key: K): boolean;
    keys(): K[];
    values(): V[];
}

class SimpleStore<K, V> implements KeyValueStore<K, V> {
    private store = new Map<K, V>();

    set(key: K, value: V): void {
        this.store.set(key, value);

    }
    get(key: K,): V | undefined {
        return this.store.get(key);
    }

    remove(key:K):void{
     this.store.delete(key);
    }
    has(key: K): boolean{
       return  this.store.has(key);
    }
    keys(): K[]{
        return Array.from(this.store.keys());
    }
     values(): V[] {
    return Array.from(this.store.values());
  }

}


const userStore = new SimpleStore<string, { name: string; age: number }>();

userStore.set("user1", { name: "Alice", age: 25 });
console.log(userStore.get("user1"));  // { name: "Alice", age: 25 }
console.log(userStore.has("user2"));  // false