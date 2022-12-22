import { useAuthContext } from "./useAuthContext";

import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    await signOut(auth);
    try {
      dispatch({ type: "LOGOUT" });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return { logout };
};
