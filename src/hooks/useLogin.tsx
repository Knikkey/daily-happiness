import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";

export function useLogin() {
  const [loginError, setLoginError] = useState<any>(null);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoginError(null);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const guestLogin = async () => {
    setLoginError(null);
    try {
      const response = await signInAnonymously(auth);
      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  return { loginError, setLoginError, login, guestLogin };
}
