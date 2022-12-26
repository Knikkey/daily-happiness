import { useState, useRef } from "react";
import { database } from "../../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { boolStateProp } from "../../../Interfaces";
import ModalTemplate from "../modalTemplate/ModalTemplate";

import styles from "./styles/InputModal.module.css";

export default function InputModal({ setState }: boolStateProp) {
  const [submittedText, setSubmittedText] = useState("");
  const [submittedPhoto, setSubmittedPhoto] = useState<null | File>(null);
  const [previewPhoto, setPreviewPhoto] = useState<undefined | string>();
  const { user } = useAuthContext();
  const photoBackground = useRef<HTMLImageElement>(null);

  const photoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmittedPhoto(null);
    if (e.target.files) {
      const upload = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setSubmittedPhoto(upload);
        setPreviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(upload);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDate = new Date();
    const month = newDate.toLocaleString("default", { month: "long" });
    const date = `${
      newDate.getDay
    }, ${month} ${newDate.getDate()}, ${newDate.getFullYear()}`;

    await addDoc(collection(database, "memories"), {
      memory: submittedText,
      date: date,
      uid: user.uid,
      photo: submittedPhoto,
    });
  };

  return (
    <ModalTemplate setProp={setState}>
      <form onSubmit={submitHandler} className={styles.paper}>
        <div className={styles["paper-content"]}>
          <textarea
            autoFocus
            onChange={(e) => setSubmittedText(e.target.value)}
          />
          <div className={styles["photo-container"]}>
            <div className={styles.photo}>
              {previewPhoto && (
                <>
                  <img
                    src={previewPhoto}
                    alt="uploaded picture"
                    ref={photoBackground}
                  />
                  <button onClick={() => setPreviewPhoto(undefined)}>
                    Remove photo
                  </button>
                </>
              )}
              {!previewPhoto && (
                <>
                  <label htmlFor="upload">Add a photo</label>
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    onChange={photoHandler}
                  />
                </>
              )}
            </div>
            <button type="submit" className={styles["submit-btn"]}>
              Save memory
            </button>
          </div>
        </div>
      </form>
    </ModalTemplate>
  );
}
