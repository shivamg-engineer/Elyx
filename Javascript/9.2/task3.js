async function loginUser(username, password) {
  try {
    let response = await fetch("https://api.example.com/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    let data = await response.json();
    console.log("Login successful:", data);
  } catch (error) {
    console.error("Login failed:", error);
  }
}
loginUser("testUser", "password123");
