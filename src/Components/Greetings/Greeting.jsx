import React, { useContext } from 'react';
import { ThemeContext } from "../../Context/ThemeContext";
import {getDatabase ,ref , set} from  "firebase/database";
import firebase from "../../Firebase";



const Greeting = () => {
  const { theme, themes } = useContext(ThemeContext);
   if (!theme) {
    console.error("Theme is not available");
    return null;
  }
  const addData = (userID,name,phone)=> {
    console.log(`User ID: ${userID}, Name: ${name}, Phone: ${phone}`);

    const db = getDatabase(firebase.app); // or use firebase.database directly
      set(ref(db, 'users/' + userID), {
        username: name,
        phone: phone
      })
  }



  return (
    <div 
      className=' fixed top-3 left-4 text-[20px] p-[10px] text-2xl '
      style={{ backgroundColor: themes[theme].bg, color: themes[theme].text }}
    >
      Welcome Back, Chhavi!
      <button onClick={() => {addData(123, 'Nikhil' , 27427323)}}>submit </button>
      
    </div>
    
  );
};

export default Greeting;
