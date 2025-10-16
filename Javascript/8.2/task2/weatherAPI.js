// weatherAPI.js
export async function fetchWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
  const data = await response.json();
  return data;
}
    