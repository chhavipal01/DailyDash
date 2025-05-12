import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import LordIcon from "../LordIcon";

const Weather = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apikey = "b80f63525271b0c855528df460e1e9ee";
  const apiurl = "https://api.openweathermap.org/data/2.5/weather";

  const weatherIcons = {
    Clear: "https://cdn.lordicon.com/rjzlnunf.json",
    Clouds: "https://cdn.lordicon.com/slkvcfos.json",
    Rain: "https://cdn.lordicon.com/lzgqzxrq.json",
    Drizzle: "https://cdn.lordicon.com/koyszqnh.json",
    Thunderstorm: "https://cdn.lordicon.com/udwhdpod.json",
    Snow: "https://cdn.lordicon.com/xirobkro.json",
    Mist: "https://cdn.lordicon.com/qghrdngw.json",
    Smoke: "https://cdn.lordicon.com/qghrdngw.json",
    Haze: "https://cdn.lordicon.com/qghrdngw.json",
    Fog: "https://cdn.lordicon.com/qghrdngw.json",
    Dust: "https://cdn.lordicon.com/qghrdngw.json",
    Sand: "https://cdn.lordicon.com/qghrdngw.json",
    Ash: "https://cdn.lordicon.com/qghrdngw.json",
    Squall: "https://cdn.lordicon.com/qghrdngw.json",
    Tornado: "https://cdn.lordicon.com/qghrdngw.json",
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

  return (
    <div
      className="p-4 rounded-3xl shadow-md w-full  h-70"
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
            <LordIcon
              src={weatherIcons[weather.weather[0].main] || weatherIcons["Clear"]}
              width={80}
              height={80}
              trigger="loop"
            />
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
