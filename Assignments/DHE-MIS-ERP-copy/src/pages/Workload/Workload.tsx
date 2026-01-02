import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Workload.module.css";


import { Reports } from "./Reports";

export const Workload = () => {
  const [mainTab, setMainTab] = useState("calculator");

  const availableParams = [
    {
      id: "studentCount",
      name: "studentCount",
      description: "Total number of students enrolled",
      unitLabel: "Unit: students",
    },
    {
      id: "studentsPerDivision",
      name: "studentsPerDivision",
      description: "Maximum students per division",
      unitLabel: "Unit: students",
    },
    {
      id: "theoryPapers",
      name: "theoryPapers",
      description: "Number of theory papers",
      unitLabel: "Unit: papers",
    },
    {
      id: "practicalPapers",
      name: "practicalPapers",
      description: "Number of practical papers",
      unitLabel: "Unit: papers",
    },
    {
      id: "lectureHoursPerWeek",
      name: "lectureHoursPerWeek",
      description: "Theory lecture hours per week",
      unitLabel: "Unit: hours",
    },
    {
      id: "practicalHoursPerWeek",
      name: "practicalHoursPerWeek",
      description: "Practical hours per week",
      unitLabel: "Unit: hours",
    },
  ];

  const configuredFormulas = [
    {
      id: 1,
      university: "University of Mumbai",
      studentsPerDivision: 60,
      effectiveFrom: "6/1/2024",
      status: "Active",
    },
    {
      id: 2,
      university: "Savitri Bai Phule Pune University",
      studentsPerDivision: 50,
      effectiveFrom: "6/1/2024",
      status: "Active",
    },
  ];

 


  return (
    <DashboardLayout>
      <div className={styles.page}>
        {/* PAGE HEADER */}
        <div className={styles.headerBlock}>
          <h2>Workload Management</h2>
          <p>Calculate workload, configure formulas, and generate reports</p>
        </div>

        {/* TOP TABS */}
        <div className={styles.tabs}>
          <div
            className={
              mainTab === "calculator"
                ? `${styles.activeTab} ${styles.tab}`
                : `${styles.tab}`
            }
            onClick={() => setMainTab("calculator")}
          >
            📘 Calculator
          </div>
          <div
            className={
              mainTab === "formula"
                ? `${styles.activeTab} ${styles.tab}`
                : `${styles.tab}`
            }
            onClick={() => setMainTab("formula")}
          >
            ⚙️ Formula Config
          </div>
          <div
            className={
              mainTab === "reports"
                ? `${styles.activeTab} ${styles.tab}`
                : `${styles.tab}`
            }
            onClick={() => setMainTab("reports")}
          >
            📄 Reports
          </div>
        </div>

        {/* WORKLOAD CALCULATOR CARD */}
        {mainTab === "calculator" && (
          <div>
            {/* PAGE HEADER */}
            <div className={styles.headerBlock}>
              <h2>Available Parameters</h2>
              <p>Parameters that can be used in formula expressions</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>📘 Workload Calculator</h3>
                <span className={styles.smallNote}>
                  Calculate faculty workload based on student enrollment and
                  course structure
                </span>
              </div>

              {/* 2-COLUMN FORM */}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Subject</label>
                  <input type="text" placeholder="Computer Science" />
                </div>

                <div className={styles.formGroup}>
                  <label>Course</label>
                  <input type="text" placeholder="B.Sc Computer Science" />
                </div>

                <div className={styles.formGroup}>
                  <label>Year</label>
                  <input type="number" placeholder="1" />
                </div>

                <div className={styles.formGroup}>
                  <label>Semester</label>
                  <input type="number" placeholder="1" />
                </div>

                <div className={styles.formGroup}>
                  <label>Student Count</label>
                  <input type="number" placeholder="80" />
                </div>

                <div className={styles.formGroup}>
                  <label>Divisions</label>
                  <input type="number" placeholder="1" />
                </div>

                <div className={styles.formGroup}>
                  <label>Theory Papers</label>
                  <input type="number" placeholder="2" />
                </div>

                <div className={styles.formGroup}>
                  <label>Practical Papers</label>
                  <input type="number" placeholder="2" />
                </div>

                <div className={styles.formGroup}>
                  <label>Lecture Hours/Week</label>
                  <input type="number" placeholder="6" />
                </div>

                <div className={styles.formGroup}>
                  <label>Practical Hours/Week</label>
                  <input type="number" placeholder="6" />
                </div>

                <div className={styles.formGroup}>
                  <label>Available Staff</label>
                  <input type="number" placeholder="2" />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className={styles.actionRow}>
                <button className={styles.calcBtn}>Calculate</button>
                <button className={styles.resetBtn}>Reset</button>
              </div>
            </div>

            {/* RESULTS CARD */}
            <div className={styles.resultCard}>
              <h3>Calculation Results</h3>

              <div className={styles.resultsGrid}>
                <div className={styles.resultBox}>
                  <label>Theory Workload</label>
                  <h2>16 hrs</h2>
                </div>

                <div className={styles.resultBox}>
                  <label>Practical Workload</label>
                  <h2>6 hrs</h2>
                </div>

                <div className={styles.resultBox}>
                  <label>Total Workload</label>
                  <h2>22 hrs</h2>
                </div>

                <div className={styles.resultBox}>
                  <label>Required Staff</label>
                  <h2>2</h2>
                </div>

                <div className={styles.resultBox}>
                  <label>Staff Utilization</label>
                  <h2 className={styles.successText}>69%</h2>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ---------- CONFIGURED FORMULAS TABLE ---------- */}
        {mainTab === "formula" && (
          <div>
            <div className={styles.headerBlock}>
              <h2>Formula Configuration</h2>
              <p>Configure university-specific workload calculation formulas</p>
            </div>
            {/* Available Parameters */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>⚙️ Available Parameters</h3>
                <span className={styles.smallNote}>
                  Parameters that can be used in formula expressions
                </span>
              </div>

              <div className={styles.paramGrid}>
                {availableParams.map((p) => (
                  <div key={p.id} className={styles.paramCard}>
                    <div className={styles.paramName}>{p.name}</div>
                    <div className={styles.paramDescription}>
                      {p.description}
                    </div>
                    <div className={styles.paramUnit}>{p.unitLabel}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configured Formulas Table */}
            <div className={styles.card}>
              <h3>Configured Formulas</h3>
              <p className={styles.smallNote}>
                Manage existing workload calculation formulas
              </p>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>University</th>
                      <th>Students/Division</th>
                      <th>Effective From</th>
                      <th>Status</th>
                      <th className={styles.actionCol}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {configuredFormulas.map((row) => (
                      <tr key={row.id}>
                        <td>{row.university}</td>
                        <td>{row.studentsPerDivision}</td>
                        <td>{row.effectiveFrom}</td>
                        <td>
                          <span className={styles.activeBadge}>Active</span>
                        </td>
                        <td className={styles.actionCol}>
                          <button className={styles.editBtn}>✏️ Edit</button>
                          <button className={styles.deactivateBtn}>
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {mainTab === "reports" && (
          <Reports/>
        )}
      </div>
    </DashboardLayout>
  );
};
