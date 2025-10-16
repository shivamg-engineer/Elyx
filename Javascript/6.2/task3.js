async function getJoke() {
    try {
        let response = await fetch("https://official-joke-api.appspot.com/random_joke");
        let joke = await response.json();
        // console.log(joke);
        console.log(`${joke.setup}- ${joke.punchline}`);
    } catch (error) {
        console.log(error);
    }
}

getJoke();