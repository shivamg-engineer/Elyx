// 1. Making API Requests
// Task: Fetch data from a public API and display it in the console.


async function fetchUsers() {
    // https://jsonplaceholder.typicode.com/users
    try{
     let response=await fetch("https://jsonplaceholder.typicode.com/users");
     let users=await response.json();
     console.log(users);    
    }catch(error){
    console.log(error);
    }
}
fetchUsers();