const fetchUser2 = (): Promise<string> => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            resolve("Data fetched successfully!!!");

        }, 1000)
    });
}

const fetchPosts = (): Promise<string> => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            const success = Math.random() > 0.5;

            if (success) {
                resolve("Post fetched successfully!!!");
            } else {
                reject("Failed to fetch post!!");
            }
        }, 1500)
    })
}

const fetchUserAndPosts = async (): Promise<void> => {
    try {
        const [user, posts] = await Promise.all([
            fetchUser2(),
            fetchPosts()
        ]);

        console.log("Both API calls completed");
        console.log("User:", user);
        console.log("Post:", posts);
    } catch (error) {
        console.error("❌ Error fetching data:", error);

    }
}
fetchUserAndPosts();