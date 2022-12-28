import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { auth } from "../../../firebase/config";
import ModalTemplate from "../modalTemplate/ModalTemplate";
import leftCloud from "../../../pages/dashboard/left-cloud.png";
import rightCloud from "../../../pages/dashboard/right-cloud.png";

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
            <p className={styles.welcome}>
              Happy days,{" "}
              {currentUser?.isAnonymous ? user.displayName : "friend"}
            </p>
            <p className={styles.message}>
              Click the{" "}
              <img
                src={leftCloud}
                className={styles.left}
                alt="left cloud with pencil"
              />{" "}
              to <span className={styles.record}>record a happy memory</span> or
              click the{" "}
              <img
                src={rightCloud}
                className={styles.right}
                alt="right cloud with book"
              />{" "}
              <span className={styles.read}>
                to view some that you've already recorded
              </span>
              .
            </p>
            <p className={styles.end}>Have a wonderful day :)</p>
          </div>
        </ModalTemplate>
      )}
    </>
  );
}
