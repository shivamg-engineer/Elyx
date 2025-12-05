// import MetricCard from "../../component/MetricCard/MetricCard";
import styles from "./Dashboard.module.css";

import DashboardLayout from "../../layout/DashboardLayout";
import AnalyticsSection from "../../component/AnalyticsSection/AnalyticsSection";

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Welcome, Admin</h2>
          <p>System Administrator Dashboard</p>
        </div>
        <hr />
        {/* key metrics section */}
        <div className={styles.cards_grid}>
          <div className={`${styles.card} ${styles.metric_card}`}>
            <div className={styles.metric_title}>Total Users</div>
            <div className={styles.metric_value}>1547</div>
            <div className={styles.metric_sub}>↑ 2% from last period</div>
          </div>

          <div className={`${styles.card} ${styles.metric_card}`}>
            <div className={styles.metric_title}>System Uptime</div>
            <div className={styles.metric_value}>99.8%</div>
            <div className={styles.metric_sub}>↑ 0.2% from last period</div>
          </div>

          <div className={`${styles.card} ${styles.metric_card}`}>
            <div className={styles.metric_title}>Pending Tickets</div>
            <div className={styles.metric_value}>8</div>
            <div className={styles.metric_sub}>↓ 3% from last period</div>
          </div>

          <div className={`${styles.card} ${styles.metric_card}`}>
            <div className={styles.metric_title}>Last Backup</div>
            <div className={styles.metric_value}>2h ago</div>
            <div className={styles.metric_sub}>Successful</div>
          </div>
        </div>
        {/*  Quick Actions  */}
        <h3 className={styles.section_title}>Quick Actions</h3>
        <div className={styles.quick_actions}>
          <div className={`${styles.card} ${styles.action_card}`}>
            <div className={`${styles.icon} ${styles.blue}`}></div>
            <div>
              <h4>Manage Users</h4>
              <p>User management</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.action_card}`}>
            <div className={`${styles.icon} ${styles.purple}`}></div>
            <div>
              <h4>System Settings</h4>
              <p>Configuration</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.action_card}`}>
            <div className={`${styles.icon} ${styles.orange}`}></div>
            <div>
              <h4>View Logs</h4>
              <p>System logs</p>
            </div>
          </div>

          <div className={`${styles.card} ${styles.action_card}`}>
            <div className={`${styles.icon} ${styles.green}`}></div>
            <div>
              <h4>Backup Data</h4>
              <p>Data backup</p>
            </div>
          </div>
        </div>

        {/* <!-- Analytics --> */}
        <h3 className={styles.section_title}>Analytics</h3>

        <div className="p-6">
          <AnalyticsSection />
        </div>
      </div>
    </DashboardLayout>
  );
}
