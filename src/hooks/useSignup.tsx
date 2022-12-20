import { useState } from "react";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function useSignup() {
  const [error, setError] = useState<any>(null);

  const signup = async (email: string, password: string) => {
    setError(null);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signed up", response.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { error, signup };
}
