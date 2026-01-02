import { useState } from "react";
import styles from "./Statistics.module.css";
import { Calendar } from "lucide-react";

export default function Statistics() {
  const [subTab, setSubTab] = useState("ScheduleEvent");

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Case Scheduling & Management</h2>
        <p className={styles.subtitle}>
          Select a case to manage scheduling and closure
        </p>

        {/* ---------------- STATS NAV ---------------- */}
        <div className={styles.innerTabs}>
          <button
            className={
              subTab === "ScheduleEvent"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${subTab}`
            }
            onClick={() => setSubTab("ScheduleEvent")}
          >
            Schedule Event
          </button>
          <button
            className={
              subTab === "Courtrooms"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${subTab}`
            }
            onClick={() => setSubTab("Courtrooms")}
          >
            Courtrooms & Judges
          </button>
          <button
            className={
              subTab === "CaseClosure"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${subTab}`
            }
            onClick={() => setSubTab("CaseClosure")}
          >
            Case Closure
          </button>
          <button
            className={
              subTab === "Statistics"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${subTab}`
            }
            onClick={() => setSubTab("Statistics")}
          >
            Statistics
          </button>
        </div>

        {/* ---------------- OVERVIEW STATS ---------------- */}

        {subTab === "ScheduleEvent" && (
          <div className={styles.scheduleFormWrapper}>
            {/* Event Type + Scheduled Date */}
            <div className={styles.gridTwo}>
              <div className={styles.formGroup}>
                <label>Event Type</label>
                <input type="text" value="Hearing" readOnly />
              </div>

              <div className={styles.formGroup}>
                <label>Scheduled Date</label>
                <input type="date" placeholder="mm/dd/yyyy" />
              </div>
            </div>

            {/* Scheduled Time + Duration */}
            <div className={styles.gridTwo}>
              <div className={styles.formGroup}>
                <label>Scheduled Time</label>
                <input type="time" />
              </div>

              <div className={styles.formGroup}>
                <label>Duration (minutes)</label>
                <input type="number" defaultValue="120" />
              </div>
            </div>

            {/* Courtroom + Judge */}
            <div className={styles.gridTwo}>
              <div className={styles.formGroup}>
                <label>Courtroom</label>
                <select>
                  <option>Select courtroom</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Judge</label>
                <select>
                  <option>Select judge</option>
                </select>
              </div>
            </div>

            {/* Remarks */}
            <div className={styles.formGroup}>
              <label>Remarks</label>
              <textarea placeholder="Enter any additional remarks..."></textarea>
            </div>

            {/* Checkbox */}
            <div className={styles.checkboxRow}>
              <input type="checkbox" defaultChecked />
              <span>Send notifications to all parties</span>
            </div>

            {/* Button */}
            <button className={styles.scheduleBtn}>
              <span>📅</span> Schedule Event
            </button>
          </div>
        )}
        {subTab === "Statistics" && (
          <div>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewCard}>
                <h3 className={styles.overviewValue}>18</h3>
                <p>Total Cases</p>
              </div>

              <div className={styles.overviewCard}>
                <h3 className={styles.overviewValueBlue}>12</h3>
                <p>Active Cases</p>
              </div>

              <div className={styles.overviewCard}>
                <h3 className={styles.overviewValueGreen}>5</h3>
                <p>Disposed Cases</p>
              </div>

              <div className={styles.overviewCard}>
                <h3 className={styles.overviewValueOrange}>8</h3>
                <p>Pending Hearings</p>
              </div>
            </div>

            {/* ---------------- CLEARANCE RATE ---------------- */}
            <div className={styles.rateRow}>
              <div className={styles.rateCard}>
                <h4>📉 Clearance Rate</h4>
                <h2 className={styles.rateValue}>33.33%</h2>
                <p>Percentage of cases disposed vs total cases</p>
              </div>

              <div className={styles.rateCard}>
                <h4>⏱ Average Disposal Time</h4>
                <h2 className={styles.rateValue}>365 days</h2>
                <p>Average time to dispose a case</p>
              </div>
            </div>

            {/* ---------------- DISPOSITION BREAKDOWN ---------------- */}
            <div className={styles.subsection}>
              <h3 className={styles.subTitle}>Dispositions Breakdown</h3>

              <div className={styles.dispositionGrid}>
                <div className={styles.dispositionItem}>
                  <h2>3</h2>
                  <p>Disposed</p>
                </div>

                <div className={styles.dispositionItem}>
                  <h2>1</h2>
                  <p>Withdrawn</p>
                </div>

                <div className={styles.dispositionItem}>
                  <h2>1</h2>
                  <p>Settled</p>
                </div>

                <div className={styles.dispositionItem}>
                  <h2>1</h2>
                  <p>Dismissed</p>
                </div>
              </div>
            </div>

            {/* ---------------- CASELOAD BY JUDGE ---------------- */}
            <div className={styles.subsection}>
              <h3 className={styles.subTitle}>👨‍⚖️ Caseload by Judge</h3>

              <div className={styles.judgeList}>
                <div className={styles.judgeItem}>
                  <span>Hon. Justice A.B. Sharma</span>
                  <span className={styles.judgeCount}>45 cases</span>
                </div>

                <div className={styles.judgeItem}>
                  <span>Hon. Judge M.K. Deshmukh</span>
                  <span className={styles.judgeCount}>38 cases</span>
                </div>

                <div className={styles.judgeItem}>
                  <span>Hon. Justice R.S. Kulkarni</span>
                  <span className={styles.judgeCount}>42 cases</span>
                </div>
              </div>
            </div>

            {/* ---------------- CASES BY TYPE ---------------- */}
            <div className={styles.subsection}>
              <h3 className={styles.subTitle}>📊 Cases by Type</h3>

              <div className={styles.typeGrid}>
                <div>
                  <h2>6</h2>
                  <p>Administrative</p>
                </div>
                <div>
                  <h2>4</h2>
                  <p>Labor</p>
                </div>
                <div>
                  <h2>3</h2>
                  <p>Civil</p>
                </div>
                <div>
                  <h2>2</h2>
                  <p>Service</p>
                </div>
                <div>
                  <h2>1</h2>
                  <p>RTI</p>
                </div>
                <div>
                  <h2>1</h2>
                  <p>Constitutional</p>
                </div>
                <div>
                  <h2>0</h2>
                  <p>Other</p>
                </div>
              </div>
            </div>

            {/* ---------------- CASE AGE ---------------- */}
            <div className={styles.subsection}>
              <h3 className={styles.subTitle}>
                📅 Pending Case Age Distribution
              </h3>

              <div className={styles.typeGrid}>
                <div>
                  <h2>5</h2>
                  <p>&lt; 6 months</p>
                </div>
                <div>
                  <h2>3</h2>
                  <p>6-12 months</p>
                </div>
                <div>
                  <h2>2</h2>
                  <p>1-2 years</p>
                </div>
                <div>
                  <h2 className={styles.red}>2</h2>
                  <p>&gt; 2 years</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {subTab === "CaseClosure" && (
          <div className={styles.wrapper}>
            {/* ------------------- FORM GRID ------------------- */}
            <div className={styles.grid}>
              {/* Closure Type */}
              <div className={styles.formGroup}>
                <label>Closure Type</label>
                <select>
                  <option>Disposed</option>
                  <option>Withdrawn</option>
                  <option>Dismissed</option>
                  <option>Settled</option>
                </select>
              </div>

              {/* Closure Date */}
              <div className={styles.formGroup}>
                <label>Closure Date</label>
                <div className={styles.inputWithIcon}>
                  <input type="date" />
                  <Calendar size={16} />
                </div>
              </div>

              {/* Enforcement Status */}
              <div className={styles.formGroup}>
                <label>Enforcement Status</label>
                <select>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Initiated</option>
                </select>
              </div>

              {/* Archival Location */}
              <div className={styles.formGroup}>
                <label>Archival Location</label>
                <input placeholder="e.g., Archive Room A, Shelf 12" />
              </div>
            </div>

            {/* ------------------- LARGE TEXT FIELDS ------------------- */}
            <div className={styles.block}>
              <label>Judgment Summary</label>
              <textarea placeholder="Enter judgment summary..." />
            </div>

            <div className={styles.block}>
              <label>Final Order</label>
              <textarea placeholder="Enter final order details..." />
            </div>

            <div className={styles.block}>
              <label>Remarks</label>
              <textarea placeholder="Enter any additional remarks..." />
            </div>

            {/* ------------------- SUBMIT BUTTON ------------------- */}
            <button className={styles.closeBtn}>
              <span className={styles.icon}>🗂</span> Close Case
            </button>
          </div>
        )}

        {subTab === "Courtrooms" && (
          <div className={styles.wrapper}>
            <div className={styles.sectionWrapper}>
              {/* LEFT SIDE: COURTROOM ALLOCATIONS */}
              <div className={styles.leftBlock}>
                <h3 className={styles.sectionTitle}>Courtroom Allocations</h3>

                {/* ---- COURT 1 ---- */}
                <div className={styles.courtCard}>
                  <div className={styles.cardHeader}>
                    <h4>Court No. 1</h4>
                    <span className={styles.statusAvailable}>Available</span>
                  </div>

                  <p className={styles.roomType}>Main Court Hall</p>
                  <p className={styles.floor}>📍 Ground Floor</p>
                  <p className={styles.capacity}>Capacity: 100</p>

                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>Video Conferencing</span>
                    <span className={styles.badge}>Recording Equipment</span>
                    <span className={styles.badge}>Public Address System</span>
                  </div>
                </div>

                {/* ---- COURT 2 ---- */}
                <div className={styles.courtCard}>
                  <div className={styles.cardHeader}>
                    <h4>Court No. 2</h4>
                    <span className={styles.statusAvailable}>Available</span>
                  </div>

                  <p className={styles.roomType}>Civil Court</p>
                  <p className={styles.floor}>📍 First Floor</p>
                  <p className={styles.capacity}>Capacity: 80</p>

                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>Video Conferencing</span>
                    <span className={styles.badge}>Recording Equipment</span>
                  </div>
                </div>

                {/* ---- COURT 3 ---- */}
                <div className={styles.courtCard}>
                  <div className={styles.cardHeader}>
                    <h4>Court No. 3</h4>
                    <span className={styles.statusOccupied}>Occupied</span>
                  </div>

                  <p className={styles.roomType}>Criminal Court</p>
                  <p className={styles.floor}>📍 First Floor</p>
                  <p className={styles.capacity}>Capacity: 80</p>

                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>Recording Equipment</span>
                    <span className={styles.badge}>Public Address System</span>
                  </div>

                  <div className={styles.allocated}>
                    <p className={styles.allocTitle}>Allocated Cases:</p>
                    <p className={styles.allocCase}>
                      WP/2023/1234 - 2024-12-15 at 10:00
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: JUDICIAL ASSIGNMENTS */}
              <div className={styles.rightBlock}>
                <h3 className={styles.sectionTitle}>Judicial Assignments</h3>

                {/* ---- JUDGE 1 ---- */}
                <div className={styles.judgeCard}>
                  <div className={styles.judgeHeader}>
                    <h4>Hon. Justice A.B. Sharma</h4>
                    <span className={styles.caseCount}>45 cases</span>
                  </div>

                  <p className={styles.judgeRole}>High Court Judge</p>

                  <div className={styles.judgeTags}>
                    <span className={styles.judgeTag}>administrative</span>
                    <span className={styles.judgeTag}>constitutional</span>
                  </div>

                  <div className={styles.assignedCases}>
                    <p className={styles.assignedLabel}>Assigned Cases:</p>
                    <p className={styles.caseItem}>
                      WP/2023/1234 - ABC College vs. State of Maharashtra (Next:
                      2024-12-15)
                    </p>
                  </div>
                </div>

                {/* ---- JUDGE 2 ---- */}
                <div className={styles.judgeCard}>
                  <div className={styles.judgeHeader}>
                    <h4>Hon. Judge M.K. Deshmukh</h4>
                    <span className={styles.caseCount}>38 cases</span>
                  </div>

                  <p className={styles.judgeRole}>District Judge</p>

                  <div className={styles.judgeTags}>
                    <span className={styles.judgeTag}>labor</span>
                    <span className={styles.judgeTag}>service</span>
                    <span className={styles.judgeTag}>civil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
