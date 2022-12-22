import { createContext, PropsWithChildren, useEffect, useReducer } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext<any>(null);

/////////////////////////
//types
/////////////////////////
type actionType = {
  type: string;
  payload: object | null;
};

/////////////////////////
//reducer function
/////////////////////////
export const authReducer = (state: object, action: actionType) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, authIsReady: true, user: action.payload };

    default:
      return state;
  }
};

/////////////////////////
/////////////////////////
export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  /////////////////////////
  //reducer
  /////////////////////////
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  /////////////////////////
  //check if already logged in
  /////////////////////////
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
    return () => {
      unsub();
    };
  }, []);

  /////////////////////////
  //return statement
  /////////////////////////
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
