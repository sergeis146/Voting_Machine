// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyB1I0HCoRXnE1nGN18QEx5JJjXoLMrXUMU",
    authDomain: "learn1-cdf41.firebaseapp.com",
    databaseURL: "https://learn1-cdf41-default-rtdb.firebaseio.com",
    projectId: "learn1-cdf41",
    storageBucket: "learn1-cdf41.firebasestorage.app",
    messagingSenderId: "719992648896",
    appId: "1:719992648896:web:3c2a20a2822fa6ff436925",
    measurementId: "G-7B0NJJY185"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export database to use in other scripts
export { database, ref };
