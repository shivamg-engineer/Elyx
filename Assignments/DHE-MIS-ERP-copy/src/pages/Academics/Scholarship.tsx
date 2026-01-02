import { useState } from "react";
import styles from "./Scholarship.module.css";
import {
  FiUser,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiFilter,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Scholarship() {
  const records = [
    {
      name: "Post Matric Scholarship for SC Students",
      type: "Government",
      agency: "Ministry of Social Justice and Empowerment",
      year: "2023-24",
      beneficiaries: 245,
      amount: "₹73,50,000",
      perStudent: "₹30,000",
    },
    {
      name: "Post Matric Scholarship for ST Students",
      type: "Government",
      agency: "Ministry of Tribal Affairs",
      year: "2023-24",
      beneficiaries: 89,
      amount: "₹26,70,000",
      perStudent: "₹30,000",
    },
    {
      name: "Post Matric Scholarship for OBC Students",
      type: "Government",
      agency: "Ministry of Social Justice and Empowerment",
      year: "2023-24",
      beneficiaries: 312,
      amount: "₹93,60,000",
      perStudent: "₹30,000",
    },
    {
      name: "National Means-cum-Merit Scholarship",
      type: "Government",
      agency: "Ministry of Education",
      year: "2023-24",
      beneficiaries: 156,
      amount: "₹18,72,000",
      perStudent: "₹12,000",
    },
    {
      name: "EBC Scholarship Scheme",
      type: "Government",
      agency: "Government of Maharashtra",
      year: "2023-24",
      beneficiaries: 134,
      amount: "₹40,20,000",
      perStudent: "₹30,000",
    },
    {
      name: "VJNT Scholarship Scheme",
      type: "Government",
      agency: "Government of Maharashtra",
      year: "2023-24",
      beneficiaries: 78,
      amount: "₹23,40,000",
      perStudent: "₹30,000",
    },
    {
      name: "Prime Minister Scholarship Scheme",
      type: "Government",
      agency: "Ministry of Defence",
      year: "2023-24",
      beneficiaries: 23,
      amount: "₹5,52,000",
      perStudent: "₹24,000",
    },
    {
      name: "Merit-cum-Means Scholarship",
      type: "Institutional",
      agency: "Institute Trust Fund",
      year: "2023-24",
      beneficiaries: 189,
      amount: "₹37,80,000",
      perStudent: "₹20,000",
    },
    {
      name: "Sports Excellence Scholarship",
      type: "Institutional",
      agency: "Institute Sports Committee",
      year: "2023-24",
      beneficiaries: 45,
      amount: "₹13,50,000",
      perStudent: "₹30,000",
    },
    {
      name: "Academic Excellence Award",
      type: "Institutional",
      agency: "Institute Academic Council",
      year: "2023-24",
      beneficiaries: 67,
      amount: "₹20,10,000",
      perStudent: "₹30,000",
    },
  ];

  const data = [
    {
      year: "2022-23",
      beneficiaries: 750,
      amount: 480, // Lakhs
    },
    {
      year: "2023-24",
      beneficiaries: 1550,
      amount: 1150, // Lakhs
    },
  ];

  // Type-wise Distribution Pie
  const typeData = [
    { name: "Government", value: 53, color: "#4285F4" },
    { name: "Institutional", value: 29, color: "#8B5CF6" },
    { name: "Private", value: 12, color: "#10B981" },
    { name: "International", value: 6, color: "#F59E0B" },
  ];

  // Category-wise Beneficiaries (Horizontal Bar)
  const categoryData = [
    { category: "General", count: 320 },
    { category: "OBC", count: 900 },
    { category: "SC", count: 650 },
    { category: "ST", count: 220 },
    { category: "EBC", count: 260 },
    { category: "VJNT", count: 130 },
  ];

  // Gender Pie Chart
  const genderData = [
    { name: "Male", value: 52, color: "#3B82F6" },
    { name: "Female", value: 48, color: "#EF4444" },
  ];

  const [subTab, setSubTab] = useState("scholarshipData");

  return (
    <div className={styles.container}>
      {/* Header */}
      <div>
        <h1 className={styles.title}>Scholarship Tracking</h1>
        <p className={styles.subtitle}>
          Track government and institutional scholarships with beneficiary
          details
        </p>
      </div>

      {/* Action buttons */}
      <div className={styles.actionRow}>
        <button className={styles.exportBtn}>
          <FiDollarSign />
          Export
        </button>
        <button className={styles.addBtn}>
          <span className={styles.plus}>+</span>
          Add Scholarship
        </button>
      </div>

      {/* Statistic Cards */}
      <div className={styles.statsGrid}>
        {/* Total Scholarships */}
        <div className={styles.card}>
          <p className={styles.cardLabel}>Total Scholarships</p>
          <FiUser className={styles.cardIcon} />
          <h2 className={styles.cardValue}>17</h2>
          <p className={styles.cardSubtext}>Active scholarship programs</p>
        </div>

        {/* Total Beneficiaries */}
        <div className={styles.card}>
          <p className={styles.cardLabel}>Total Beneficiaries</p>
          <FiUsers className={styles.cardIcon} />
          <h2 className={styles.cardValue}>2,212</h2>
          <p className={styles.cardSubtext}>Students receiving scholarships</p>
        </div>

        {/* Total Amount */}
        <div className={styles.card}>
          <p className={styles.cardLabel}>Total Amount</p>
          <FiDollarSign className={styles.cardIcon} />
          <h2 className={styles.cardValue}>₹6,07,44,000</h2>
          <p className={styles.cardSubtext}>Total scholarship disbursed</p>
        </div>

        {/* Avg Per Student */}
        <div className={styles.card}>
          <p className={styles.cardLabel}>Avg Per Student</p>
          <FiTrendingUp className={styles.cardIcon} />
          <h2 className={styles.cardValue}>₹27,461</h2>
          <p className={styles.cardSubtext}>Average scholarship amount</p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filterBox}>
        <div className={styles.filterHeader}>
          <FiFilter className={styles.filterIcon} />
          Filters
        </div>

        <div className={styles.filterGrid}>
          {/* Academic Year */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Academic Year</label>
            <select className={styles.select}>
              <option>All Years</option>
            </select>
          </div>

          {/* Scholarship Type */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Scholarship Type</label>
            <select className={styles.select}>
              <option>All Types</option>
            </select>
          </div>

          {/* Funding Agency */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Funding Agency</label>
            <select className={styles.select}>
              <option>All Agencies</option>
            </select>
          </div>

          {/* Search */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Search</label>
            <input
              className={styles.input}
              placeholder="Search scholarships..."
            />
          </div>
        </div>
      </div>

      {/* sub tab */}
      <div className={styles.subTabs}>
        <button
          className={
            subTab === "scholarshipData" ? styles.active_sub_tab : styles.subTab
          }
          onClick={() => setSubTab("scholarshipData")}
        >
          Scholarship Data
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

      {/* Scholarship data */}
      {subTab === "scholarshipData" && (
        <div className={styles.container}>
          <h1 className={styles.title}>Scholarship Records</h1>
          <p className={styles.subtitle}>Showing 17 scholarships</p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Scholarship Name</th>
                  <th>Type</th>
                  <th>Funding Agency</th>
                  <th>Year</th>
                  <th>Beneficiaries</th>
                  <th>Total Amount</th>
                  <th>Per Student</th>
                </tr>
              </thead>

              <tbody>
                {records.map((rec, i) => (
                  <tr key={i}>
                    <td className={styles.scholarshipName}>{rec.name}</td>

                    <td>
                      <span
                        className={`${styles.badge} ${
                          rec.type === "Government"
                            ? styles.govBadge
                            : styles.instBadge
                        }`}
                      >
                        {rec.type}
                      </span>
                    </td>

                    <td>{rec.agency}</td>

                    <td>
                      <span className={styles.yearBadge}>{rec.year}</span>
                    </td>

                    <td>{rec.beneficiaries}</td>

                    <td className={styles.amount}>{rec.amount}</td>

                    <td className={styles.perStudent}>{rec.perStudent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <button className={styles.pageBtn}>Previous</button>
            <span className={styles.pageInfo}>Page 1 of 2</span>
            <button className={styles.pageBtnActive}>Next</button>
          </div>
        </div>
      )}

      {subTab === "statistics" && (
        <div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              border: "1px solid #e5e5e5",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              width: "100%",
              height: "420px",
            }}
          >
            {/* Title */}
            <h2 style={{ margin: "0", fontSize: "22px", fontWeight: "700" }}>
              Year-wise Scholarship Trend
            </h2>

            <p
              style={{ margin: "4px 0 20px", color: "#666", fontSize: "14px" }}
            >
              Beneficiaries and amounts across academic years
            </p>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />

                {/* Left Side Axis (Beneficiaries) */}
                <YAxis yAxisId="left" />

                {/* Right Side Axis (Amount Lakhs) */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v) => `${v}`}
                />

                <XAxis dataKey="year" />

                <Tooltip />
                <Legend />

                <Bar
                  yAxisId="left"
                  dataKey="beneficiaries"
                  name="Beneficiaries"
                  fill="#4285F4"
                  barSize={60}
                />

                <Bar
                  yAxisId="right"
                  dataKey="amount"
                  name="Amount (Lakhs)"
                  fill="#10b981"
                  barSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "25px",
              width: "100%",
            }}
          >
            {/* 1️⃣ Type-wise Distribution */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "22px",
                border: "1px solid #e5e5e5",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Type-wise Distribution</h2>
              <p style={{ marginTop: 0, color: "#666" }}>
                Scholarships by type
              </p>

              <div style={{ width: "100%", height: "260px" }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={typeData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {typeData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2️⃣ Category-wise Beneficiaries */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "22px",
                border: "1px solid #e5e5e5",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Category-wise Beneficiaries</h2>
              <p style={{ marginTop: 0, color: "#666" }}>
                Distribution by category
              </p>

              <div style={{ width: "100%", height: "260px" }}>
                <ResponsiveContainer>
                  <BarChart
                    layout="vertical"
                    data={categoryData}
                    margin={{ left: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="category" />
                    <Bar dataKey="count" fill="#8B5CF6" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 3️⃣ Gender-wise Distribution */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "22px",
                border: "1px solid #e5e5e5",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Gender-wise Distribution</h2>
              <p style={{ marginTop: 0, color: "#666" }}>
                Beneficiaries by gender
              </p>

              <div style={{ width: "100%", height: "260px" }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={genderData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {genderData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 4️⃣ Amount by Type */}
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "22px",
                border: "1px solid #e5e5e5",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2 style={{ marginTop: 0 }}>Amount by Type</h2>
                <p style={{ marginTop: 0, color: "#666" }}>
                  Total disbursement by scholarship type
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: 0,
                    lineHeight: "28px",
                  }}
                >
                  <li>
                    <span style={{ color: "#4285F4" }}>● Government</span>
                  </li>
                  <li>
                    <span style={{ color: "#8B5CF6" }}>● Institutional</span>
                  </li>
                  <li>
                    <span style={{ color: "#10B981" }}>● Private</span>
                  </li>
                  <li>
                    <span style={{ color: "#F59E0B" }}>● International</span>
                  </li>
                </ul>
              </div>

              <div style={{ textAlign: "right", lineHeight: "28px" }}>
                <p style={{ color: "#10B981", fontWeight: 600 }}>
                  ₹4,36,74,000
                </p>
                <p style={{ fontSize: "13px" }}>9 scholarships</p>

                <p style={{ color: "#8B5CF6", fontWeight: 600 }}>
                  ₹1,29,40,000
                </p>
                <p style={{ fontSize: "13px" }}>5 scholarships</p>

                <p style={{ color: "#10B981", fontWeight: 600 }}>₹33,80,000</p>
                <p style={{ fontSize: "13px" }}>2 scholarships</p>

                <p style={{ color: "#F59E0B", fontWeight: 600 }}>₹7,50,000</p>
                <p style={{ fontSize: "13px" }}>1 scholarship</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
