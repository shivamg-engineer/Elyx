import {
  LuBuilding2,
  LuUsers,
  LuGraduationCap,
  LuCircleAlert,
  LuFileSpreadsheet,
  LuCalendar,
  LuDownload,
  LuFileText,
} from "react-icons/lu";

import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Reports.module.css";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Reports = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [subTab, setSubTab] = useState("Overview");
  const tabs = ["Overview", "Institutes", "Staffing", "Students", "Operations"];

  // --- Chart Data ---
  const monthlyRegistrations = [
    { month: "Jan", value: 16 },
    { month: "Feb", value: 18 },
    { month: "Mar", value: 22 },
    { month: "Apr", value: 25 },
    { month: "May", value: 20 },
    { month: "Jun", value: 28 },
    { month: "Jul", value: 30 },
    { month: "Aug", value: 28 },
  ];

  const applicationStatus = [
    { name: "Approved", value: 63, color: "#f6a11a" },
    { name: "Pending", value: 19, color: "#4f8dfd" },
    { name: "Under Review", value: 9, color: "#08c07c" },
    { name: "Rejected", value: 3, color: "#e04444" },
    { name: "Correction Required", value: 5, color: "#b44fff" },
  ];

  const regionInstitutes = [
    { name: "Mumbai", value: 290 },
    { name: "Pune", value: 240 },
    { name: "Nagpur", value: 170 },
    { name: "Nashik", value: 150 },
    { name: "Aurangabad", value: 140 },
    { name: "Others", value: 260 },
  ];

  const monthlyActivity = [
    { m: "Jan", applications: 40, approved: 35, rejected: 5 },
    { m: "Feb", applications: 50, approved: 45, rejected: 5 },
    { m: "Mar", applications: 45, approved: 42, rejected: 3 },
    { m: "Apr", applications: 55, approved: 50, rejected: 5 },
    { m: "May", applications: 58, approved: 53, rejected: 5 },
    { m: "Jun", applications: 62, approved: 57, rejected: 5 },
  ];

  // --- DATA --- for institute chart
  const instituteTypes = [
    { name: "College", value: 980, color: "#4f8dfd" },
    { name: "University", value: 145, color: "#08c07c" },
    { name: "Deemed University", value: 67, color: "#ffb400" },
    { name: "Autonomous", value: 55, color: "#ff4a4a" },
  ];

  const universityWise = [
    { name: "Mumbai Univ.", value: 310 },
    { name: "Pune Univ.", value: 260 },
    { name: "Nagpur Univ.", value: 190 },
    { name: "Shivaji Univ.", value: 160 },
    { name: "Others", value: 380 },
  ];
  const pieData = [
    { name: "College", value: 980, color: "#4285F4" },
    { name: "University", value: 145, color: "#34A853" },
    { name: "Deemed University", value: 67, color: "#FBBC05" },
    { name: "Autonomous", value: 55, color: "#EA4335" },
  ];

  const barData = [
    { name: "Mumbai Univ.", value: 320 },
    { name: "Pune Univ.", value: 260 },
    { name: "Nagpur Univ.", value: 190 },
    { name: "Shivaji Univ.", value: 165 },
    { name: "Others", value: 390 },
  ];

  // ///////////////////////////
  // Chart 1 - Staff by Category
  const categoryData = [
    { name: "General", count: 24000 },
    { name: "OBC", count: 16000 },
    { name: "SC", count: 7000 },
    { name: "ST", count: 4000 },
    { name: "EWS", count: 1500 },
  ];

  // Chart 2 - Approved vs Filled Positions
  const positionsData = [
    { dept: "Computer Science", approved: 3500, filled: 3100 },
    { dept: "Mathematics", approved: 2800, filled: 2600 },
    { dept: "Physics", approved: 2500, filled: 2300 },
    { dept: "Chemistry", approved: 2300, filled: 2100 },
    { dept: "English", approved: 2000, filled: 1800 },
    { dept: "Commerce", approved: 3300, filled: 3000 },
  ];

  // Chart 3 - Salary Distribution
  const salaryData = [
    { range: "< 30k", count: 8000 },
    { range: "30k-50k", count: 15000 },
    { range: "50k-70k", count: 19000 },
    { range: "70k-100k", count: 8000 },
    { range: "> 100k", count: 3000 },
  ];

  // Chart 4 - NOC Applications Trend
  const nocTrend = [
    { month: "Jan", applications: 24, approved: 20 },
    { month: "Feb", applications: 28, approved: 24 },
    { month: "Mar", applications: 22, approved: 18 },
    { month: "Apr", applications: 30, approved: 25 },
    { month: "May", applications: 27, approved: 22 },
    { month: "Jun", applications: 32, approved: 28 },
  ];
  // //////////////////////

  // Students--------
  // 1 Student Enrollment Trend
  const enrollmentTrend = [
    { year: "2019", students: 2400000 },
    { year: "2020", students: 2600000 },
    { year: "2021", students: 2800000 },
    { year: "2022", students: 3000000 },
    { year: "2023", students: 3150000 },
  ];

  // 2Course-wise Enrollment
  const courseEnrollment = [
    { course: "BA", students: 850000 },
    { course: "BSc", students: 730000 },
    { course: "BCom", students: 690000 },
    { course: "BTech", students: 410000 },
    { course: "MA", students: 180000 },
    { course: "MSc", students: 150000 },
    { course: "MCom", students: 120000 },
    { course: "MTech", students: 55000 },
    { course: "PhD", students: 25000 },
  ];

  // 3Category-wise Students

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#A855F7"];

  // 4Scholarship Distribution
  const scholarshipData = [
    { type: "Central Govt", count: 450000 },
    { type: "State Govt", count: 680000 },
    { type: "Institutional", count: 260000 },
    { type: "Private", count: 130000 },
  ];

  // //////////////////////for Operations
  // 1 Grievance Status
  const grievanceData = [
    { name: "Pending", value: 23, color: "#3B82F6" },
    { name: "Under Investigation", value: 15, color: "#10B981" },
    { name: "Resolved", value: 145, color: "#F59E0B" },
    { name: "Closed", value: 87, color: "#EF4444" },
  ];

  // 2 RTI Applications Trend
  const rtiTrend = [
    { month: "Jan", applications: 80 },
    { month: "Feb", applications: 90 },
    { month: "Mar", applications: 100 },
    { month: "Apr", applications: 93 },
    { month: "May", applications: 105 },
    { month: "Jun", applications: 113 },
  ];

  // 3 Asset Utilization
  const assetData = [
    { category: "Computers", total: 20000, allocated: 15000 },
    { category: "Furniture", total: 40000, allocated: 38000 },
    { category: "Lab Equipment", total: 12000, allocated: 9000 },
    { category: "Vehicles", total: 15000, allocated: 9000 },
    { category: "Books", total: 2500000, allocated: 2100000 },
  ];

  // 4Legal Cases Status
  const legalCases = [
    { name: "Active", value: 34, color: "#3B82F6" },
    { name: "Pending Hearing", value: 18, color: "#10B981" },
    { name: "Under Review", value: 12, color: "#F59E0B" },
    { name: "Closed", value: 156, color: "#EF4444" },
  ];

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
              <div className={styles.gridWrapper}>
                {/* -------- CARD 1: Monthly Registration Trend -------- */}
                <div className={styles.card}>
                  <h3>Monthly Registrations Trend</h3>
                  <p>Institute registrations over time</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={monthlyRegistrations}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4f8dfd"
                        dot
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* -------- CARD 2: Pie Chart Application Status -------- */}
                <div className={styles.card}>
                  <h3>Application Status</h3>
                  <p>Current application distribution</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={applicationStatus}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label
                      >
                        {applicationStatus.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* -------- CARD 3: Bar Chart Region-wise Distribution -------- */}
                <div className={styles.card}>
                  <h3>Region-wise Institute Distribution</h3>
                  <p>Institutes across Maharashtra</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={regionInstitutes}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#4f8dfd" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* -------- CARD 4: Monthly Activity Overview -------- */}
                <div className={styles.card}>
                  <h3>Monthly Activity Overview</h3>
                  <p>Applications, approvals, and rejections</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={monthlyActivity}>
                      <XAxis dataKey="m" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        dataKey="applications"
                        stroke="#4f8dfd"
                        fill="#4f8dfd40"
                      />
                      <Area
                        dataKey="approved"
                        stroke="#08c07c"
                        fill="#08c07c40"
                      />
                      <Area
                        dataKey="rejected"
                        stroke="#e04444"
                        fill="#e0444440"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {/* institutes */}

            {subTab === "Institutes" && (
              <div className={styles.mainContainer}>
                {/* LEFT PIE CHART */}
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>Institute Types</h3>
                  <p className={styles.cardSub}>Distribution by type</p>

                  <div className={styles.pieSection}>
                    <div className={styles.pieLeft}>
                      <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                          <Pie
                            dataKey="value"
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={95}
                            innerRadius={55}
                            paddingAngle={2}
                          >
                            {pieData.map((item, idx) => (
                              <Cell key={idx} fill={item.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className={styles.pieRight}>
                      <p style={{ color: "#4285F4" }}>College: 980</p>
                      <p style={{ color: "#34A853" }}>University: 145</p>
                      <p style={{ color: "#FBBC05" }}>Deemed University: 67</p>
                      <p style={{ color: "#EA4335" }}>Autonomous: 55</p>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className={styles.legendRow}>
                    <span
                      className={styles.legendDot}
                      style={{ background: "#4285F4" }}
                    ></span>{" "}
                    College
                    <span
                      className={styles.legendDot}
                      style={{ background: "#34A853" }}
                    ></span>{" "}
                    University
                    <span
                      className={styles.legendDot}
                      style={{ background: "#FBBC05" }}
                    ></span>{" "}
                    Deemed University
                    <span
                      className={styles.legendDot}
                      style={{ background: "#EA4335" }}
                    ></span>{" "}
                    Autonomous
                  </div>
                </div>

                {/* RIGHT BAR CHART */}
                <div className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    University-wise Distribution
                  </h3>
                  <p className={styles.cardSub}>Institutes by university</p>

                  <div className={styles.barWrap}>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={barData} layout="vertical">
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={110} />
                        <Tooltip />
                        <Bar
                          dataKey="value"
                          fill="#A066FF"
                          radius={[6, 6, 6, 6]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
            {/* Staffing */}
            {subTab === "Staffing" && (
              <div className={styles.grid}>
                {/* CARD 1 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Staff by Category</h3>
                  <p className={styles.subtitle}>Category-wise distribution</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={categoryData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#10B981"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className={styles.legend}>
                    <span className={styles.greenDot}></span> count
                  </div>
                </div>

                {/* CARD 2 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Approved vs Filled Positions</h3>
                  <p className={styles.subtitle}>Department-wise comparison</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={positionsData}>
                      <XAxis dataKey="dept" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="approved"
                        fill="#3B82F6"
                        radius={[5, 5, 0, 0]}
                      />
                      <Bar
                        dataKey="filled"
                        fill="#10B981"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CARD 3 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Salary Distribution</h3>
                  <p className={styles.subtitle}>Salary ranges across staff</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={salaryData}>
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#10B981"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CARD 4 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>NOC Applications Trend</h3>
                  <p className={styles.subtitle}>Monthly NOC requests</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={nocTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="#F59E0B"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="approved"
                        stroke="#10B981"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            {subTab === "Students" && (
              <div className={styles.grid}>
                {/* CARD 1 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Student Enrollment Trend</h3>
                  <p className={styles.subtitle}>Year-over-year growth</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={enrollmentTrend}>
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="students"
                        stroke="#A78BFA"
                        fill="#A78BFA"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* CARD 2 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Course-wise Enrollment</h3>
                  <p className={styles.subtitle}>Students by course</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={courseEnrollment}>
                      <XAxis dataKey="course" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="students"
                        fill="#EC4899"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CARD 3 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Category-wise Students</h3>
                  <p className={styles.subtitle}>
                    Student distribution by category
                  </p>

                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className={styles.legendRow}>
                    {categoryData.map((item, i) => (
                      <span key={i} className={styles.legendItem}>
                        <span
                          className={styles.legendDot}
                          style={{ backgroundColor: COLORS[i] }}
                        ></span>
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CARD 4 */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Scholarship Distribution</h3>
                  <p className={styles.subtitle}>
                    Students availing scholarships
                  </p>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={scholarshipData}>
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#F97316"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {subTab === "Operations" && (
              <div className={styles.grid}>
                {/* CARD 1 - Grievance Status */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Grievance Status</h3>
                  <p className={styles.subtitle}>
                    Current grievance distribution
                  </p>

                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={grievanceData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {grievanceData.map((item, idx) => (
                          <Cell key={idx} fill={item.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className={styles.legendRow}>
                    {grievanceData.map((item, i) => (
                      <span key={i} className={styles.legendItem}>
                        <span
                          className={styles.legendDot}
                          style={{ background: item.color }}
                        ></span>
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CARD 2 - RTI Applications */}
                <div className={styles.card}>
                  <h3 className={styles.title}>RTI Applications</h3>
                  <p className={styles.subtitle}>Monthly RTI requests</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={rtiTrend}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="applications"
                        stroke="#14B8A6"
                        strokeWidth={3}
                        dot
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* CARD 3 - Asset Utilization */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Asset Utilization</h3>
                  <p className={styles.subtitle}>Assets by category</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={assetData}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="total"
                        fill="#3B82F6"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="allocated"
                        fill="#10B981"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CARD 4 - Legal Cases */}
                <div className={styles.card}>
                  <h3 className={styles.title}>Legal Cases Status</h3>
                  <p className={styles.subtitle}>Active and closed cases</p>

                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={legalCases}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {legalCases.map((item, idx) => (
                          <Cell key={idx} fill={item.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className={styles.legendRow}>
                    {legalCases.map((item, i) => (
                      <span key={i} className={styles.legendItem}>
                        <span
                          className={styles.legendDot}
                          style={{ background: item.color }}
                        ></span>
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "generator" && (
          <div className={styles.reportContainer}>
            {/* TITLE */}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <LuFileSpreadsheet size={20} /> Generate Custom Report
              </h2>
              <p className={styles.sectionSubtitle}>
                Select filters and criteria to generate comprehensive reports
              </p>
            </div>

            {/* FORM CARD */}
            <div className={styles.reportCard}>
              {/* Report Type */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Report Type <span className={styles.required}>*</span>
                </label>
                <select className={styles.selectInput}>
                  <option>Select report type</option>
                </select>
                <span className={styles.error}>Required</span>
              </div>

              {/* Date Row */}
              <div className={styles.rowTwo}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Date From</label>
                  <div className={styles.inputWithIcon}>
                    <LuCalendar size={18} className={styles.icon} />
                    <input type="date" className={styles.dateInput} />
                  </div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Date To</label>
                  <div className={styles.inputWithIcon}>
                    <LuCalendar size={18} className={styles.icon} />
                    <input type="date" className={styles.dateInput} />
                  </div>
                </div>
              </div>

              {/* Region + University */}
              <div className={styles.rowTwo}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Region</label>
                  <select className={styles.selectInput}>
                    <option>Select region</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>University</label>
                  <select className={styles.selectInput}>
                    <option>Select university</option>
                  </select>
                </div>
              </div>

              {/* Course + Category */}
              <div className={styles.rowTwo}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Course</label>
                  <select className={styles.selectInput}>
                    <option>Select course</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.selectInput}>
                    <option>Select category</option>
                  </select>
                </div>
              </div>

              {/* Export Format */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Export Format <span className={styles.required}>*</span>
                </label>
                <select className={styles.selectInput}>
                  <option>PDF Document</option>
                </select>
              </div>

              {/* Buttons */}
              <div className={styles.btnRow}>
                <button className={styles.generateBtn}>
                  <LuDownload size={18} /> Generate Report
                </button>

                <button className={styles.clearBtn}>Clear Filters</button>
              </div>
            </div>

            {/* QUICK REPORTS */}
            <div className={styles.quickReports}>
              <h3 className={styles.quickTitle}>Quick Report Templates</h3>
              <p className={styles.quickSub}>
                Generate commonly used reports with pre-configured filters
              </p>

              <div className={styles.quickList}>
                <button className={styles.quickItem}>
                  <LuFileText size={18} /> Monthly Registrations
                </button>

                <button className={styles.quickItem}>
                  <LuFileText size={18} /> Staff Summary
                </button>

                <button className={styles.quickItem}>
                  <LuFileText size={18} /> Student Enrollment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
