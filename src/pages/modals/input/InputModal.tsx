import React, { useState } from "react";

import { boolStateProp } from "../../../Interfaces";
import ModalTemplate from "../modalTemplate/ModalTemplate";

import styles from "./styles/InputModal.module.css";

interface Memory {
  memory: string;
  image?: object;
}

export default function InputModal({ setState }: boolStateProp) {
  const [submittedMemory, setSubmittedMemory] = useState<Memory>();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <ModalTemplate setProp={setState}>
      <form onSubmit={submitHandler} className={styles.paper}>
        <div className={styles["paper-content"]}>
          <textarea autoFocus />
          <div className={styles["photo-container"]}>
            <div className={styles.photo}>
              <button>Add photo</button>
            </div>
            <button className={styles["submit-btn"]}>Save memory</button>
          </div>
        </div>
      </form>
    </ModalTemplate>
  );
}
