// // Exercise 4: Fetch and Display Posts


// // Retrieve posts from https://jsonplaceholder.typicode.com/posts and display the first 5 titles.

// async function getPosts() {
//     try {
//       const response=await fetch(`https://jsonplaceholder.typicode.com/posts`);
//       if(!response.ok){
//         throw new Error("something went wrong!");
//       }
//       const posts=await response.json();
//       return posts;

//     } catch (error) {
//         throw new Error(error);
//     }
// }

// async function displayPostTitles() {
//     const posts=await getPosts();
//     if(!posts) return;

//     const firstFive= posts.slice(0,5);

//     firstFive.forEach((post,index) => {
//         console.log(`${index+1}. ${post.title}`);
//     });
// }
// displayPostTitles();


// api https://jsonplaceholder.typicode.com/posts

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













