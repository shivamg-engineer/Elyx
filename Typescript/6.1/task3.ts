// Task 3: Fetching API Data with Type Safety

// Objective: Fetch JSON data from an API and ensure type safety.

type User={
    id:number;
    name:string;
    email:string
};

const fetchUser = async (id:number):Promise<void>=>{
    const response=await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if(!response.ok){
        throw new Error("Failed to fetch data");
    }
    return response.json();
}

fetchUser(1).then(user => console.log(user)).catch(error=>console.error());
