import { useState } from "react";
import styles from "./Research.module.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Research() {
  const [subTab, setSubTab] = useState("researchGuides");
  // ---------------- Chart Data ----------------
  const deptData = [
    { name: "Physics", guides: 1, registered: 9, completed: 5 },
    { name: "Chemistry", guides: 2, registered: 10, completed: 6 },
    { name: "Mathematics", guides: 1, registered: 9, completed: 6 },
    { name: "English", guides: 1, registered: 7, completed: 4 },
    { name: "History", guides: 1, registered: 6, completed: 4 },
    { name: "Economics", guides: 1, registered: 9, completed: 6 },
    { name: "Computer Science", guides: 1, registered: 10, completed: 6 },
    { name: "Botany", guides: 1, registered: 8, completed: 5 },
    { name: "Sociology", guides: 1, registered: 7, completed: 6 },
    { name: "Psychology", guides: 1, registered: 7, completed: 6 },
    { name: "Political Science", guides: 1, registered: 8, completed: 6 },
    { name: "Commerce", guides: 1, registered: 11, completed: 9 },
    { name: "Geography", guides: 1, registered: 7, completed: 6 },
    { name: "Zoology", guides: 1, registered: 7, completed: 6 },
    { name: "Philosophy", guides: 1, registered: 8, completed: 10 },
  ];

  const pieData = [
    { name: "PhD", value: 67 },
    { name: "M.Phil", value: 33 },
  ];

  const COLORS = ["#4285F4", "#A36BFE"];

  const genderData = [
    { gender: "Male", registered: 50, completed: 48 },
    { gender: "Female", registered: 55, completed: 49 },
  ];

  const data = [
    { name: "Physics", reg: 9, comp: 5, rate: "35.7%", guides: 1 },
    { name: "Chemistry", reg: 10, comp: 6, rate: "37.5%", guides: 1 },
    { name: "Mathematics", reg: 9, comp: 6, rate: "40.0%", guides: 1 },
    { name: "English", reg: 7, comp: 4, rate: "36.4%", guides: 1 },
    { name: "History", reg: 7, comp: 5, rate: "41.7%", guides: 1 },
    { name: "Economics", reg: 10, comp: 6, rate: "37.5%", guides: 1 },
    { name: "Computer Science", reg: 11, comp: 6, rate: "35.3%", guides: 1 },
    { name: "Botany", reg: 9, comp: 6, rate: "40.0%", guides: 1 },
    { name: "Sociology", reg: 9, comp: 7, rate: "43.8%", guides: 1 },
    { name: "Psychology", reg: 8, comp: 7, rate: "46.7%", guides: 1 },
    { name: "Political Science", reg: 9, comp: 7, rate: "43.8%", guides: 1 },
    { name: "Commerce", reg: 11, comp: 9, rate: "45.0%", guides: 1 },
    { name: "Geography", reg: 8, comp: 8, rate: "100.0%", guides: 1 },
  ];

  return (
    <div className={styles.page}>
      {/* RESEARCH MANAGEMENT */}
      <div className={styles.titleRow}>
        <div>
          <h3>Research Management</h3>
          <p>Track PhD and M.Phil guides with student progress</p>
        </div>
        <div className={styles.actions}>
          <button>Export</button>
          <button className={styles.addBtn}>Add Guide</button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className={styles.statsGrid}>
        <div className={styles.card}>
          <h4>Total Guides</h4>
          <p className={styles.bigNumber}>15</p>
        </div>
        <div className={styles.card}>
          <h4>Registered Students</h4>
          <p className={styles.bigNumber}>109</p>
        </div>
        <div className={styles.card}>
          <h4>Completed Students</h4>
          <p className={styles.bigNumber}>101</p>
        </div>
        <div className={styles.card}>
          <h4>Completion Rate</h4>
          <p className={styles.bigNumber}>48.1%</p>
        </div>

        <div className={styles.card}>
          <h4>Gender Distribution</h4>
          <table>
            <tr>
              <td>Male</td>
              <td>52 registered / 50 completed</td>
            </tr>
            <tr>
              <td>Female</td>
              <td>57 registered / 51 completed</td>
            </tr>
          </table>
        </div>

        <div className={styles.card}>
          <h4>Special Categories</h4>
          <table>
            <tr>
              <td>Physically Handicapped</td>
              <td>4 registered / 0 completed</td>
            </tr>
            <tr>
              <td>Foreign Students</td>
              <td>11 registered / 5 completed</td>
            </tr>
          </table>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles.filterBox}>
        <h4>Filters</h4>
        <div className={styles.filtersRow}>
          <select>
            <option>All Departments</option>
          </select>
          <select>
            <option>All Programs</option>
          </select>
          <select>
            <option>All Status</option>
          </select>
          <input type="text" placeholder="Search guides..." />
        </div>
      </div>

      <div className={styles.subTabs}>
        <button
          className={
            subTab === "researchGuides" ? styles.active_sub_tab : styles.subTab
          }
          onClick={() => setSubTab("researchGuides")}
        >
          Research Guides
        </button>
        <button
          className={
            subTab === "statistics" ? styles.active_sub_tab : styles.subTab
          }
          onClick={() => setSubTab("statistics")}
        >
          Statistics & Charts
        </button>
      </div>

      {/* TABLE SECTION */}

      {subTab === "researchGuides" && (
        <div>
          <h3>Research Guides</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Guide Name</th>
                <th>Department</th>
                <th>Subject</th>
                <th>Program</th>
                <th>Registered</th>
                <th>Completed</th>
                <th>PhD/Foreign</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dr. Rajesh Kumar</td>
                <td>Physics</td>
                <td>Quantum Mechanics</td>
                <td>
                  <span className={styles.tag}>PhD</span>
                </td>
                <td>9</td>
                <td>8</td>
                <td>1/0</td>
                <td>
                  <span className={styles.statusActive}>Active</span>
                </td>
              </tr>
              <tr>
                <td>Dr. Priya Sharma</td>
                <td>Chemistry</td>
                <td>Organic Chemistry</td>
                <td>
                  <span className={styles.tag}>PhD</span>
                </td>
                <td>10</td>
                <td>7</td>
                <td>0/1</td>
                <td>
                  <span className={styles.statusActive}>Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {subTab === "statistics" && (
        <div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              width: "100%",
              height: "420px",
            }}
          >
            <h2
              style={{ margin: "0 0 5px", fontSize: "22px", fontWeight: "600" }}
            >
              Department-wise Research Activity
            </h2>

            <p style={{ margin: "0 0 20px", fontSize: "14px", color: "#666" }}>
              Guides and students by department
            </p>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="guides" fill="#4285F4" name="Guides" />
                <Bar dataKey="registered" fill="#FBBC05" name="Registered" />
                <Bar dataKey="completed" fill="#34A853" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
              width: "100%",
              padding: "0",
            }}
          >
            {/* 1️⃣ Program Type Distribution */}
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                height: "350px",
              }}
            >
              <h2
                style={{ margin: "0 0 5px", fontSize: "22px", fontWeight: 600 }}
              >
                Program Type Distribution
              </h2>
              <p
                style={{ margin: "0 0 20px", fontSize: "14px", color: "#666" }}
              >
                PhD vs M.Phil guides
              </p>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={90}
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 2️⃣ Gender-wise Student Distribution */}
            <div
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                height: "350px",
              }}
            >
              <h2
                style={{ margin: "0 0 5px", fontSize: "22px", fontWeight: 600 }}
              >
                Gender-wise Student Distribution
              </h2>
              <p
                style={{ margin: "0 0 20px", fontSize: "14px", color: "#666" }}
              >
                Registered vs Completed by gender
              </p>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={genderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="gender" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="registered" fill="#FBBC05" name="Registered" />
                  <Bar dataKey="completed" fill="#34A853" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* departmentwise data */}
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              border: "1px solid #e5e5e5",
              padding: "25px",
              width: "100%",
            }}
          >
            {/* Header */}
            <h2 style={{ margin: 0 }}>Department-wise Statistics</h2>
            <p style={{ marginTop: 4, marginBottom: 20, color: "#666" }}>
              Detailed breakdown by department
            </p>

            {/* Rows */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {data.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "14px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {/* Name + Registered */}
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "16px",
                      }}
                    >
                      {d.name}
                    </p>
                    <p style={{ margin: 0, color: "#444", fontSize: "14px" }}>
                      Registered: <b>{d.reg}</b>
                    </p>
                  </div>

                  {/* Completed */}
                  <div>
                    <p style={{ margin: 0, color: "#444", fontSize: "14px" }}>
                      Completed:{" "}
                      <span style={{ color: "#16a34a", fontWeight: 600 }}>
                        {d.comp}
                      </span>
                    </p>
                  </div>

                  {/* Rate */}
                  <div>
                    <p style={{ margin: 0, color: "#444", fontSize: "14px" }}>
                      Rate: <b style={{ color: "#555" }}>{d.rate}</b>
                    </p>
                  </div>

                  {/* Guides pill */}
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "50px",
                      padding: "4px 12px",
                      fontSize: "13px",
                      color: "#333",
                      background: "#f8f8f8",
                    }}
                  >
                    {d.guides} guides
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
