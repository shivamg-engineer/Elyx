// Fetch a user’s details from https://jsonplaceholder.typicode.com/users/3 and log the name and email.

async function fetchJoke() {
    try{
        const response= await fetch("https://official-joke-api.appspot.com/random_joke");
        let Joke=await response.json();
        console.log(`${Joke.setup}: ${Joke.punchline}`);

    }catch(error){
console.log(error);
    }
}

fetchJoke();