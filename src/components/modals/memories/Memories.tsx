import { useState, useEffect } from "react";
//firebase
import { useAuthContext } from "../../../hooks/useAuthContext";
import { database } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
//components
import { boolStateProp } from "../../../Interfaces";
import PaperBackground from "../../paperBackground/PaperBackground";
import PhotoFrame from "../../PhotoFrame/PhotoFrame";
import ModalTemplate from "../modalTemplate/ModalTemplate";
//styles
import styles from "./Memories.module.scss";

interface Memories {
  memory: string;
  date: string;
  uid: string;
  photo?: string | null;
  id?: string;
}

export default function Memories({ setState }: boolStateProp) {
  const [memories, setMemories] = useState<any[] | null>(null);
  const [currentMemory, setCurrentMemory] = useState<Memories | null>(null);
  const [error, setError] = useState<any>(null);
  const { user } = useAuthContext();

  //get docs
  useEffect(() => {
    (async () => {
      let memoriesArr: object[] = [];
      try {
        const snapshot = await getDocs(collection(database, "memories"));
        snapshot.docs.forEach((doc) => {
          if (doc.data().uid === user.uid)
            memoriesArr.push({ id: doc.id, ...doc.data() });
        });
        setMemories(memoriesArr);
      } catch (err: any) {
        setError(err.message);
        console.log(err.message);
      }
    })();
  }, []);

  //set first visible memory
  useEffect(() => randomMemory(), [memories]);

  useEffect(() => {
    if (memories && memories.length === 0) return;
    if (memories && memories.length === 1) setCurrentMemory(memories[0]);
    if (memories && memories.length > 1) {
      randomMemory();
    }
  }, [memories]);

  const randomMemory = () => {
    if (memories) {
      let potentialMemory =
        memories[Math.floor(Math.random() * memories.length)];
      setCurrentMemory(potentialMemory);
      if (potentialMemory === currentMemory) randomMemory();
    }
  };

  return (
    <ModalTemplate setProp={setState}>
      <PaperBackground formOrDiv="div">
        <>
          {!currentMemory && (
            <p>
              Looks like you haven't recorded any memories yet. Go record one!
              :)
            </p>
          )}
          {currentMemory && <p>{currentMemory.memory}</p>}
          {error && <p>{error}</p>}
        </>
        <>
          {currentMemory && currentMemory.photo && (
            <PhotoFrame>
              <img
                src={currentMemory.photo}
                alt="photo uploaded with memory"
              ></img>
            </PhotoFrame>
          )}
        </>
      </PaperBackground>
      <>
        {currentMemory && memories && memories.length > 1 && (
          <button className={styles["random-btn"]} onClick={randomMemory}>
            View another random happy memory
          </button>
        )}
      </>
    </ModalTemplate>
  );
}
