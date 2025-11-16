async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "093b5271ce561f0120be94dd0b9bfb94";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
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
    } catch (error) {
        document.getElementById("result").innerHTML = "Error fetching data";
        console.error(error);
    }
}
