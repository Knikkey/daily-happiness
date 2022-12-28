import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../firebase/config";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export function useSignup() {
  const [signupError, setSignupError] = useState<any>(null);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setSignupError(null);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, { displayName });

      //generate first default memory
      //date
      const newDate = new Date();
      const dayName = newDate.toLocaleDateString("en-us", { weekday: "long" });
      const month = newDate.toLocaleString("default", { month: "long" });
      const year = newDate.getFullYear();
      const date = `${dayName}, ${month} ${newDate.getDate()}, ${year}`;
      //add default memory
      await addDoc(collection(database, "memories"), {
        memory: "Discovered this website :)",
        date: date,
        uid: response.user.uid,
        photo:
          "https://firebasestorage.googleapis.com/v0/b/daily-happiness-9c0d0.appspot.com/o/photos%2Fhappy.jpg?alt=media&token=b38dc328-7d18-4239-a3ed-4c2a665b18ab",
      });

      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err: any) {
      setSignupError(err.message);
    }
  };

  return { signupError, setSignupError, signup };
}
