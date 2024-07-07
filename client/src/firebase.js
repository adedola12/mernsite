// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernsite.firebaseapp.com",
  projectId: "mernsite",
  storageBucket: "mernsite.appspot.com",
  messagingSenderId: "470385041562",
  appId: "1:470385041562:web:9c08dfbec470fd60d93f23",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);