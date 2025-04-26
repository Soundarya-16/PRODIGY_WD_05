const apiKey = "7160d711e6f45a96e776de746fccb259"; // Replace with your API key

async function fetchWeatherByCity() {
    const city = document.getElementById("location-input").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }
    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            },
            error => {
                alert("Geolocation permission denied. Please enter a city manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        document.getElementById("city-name").textContent = `Weather in ${data.name}`;
        document.getElementById("temperature").textContent = `🌡 Temperature: ${data.main.temp}°C`;
        document.getElementById("condition").textContent = `☁ Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;
    } catch (error) {
        alert(error.message);
    }
}
