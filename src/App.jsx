import React, { useContext } from "react";
import "./App.css";
import "./index.css";

import ActivityTracker from "./Components/ActivityTracker/ActivityTracker";
import Todo from "./Components/ToDo/Todo";
import Bookmark from "./Components/Bookmark/Bookmark";
import Time from "./Components/Time/Time";
import Greeting from "./Components/Greetings/Greeting";
import Weather from "./Components/Weather/Weather";
import Searchbar from "./Components/Btn/Searchbar";
import Settings from "./Setting/Settings";
import Notes from "./Components/Note/Notes";
import ThemeProvider, { ThemeContext } from "./Context/ThemeContext";
import SocialButtons from "./Components/Btn/SocialButtons";
import AiBtn from "./Components/Btn/AiBtn";

function AppContent() {
  const { theme, themes } = useContext(ThemeContext);

  return (
    <div
      style={{ backgroundColor: themes[theme]?.bg, color: themes[theme]?.text }}
      className="flex min-h-screen flex-col p-6 transition-colors duration-500"
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <Greeting />
        <div className="flex gap-4">
          <Todo />
          <Bookmark />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="flex flex-col px-20 py-9 gap-5 mt-10">
          <Time />
          <Searchbar />
        </div>

        {/* Right Column */}
        <div className="flex flex-col px-20 py-10  gap-4 ">
          {/* Weather + Activity Tracker Side by Side */}
          <div className="grid grid-cols-2 gap-4 ">
            <div className="p-0 border rounded-3xl ">
              <Weather />
            </div>
            <div className="p-0 border rounded-3xl ">
              <ActivityTracker />
            </div>
          </div>

          {/* Notes below them, same half width */}
          <div className="p-0 border rounded-lg shadow-md">
            <Notes />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center mt-auto p-4">
        <div className="p-3 text-white rounded-lg">
          <AiBtn />
        </div>
        <div className="flex justify-center gap-2">
          <SocialButtons />
        </div>
        <div className="p-3 rounded-lg">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
