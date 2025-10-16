// Exercise 5: Enhance the User Profile

// TODO: Add a role property to the UserProfile type and make it a union of "admin" | "user" | "guest".

type UserProfile={
     username: string;
  email: string;
  role:"admin" | "user" | "guest"; // Union type for role
};

const adminUser:UserProfile={
    username:"admin@123",
    email:"admin@gmail.com",
    role:"admin"
}

const regularUser: UserProfile = {
  username: "johndoe",
  email: "john@example.com",
  role: "user"
};

const guestUser: UserProfile = {
  username: "visitor",
  email: "guest@example.com",
  role: "guest"
};  

function describeUser(user:UserProfile):string{
 return `${user.username} is logged in as ${user.role}.`;
}


console.log(describeUser(adminUser));