import React, { useContext } from 'react';
import { ThemeContext } from "../../Context/ThemeContext";

const Greeting = () => {
  const { theme, themes } = useContext(ThemeContext);
   if (!theme) {
    console.error("Theme is not available");
    return null;
  }

  return (
    <div 
      className=' fixed top-3 left-4 text-[20px] p-[10px] text-2xl '
      style={{ backgroundColor: themes[theme].bg, color: themes[theme].text }}
    >
      Welcome Back, Chhavi!
    </div>
  );
};

export default Greeting;
