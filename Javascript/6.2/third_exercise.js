// Fetch a user’s details from https://jsonplaceholder.typicode.com/users/3 and log the name and email.

async function fetchUserData() {
    try{
        const response= await fetch("https://jsonplaceholder.typicode.com/users/3");
        let data=await response.json();
        // console.log(data);
         const name=data.name;
        const email=data.email;
           console.log(`Name : ${name}`);
           console.log(`email: ${email}`);
    }catch(error){
console.log(error);
    }
}

fetchUserData();