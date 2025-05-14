import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext"; // Import theme context

const Time = ({ is24Hour }) => {
  const { theme, themes } = useContext(ThemeContext); // Get theme settings

  const formatTime = (hours, minutes, is24Hour) => {
    if (is24Hour) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    } else {
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
    }
  };

  const getCurrentTime = (is24Hour) => {
    const now = new Date();
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return {
      date: now.toLocaleDateString("en-US", options),
      time: formatTime(now.getHours(), now.getMinutes(), is24Hour),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  };

  const [currentTime, setCurrentTime] = useState(() => getCurrentTime(is24Hour));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime(is24Hour));
    }, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div
      className="time-card shadow-md flex flex-col justify-center items-center w-full max-w-sm h-auto p-6 rounded-full transition-colors duration-500 hover:scale-105 "
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        color: themes[theme].text,
      }}
    >
      <span className="date-span text-lg">{currentTime.date}</span>
      <span className="time-span text-4xl font-extrabold" style={{ color: themes[theme].button }}>
        {currentTime.time}
      </span>
      <span className="time-zone-span text-[18px] text-white">{currentTime.timeZone}</span>
    </div>
  );
};

export default Time;
