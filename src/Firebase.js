import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAP_VKnXZ9XBysbXOMnszEZQcS_6Kmb2kA",
    authDomain: "productivity-firebase.firebaseapp.com",
    projectId: "productivity-firebase",
    storageBucket: "productivity-firebase.firebasestorage.app",
    messagingSenderId: "1083943036722",
    appId: "1:1083943036722:web:269de586f595d9b63f192b",
    measurementId: "G-GX6LCMZR5E",
    databaseURL: "https://productivity-firebase-default-rtdb.firebaseio.com",
  };
 // Initialize Firebase only once
// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app); 

export default{ auth, provider, database , signInWithRedirect, getRedirectResult };