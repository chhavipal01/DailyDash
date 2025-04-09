import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const Weather = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apikey = "b80f63525271b0c855528df460e1e9ee";
  const apiurl = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiurl}?q=${city}&appid=${apikey}&units=metric`);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    if (!query.trim()) {
      alert("Please enter a city name");
      return;
    }
    fetchWeatherByCity(query.trim());
    setQuery("");
  };

  useEffect(() => {
    fetchWeatherByCity("Delhi");
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") search();
  };

  const capitalizeWords = (str) =>
    str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";

  const weatherImages = {
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    Rain: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    Drizzle: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
    Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    Mist: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  };

  return (
    <div
      className="p-4 rounded-xl shadow-md w-full h-70"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        color: themes[theme].text,
      }}
    >
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="w-full p-3 border rounded focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search city"
          style={{
            backgroundColor: themes[theme].inputBg,
            color: themes[theme].inputText,
          }}
        />
        <button
          onClick={search}
          className="px-4 text-white rounded hover:opacity-90 transition-all"
          style={{ backgroundColor: themes[theme].button }}
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={
              weatherImages[weather.weather[0].main] ||
              "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
            }
            alt={weather.weather[0].description}
            className="w-10 h-10 mx-auto my-2"
          />
          <p className="text-lg font-extrabold">{weather.main.temp}°C</p>
          <p>Weather: {capitalizeWords(weather.weather[0].description)}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
