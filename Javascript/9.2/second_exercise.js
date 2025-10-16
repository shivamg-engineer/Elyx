// https://jsonplaceholder.typicode.com/users


async function getUserDetails() {

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const users = await response.json();
        return users;

    } catch (error) {
        throw new Error(error);
    }
}
async function getEmails() {
    try {
        const users = await getUserDetails();
        users.forEach(user => {
            console.log(user.email);
        });

    } catch (error) {
        throw new Error(error);
    }
}
getEmails();