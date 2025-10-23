class Cache1 {
  private static cache: { [key: string]: any } = {};

  static set(key: string, value: any): void {
    Cache1.cache[key] = value;
  }

  static get(key: string): any | undefined {
    return Cache1.cache[key];
  }

  static delete(key: string): void {
    delete Cache1.cache[key];
  }

  static clear(): void {
    Cache1.cache = {};
  }
}

//adding
Cache1.set("shivam","e029"); 
Cache1.set("sandeep","e026");

//consoling
console.log(Cache1.get("shivam")); //e029
console.log(Cache1.get("sandeep")); //e026

//deleing sandeep
Cache1.delete("sandeep");

console.log(Cache1.get("sandeep"));  //undefined  //trying to console deleted data

//clearing
Cache1.clear();

//consoling after clearing Cache
console.log(Cache1.get("sandeep")); //undefined
console.log(Cache1.get("shivam")); //undefined
