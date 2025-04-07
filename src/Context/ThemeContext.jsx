import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
 
  const themes = {
    red: { bg: "#fdbdbd", text: "#411b1b", button: "#ec4343" },
    yellow: { bg: "#ffed80", text: "#2f2707", button: "#d1a93d" },
    green: { bg: "#c7e4c7", text: "#1b411b", button: "#5cba5c" },
    cyan: { bg: "#9cefef", text: "#08354b", button: "#09b2b4" },
    pink: { bg: "#f9c8d6", text: "#411b28", button: "#ec5e78" },
    purple: { bg: "#dac2e8", text: "#2d1b3e", button: "#9563b5" },
    orange: { bg: "#ffd8b2", text: "#412b1e", button: "#ec844d" },
    brown: { bg: "#dfc28d", text: "#16100d", button: "#705347" },
    silver: { bg: "#c6c6c6", text: "#333333", button: "#9e9e9e" },
    grey: { bg: "#ffccbf", text: "#441730", button: "#9c29ba" },
    dark: { bg: "#171615", text: "#d6d6d6", button: "#212121" },
  
    // New Dark-based Themes
    
  };
  

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("selectedTheme")) || "red"
  );

  const [inSettings, setInSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem("selectedTheme", JSON.stringify(theme));
  }, [theme]);

  const updateTheme = (newTheme) => {
    console.log("Changing theme to:", newTheme)
    if (inSettings) {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, updateTheme, themes, inSettings, setInSettings }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
