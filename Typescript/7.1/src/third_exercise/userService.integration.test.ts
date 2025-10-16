import * as apiService from "./apiService";
import { getUser } from "./userService";

describe('Integration test :userService & apiService', () => {
    it("should fetch user and return greeting", async () => {

        jest.spyOn(apiService, 'fetchUserFromAPI').mockResolvedValue({
            id: 42,
            name: "mocked User",
        });
   

    const greeting = await getUser();

    expect(greeting).toBe('Hello, mocked User!');
    expect(apiService.fetchUserFromAPI).toHaveBeenCalledTimes(1);
    // Restore original implementation after test
    jest.restoreAllMocks();

     });

})