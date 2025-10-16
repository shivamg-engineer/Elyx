export async function fetchWeather(city) {
    if (!city) {
        throw new Error("City name is required.");
    }
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = response.json();

    } catch (error) {
        throw new Error("Failed to fetch weather data.");
    }
}