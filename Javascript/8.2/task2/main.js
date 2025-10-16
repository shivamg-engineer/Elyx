import { fetchWeather } from "./weatherAPI";

async function displayWeather(city){
    const weather=await fetchWeather(city);
    console.log(`Weather in ${city}: ${weather.weather[0].description}`);
}

displayWeather("Mumbai");