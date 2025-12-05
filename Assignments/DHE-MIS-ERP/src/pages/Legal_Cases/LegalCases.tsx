import { useState } from "react";
import styles from "./LegalCases.module.css";
import DashboardLayout from "../../layout/DashboardLayout";
import { BarChart3, Calendar, Gavel } from "lucide-react";
import CaseManagement from "./CaseManagement";
import Statistics from "./Statistics";
import Scheduling from "./Scheduling";

export function LegalCases() {
  const [mainTab, setMainTab] = useState("CaseManagement");

  return (
    <DashboardLayout>
      <div className={styles.main}>
        {/* -------- HEADER -------- */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <Gavel size={32} />
          </div>

          <div>
            <h1 className={styles.title}>Legal Case Management System</h1>
            <p className={styles.subtitle}>
              Complete case management including scheduling, courtroom
              allocation, and statistics
            </p>
          </div>
        </div>

        {/* -------- TAB BAR -------- */}
        <div className={styles.tabs}>
          <button
            onClick={() => setMainTab("CaseManagement")}
            className={`${styles.tab} ${
              mainTab === "CaseManagement" ? styles.active : ""
            }`}
          >
            <Gavel size={18} /> Case Management
          </button>

          <button
            onClick={() => setMainTab("Scheduling")}
            className={`${styles.tab} ${
              mainTab === "Scheduling" ? styles.active : ""
            }`}
          >
            <Calendar size={18} /> Scheduling & Closure
          </button>

          <button
            onClick={() => setMainTab("Statistics")}
            className={`${styles.tab} ${
              mainTab === "Statistics" ? styles.active : ""
            }`}
          >
            <BarChart3 size={18} /> Statistics
          </button>
        </div>

        {mainTab === "CaseManagement" && <CaseManagement />}
        {mainTab === "Scheduling" && <Scheduling />}
        {mainTab === "Statistics" && <Statistics />}
      </div>
    </DashboardLayout>
  );
}
