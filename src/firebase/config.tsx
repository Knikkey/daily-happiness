import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARg8kpisLDoeLeWFWR1DcQuME6pMcXCC4",
  authDomain: "daily-happiness-9c0d0.firebaseapp.com",
  projectId: "daily-happiness-9c0d0",
  storageBucket: "daily-happiness-9c0d0.appspot.com",
  messagingSenderId: "880825530022",
  appId: "1:880825530022:web:96000f0043b0786a19a667",
};

//init firebase
initializeApp(firebaseConfig);

//init firebase auth
const auth = getAuth();

//init firestore
const database = getFirestore();

export { auth, database };
