import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export function useLogin() {
  const [loginError, setLoginError] = useState<any>(null);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoginError(null);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: response.user });
      console.log("logged in!", response.user);
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  return { loginError, login };
}
