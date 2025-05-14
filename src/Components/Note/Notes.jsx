import React, { useState, useEffect, useContext } from "react";
import { Notebook, Trash2 } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const Notes = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [note, setNote] = useState(() => localStorage.getItem("note") || "");

  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  const handleDelete = () => {
    setNote("");
    localStorage.removeItem("note");
  };

  return (
    <div className="p-4 rounded-lg shadow-md w-full transition-colors duration-500 hover:scale-105" style={{ backgroundColor:"rgba(255, 255, 255, 0.5)", color: themes[theme].text }}>
      <div className="flex items-center text-xl font-bold mb-2">
        <Notebook className="mr-2"style={{  color: themes[theme].text }} /> Notes
      </div>
      <div className="relative">
        <textarea
          className="w-full p-3 border rounded resize-none outline-none"
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ backgroundColor: "rgba(255,255,255,0.5)", color: themes[theme].text }}
        />
        {note && (
          <button onClick={handleDelete} className="absolute top-2 right-2 text-red-500">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Notes;
