import React, { useState } from 'react';
import 'regenerator-runtime/runtime';

const API_KEY = '9fadd7fe702df1756101a89462ef75fa'; 

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try { 
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setQuery('');  // Clear input after successful fetch
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
