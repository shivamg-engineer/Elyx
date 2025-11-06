// Modify a given Promise-based function to use async/await with proper error handling.

//function fetchUserData(userId: number) {
//     return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Failed to fetch user data");
//             }
//             return response.json();
//         }).then(data => {
//             console.log("User Data:", data);
//         }).catch(err =>
//             console.log("Error:", err));
// }

// fetchUserData(1);

// Converted to async/await
async function fetchUserData(userId: number) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            throw new Error("failed to fetch!")
        }
        const data = await response.json();
        console.log("User data:", data);
    } catch (err) {
        console.log(err);
    }
}
fetchUserData(1);
