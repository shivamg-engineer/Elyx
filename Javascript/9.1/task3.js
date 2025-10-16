async function getWeather(city) {
    try {

        let apiKey = "YOUR_API_KEY";
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        let data = await response.json();
        console.log(`Weather in ${city}: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }

}

getWeather("London");