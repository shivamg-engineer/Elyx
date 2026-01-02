
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Reports.module.css";
import { useState } from "react";
import { ReportGenerator } from "./Tab/ReportGenerator";
import { AnalyticsDashboard } from "./Tab/AnalyticsDashboard";

export const Reports = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <DashboardLayout>
      <div className={styles.page}>
        {/* PAGE HEADER */}
        <h1 className={styles.pageTitle}>Reporting & Analytics</h1>
        <p className={styles.subtitle}>
          Generate custom reports and view comprehensive analytics across all
          modules
        </p>

        {/* TOP TABS */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "dashboard" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Analytics Dashboard
          </button>

          <button
            className={`${styles.tab} ${
              activeTab === "generator" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("generator")}
          >
            Report Generator
          </button>
        </div>

        {/* DASHBOARD CONTENT */}
        {activeTab === "dashboard" && (
          <AnalyticsDashboard/>
        )}

        {activeTab === "generator" && (
          <ReportGenerator/>
        )}
      </div>
    </DashboardLayout>
  );
};
