export async function fetchWeather(city) {
    try {
         if (!city) {
      throw new Error("City name is required.");
    }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
        if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }   
        const data = await response.json();

        return data;
    }catch(error){
       console.error("Error fetching weather:", error.message);
    }
 
}

async function getCityWeather() {
   try{

    const city = "InvalidCityName123"; 
     const weather = await fetchWeather(city);
    console.log("Weather data:", weather);
   }catch (error) {
    console.log("Something went wrong:", error.message);
  }

}
getCityWeather();

console.log("further code");