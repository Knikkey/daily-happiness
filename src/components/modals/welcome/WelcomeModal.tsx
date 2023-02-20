import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { auth } from "../../../firebase/config";
import ModalTemplate from "../modalTemplate/ModalTemplate";
import pencil from "./imgs/pencil.webp";
import book from "./imgs/book.webp";
import musicNotesLeft from "./imgs/musicNotesLeft.webp";
import musicNotesRight from "./imgs/musicNotesRight.webp";

import styles from "./styles/WelcomeModal.module.css";

export default function WelcomeModal() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { user } = useAuthContext();
  const { currentUser } = auth;

  return (
    <>
      {showWelcome && (
        <ModalTemplate setProp={setShowWelcome}>
          <div className={styles["welcome-container"]}>
            <img
              src={musicNotesLeft}
              alt="music notes"
              className={styles["music-notes"]}
            />
            <div>
              <p className={styles.welcome}>
                Happy days,{" "}
                {currentUser?.isAnonymous ? "friend" : user.displayName}
              </p>
              <p className={styles.message}>
                Click the{" "}
                <img
                  src={pencil}
                  className={styles.left}
                  alt="add memories button"
                />{" "}
                to <span className={styles.record}>record a happy memory</span>{" "}
                or click the{" "}
                <img
                  src={book}
                  className={styles.right}
                  alt="read memories button"
                />{" "}
                <span className={styles.read}>
                  to view some that you've already recorded
                </span>
                .
              </p>
              <p className={styles.end}>Have a wonderful day :)</p>
            </div>
            <img
              src={musicNotesRight}
              alt="music notes"
              className={styles["music-notes"]}
            />
          </div>
        </ModalTemplate>
      )}
    </>
  );
}
