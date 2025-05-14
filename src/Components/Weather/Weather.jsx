import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import clearGif from "../Weather/icon/sunny.gif";
import rainGif from "../Weather/icon/rain.gif";
import nightgif from "../Weather/icon/night.gif";
import cloudsgif from "../Weather/icon/cloudy.gif";
import cloudynightgif from "../Weather/icon/cloudy-night.gif";
 import snowGif from "../weather/icon/snow.gif";
import drizzlegif from "../Weather/icon/drizzle.gif";
import stormgif from "../Weather/icon/storm.gif";
import windgif from "../Weather/icon/wind.gif";
import sungif from "../Weather/icon/sunny.gif";

const Weather = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apikey = import.meta.env.VITE_WEATHER_API_KEY;
  const apiurl = "https://api.openweathermap.org/data/2.5/weather";

  const weatherIcons = {
  Clear: clearGif,
  Thunderstorm: stormgif,
  Drizzle: drizzlegif,
  Rain: rainGif,
  Snow: snowGif,
  Clouds: cloudsgif,
  Mist: windgif,
  Smoke: windgif,
  Haze: windgif,
  Dust: windgif,
  Fog: windgif,
  Sand: windgif,
  Ash: windgif,
  Squall: windgif,
  Tornado: stormgif,
  sun: sungif,
};
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

  // Define mainWeather from weather data
  const mainWeather = weather?.weather?.[0]?.main;

  return (
    <div
      className="p-4 rounded-3xl shadow-md w-full h-70 transition-colors duration-500 hover:scale-105"
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
          <div className="flex justify-center my-2">
  {mainWeather && (
    <div
      className="w-14 h-14 flex items-center justify-center rounded-full"
      style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.5)", // Card ka BG se match
        overflow: 'hidden' // Rounded ka effect rahe
      }}
    >
      <img
        src={weatherIcons[mainWeather] ?? clearGif}
        alt={mainWeather}
        className="w-15 h-15 object-cover mix-blend-multiply"
      />
    </div>
  )}
</div>
          <p className="text-lg font-extrabold">{weather.main.temp}°C</p>
          <p>Weather: {capitalizeWords(weather.weather[0].description)}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
