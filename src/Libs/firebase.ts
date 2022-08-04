import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export { auth, db };
