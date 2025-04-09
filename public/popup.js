import { auth, provider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "./firebase.js";

document.getElementById("google-login").addEventListener("click", async () => {
    try {
        await signInWithRedirect(auth, provider);
    } catch (error) {
        console.error("Login failed:", error);
        alert("Authentication failed. Please try again.");
    }
});

window.addEventListener("load", async () => {
    try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
            alert(`Thank you for signing in, ${result.user.displayName || "User"}!`);
        } else {
            // Check if user is already signed in (e.g., page reloaded)
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    alert(`Welcome back, ${user.displayName || "User"}!`);
                }
            });
        }
    } catch (error) {
        console.error("Error retrieving sign-in result:", error);
    }
});
