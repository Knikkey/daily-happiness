import styles from "./styles/CloseButton.module.css";

interface Props {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CloseButton({ setState }: Props) {
  return (
    <button onClick={() => setState(false)} className={styles["close-btn"]}>
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
  );
}
