// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "website-1c49c.firebaseapp.com",
  projectId: "website-1c49c",
  storageBucket: "website-1c49c.appspot.com",
  messagingSenderId: "966341596176",
  appId: "1:966341596176:web:2f4826d1b90cebf60f6695",
  measurementId: "G-L6Z7ZR1MTQ"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);