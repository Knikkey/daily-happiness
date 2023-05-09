import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY || "mock_key",
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESS_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
};

//init firebase
const app = initializeApp(firebaseConfig);

//init firebase auth
const auth = getAuth();

//init firestore
const database = getFirestore();

//init storage
const storage = getStorage(app);

export { auth, database, storage };
