async function fetchData() {
    try {

        let response = await fetch("https://jsonplaceholder.typicode.com/posts/invalid-endpoint");
        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`);

        }   
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Fetch error:", error);
    }

}

fetchData();