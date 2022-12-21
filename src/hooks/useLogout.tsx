import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const logout = async () => {
    const response = await signOut(auth);
    try {
      console.log("signed out");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return { logout };
};
