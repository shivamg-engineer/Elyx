import * as apiService from './apiService';
import { getUser } from './userService';

describe('Integration test: userService & apiService', () => {
    // This will run before each test in this describe block
    beforeEach(() => {
        jest.restoreAllMocks(); // Reset any mocks before each test
    })

    // This will run after each test in this describe block
    afterEach(() => {

    })

    it('should fetch user and return greeting', async () => {
    
    jest.spyOn(apiService, 'fetchUserFromAPI').mockResolvedValue({
        id: 42,
        name: "mocked user",
    })
    const greeting = await getUser();

    expect(greeting).toBe('Hello, mocked user!');
    expect(apiService.fetchUserFromAPI).toHaveBeenCalledTimes(1);
    });
});