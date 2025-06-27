import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

const quotes = [
  {
    text: "We must balance conspicuous consumption with conscious capitalism.",
    author: "Kevin Kruse",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
  },
];

export default function RandomQuote() {
  const { theme, themes } = useContext(ThemeContext);
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div
      className="relative w-full p-6 rounded-3xl shadow-md transition-transform duration-500 hover:scale-105"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)", // semi-transparent like other cards
        color: themes[theme]?.text,
      }}
    >
      <p className="text-lg font-medium leading-relaxed tracking-wide">
        {quote.text}
      </p>

      <div
        className="absolute -bottom-4 right-4 px-4 py-1 rounded-full text-sm font-semibold shadow-md"
        style={{
          backgroundColor: themes[theme]?.button,
          color: "#fff",
        }}
      >
        {quote.author}
      </div>
    </div>
  );
}
