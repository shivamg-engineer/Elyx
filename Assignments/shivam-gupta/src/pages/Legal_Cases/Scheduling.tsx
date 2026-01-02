import { useState } from "react";
import styles from "./Scheduling.module.css";

export default function Scheduling() {
  const [subTab, setSubTab] = useState("ScheduleEvent");
  const [selectedCase, setSelectedCase] = useState("WP/2023/1234");

  const [notify, setNotify] = useState(true);

  const [closureType, setClosureType] = useState("Disposed");
  const [enforcement, setEnforcement] = useState("Pending");
  const [closureDate, setClosureDate] = useState("");
  const [archivalLocation, setArchivalLocation] = useState("");
  const [judgmentSummary, setJudgmentSummary] = useState("");
  const [finalOrder, setFinalOrder] = useState("");
  const [remarks, setRemarks] = useState("");

  const scheduledEvents = [
    {
      type: "hearing",
      notified: true,
      date: "2024-12-15",
      time: "10:00",
      courtroom: "Court No. 12",
      judge: "Hon. Justice A.B. Sharma",
      remarks: "Final arguments",
    },
  ];

  const cases = [
    { id: "WP/2023/1234", title: "ABC College vs. State of Maharashtra" },
    { id: "CS/2022/5678", title: "XYZ Institute vs. Former Employee" },
    {
      id: "WP/2024/3456",
      title: "PQR College vs. University Grants Commission",
    },
    { id: "RTI/2023/789", title: "Citizen vs. LMN College" },
    { id: "WP/2024/7890", title: "DEF Institute vs. NAAC" },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Left Case List */}
      <div className={styles.caseList}>
        <h3>Select Case</h3>
        <p className={styles.caseSubtitle}>Choose a case to manage</p>

        {cases.map((c) => (
          <div
            key={c.id}
            className={`${styles.caseItem} ${
              selectedCase === c.id ? styles.activeCase : ""
            }`}
            onClick={() => setSelectedCase(c.id)}
          >
            <div className={styles.caseId}>{c.id}</div>
            <div className={styles.caseTitle}>{c.title}</div>
          </div>
        ))}
      </div>

      {/* Main Right Section */}
      <div className={styles.mainPanel}>
        <h2 className={styles.mainHeading}>Case Scheduling & Management</h2>
        <p className={styles.subHeading}>
          Managing: {selectedCase} - ABC College vs. State of Maharashtra
        </p>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={
              subTab === "ScheduleEvent"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${styles.subTab}`
            }
            onClick={() => setSubTab("ScheduleEvent")}
          >
            Schedule Event
          </button>
          <button
            className={
              subTab === "Courtrooms"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${styles.subTab}`
            }
            onClick={() => setSubTab("Courtrooms")}
          >
            Courtrooms & Judges
          </button>
          <button
            className={
              subTab === "CaseClosure"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${styles.subTab}`
            }
            onClick={() => setSubTab("CaseClosure")}
          >
            Case Closure
          </button>
          <button
            className={
              subTab === "Statistics"
                ? `${styles.activeSubTab} ${styles.subTab}`
                : `${styles.subTab}`
            }
            onClick={() => setSubTab("Statistics")}
          >
            Statistics
          </button>
        </div>

        {subTab === "ScheduleEvent" && (
          <div className={styles.wrapper}>
            {/* --- FORM --- */}
            <div className={styles.formSection}>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Event Type</label>
                  <select>
                    <option>Hearing</option>
                    <option>Meeting</option>
                    <option>Inspection</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Scheduled Date</label>
                  <input type="date" />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Scheduled Time</label>
                  <input type="time" />
                </div>

                <div className={styles.inputGroup}>
                  <label>Duration (minutes)</label>
                  <input type="number" defaultValue={120} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Courtroom</label>
                  <select>
                    <option>Select courtroom</option>
                    <option>Court No. 1</option>
                    <option>Court No. 2</option>
                    <option>Court No. 3</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>Judge</label>
                  <select>
                    <option>Select judge</option>
                    <option>Hon. Justice A.B. Sharma</option>
                    <option>Hon. Judge M.K. Deshmukh</option>
                  </select>
                </div>
              </div>

              <div className={styles.fullRow}>
                <label>Remarks</label>
                <textarea placeholder="Enter any additional remarks..." />
              </div>

              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={notify}
                  onChange={() => setNotify(!notify)}
                />
                <span>Send notifications to all parties</span>
              </div>

              <button className={styles.scheduleBtn}>
                <span>📅</span> Schedule Event
              </button>
              {/* --- SCHEDULED EVENTS LIST --- */}
              <h3 className={styles.sectionTitle}>Scheduled Events</h3>

              <div className={styles.eventsList}>
                {scheduledEvents.map((e, i) => (
                  <div key={i} className={styles.eventCard}>
                    <div className={styles.eventHeader}>
                      <span className={styles.eventType}>{e.type}</span>
                      {e.notified && (
                        <span className={styles.badge}>Notified</span>
                      )}
                    </div>

                    <div className={styles.eventMeta}>
                      <span>📆 {e.date}</span>
                      <span>⏰ {e.time}</span>
                      <span>🏛 {e.courtroom}</span>
                      <span>👤 {e.judge}</span>
                    </div>

                    <p className={styles.remarks}>{e.remarks}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {subTab === "Courtrooms" && (
          <div className={styles.contentGrid}>
            {/* COURTROOM ALLOCATIONS */}
            <div className={styles.courtrooms}>
              <h3 className={styles.sectionTitle}>Courtroom Allocations</h3>

              {/* Court Card 1 */}
              <div className={styles.courtCard}>
                <div className={styles.courtHeader}>
                  <span>Court No. 1</span>
                  <span className={styles.available}>Available</span>
                </div>

                <p className={styles.courtLabel}>Main Court Hall</p>
                <p className={styles.details}>📍 Ground Floor</p>
                <p className={styles.details}>Capacity: 100</p>

                <div className={styles.tags}>
                  <span>Video Conferencing</span>
                  <span>Recording Equipment</span>
                  <span>Public Address System</span>
                </div>
              </div>

              {/* Court Card 2 */}
              <div className={styles.courtCard}>
                <div className={styles.courtHeader}>
                  <span>Court No. 2</span>
                  <span className={styles.available}>Available</span>
                </div>

                <p className={styles.courtLabel}>Civil Court</p>
                <p className={styles.details}>📍 First Floor</p>
                <p className={styles.details}>Capacity: 80</p>

                <div className={styles.tags}>
                  <span>Video Conferencing</span>
                  <span>Recording Equipment</span>
                </div>
              </div>

              {/* Court Card 3 */}
              <div className={styles.courtCard}>
                <div className={styles.courtHeader}>
                  <span>Court No. 3</span>
                  <span className={styles.occupied}>Occupied</span>
                </div>

                <p className={styles.courtLabel}>Criminal Court</p>
                <p className={styles.details}>📍 First Floor</p>
                <p className={styles.details}>Capacity: 80</p>

                <div className={styles.tags}>
                  <span>Recording Equipment</span>
                  <span>Public Address System</span>
                </div>

                <div className={styles.allocatedBox}>
                  <p>Allocated Cases:</p>
                  <p className={styles.caseInfo}>
                    {selectedCase} - 2024-12-15 at 10:00
                  </p>
                </div>
              </div>
            </div>

            {/* JUDICIAL ASSIGNMENTS */}
            <div className={styles.judges}>
              <h3 className={styles.sectionTitle}>Judicial Assignments</h3>

              {/* Judge 1 */}
              <div className={styles.judgeCard}>
                <h4 className={styles.judgeName}>Hon. Justice A.B. Sharma</h4>
                <p>High Court Judge</p>

                <div className={styles.tagsRow}>
                  <span>administrative</span>
                  <span>constitutional</span>
                </div>

                <p className={styles.assignedLabel}>Assigned Cases:</p>
                <p className={styles.caseInfoSmall}>
                  WP/2023/1234 - ABC College vs. State of Maharashtra (Next:
                  2024-12-15)
                </p>

                <div className={styles.caseCount}>45 cases</div>
              </div>

              {/* Judge 2 */}
              <div className={styles.judgeCard}>
                <h4 className={styles.judgeName}>Hon. Judge M.K. Deshmukh</h4>
                <p>District Judge</p>

                <div className={styles.tagsRow}>
                  <span>labor</span>
                  <span>service</span>
                  <span>civil</span>
                </div>

                <div className={styles.caseCount}>38 cases</div>
              </div>
            </div>
          </div>
        )}

        {subTab === "CaseClosure" && (
          <div className={styles.closure_wrapper}>
            <h3 className={styles.closure_sectionTitle}>Case Closure</h3>

            {/* ---- 2-column grid ---- */}
            <div className={styles.closure_grid2}>
              <div className={styles.closure_fieldBlock}>
                <label>Closure Type</label>
                <select
                  value={closureType}
                  onChange={(e) => setClosureType(e.target.value)}
                  className={styles.closure_input}
                >
                  <option>Disposed</option>
                  <option>Dismissed</option>
                  <option>Withdrawn</option>
                  <option>Transferred</option>
                </select>
              </div>

              <div className={styles.closure_fieldBlock}>
                <label>Closure Date</label>
                <input
                  type="date"
                  value={closureDate}
                  onChange={(e) => setClosureDate(e.target.value)}
                  className={styles.closure_input}
                />
              </div>

              <div className={styles.closure_fieldBlock}>
                <label>Enforcement Status</label>
                <select
                  value={enforcement}
                  onChange={(e) => setEnforcement(e.target.value)}
                  className={styles.closure_input}
                >
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>

              <div className={styles.closure_fieldBlock}>
                <label>Archival Location</label>
                <input
                  type="text"
                  placeholder="e.g., Archive Room A, Shelf 12"
                  value={archivalLocation}
                  onChange={(e) => setArchivalLocation(e.target.value)}
                  className={styles.closure_input}
                />
              </div>
            </div>

            {/* ---- Judgment Summary ---- */}
            <div className={styles.closure_fieldBlock}>
              <label>Judgment Summary</label>
              <textarea
                className={styles.closure_textarea}
                placeholder="Enter judgment summary..."
                value={judgmentSummary}
                onChange={(e) => setJudgmentSummary(e.target.value)}
              />
            </div>

            {/* ---- Final Order ---- */}
            <div className={styles.closure_fieldBlock}>
              <label>Final Order</label>
              <textarea
                className={styles.closure_textarea}
                placeholder="Enter final order details..."
                value={finalOrder}
                onChange={(e) => setFinalOrder(e.target.value)}
              />
            </div>

            {/* ---- Remarks ---- */}
            <div className={styles.closure_fieldBlock}>
              <label>Remarks</label>
              <textarea
                className={styles.closure_textarea}
                placeholder="Enter any additional remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* ---- Button ---- */}
            <button className={styles.closure_closeBtn}>📄 Close Case</button>
          </div>
        )}

        {subTab === "Statistics" && (
          <div className={styles.stats_wrapper}>
            {/* ========= TOP SUMMARY CARDS ========= */}
            <div className={styles.stats_topGrid}>
              <div className={styles.stats_card}>
                <h3>18</h3>
                <p>Total Cases</p>
              </div>

              <div className={styles.stats_card}>
                <h3 className={styles.blue}>12</h3>
                <p>Active Cases</p>
              </div>

              <div className={styles.stats_card}>
                <h3 className={styles.green}>5</h3>
                <p>Disposed Cases</p>
              </div>

              <div className={styles.stats_card}>
                <h3 className={styles.orange}>8</h3>
                <p>Pending Hearings</p>
              </div>
            </div>

            {/*  CLEARANCE / AVERAGE DISPOSAL  */}
            <div className={styles.stats_twoCol}>
              <div className={styles.stats_box}>
                <h4>⚖️ Clearance Rate</h4>
                <h2>33.33%</h2>
                <p>Percentage of cases disposed vs total cases</p>
              </div>

              <div className={styles.stats_box}>
                <h4>⏳ Average Disposal Time</h4>
                <h2>365 days</h2>
                <p>Average time to dispose a case</p>
              </div>
            </div>

            {/* ========= DISPOSITION BREAKDOWN ========= */}
            <div className={styles.stats_section}>
              <h4>Dispositions Breakdown</h4>

              <div className={styles.stats_row4}>
                <div>
                  <h3>3</h3>
                  <p>Disposed</p>
                </div>
                <div>
                  <h3>1</h3>
                  <p>Withdrawn</p>
                </div>
                <div>
                  <h3>1</h3>
                  <p>Settled</p>
                </div>
                <div>
                  <h3>1</h3>
                  <p>Dismissed</p>
                </div>
              </div>
            </div>

            {/*  CASELOAD BY JUDGE  */}
            <div className={styles.stats_section}>
              <h4>📁 Caseload by Judge</h4>

              <div className={styles.stats_list}>
                <div className={styles.stats_judgeRow}>
                  <span>Hon. Justice A.B. Sharma</span>
                  <span className={styles.casePill}>45 cases</span>
                </div>

                <div className={styles.stats_judgeRow}>
                  <span>Hon. Judge M.K. Deshmukh</span>
                  <span className={styles.casePill}>38 cases</span>
                </div>

                <div className={styles.stats_judgeRow}>
                  <span>Hon. Justice R.S. Kulkarni</span>
                  <span className={styles.casePill}>42 cases</span>
                </div>
              </div>
            </div>

            {/*  CASES BY TYPE  */}
            <div className={styles.stats_section}>
              <h4>📊 Cases by Type</h4>

              <div className={styles.stats_row4}>
                <div>
                  <h3>6</h3>
                  <p>Administrative</p>
                </div>
                <div>
                  <h3>4</h3>
                  <p>Labor</p>
                </div>
                <div>
                  <h3>3</h3>
                  <p>Civil</p>
                </div>
                <div>
                  <h3>2</h3>
                  <p>Service</p>
                </div>
                <div>
                  <h3>1</h3>
                  <p>RTI</p>
                </div>
                <div>
                  <h3>1</h3>
                  <p>Criminal</p>
                </div>
                <div>
                  <h3>1</h3>
                  <p>Constitutional</p>
                </div>
                <div>
                  <h3>0</h3>
                  <p>Other</p>
                </div>
              </div>
            </div>

            {/*  PENDING CASE AGE  */}
            <div className={styles.stats_section}>
              <h4>Pending Case Age Distribution</h4>

              <div className={styles.stats_row4}>
                <div>
                  <h3>5</h3>
                  <p>{"<"} 6 months</p>
                </div>
                <div>
                  <h3>3</h3>
                  <p>6–12 months</p>
                </div>
                <div>
                  <h3>2</h3>
                  <p>1–2 years</p>
                </div>
                <div>
                  <h3 className={styles.red}>2</h3>
                  <p>{">"}2 years</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
