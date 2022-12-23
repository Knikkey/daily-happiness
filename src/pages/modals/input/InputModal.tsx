import { useState } from "react";
import { boolStateProp } from "../../../Interfaces";
import CloseButton from "../closeButton/CloseButton";

import styles from "./styles/InputModal.module.css";

export default function InputModal({ state, setState }: boolStateProp) {
  return (
    <div
      className={`${styles["paper-container"]} ${
        state && styles["paper-container--close"]
      }`}
    >
      <div className={styles.paper}>
        <CloseButton setState={setState} />
        <div className={styles["paper-content"]}>
          <textarea autoFocus />
          <div className={styles.photo}>
            <button>Add photo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
