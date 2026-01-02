import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>The page you are looking for does not exist.</p>

      <div className={styles.actions}>
        <Link to="/dashboard" className={styles.button}>
          Go to Dashboard
        </Link>

        <button className={styles.button_outline} onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
}
