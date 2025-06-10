// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the function to get Auth
import { getFirestore } from "firebase/firestore"; // Import the function to get Firestore

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "adlm-marketplace.firebaseapp.com",
  projectId: "adlm-marketplace",
  storageBucket: "adlm-marketplace.firebasestorage.app",
  messagingSenderId: "914918436067",
  appId: "1:914918436067:web:12523e530f8284e8bbe9d6",
  measurementId: "G-GHK1FSV47G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get service instances and export them
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {
  auth,
  db,
  app,
  // Export other services here...
};
