// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdACsOVrVhW7smuocrbaI6-JbwNOQUUAg",
  authDomain: "milliysavdo-bc4a1.firebaseapp.com",
  projectId: "milliysavdo-bc4a1",
  storageBucket: "milliysavdo-bc4a1.appspot.com",
  messagingSenderId: "902083374441",
  appId: "1:902083374441:web:6daeee7880053b56f0e1f8",
  measurementId: "G-80XM814RMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


auth.languageCode = 'uz';