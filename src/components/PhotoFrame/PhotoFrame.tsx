import styles from "./PhotoFrame.module.scss";

interface PaperProp {
  children: JSX.Element | JSX.Element[];
}

export default function PhotoFrame({ children }: PaperProp) {
  return (
    <div className={styles["photo-container"]}>
      <div className={styles.photo}>{children}</div>
    </div>
  );
}
