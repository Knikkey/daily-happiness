import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { auth } from "../../firebase/config";
import leftCloud from "./left-cloud.png";
import rightCloud from "./right-cloud.png";
import avatar from "./avatar.png";

import Login from "../login/Login";

import styles from "./styles/Dashboard.module.css";
import InputModal from "../../components/modals/input/InputModal";

export default function Dashboard() {
  const [showSignup, setShowSignup] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const guestSignup = true;

  //hooks
  const { currentUser } = auth;
  const { logout } = useLogout();

  return (
    <div className={styles["dashboard-container"]}>
      {/* ****************GUEST BANNER *****************/}
      {currentUser?.isAnonymous && (
        <>
          <p className={styles["guest-banner"]}>
            You're currently using a guest account. Please{" "}
            <button onClick={() => setShowSignup(true)}>SIGN UP</button> to save
            your data.
          </p>
          {showSignup && <Login guestSignup={guestSignup} />}
        </>
      )}
      {/* ****************AVATAR *****************/}
      <div className={styles["avatar-container"]}>
        <img
          src={leftCloud}
          alt="thought bubble"
          className={styles["cloud--left"]}
          onClick={() => setShowInput(true)}
        ></img>
        <img
          src={rightCloud}
          alt="thought bubble"
          className={styles["cloud--right"]}
          onClick={() => setShowMemories(true)}
        ></img>
        <img className={styles.avatar} src={avatar} alt="smiling avatar" />
      </div>
      {/* ****************MODALS *****************/}
      {showInput && <InputModal setState={setShowInput} />}

      {/* ****************LOGOUT *****************/}
      <button className={styles["logout-btn"]} onClick={logout}>
        Log out
      </button>
    </div>
  );
}
