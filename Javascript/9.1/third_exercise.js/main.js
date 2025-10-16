import { fetchWeather } from "../second_exercise.js";

// async function getCityWeather() {
//     try {
//         const response = await fetchWeather("London");
//         console.log(response);
//     } catch (error) {
//         throw new Error(error);

//     }
// }

const city="London";
fetchWeather(city);