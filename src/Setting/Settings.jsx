import React, { useContext } from "react";
import ThemeSelector from "../Context/ThemeSelector";
import { ThemeContext } from "../Context/ThemeContext";
import TimeSetting from "../Setting/TimeSetting";
import { Settings as SettingsIcon, X } from "lucide-react";

const Settings = () => {
  const { inSettings, setInSettings, theme, themes } = useContext(ThemeContext);

  if (!setInSettings) {
    console.error("setInSettings is undefined. Make sure ThemeContext.Provider wraps your app.");
    return null;
  }

  const currentTheme = themes[theme] || {};

  return (
    <div className="p-4 fixed right-4 bottom-4 z-50">
      {/* Toggle Icon Button */}
      <button
        onClick={() => setInSettings(!inSettings)}
        className="p-2 rounded-full shadow-md transition-all"
        style={{
          backgroundColor: currentTheme.button,
          color: currentTheme.text,
        }}
        aria-label="Toggle Settings"
      >
        {inSettings ? <X size={20} /> : <SettingsIcon size={20} />}
      </button>

      {/* Settings Panel */}
      {inSettings && (
        <div
          className="mt-4 p-4 border rounded-lg shadow-lg transition-all"
          style={{
            backgroundColor: currentTheme.card,
            color: currentTheme.text,
            borderColor: currentTheme.accent || "#ccc",
          }}
        >
          <h2 className="text-lg font-semibold mb-2">Select a Theme:</h2>
          <ThemeSelector />
          <TimeSetting />
        </div>
      )}
    </div>
  );
};

export default Settings;
