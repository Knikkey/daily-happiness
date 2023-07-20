import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [logoutError, setLogoutError] = useState<any>(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    await signOut(auth);
    try {
      dispatch({ type: "LOGOUT" });
    } catch (err: any) {
      setLogoutError(err);
    }
  };

  return { logout, logoutError };
};
