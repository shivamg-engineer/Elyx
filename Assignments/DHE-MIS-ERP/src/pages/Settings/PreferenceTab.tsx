import styles from "./Settings.module.css";

export default function PreferencesTab() {
  return (
    <form className={styles.form}>
      <h2 className={styles.sectionTitle}>Preferences</h2>

      <label className={styles.label}>Language</label>
      <select className={styles.input}>
        <option>English</option>
      </select>

      <label className={styles.label}>Theme</label>
      <select className={styles.input}>
        <option>Light</option>
        <option>Dark</option>
      </select>

      <label className={styles.label}>Date Format</label>
      <select className={styles.input}>
        <option>DD/MM/YYYY</option>
        <option>MM/DD/YYYY</option>
      </select>

      <label className={styles.label}>Time Format</label>
      <select className={styles.input}>
        <option>12-hour</option>
        <option>24-hour</option>
      </select>

      <div className={styles.buttonRow}>
        <button type="reset" className={styles.resetButton}>Reset</button>
        <button type="submit" className={styles.saveButton}>Save Preferences</button>
      </div>
    </form>
  );
}
