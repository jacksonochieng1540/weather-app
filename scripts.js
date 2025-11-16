async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "YOUR_API_KEY";  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
        document.getElementById("result").innerHTML = "City not found!";
        return;
    }

    document.getElementById("result").innerHTML = `
        🌍 <b>${data.name}</b><br>
        🌡️ Temperature: ${data.main.temp}°C<br>
        🌥️ Weather: ${data.weather[0].description}
    `;
}
