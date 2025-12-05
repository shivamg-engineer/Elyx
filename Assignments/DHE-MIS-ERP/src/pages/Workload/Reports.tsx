import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./Workload.module.css";
import { useState } from "react";

export const Reports=()=>{

     const summaryCards = [
        {
          title: "Total Subjects",
          value: "10",
          sub: "Across all courses",
        },
        {
          title: "Total Workload",
          value: "618",
          sub: "Hours per week",
        },
        {
          title: "Staff Status",
          value: "19/25",
          sub: "Available / Required",
        },
        {
          title: "Total Vacancies",
          value: "7",
          sub: "Positions to fill",
          valueRed: true,
        },
      ];
    
      const workloadData = [
        { subject: "Computer Sc.", theory: 48, practical: 36 },
        { subject: "Mathematics", theory: 50, practical: 0 },
        { subject: "Physics", theory: 25, practical: 28 },
        { subject: "Chemistry", theory: 25, practical: 28 },
        { subject: "English", theory: 60, practical: 0 },
        { subject: "History", theory: 40, practical: 0 },
        { subject: "Economics", theory: 40, practical: 0 },
        { subject: "Commerce", theory: 80, practical: 15 },
        { subject: "IT", theory: 50, practical: 60 },
        { subject: "Biotech", theory: 12, practical: 32 },
      ];
    
      const staffData = [
        { subject: "Computer Sc.", required: 3, available: 2 },
        { subject: "Mathematics", required: 2, available: 2 },
        { subject: "Physics", required: 2, available: 1 },
        { subject: "Chemistry", required: 2, available: 2 },
        { subject: "English", required: 2, available: 3 },
        { subject: "History", required: 2, available: 1 },
        { subject: "Economics", required: 2, available: 2 },
        { subject: "Commerce", required: 4, available: 3 },
        { subject: "Information Tec.", required: 4, available: 2 },
        { subject: "Biotechnology", required: 2, available: 1 },
      ];
    
      const statusData = [
        { name: "With Vacancy", value: 6, color: "#3b82f6" },
        { name: "Adequate", value: 3, color: "#10b981" },
        { name: "Surplus", value: 1, color: "#f59e0b" },
      ];
    
      const pieData = [
        { name: "With Vacancy", value: 6 },
        { name: "Adequate", value: 3 },
        { name: "Surplus", value: 1 },
      ];
    
      const data = [
        {
          priority: "HIGH",
          subject: "Information Technology",
          course: "B.Sc. IT",
          current: 2,
          required: 4,
          action: "Recruit",
          notes: "Recruit 2 additional staff member(s)",
        },
        {
          priority: "MEDIUM",
          subject: "Computer Science",
          course: "B.Sc. Computer Science",
          current: 2,
          required: 3,
          action: "Recruit",
          notes: "Recruit 1 additional staff member(s)",
        },
        {
          priority: "MEDIUM",
          subject: "Physics",
          course: "B.Sc. Physics",
          current: 1,
          required: 2,
          action: "Recruit",
          notes: "Recruit 1 additional staff member(s)",
        },
        {
          priority: "MEDIUM",
          subject: "History",
          course: "B.A. History",
          current: 1,
          required: 2,
          action: "Recruit",
          notes: "Recruit 1 additional staff member(s)",
        },
        {
          priority: "MEDIUM",
          subject: "Commerce",
          course: "B.Com",
          current: 3,
          required: 4,
          action: "Recruit",
          notes: "Recruit 1 additional staff member(s)",
        },
        {
          priority: "MEDIUM",
          subject: "Biotechnology",
          course: "B.Sc. Biotechnology",
          current: 1,
          required: 2,
          action: "Recruit",
          notes: "Recruit 1 additional staff member(s)",
        },
        {
          priority: "LOW",
          subject: "English",
          course: "B.A. English",
          current: 3,
          required: 2,
          action: "Redistribute",
          notes: "Consider redistributing 1 staff to understaffed subjects",
        },
      ];
    
      const badgeColor = {
        HIGH: { bg: "#f87171", color: "white" },
        MEDIUM: { bg: "#065f46", color: "white" },
        LOW: { bg: "#facc15", color: "#78350f" },
      };
    
      //  ADD THESE HERE
      const th = {
        padding: "12px",
        fontSize: "13px",
        color: "#444",
      };
    
      const td = {
        padding: "12px",
        fontSize: "14px",
        color: "#111",
      };

  const [reportTab, setReportTab] = useState("overview");

    return (
        <div className={styles.page}>
            {/* HEADER */}
            <div className={styles.headerRow}>
              <div>
                <h1 className={styles.title}>📄 Workload Report</h1>
                <p className={styles.subtitle}>
                  Comprehensive workload analysis and staff recommendations
                </p>
              </div>

              <div className={styles.exportBtns}>
                <button className={styles.grayBtn}>🖨 Print</button>
                <button className={styles.grayBtn}>📄 Export Excel</button>
                <button className={styles.greenBtn}>⬇ Export PDF</button>
              </div>
            </div>

            {/* SUMMARY CARDS */}
            <div className={styles.summaryGrid}>
              {summaryCards.map((card, i) => (
                <div key={i} className={styles.summaryCard}>
                  <p className={styles.cardTitle}>{card.title}</p>
                  <h2
                    className={
                      card.valueRed ? styles.redValue : styles.mainValue
                    }
                  >
                    {card.value}
                  </h2>
                  <p className={styles.cardSub}>{card.sub}</p>
                </div>
              ))}
            </div>

            {/* TABS */}
            <div className={styles.tabs}>
              {["overview", "detailed", "charts", "recommendations"].map(
                (t) => (
                  <div
                    key={t}
                    onClick={() => setReportTab(t)}
                    className={
                      reportTab === t
                        ? `${styles.tab} ${styles.activeTab}`
                        : styles.tab
                    }
                  >
                    {t === "overview" && "Overview"}
                    {t === "detailed" && "Detailed View"}
                    {t === "charts" && "Charts"}
                    {t === "recommendations" && "Recommendations"}
                  </div>
                )
              )}
            </div>

            {/* TAB CONTENT */}
            {reportTab === "overview" && (
              <div className={styles.overviewCard}>
                <h2 className={styles.sectionTitle}>Workload Summary</h2>
                <p className={styles.sectionSub}>
                  Overall workload distribution and utilization
                </p>

                {/* Top 3 summary cards */}
                <div className={styles.summaryGrid}>
                  <div className={styles.summaryBox}>
                    <label>Total Students</label>
                    <h2>1245</h2>
                  </div>

                  <div className={styles.summaryBox}>
                    <label>Average Utilization</label>
                    <h2 className={styles.blueText}>203%</h2>
                  </div>

                  <div className={styles.summaryBox}>
                    <label>Subjects with Vacancy</label>
                    <h2 className={styles.redText}>6</h2>
                  </div>
                </div>

                {/* Red Warning Banner */}
                <div className={styles.warningBanner}>
                  <span className={styles.warnIcon}>⚠</span>
                  <span className={styles.warnText}>
                    <strong>7 staff positions</strong> need to be filled across
                    6 subjects. Review the recommendations tab for detailed
                    action items.
                  </span>
                </div>
              </div>
            )}

            {reportTab === "detailed" && (
              <div className={styles.contentCard}>
                <h2 className={styles.sectionTitle}>
                  Subject-wise Workload Distribution
                </h2>
                <p className={styles.sectionSub}>
                  Detailed breakdown of workload for each subject
                </p>

                <div className={styles.tableWrapper}>
                  <table className={styles.fullTable}>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Course</th>
                        <th>Students</th>
                        <th>Total Workload</th>
                        <th>Required</th>
                        <th>Available</th>
                        <th>Vacancy</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        {
                          subject: "Computer Science",
                          course: "B.Sc. Computer Science",
                          students: 180,
                          workload: "84 hrs",
                          required: 3,
                          available: 2,
                          vacancy: -1,
                        },
                        {
                          subject: "Mathematics",
                          course: "B.Sc. Mathematics",
                          students: 120,
                          workload: "50 hrs",
                          required: 2,
                          available: 2,
                          vacancy: 0,
                        },
                        {
                          subject: "Physics",
                          course: "B.Sc. Physics",
                          students: 90,
                          workload: "51 hrs",
                          required: 2,
                          available: 1,
                          vacancy: -1,
                        },
                        {
                          subject: "Chemistry",
                          course: "B.Sc. Chemistry",
                          students: 75,
                          workload: "51 hrs",
                          required: 2,
                          available: 2,
                          vacancy: 0,
                        },
                        {
                          subject: "English",
                          course: "B.A. English",
                          students: 150,
                          workload: "60 hrs",
                          required: 2,
                          available: 3,
                          vacancy: 1,
                        },
                        {
                          subject: "History",
                          course: "B.A. History",
                          students: 100,
                          workload: "40 hrs",
                          required: 2,
                          available: 1,
                          vacancy: -1,
                        },
                        {
                          subject: "Economics",
                          course: "B.A. Economics",
                          students: 110,
                          workload: "40 hrs",
                          required: 2,
                          available: 2,
                          vacancy: 0,
                        },
                        {
                          subject: "Commerce",
                          course: "B.Com",
                          students: 200,
                          workload: "96 hrs",
                          required: 4,
                          available: 3,
                          vacancy: -1,
                        },
                        {
                          subject: "Information Technology",
                          course: "B.Sc. IT",
                          students: 160,
                          workload: "102 hrs",
                          required: 4,
                          available: 2,
                          vacancy: -2,
                        },
                        {
                          subject: "Biotechnology",
                          course: "B.Sc. Biotechnology",
                          students: 60,
                          workload: "44 hrs",
                          required: 2,
                          available: 1,
                          vacancy: -1,
                        },
                      ].map((row, index) => (
                        <tr key={index}>
                          <td>{row.subject}</td>
                          <td>{row.course}</td>
                          <td>{row.students}</td>
                          <td>{row.workload}</td>
                          <td>{row.required}</td>
                          <td>{row.available}</td>
                          <td>
                            {row.vacancy < 0 && (
                              <span
                                className={`${styles.badge} ${styles.badgeRed}`}
                              >
                                ⚠ {Math.abs(row.vacancy)}
                              </span>
                            )}

                            {row.vacancy === 0 && (
                              <span
                                className={`${styles.badge} ${styles.badgeGreen}`}
                              >
                                ✓ Adequate
                              </span>
                            )}

                            {row.vacancy > 0 && (
                              <span
                                className={`${styles.badge} ${styles.badgeYellow}`}
                              >
                                ↝ {row.vacancy} Surplus
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* reports/charts */}
            {reportTab === "charts" && (
              <div>
                <div
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    marginBottom: "20px",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "10px",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    📊 Workload Distribution by Subject
                  </h3>

                  <div style={{ width: "100%", height: "350px" }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={workloadData}
                        margin={{ top: 10, right: 30, bottom: 50, left: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="subject"
                          angle={-40}
                          textAnchor="end"
                          interval={0}
                          height={70}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar
                          dataKey="theory"
                          name="Theory Workload"
                          fill="#3b82f6"
                        />
                        <Bar
                          dataKey="practical"
                          name="Practical Workload"
                          fill="#10b981"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    marginTop: "20px",
                  }}
                >
                  {/* GRID WITH 2 CHARTS */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    {/* LEFT --- BAR CHART */}
                    <div
                      style={{
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <h3
                        style={{
                          marginBottom: "10px",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        📉 Staff Requirement vs Availability
                      </h3>

                      <div style={{ width: "100%", height: "280px" }}>
                        <ResponsiveContainer>
                          <BarChart
                            data={staffData}
                            margin={{ top: 10, right: 20, bottom: 40, left: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="subject"
                              angle={-40}
                              textAnchor="end"
                              interval={0}
                              height={70}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />

                            <Bar
                              dataKey="required"
                              fill="#f59e0b"
                              name="Required Staff"
                            />
                            <Bar
                              dataKey="available"
                              fill="#10b981"
                              name="Available Staff"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* RIGHT --- PIE CHART */}
                    <div
                      style={{
                        padding: "20px",
                        background: "white",
                        borderRadius: "10px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <h3
                        style={{
                          marginBottom: "10px",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        🧭 Staffing Status Distribution
                      </h3>

                      <div style={{ width: "100%", height: "280px" }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie
                              data={statusData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label
                            >
                              {statusData.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* LABELS BELOW PIE */}
                      <div style={{ textAlign: "center", marginTop: "-10px" }}>
                        {statusData.map((item) => (
                          <p
                            key={item.name}
                            style={{
                              color: item.color,
                              fontWeight: "500",
                              margin: "4px 0",
                            }}
                          >
                            {item.name}: {item.value}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* recommendation */}
            {reportTab === "recommendations" && (
               <div
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  marginTop: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  🔀 Staff Recommendations
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#666",
                    marginBottom: "15px",
                  }}
                >
                  Recommended actions to address staffing gaps
                </p>

                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb", textAlign: "left" }}>
                      <th style={th}>Priority</th>
                      <th style={th}>Subject</th>
                      <th style={th}>Course</th>
                      <th style={th}>Current Staff</th>
                      <th style={th}>Required Staff</th>
                      <th style={th}>Action</th>
                      <th style={th}>Notes</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      {
                        priority: "HIGH",
                        subject: "Information Technology",
                        course: "B.Sc. IT",
                        current: 2,
                        required: 4,
                        action: "Recruit",
                        notes: "Recruit 2 additional staff member(s)",
                      },
                      {
                        priority: "MEDIUM",
                        subject: "Computer Science",
                        course: "B.Sc. Computer Science",
                        current: 2,
                        required: 3,
                        action: "Recruit",
                        notes: "Recruit 1 additional staff member(s)",
                      },
                      {
                        priority: "MEDIUM",
                        subject: "Physics",
                        course: "B.Sc. Physics",
                        current: 1,
                        required: 2,
                        action: "Recruit",
                        notes: "Recruit 1 additional staff member(s)",
                      },
                      {
                        priority: "MEDIUM",
                        subject: "History",
                        course: "B.A. History",
                        current: 1,
                        required: 2,
                        action: "Recruit",
                        notes: "Recruit 1 additional staff member(s)",
                      },
                      {
                        priority: "MEDIUM",
                        subject: "Commerce",
                        course: "B.Com",
                        current: 3,
                        required: 4,
                        action: "Recruit",
                        notes: "Recruit 1 additional staff member(s)",
                      },
                      {
                        priority: "MEDIUM",
                        subject: "Biotechnology",
                        course: "B.Sc. Biotechnology",
                        current: 1,
                        required: 2,
                        action: "Recruit",
                        notes: "Recruit 1 additional staff member(s)",
                      },
                      {
                        priority: "LOW",
                        subject: "English",
                        course: "B.A. English",
                        current: 3,
                        required: 2,
                        action: "Redistribute",
                        notes:
                          "Consider redistributing 1 staff to understaffed subjects",
                      },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={td}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: 600,
                              background:
                                row.priority === "HIGH"
                                  ? "#f87171"
                                  : row.priority === "MEDIUM"
                                  ? "#059669"
                                  : "#facc15",
                              color:
                                row.priority === "LOW" ? "#78350f" : "white",
                            }}
                          >
                            {row.priority}
                          </span>
                        </td>

                        <td style={td}>{row.subject}</td>
                        <td style={td}>{row.course}</td>
                        <td style={td}>{row.current}</td>
                        <td style={td}>{row.required}</td>

                        <td style={td}>
                          <button
                            style={{
                              padding: "6px 14px",
                              borderRadius: "14px",
                              cursor: "pointer",
                              border: "none",
                              fontSize: "12px",
                              background:
                                row.action === "Recruit"
                                  ? "#065f46"
                                  : "#facc15",
                              color:
                                row.action === "Recruit" ? "white" : "#78350f",
                            }}
                          >
                            {row.action}
                          </button>
                        </td>

                        <td style={td}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
    );
}