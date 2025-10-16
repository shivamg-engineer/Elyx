
const user = {
    name: "Alice",
    age: 25,
    job: "Developer",
    location: "Mumbai"
};

function generateProfile(user) {
    return `<div class="profile">
                <h2>${user.name}</h2>
                <p>Age: ${user.age}</p>
                <p>Job: ${user.job}</p>
                <p>Location: ${user.location}</p>
            </div>`;
}


console.log(generateProfile(user));
