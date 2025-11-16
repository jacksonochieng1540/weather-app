const API_KEY = "093b5271ce561f0120be94dd0b9bfb94";

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
        getCurrentWeather(city);
        getForecast(city);
    }
});

// CURRENT WEATHER
async function getCurrentWeather(city) {
    const url = 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp + "°C";
    document.getElementById("desc").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;

    const icon = data.weather[0].icon;
    document.getElementById("weather-icon").src = 
        `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

// 5-DAY FORECAST
async function getForecast(city) {
    const API_KEY = "093b5271ce561f0120be94dd0b9bfb94"; 
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";

    // API returns data every 3 hours → pick 1 forecast per day
    const daily = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    daily.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric"
        });

        const icon = day.weather[0].icon;
        const temp = day.main.temp;

        const card = `
            <div class="forecast-day">
                <strong>${date}</strong>
                <img src="https://openweathermap.org/img/wn/${icon}.png">
                <div>${temp}°C</div>
            </div>
        `;

        forecastDiv.innerHTML += card;
    });
}
