import { fetchAsyncValue } from "./fetch-async.helper";

export const CustomProvider = {
    provide: 'ASYNC_VALUE',
    useFactory: async () => {//useFactory = "create the value yourself using a function"
        const value = await fetchAsyncValue();
        return value;
    }
}