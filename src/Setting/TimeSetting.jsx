import React, { useState } from "react";

const TimeSetting = ({ is24Hour, setIs24Hour }) => {
  return (
    <div className="settings-container flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Time Settings</h2>

      {/* Toggle button only */}
      <button
        onClick={() => setIs24Hour(!is24Hour)}
        className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-700 transition-all"
      >
        Toggle {is24Hour ? "12-Hour" : "24-Hour"} Format
      </button>
    </div>
  );
};

export default TimeSetting;

