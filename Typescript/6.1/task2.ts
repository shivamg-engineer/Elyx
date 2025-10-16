
// const fetchData = (): Promise<string> => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {

//             const success = Math.random() > 0.5;
//             if (success) {
//                 resolve("Data fetched successfully");
//             } else {
//                 reject("Failed to fetch data");
//             }

//         }, 2000);
//     });
// };
import { fetchData } from "./task1.ts";

const fetchDataAsync = async (): Promise<void> => {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


fetchDataAsync();