const apiKey = "d4b4ba421df8c80d65d8c4c01d8cbd2b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Use string literals to refer to the element IDs
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");

const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
    const location = locationInput.value; // Fixed typo: "ariavalue" should be "value"
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Weather data not available for the entered location.");
        }
        return response.json();
    })
    .then((data) => {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)} °C`; // Corrected variable name
        descriptionElement.textContent = data.weather[0].description;
    })
    .catch((error) => {
        console.error("Error fetching weather data", error);
        locationElement.textContent = "Error fetching data";
        temperatureElement.textContent = "";
        descriptionElement.textContent = "";
    });
}
