
async function getPosts() {

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const posts = await response.json();
        return posts;

    } catch (error) {
        throw new Error(error);
    }
}
async function getTitles() {
    try {
        const data = await getPosts();
        const firstFive = data.slice(0, 5);
        firstFive.forEach(element => {
            console.log(element.title);
        });

    } catch (error) {
        throw new Error(error);
    }
}
getTitles();













