import React, { useState } from "react";
import "./../styles/App.css";

const API_KEY = "349b626bd63d094becd7e6cd1ce19e33";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }
    setError("");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError(data.message || "City not found.");
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setCity(""); // clear input after successful fetch
        }
      })
      .catch(() => {
        setError("Failed to fetch weather data.");
        setWeatherData(null);
      });
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        className="search"
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div className="weather">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>
            Temperature: {weatherData.main.temp}°C
          </p>
          <p>
            {weatherData.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default App;
