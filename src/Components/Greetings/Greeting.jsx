import React, { useContext, useState, useRef } from 'react';
import { ThemeContext } from "../../Context/ThemeContext";
import { getDatabase, ref, set } from "firebase/database";
import firebase from "../../Firebase";

const Greeting = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [userName, setUserName] = useState("Champion"); // Default or from user data
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  

  const saveToFirebase = (name) => {
    const db = getDatabase(firebase.app);
    set(ref(db, 'users/' + userName), {
      username: name
    });
    console.log(`Username "${name}" saved to Firebase!`);
  };

  const handleNameClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 100); // Focus input after rendering
  };

  const handleInputBlur = () => {
    if (!userName.trim()) return;
    setIsEditing(false);
    saveToFirebase(userName);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputRef.current?.blur(); // trigger blur to save
    }
  };

  if (!theme) return null;

  return (
    <div
      className="fixed top-3 left-4 p-[10px] text-2xl"
      style={{ backgroundColor: themes[theme].bg, color: themes[theme].text }}
    >
      Welcome Back,{"  "}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyPress}
          className="px-2 py-1  bg-transparent text-gray-700  w-[120px]"
        />
      ) : (
        <span
          onClick={handleNameClick}
          className="cursor-pointer bg-transparent  hover:opacity-80"
          title="Click to edit"
        >
          {userName}
        </span>
      )}
      !
    </div>
  );
};

export default Greeting;
