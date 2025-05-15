import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: import.meta.VITE_FIREBASE_API,
    authDomain: import.meta.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.VITE_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: import.meta.VITE_FIREBASE__MESSAGING_SENDER_ID,
    appId: import.meta.VITE_FIREBASE_APP_ID  ,
    measurementId: import.meta.VITE_FIREBASE_MEASUREMENT_ID ,
    databaseURL: import.meta.VITE_FIREBASE_DATABASE_URL ,
  };
 // Initialize Firebase only once
// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app); 

export default{ auth, provider, database , signInWithRedirect, getRedirectResult };