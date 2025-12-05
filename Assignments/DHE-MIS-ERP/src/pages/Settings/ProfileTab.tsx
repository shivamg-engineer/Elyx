import styles from "./Settings.module.css";

export default function ProfileTab() {
  return (
    <form className={styles.form}>
      <h2 className={styles.sectionTitle}>User Profile</h2>
      <p className={styles.sectionSubtitle}>Update your personal information and contact details</p>

      <label className={styles.label}>Username</label>
      <input className={styles.input} type="text" value="admin" disabled />

      <label className={styles.label}>Full Name</label>
      <input className={styles.input} type="text" placeholder="Dr. Rajesh Kumar" />

      <label className={styles.label}>Email Address *</label>
      <input className={styles.input} type="email" placeholder="admin@dhe.gov.in" />

      <label className={styles.label}>Mobile Number *</label>
      <input className={styles.input} type="text" placeholder="+91 9876543210" />

      <label className={styles.label}>Alternate Phone</label>
      <input className={styles.input} type="text" placeholder="+91 9876543211" />

      <label className={styles.label}>Designation</label>
      <input className={styles.input} type="text" placeholder="Principal" />

      <label className={styles.label}>Department</label>
      <input className={styles.input} type="text" placeholder="Administration" />

      <div className={styles.buttonRow}>
        <button type="reset" className={styles.resetButton}>Reset</button>
        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </div>
    </form>
  );
}
