import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

// Weather icons
import clearGif from "../Weather/icon/Sunny.gif";
import rainGif from "../Weather/icon/rain.gif";
import nightGif from "../Weather/icon/night.gif";
import cloudsGif from "../Weather/icon/cloudy.gif";
import cloudyNightGif from "../Weather/icon/cloudy-night.gif";
import snowGif from "../Weather/icon/snow.gif";
import drizzleGif from "../Weather/icon/drizzle.gif";
import stormGif from "../Weather/icon/storm.gif";
import windGif from "../Weather/icon/wind.gif";

const Weather = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apikey = import.meta.env.VITE_WEATHER_API_KEY;
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
    fetchWeatherByCity("Delhi"); // Default city
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") search();
  };

  const capitalizeWords = (str) =>
    str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";

  const currentTime = Math.floor(Date.now() / 1000);
  const isDayTime = weather
    ? currentTime > weather.sys.sunrise && currentTime < weather.sys.sunset
    : true;

  const mainWeather = weather?.weather?.[0]?.main;

  const weatherIcons = {
    Clear: isDayTime ? clearGif : nightGif,
    Clouds: isDayTime ? cloudsGif : cloudyNightGif,
    Thunderstorm: stormGif,
    Drizzle: drizzleGif,
    Rain: rainGif,
    Snow: snowGif,
    Mist: windGif,
    Smoke: windGif,
    Haze: windGif,
    Dust: windGif,
    Fog: windGif,
    Sand: windGif,
    Ash: windGif,
    Squall: windGif,
    Tornado: stormGif,
  };

  return (
    <div
      className="h-full w-full p-4 rounded-3xl shadow-md transition-transform duration-500 hover:scale-105"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        color: themes[theme].text,
      }}
    >
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none"
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
          className="px-3 text-white rounded hover:opacity-90 transition-all"
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
          <h2 className="text-xl font-bold">
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="flex justify-center my-2">
            {mainWeather && (
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/50 overflow-hidden">
                <img
                  src={weatherIcons[mainWeather] ?? clearGif}
                  alt={mainWeather}
                  className="w-14 h-14 object-cover mix-blend-multiply"
                />
              </div>
            )}
          </div>
          <p className="text-lg font-extrabold">{weather.main.temp}°C</p>
          <p>Weather: {capitalizeWords(weather.weather[0].description)}</p>
          <p className="text-sm">Humidity: {weather.main.humidity}%</p>
          <p className="text-sm">Min: {weather.main.temp_min}°C | Max: {weather.main.temp_max}°C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
