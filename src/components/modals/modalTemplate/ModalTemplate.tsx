import { useRef } from "react";
import styles from "./ModalTemplate.module.scss";

interface ModalProps {
  setProp: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | JSX.Element[];
}

export default function ModalTemplate({ setProp, children }: ModalProps) {
  const modal = useRef<HTMLDivElement>(null);

  return (
    <div ref={modal} className={styles.modal}>
      <div className={styles["modal-relative"]}>
        <button
          onClick={() => setProp(false)}
          className={styles["close-btn"]}
          aria-label="close modal window"
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
        {children}
      </div>
    </div>
  );
}
