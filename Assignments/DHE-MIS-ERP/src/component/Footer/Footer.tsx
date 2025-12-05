import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        © 2025 Department of Higher Education, Maharashtra. All rights reserved.
      </div>
      <div className={styles.right}>
        <ul>
          <a href="/about">About</a>
          <a href="/help">Help</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </ul>
      </div>
    </footer>
  );
};
