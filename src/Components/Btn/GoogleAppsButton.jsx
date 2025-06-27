import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Mail, Youtube, FileBox, FileText, Video, Image,
  Calendar, MapPin, Newspaper, Grid3X3, User,
  Search, Music2, Play, Languages,
} from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const apps = [
  { name: "Account", url: "https://myaccount.google.com", icon: User },
  { name: "Search", url: "https://www.google.com", icon: Search },
  { name: "YouTube", url: "https://youtube.com", icon: Youtube },
  { name: "Gmail", url: "https://mail.google.com", icon: Mail },
  { name: "YTMusic", url: "https://music.youtube.com", icon: Music2 },
  { name: "Maps", url: "https://maps.google.com", icon: MapPin },
  { name: "Play", url: "https://play.google.com", icon: Play },
  { name: "Drive", url: "https://drive.google.com", icon: FileBox },
  { name: "Photos", url: "https://photos.google.com", icon: Image },
  { name: "Translate", url: "https://translate.google.com", icon: Languages },
  { name: "Calendar", url: "https://calendar.google.com", icon: Calendar },
  { name: "Meet", url: "https://meet.google.com", icon: Video },
];

const GoogleAppsButton = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Enter
  useEffect(() => {
    const closeOnEnter = (e) => {
      if (e.key === "Enter") setOpen(false);
    };
    if (open) window.addEventListener("keydown", closeOnEnter);
    return () => window.removeEventListener("keydown", closeOnEnter);
  }, [open]);

  return (
    <div className="fixed top-5 right-6 z-50">
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg flex items-center justify-center w-10 h-10 transition hover:bg-opacity-80"
        style={{
          backgroundColor: themes[theme].button,
          color: themes[theme].text,
        }}
      >
        <Grid3X3 size={28} strokeWidth={2.75} color="#ffffff" />
      </button>

      {/* App Grid Popup */}
      {open && (
        <div
          ref={popupRef}
          className="absolute top-12 right-0 grid grid-cols-3 gap-4 p-4 rounded-2xl shadow-xl"
          style={{
            backgroundColor: themes[theme].bg,
            color: themes[theme].text,
            minWidth: "240px",
          }}
        >
          {apps.map(({ name, url, icon: Icon }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center w-16 h-16 rounded-md hover:scale-105 transition text-xs"
              style={{
                backgroundColor: themes[theme].button + "22", // transparent
              }}
            >
              <Icon size={20} color={themes[theme].text} />
              <span className="mt-1 text-center">{name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleAppsButton;
