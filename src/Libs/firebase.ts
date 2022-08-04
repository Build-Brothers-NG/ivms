// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzJSR0s4LrQ2Fq9ndjqgudNU1SRPRuTwk",
  authDomain: "ivms-30cbe.firebaseapp.com",
  projectId: "ivms-30cbe",
  storageBucket: "ivms-30cbe.appspot.com",
  messagingSenderId: "3772944982",
  appId: "1:3772944982:web:67b94dd45c51d90066e1f7",
  measurementId: "G-J2NGR48PXT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: any = getAuth(app);

export { auth };
