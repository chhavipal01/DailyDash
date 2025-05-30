import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const ThemeSelector = () => {
  const { theme, updateTheme, themes } = useContext(ThemeContext);

  return (
    <div className="max-w-sm max-h-64 overflow-auto p-4 border rounded-2xl shadow-md hover:shadow-lg bg-white">
      <div className="grid grid-cols-5 gap-2">
        {Object.keys(themes).map((themeKey) => (
          <label key={themeKey} className="cursor-pointer">
            <input
              type="radio"
              name="color"
              value={themeKey}
              checked={theme === themeKey}
              onChange={() => updateTheme(themeKey)}
              className="hidden"
            />
            <div
              className={`w-10 h-10 rounded-full border-2 ${
                theme === themeKey ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: themes[themeKey].button }}
            ></div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
