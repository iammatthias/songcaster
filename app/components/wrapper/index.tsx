import styles from "./styles.module.css";

export default function Wrapper({ children }: any) {
  return <div className={styles.root}>{children}</div>;
}
