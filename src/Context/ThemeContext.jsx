import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
 
 const themes = {
  // 🌈 Primary Themes
  red: { bg: "#fdbdbd", text: "#411b1b", button: "#ec4343" },
  yellow: { bg: "#ffed80", text: "#2f2707", button: "#d1a93d" },
  green: { bg: "#c7e4c7", text: "#1b411b", button: "#5cba5c" },
  cyan: { bg: "#9cefef", text: "#08354b", button: "#09b2b4" },
  pink: { bg: "#f9c8d6", text: "#411b28", button: "#ec5e78" },
  purple: { bg: "#dac2e8", text: "#2d1b3e", button: "#9563b5" },
  orange: { bg: "#ffd8b2", text: "#412b1e", button: "#ec844d" },
  silver: { bg: "#c6c6c6", text: "#333333", button: "#9e9e9e" },
 
  // 🌟 Secondary Themes (Unique Tones)
  teal: { bg: "#b2d8d8", text: "#163a3a", button: "#4da6a6" },
  navy: { bg: "#a6bcd0", text: "#1a2e45", button: "#27496d" },
  maroon: { bg: "#d4a5a5", text: "#3d0c0c", button: "#a32626" },
  charcoal: { bg: "#3e3e3e", text: "#e0e0e0", button: "#595959" },
  azure: { bg: "#bfe9ff", text: "#103f5c", button: "#2a9df4" },
  indigo: { bg: "#c5cbe1", text: "#1c1f38", button: "#4b4e82" },
  mint: { bg: "#d0f0c0", text: "#234d20", button: "#7bbf6a" },
  sand: { bg: "#f4e4d7", text: "#5e4630", button: "#d2a679" },

  // ✅ Corrected case for pureWhite
  pureWhite: { bg: "#ffffff", text: "#000000", button: "#2e2e2e" },
  black: { bg: "#000000", text: "#ffffff", button: "#333333" },

  // 🎨 Light Shades (Unique ones kept)
  lightRed: { bg: "#ffe5e5", text: "#5a1e1e", button: "#f28b8b" },
  lightGreen: { bg: "#e6f5e6", text: "#2c5c2c", button: "#89d789" },
  lightCyan: { bg: "#e0f9fa", text: "#165a6d", button: "#56d4d6" },
  lightPink: { bg: "#ffe8ef", text: "#6d2f3b", button: "#f1a1b5" },
  lightPurple: { bg: "#f3e8ff", text: "#462f5e", button: "#b79cd9" },
  lightOrange: { bg: "#fff3e4", text: "#6d422b", button: "#f4a261" },
  lightBlue: { bg: "#e0f0ff", text: "#1a4d7f", button: "#7db3ff" },
  lightMint: { bg: "#e8f9f1", text: "#2a5c4e", button: "#8fd9b6" }
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