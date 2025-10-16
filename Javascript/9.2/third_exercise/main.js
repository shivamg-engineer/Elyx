const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

let users = [];

async function fetchUser() {
    try{
        const res= await fetch("https://jsonplaceholder.typicode.com/users");
        if(!res.ok){
            throw new Error("Failed to fetch users");
        }
        users= await res.json();
        console.log(users);

    }catch(error){
     console.log(error.message);
     resultsList.innerHTML="<li>Error loading user</li>"
    }
}

function displayMatches(searchTerm){

    const term=searchTerm.toLowerCase();

    const filtered= users.filter(user=>
        user.name.toLowerCase().includes(term)   
    );

    if(filtered.length ===0){
        resultsList.innerHTML="<li>No users found</li>";
        return;
    }

    resultsList.innerHTML=filtered.map(user => `<li>${user.name}</li>`).join("");
}

searchInput.addEventListener("input",(e)=>{
    displayMatches(e.target.value);
})

fetchUser();