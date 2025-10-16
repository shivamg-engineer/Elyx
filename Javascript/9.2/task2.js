// 2. Processing API Responses
// Task: Extract specific data from an API response and display user names.

async function fetchUserNames() {
    try{
 let response = await fetch("https://jsonplaceholder.typicode.com/users");
 let users = await response.json();
 users.forEach(user => console.log(user.name));
    }catch(error){
       console.error("Error fetching user names:", error);
    }
}

fetchUserNames();