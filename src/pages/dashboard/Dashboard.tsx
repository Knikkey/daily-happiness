//hooks
import { useState, useRef, useEffect } from "react";
import { useLogout } from "../../hooks/useLogout";
import { auth } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";

//media
import leftCloud from "./media/left-cloud.webp";
import rightCloud from "./media/right-cloud.webp";
import avatar from "./media/avatar.webp";
import happySong from "./media/happySong.mp3";
import Mute from "./media/Mute";
import Unmute from "./media/Unmute";

//components
import InputModal from "../../components/modals/input/InputModal";
import Memories from "../../components/modals/memories/Memories";
import WelcomeModal from "../../components/modals/welcome/WelcomeModal";

//styles
import styles from "./styles/Dashboard.module.css";

export default function Dashboard() {
  const [showInput, setShowInput] = useState(false);
  const [showMemories, setShowMemories] = useState(false);
  const [mute, setMute] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);

  //hooks
  const { currentUser } = auth;
  const { user } = useAuthContext();
  const { logout } = useLogout();

  //functions
  const handleMusic = () => {
    setMute((prev) => !prev);
  };

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = 0.2;
      !mute ? audio.current?.play() : audio.current.pause();
    }
  }, [mute]);

  return (
    <div className={styles["dashboard-container"]}>
      {/* ****************BANNER *****************/}
      <>
        {currentUser?.isAnonymous ? (
          <p className={styles["guest-banner"]}>
            You're currently using a guest account. Your data will not be saved.
          </p>
        ) : (
          <p className={styles["guest-banner"]}>
            Currently logged in as: {user.displayName}
          </p>
        )}
      </>

      {/* ****************WELCOME MODAL *****************/}
      <WelcomeModal />
      {/* ****************AVATAR *****************/}
      <div className={styles["avatar-container"]}>
        <img
          src={leftCloud}
          alt="add memories button"
          className={styles["cloud--left"]}
          onClick={() => setShowInput(true)}
        ></img>
        <img
          src={rightCloud}
          alt="read memories button"
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
        {!mute ? <Mute /> : <Unmute />}
      </button>
      <footer>
        Music by{" "}
        <a
          href="https://www.youtube.com/channel/UCM4rFS9nLw2AiBNiDWBNChg"
          target="_blank"
          rel="noreferrer noopener"
        >
          Oneul
        </a>
      </footer>
    </div>
  );
}
