import { auth, provider, signInWithRedirect, getRedirectResult } from "./firebase.js";

document.getElementById("google-login").addEventListener("click", async () => {
    try {
        await signInWithRedirect(auth, provider);
    } catch (error) {
        console.error("Login failed:", error);
        alert("Authentication failed. Please try again.");
    }
});

// Handle login result when popup opens
window.addEventListener("load", async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result) {
            alert(`Thank you for signing in, ${result.user.displayName || "User"}!`);
        }
    } catch (error) {
        console.error("Error retrieving sign-in result:", error);
    }
});
