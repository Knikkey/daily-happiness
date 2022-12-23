import { useRef } from "react";
import styles from "./styles/ModalTemplate.module.css";

interface ModalProps {
  setProp: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | JSX.Element[];
}

export default function ModalTemplate({ setProp, children }: ModalProps) {
  const modal = useRef<any>();

  return (
    <div ref={modal} className={styles.modal}>
      <div className={styles["modal-relative"]}>
        <button onClick={() => setProp(false)} className={styles["close-btn"]}>
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
        {children}
      </div>
    </div>
  );
}
