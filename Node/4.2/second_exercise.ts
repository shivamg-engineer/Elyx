// Exercise 2: Implement a POST Request

// TODO:
// Send a POST request to create a new user (/users).
// Use an interface to define the request body structure.

interface NewUser {
  name: string;
  email: string;
  age: number;
}

const createUser = async (url: string, user: NewUser): Promise<void> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/JSON", // telling server it's JSON
      },
      body: JSON.stringify(user), //convert obj ot json string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log("User created:", responseData);
  } catch (error) {
    console.log(error);
  }
};

const newUser:NewUser={
    name:"elyx",
    email:"elyx@elyx.com",
    age:30
}

createUser("https://jsonplaceholder.typicode.com/users", newUser);