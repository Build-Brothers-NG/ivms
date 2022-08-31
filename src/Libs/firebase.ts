import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "G-measurementId",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: any = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// You need to replace the credentials with your firebase app credentials
