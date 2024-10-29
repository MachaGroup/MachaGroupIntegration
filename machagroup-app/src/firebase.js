// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC14LD9TO-ps_GTOVTv2_IZOyGhOoqEARs",
  authDomain: "machagroupwebapp-96c79.firebaseapp.com",
  projectId: "machagroupwebapp-96c79",
  storageBucket: "machagroupwebapp-96c79.appspot.com",
  messagingSenderId: "40616609712",
  appId: "1:40616609712:web:f3a79f268402b4fb7eb875",
  measurementId: "G-XB38RKBCEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);