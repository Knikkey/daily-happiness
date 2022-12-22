import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

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
      dispatch({ type: "LOGIN", payload: response.user });
      console.log("signed up!", response.user);
    } catch (err: any) {
      setSignupError(err.message);
    }
  };

  return { signupError, signup };
}
