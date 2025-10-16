async function getUsersWithErrorHandling(): Promise<User[] | string> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data: User[] = await response.json();
        return data;
    } catch (error) {
        return `Error: ${ (error as Error).message }`;
    }
}
getUsersWithErrorHandling().then(result => console.log(result));