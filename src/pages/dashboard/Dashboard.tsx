import { useState, useRef, useEffect } from "react";
import { useLogout } from "../../hooks/useLogout";
import { auth } from "../../firebase/config";
import leftCloud from "./left-cloud.png";
import rightCloud from "./right-cloud.png";
import avatar from "./avatar.png";
import happySong from "./happySong.mp3";

import Login from "../login/Login";

import styles from "./styles/Dashboard.module.css";
import InputModal from "../../components/modals/input/InputModal";
import Memories from "../../components/modals/memories/Memories";
import WelcomeModal from "../../components/modals/welcome/WelcomeModal";

export default function Dashboard() {
  const [showSignup, setShowSignup] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [mute, setMute] = useState(false);
  const guestSignup = true;
  const audio = useRef<HTMLAudioElement | null>(null);

  //hooks
  const { currentUser } = auth;
  const { logout } = useLogout();

  //functions
  const handleMusic = () => {
    setMute((prev) => !prev);
  };

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = 0.5;
      !mute ? audio.current?.play() : audio.current.pause();
    }
  }, [mute]);

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
          {showSignup && (
            <div className={styles["signup-container"]}>
              <Login guestSignup={guestSignup} />
              <button
                className={styles["close-btn"]}
                onClick={() => setShowSignup(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
      {/* ****************WELCOME MODAL *****************/}
      <WelcomeModal />
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
      {showMemories && <Memories setState={setShowMemories} />}

      {/* ****************LOGOUT *****************/}
      <button className={styles["logout-btn"]} onClick={logout}>
        Log out
      </button>
      {/* ****************AUDIO *****************/}
      <audio ref={audio} src={happySong} autoPlay loop />

      <button className={styles["sound-btn"]} onClick={handleMusic}>
        {!mute && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
        {mute && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
