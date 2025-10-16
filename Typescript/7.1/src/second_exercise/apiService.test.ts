import * as apiService from "./apiService";

describe("API Service",()=>{
     it('should return mocked user data', async () => {
    // Mock the getUser function to return fake data
    jest.spyOn(apiService, 'getUser').mockResolvedValue({
      id: 42,
      name: 'Mocked User',
    });

 // Call the mocked function
    const user = await apiService.getUser();

    // Validate the mocked response
    expect(user).toEqual({
      id: 42,
      name: 'Mocked User',
    });

    // Optional: verify the mock was called exactly once
    expect(apiService.getUser).toHaveBeenCalledTimes(1);
  });
});