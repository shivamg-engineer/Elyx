import { id } from "../../jest.config";
import { fetchUser } from "./apiService";

describe('fetchUser error handling',()=>{

    it('resolves with user data when no error',async()=>{
        await expect(fetchUser()).resolves.toEqual({id:1, name:'John Doe'});
    })

      it('rejects with error when failure occurs', async () => {
    await expect(fetchUser(true)).rejects.toThrow('Failed to fetch user');
  });


  // Alternative style using try/catch
//   it('catches error thrown by fetchUser', async () => {
//     try {
//       await fetchUser(true);
//     } catch (error) {
//       expect(error).toBeInstanceOf(Error);
//       expect(error).toHaveProperty('message', 'Failed to fetch user');
//     }
//   });
})