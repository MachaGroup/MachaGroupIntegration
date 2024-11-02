// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"; // Correct import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqfOFhLiU2wGNzuBQMjz3NbcIbdzEk_Io",
  authDomain: "studentdatabaseproject-5433d.firebaseapp.com",
  projectId: "studentdatabaseproject-5433d",
  storageBucket: "studentdatabaseproject-5433d.appspot.com",
  messagingSenderId: "516564451945",
  appId: "1:516564451945:web:4d4f590513680797be18f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app); // Now using the correct import