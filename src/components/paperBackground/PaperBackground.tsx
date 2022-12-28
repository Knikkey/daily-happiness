import styles from "./styles/PaperBackground.module.css";

interface PaperProps {
  formOrDiv: string;
  handler?: (e: React.FormEvent) => Promise<void>;
  children: JSX.Element | JSX.Element[];
}

export default function PaperBackground({
  formOrDiv,
  handler,
  children,
}: PaperProps) {
  return (
    <>
      {formOrDiv === "form" ? (
        <form onSubmit={handler} className={styles.paper}>
          <div className={styles["paper-content"]}>{children}</div>
        </form>
      ) : (
        <div className={styles.paper}>
          <div className={styles["paper-content"]}>{children}</div>
        </div>
      )}
    </>
  );
}
