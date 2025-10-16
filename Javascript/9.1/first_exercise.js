async function fetchUser() {

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/2`);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
async function showUser() {
    const userData = await fetchUser(); // wait for the data to load
    if (userData) {
        const { name, email } = userData;
        console.log(name, email);
    }
}

showUser();