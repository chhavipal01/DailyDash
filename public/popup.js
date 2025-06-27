import { auth, provider } from "./firebase.js";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

// Button click handler
document.getElementById("google-login").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      alert(`Thank you for signing in, ${user.displayName || "User"}!`);
      // ✅ redirect to main extension UI
      setTimeout(() => {
        window.location.href = "/"; // ✅ NOT main.jsx
      }, 1500);
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Authentication failed. Please try again.");
  }
});

// Auto-login message if user already signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is already signed in:", user);
    alert(`Welcome back, ${user.displayName || "User"}!`);
    // Optional: auto-redirect
    window.location.href = "/"; // ✅ if you want to skip login screen
  }
});
