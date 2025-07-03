import { initializeApp } from "firebase/app";// initializeApp function to connect your React app with your Firebase projec

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,//fire base api key

  authDomain: "mern-state-27b25.firebaseapp.com",// Domain name for Firebase authentication system use for singin/singup

  projectId: "mern-state-27b25",// firebase unique id

  storageBucket: "mern-state-27b25.firebasestorage.app",// cloud storage to save img,video,etc

  messagingSenderId: "580094297652",// push notification
  
  appId: "1:580094297652:web:4a09800fb1cb3ee55d6c61"
};

export const app = initializeApp(firebaseConfig);// initialing the firebase 