import { useState } from "react";
import styles from "../Reports.module.css";
import { LuBuilding2, LuUsers, LuGraduationCap, LuCircleAlert } from "react-icons/lu";
import { Institute } from "../subTabs/Institutes";
import { Operations } from "../subTabs/Operations";
import { Overview } from "../subTabs/Overview";
import { Staffing } from "../subTabs/Staffing";
import { Students } from "../subTabs/Students";

export const AnalyticsDashboard=()=>{
      const [subTab, setSubTab] = useState("Overview");
      const tabs = ["Overview", "Institutes", "Staffing", "Students", "Operations"];
    return (
        <>
            <h2 className={styles.sectionTitle}>Analytics Dashboard</h2>
            <p className={styles.sectionDesc}>
              Comprehensive analytics and insights across all modules
            </p>

            {/* TIME FILTER */}
            <div className={styles.filterRow}>
              <select className={styles.timeFilter}>
                <option>Last 6 Months</option>
              </select>
            </div>

            {/* SUMMARY CARDS */}
            <div className={styles.cardGrid}>
              <div className={styles.card}>
                <div className={styles.cardText}>
                  <p className={styles.cardLabel}>Total Institutes</p>
                  <h3 className={styles.cardValue}>1247</h3>
                </div>
                <div className={`${styles.iconBox} ${styles.blueIcon}`}>
                  <LuBuilding2 size={28} />
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardText}>
                  <p className={styles.cardLabel}>Total Staff</p>
                  <h3 className={styles.cardValue}>52,400</h3>
                </div>
                <div className={`${styles.iconBox} ${styles.greenIcon}`}>
                  <LuUsers size={28} />
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardText}>
                  <p className={styles.cardLabel}>Total Students</p>
                  <h3 className={styles.cardValue}>3,200,000</h3>
                </div>
                <div className={`${styles.iconBox} ${styles.purpleIcon}`}>
                  <LuGraduationCap size={28} />
                </div>
              </div>

              <div className={styles.card}>
                <div className={styles.cardText}>
                  <p className={styles.cardLabel}>Active Grievances</p>
                  <h3 className={styles.cardValue}>23</h3>
                </div>
                <div className={`${styles.iconBox} ${styles.orangeIcon}`}>
                  <LuCircleAlert size={28} />
                </div>
              </div>
            </div>

            <div className={styles.subTab}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={subTab === tab ? styles.active : ""}
                  onClick={() => setSubTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {subTab === "Overview" && (
              <Overview/>
            )}
            {/* institutes */}

            {subTab === "Institutes" && (
              <Institute/>
            )}
            {/* Staffing */}
            {subTab === "Staffing" && (
              <Staffing/>
            )}
            {subTab === "Students" && (
              <Students/>
            )}

            {subTab === "Operations" && (
              <Operations/>
            )}
          </>
    );
}