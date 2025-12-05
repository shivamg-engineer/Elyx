import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Settings.module.css";
import PreferencesTab from "./PreferenceTab";
import ProfileTab from "./ProfileTab";
import NotificationsTab from "./NotificationsTab";

export const Settings = () => {
  const [active, setActive] = useState("profile");

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>Settings</h1>
        <p className={styles.subheading}>
          Manage your account settings and preferences
        </p>

        <div className={styles.tabRow}>
          <button
            className={`${styles.tabButton} ${
              active === "profile" ? styles.activeTab : ""
            }`}
            onClick={() => setActive("profile")}
          >
            Profile
          </button>

          <button
            className={`${styles.tabButton} ${
              active === "preferences" ? styles.activeTab : ""
            }`}
            onClick={() => setActive("preferences")}
          >
            Preferences
          </button>

          <button
            className={`${styles.tabButton} ${
              active === "notifications" ? styles.activeTab : ""
            }`}
            onClick={() => setActive("notifications")}
          >
            Notifications
          </button>
        </div>

        <div className={styles.contentCard}>
             {active === "profile" && <ProfileTab />}
        {active === "preferences" && <PreferencesTab />}
        {active === "notifications" && <NotificationsTab />}
        </div>
      </div>
    </DashboardLayout>
  );
};
  