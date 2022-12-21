import { useState } from "react";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function useSignup() {
  const [signupError, setSignupError] = useState<any>(null);

  const signup = async (email: string, password: string) => {
    setSignupError(null);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("signed up", response.user);
    } catch (err: any) {
      setSignupError(err.message);
    }
  };

  return { signupError, signup };
}
