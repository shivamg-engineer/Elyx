    async function fetchUser() {
  return { id: 1, name: "John Doe" };
}

test("fetch user data", async()=>{
    // await expect(fetchUser()).resolves.toHaveProperty("name", "John Doe");
    return fetchUser().then(user=>{
        expect(user).toHaveProperty("name", "John Doe");
    });
})