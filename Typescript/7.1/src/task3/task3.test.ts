const fetchData=jest.fn(()=>Promise.resolve("success"));

test("mock an api call", async()=>{
    await expect(fetchData()).resolves.toBe("success");
});