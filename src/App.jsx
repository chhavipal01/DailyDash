import React, { useContext } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
import GoogleAppsButton from "./Components/Btn/GoogleAppsButton";

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
        <div className="fixed top-5 right-6 z-50 flex gap-2">
          <Todo />
          <Bookmark />
          <GoogleAppsButton/>
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
        <div className="flex flex-col px-20 py-10 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[280px]">
            <div className="h-full">
              <Weather />
            </div>
            <div className="h-full">
              <ActivityTracker />
            </div>
          </div>

          <div className="p-0 rounded-3xl shadow-md">
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
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* Future: <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
