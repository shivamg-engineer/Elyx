import { NavLink, Outlet } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Settings.module.css";

export const Settings = () => {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.heading}>Settings</h1>
        <p className={styles.subheading}>
          Manage your account settings and preferences
        </p>

        {/* Tabs */}
        <div className={styles.tabRow}>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `${styles.tabButton} ${isActive ? styles.activeTab : ""}`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="preferences"
            className={({ isActive }) =>
              `${styles.tabButton} ${isActive ? styles.activeTab : ""}`
            }
          >
            Preferences
          </NavLink>

          <NavLink
            to="notifications"
            className={({ isActive }) =>
              `${styles.tabButton} ${isActive ? styles.activeTab : ""}`
            }
          >
            Notifications
          </NavLink>
        </div>

        {/* Content Area */}
        <div className={styles.contentCard}>
          <Outlet />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
