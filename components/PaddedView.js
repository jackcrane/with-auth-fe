import styles from "../styles/Signup.module.css";

export const PaddedView = ({ vertical, horizontal, block, children }) => {
  return (
    <div
      className={styles.paddedView}
      style={{
        padding: `${vertical || 0}px ${horizontal || 0}px`,
        display: `${block ? "block" : "inline-block"}`,
      }}
    >
      {children}
    </div>
  );
};
