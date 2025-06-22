import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
 const themes = {
  // Primary Themes
  red: { bg: "#fdbdbd", text: "#411b1b", button: "#ec4343" },
  yellow: { bg: "#ffed80", text: "#2f2707", button: "#d1a93d" },
  green: { bg: "#c7e4c7", text: "#1b411b", button: "#5cba5c" },
  cyan: { bg: "#9cefef", text: "#08354b", button: "#09b2b4" },
  pink: { bg: "#f9c8d6", text: "#411b28", button: "#ec5e78" },
  purple: { bg: "#dac2e8", text: "#2d1b3e", button: "#9563b5" },
  orange: { bg: "#ffd8b2", text: "#412b1e", button: "#ec844d" },
  silver: { bg: "#c6c6c6", text: "#333333", button: "#9e9e9e" },

  // Secondary Themes (Unique Tones)
  teal: { bg: "#b2d8d8", text: "#163a3a", button: "#4da6a6" },
  navy: { bg: "#a6bcd0", text: "#1a2e45", button: "#27496d" },
  maroon: { bg: "#d4a5a5", text: "#3d0c0c", button: "#a32626" },
  charcoal: { bg: "#3e3e3e", text: "#e0e0e0", button: "#595959" },
  azure: { bg: "#bfe9ff", text: "#103f5c", button: "#2a9df4" },
  indigo: { bg: "#c5cbe1", text: "#1c1f38", button: "#4b4e82" },
  mint: { bg: "#d0f0c0", text: "#234d20", button: "#7bbf6a" },
  sand: { bg: "#f4e4d7", text: "#5e4630", button: "#d2a679" },

  // Cute Themes
  babyPink: { bg: "#ffe0eb", text: "#5e2c39", button: "#ff8fb1" },
  peach: { bg: "#ffe5b4", text: "#6d3f1d", button: "#ffb380" },
  lavender: { bg: "#f3e5f5", text: "#4b2c5e", button: "#c08cd7" },
  skyBlue: { bg: "#d6f0ff", text: "#264b66", button: "#8ecae6" },
  buttercup: { bg: "#fff7b2", text: "#4d420a", button: "#ffe066" },
  cottonCandy: { bg: "#ffd6f6", text: "#5a294e", button: "#ff9ada" },
  softLilac: { bg: "#ede5f5", text: "#4e3a5c", button: "#bba3d0" },
  pistachio: { bg: "#e2f7dc", text: "#2e5b3a", button: "#a6d89c" },

  // Actionable Themes
  focusBlue: { bg: "#e6f0ff", text: "#003366", button: "#0055cc" },
  alertRed: { bg: "#ffe5e5", text: "#660000", button: "#cc0000" },
  successGreen: { bg: "#e6ffe6", text: "#145214", button: "#28a745" },
  energyOrange: { bg: "#fff3e0", text: "#7f3d00", button: "#ff9100" },
  warningAmber: { bg: "#fff8e1", text: "#6b4a00", button: "#ffc107" },
  calmGray: { bg: "#f5f5f5", text: "#333333", button: "#757575" },
  infoCyan: { bg: "#e0f7fa", text: "#004d4d", button: "#00acc1" },

  // Special
  pureWhite: { bg: "#ffffff", text: "#000000", button: "#2e2e2e" },
  black: { bg: "#000000", text: "#ffffff", button: "#333333" },

  // 🔥 Neon / Opera GX Style Themes 🔥
  neonRed: {
    bg: "#0f0f0f", text: "#ff4b5c", button: "#ff4b5c"
  },
  neonGreen: {
    bg: "#0f0f0f", text: "#00ff9f", button: "#00ff9f"
  },
  neonPurple: {
    bg: "#0f0f0f", text: "#c77dff", button: "#c77dff"
  },
  neonBlue: {
    bg: "#0f0f0f", text: "#3ec9ff", button: "#3ec9ff"
  },
  neonYellow: {
    bg: "#0f0f0f", text: "#fff200", button: "#fff200"
  }
};


  const getStoredTheme = () => {
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme && storedTheme !== "null" && storedTheme !== "undefined") {
      return JSON.parse(storedTheme);
    }
    return "red"; // Default theme agar kuch nahi mila toh
  };

  const [theme, setTheme] = useState(getStoredTheme);
  const [inSettings, setInSettings] = useState(false);

  useEffect(() => {
    if (theme) {
      console.log("Theme stored in localStorage:", theme);
      localStorage.setItem("selectedTheme", JSON.stringify(theme));
    }
  }, [theme]);

  const updateTheme = (newTheme) => {
    if (inSettings) {
      console.log("Theme Updated to:", newTheme);
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
