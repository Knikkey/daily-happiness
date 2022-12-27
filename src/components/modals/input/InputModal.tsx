import { useState } from "react";
import { database, storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { boolStateProp } from "../../../Interfaces";
import ModalTemplate from "../modalTemplate/ModalTemplate";
import PaperBackground from "../paperBackground/PaperBackground";

import styles from "./styles/InputModal.module.css";

export default function InputModal({ setState }: boolStateProp) {
  const [submittedText, setSubmittedText] = useState("");
  const [submittedPhoto, setSubmittedPhoto] = useState<null | File>(null);
  const [previewPhoto, setPreviewPhoto] = useState<null | string>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<any>(null);
  const { user } = useAuthContext();

  const photoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const upload = e.target.files[0];
      const fileName = upload.name.split(".")[0];
      const reader = new FileReader();
      reader.readAsDataURL(upload);

      reader.onload = (e) => {
        if (e.target) {
          const temp = new Image();
          temp.src = e.target.result as string;

          //RESIZE IMAGE
          temp.onload = (event) => {
            const target = event.target as HTMLImageElement;
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d") as CanvasRenderingContext2D;
            const newWidth = 300;
            const aspectRatio = newWidth / target.width;
            const newHeight = target.width * aspectRatio;

            canvas.width = newWidth;
            canvas.height = newHeight;

            context.drawImage(
              event.target as HTMLImageElement,
              0,
              0,
              newWidth,
              newHeight
            );
            const compressedUrl = context.canvas.toDataURL("image/jpeg");
            setPreviewPhoto(compressedUrl);

            //convert to file
            const data = compressedUrl.split(",")[1];

            const dataStr = window.atob(data);
            let x = dataStr.length;
            const dataArr = new Uint8Array(x);
            while (x--) dataArr[x] = dataStr.charCodeAt(x);
            let file = new File([dataArr], `${fileName}.jpeg`, {
              type: "image/jpeg",
            });
            setSubmittedPhoto(file);
            console.log(file);
          };
        }
      };
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const newDate = new Date();
    const dayName = newDate.toLocaleDateString("en-us", { weekday: "long" });
    const month = newDate.toLocaleString("default", { month: "long" });
    const year = newDate.getFullYear();
    const date = `${dayName}, ${month} ${newDate.getDate()}, ${year}`;

    let photoURL = null;

    try {
      //upload photo to storage
      if (submittedPhoto) {
        const uploadPath = `photos/${user.uid}/${submittedPhoto.name}`;
        const photoRef = ref(storage, uploadPath);
        await uploadBytes(photoRef, submittedPhoto);
        photoURL = await getDownloadURL(photoRef);
      }

      await addDoc(collection(database, "memories"), {
        memory: submittedText,
        date: date,
        uid: user.uid,
        photo: photoURL,
      });

      setState(false);
      setPending(false);
    } catch (err: any) {
      setError(err.messsage);
    }
  };

  return (
    <ModalTemplate setProp={setState}>
      <PaperBackground formOrDiv="form" handler={submitHandler}>
        <textarea
          className={styles["text-area"]}
          autoFocus
          onChange={(e) => setSubmittedText(e.target.value)}
        />
        <div className={styles["photo-container"]}>
          <div className={styles.photo}>
            {previewPhoto && (
              <>
                <img src={previewPhoto} alt="picture selected for upload" />
                <button
                  onClick={() => setPreviewPhoto(null)}
                  disabled={pending}
                >
                  {pending ? "Uploading..." : "Remove photo"}
                </button>
              </>
            )}
            {error && <div>An error occured: {error}</div>}
            {!previewPhoto && !pending && (
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
        </div>
        <button
          type="submit"
          className={styles["submit-btn"]}
          disabled={pending}
        >
          {pending ? "Uploading..." : "Save memory"}
        </button>
      </PaperBackground>
    </ModalTemplate>
  );
}
