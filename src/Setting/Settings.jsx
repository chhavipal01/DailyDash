import React, { useContext, useEffect, useRef } from "react";
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
  const panelRef = useRef(null);

  // Handle click outside to close settings panel
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inSettings &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setInSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inSettings]);

  return (
    <div className="p-4 fixed right-5 bottom-5 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setInSettings(!inSettings)}
        className="p-3 rounded-full shadow-lg transition-all hover:scale-105"
        style={{
          backgroundColor: currentTheme.button,
          color: "white",
        }}
        aria-label="Toggle Settings"
      >
        {inSettings ? <X size={24} /> : <SettingsIcon size={24} />}
      </button>

      {/* Settings Panel */}
      {inSettings && (
        <div
          ref={panelRef}
          className="mt-4 p-5 border rounded-2xl shadow-lg transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: themes[theme].bg,
            color: currentTheme.text,
            borderColor: currentTheme.accent || "#ccc",
          }}
        >
          <h2 className="text-xl font-semibold mb-3">Select a Theme:</h2>
          <ThemeSelector />
          <TimeSetting />

        </div>
      )}
    </div>
  );
};

export default Settings;
