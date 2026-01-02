import styles from "./NotificationsTab.module.css";

export default function NotificationsTab() {
  return (
    <form className={styles.notificationForm}>
      <h2 className={styles.sectionTitle}>Notification Settings</h2>
      <p className={styles.sectionSubtitle}>
        Manage your email, SMS, and push notification preferences
      </p>

      {/* EMAIL NOTIFICATIONS */}
      <div className={styles.group}>
        <div className={styles.groupHeader}>
          <span className={styles.groupIcon}>📧</span>
          <h3>Email Notifications</h3>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Enable Email Notifications</strong>
            <p>Receive notifications via email</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Application Updates</strong>
            <p>Status changes and approvals</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>System Alerts</strong>
            <p>Important system notifications</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Reminders</strong>
            <p>Deadline and task reminders</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Newsletters</strong>
            <p>Updates and announcements</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>

        <hr className={styles.divider} />
      </div>

      {/* SMS NOTIFICATIONS */}
      <div className={styles.group}>
        <div className={styles.groupHeader}>
          <span className={styles.groupIcon}>💬</span>
          <h3>SMS Notifications</h3>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Enable SMS Notifications</strong>
            <p>Receive notifications via SMS</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Application Updates</strong>
            <p>Status changes and approvals</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>System Alerts</strong>
            <p>Important system notifications</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" defaultChecked />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Reminders</strong>
            <p>Deadline and task reminders</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>OTP Verification</strong>
            <p>OTP verification SMS cannot be disabled for security reasons</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" disabled checked />
            <span className={styles.slider}></span>
          </label>
        </div>

        <hr className={styles.divider} />
      </div>

      {/* PUSH NOTIFICATIONS */}
      <div className={styles.group}>
        <div className={styles.groupHeader}>
          <span className={styles.groupIcon}>🔔</span>
          <h3>Push Notifications</h3>
        </div>

        <div className={styles.toggleRow}>
          <div>
            <strong>Enable Push Notifications</strong>
            <p>Receive browser push notifications</p>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      <div className={styles.buttonRow}>
        <button type="reset" className={styles.resetButton}>Reset</button>
        <button type="submit" className={styles.saveButton}>Save Settings</button>
      </div>
    </form>
  );
}
