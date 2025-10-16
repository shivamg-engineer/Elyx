// Write a function using constraints that only accepts objects with an id property.
function processWithId<T extends {id:string|number}>(obj:T):void{
console.log(`processing object with id ${obj.id}`);
}

processWithId({id:123, name:"shekhar"});
processWithId({id:"E029", name:"shivam"});