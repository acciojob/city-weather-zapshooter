import React, { useState } from "react";
import "./../styles/App.css";

const API_KEY = "349b626bd63d094becd7e6cd1ce19e33";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setWeather(null);
    if (!query) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        return;
      }
      setWeather({
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        country: data.sys.country
      });
    } catch (e) {
      setError("Failed to fetch weather.");
    }
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        className="search"
        type="text"
        placeholder="Enter a city"
        value={query}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      {error && <div style={{ color: "red", margin: "12px" }}>{error}</div>}
      {weather && (
        <div className="weather">
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.desc}
              style={{ verticalAlign: "middle" }}
            />
            <span style={{ fontSize: "2rem" }}>{weather.temp}°C</span>
          </div>
          <div style={{ textTransform: "capitalize" }}>
            {weather.desc}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
