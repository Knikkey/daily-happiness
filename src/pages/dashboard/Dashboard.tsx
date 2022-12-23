import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { auth } from "../../firebase/config";

import Login from "../login/Login";

export default function Dashboard() {
  const [showSignup, setShowSignup] = useState(false);
  const guestSignup = true;

  //hooks
  const { currentUser } = auth;
  const { logout } = useLogout();

  return (
    <div>
      <p>Dashboard</p>
      {currentUser?.isAnonymous && (
        <>
          <p>
            You're currently using a guest account. Please{" "}
            <button onClick={() => setShowSignup(true)}>Sign up</button> to save
            your data.
          </p>
          {showSignup && <Login guestSignup={guestSignup} />}
        </>
      )}
      <button onClick={logout}>Log out</button>
    </div>
  );
}
