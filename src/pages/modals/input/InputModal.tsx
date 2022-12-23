import styles from "./styles/InputModal.module.css";

export default function InputModal() {
  return (
    <div className={styles["input-container"]}>
      <textarea autoFocus className={styles.input} />
    </div>
  );
}
