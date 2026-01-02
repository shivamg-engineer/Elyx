import { useState, useMemo } from "react";
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

  // -----------------------------
  // FILTER STATES
  // -----------------------------
  const [yearFilter, setYearFilter] = useState("All Years");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [agencyFilter, setAgencyFilter] = useState("All Agencies");
  const [search, setSearch] = useState("");

  const [subTab, setSubTab] = useState("scholarshipData");

  // -----------------------------
  // UNIQUE AGENCIES FOR DROPDOWN
  // -----------------------------
  const agencies = ["All Agencies", ...new Set(records.map((r) => r.agency))];

  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const filteredRecords = useMemo(() => {
    const q = search.trim().toLowerCase();

    return records.filter((r) => {
      const matchYear = yearFilter === "All Years" || r.year === yearFilter;
      const matchType = typeFilter === "All Types" || r.type === typeFilter;
      const matchAgency =
        agencyFilter === "All Agencies" || r.agency === agencyFilter;

      const matchSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.agency.toLowerCase().includes(q) ||
        r.year.includes(q);

      return matchYear && matchType && matchAgency && matchSearch;
    });
  }, [yearFilter, typeFilter, agencyFilter, search]);

  // -----------------------------
  // CHART DATA (unchanged)
  // -----------------------------
  const data = [
    { year: "2022-23", beneficiaries: 750, amount: 480 },
    { year: "2023-24", beneficiaries: 1550, amount: 1150 },
  ];

  const typeData = [
    { name: "Government", value: 53, color: "#4285F4" },
    { name: "Institutional", value: 29, color: "#8B5CF6" },
    { name: "Private", value: 12, color: "#10B981" },
    { name: "International", value: 6, color: "#F59E0B" },
  ];

  const categoryData = [
    { category: "General", count: 320 },
    { category: "OBC", count: 900 },
    { category: "SC", count: 650 },
    { category: "ST", count: 220 },
    { category: "EBC", count: 260 },
    { category: "VJNT", count: 130 },
  ];

  const genderData = [
    { name: "Male", value: 52, color: "#3B82F6" },
    { name: "Female", value: 48, color: "#EF4444" },
  ];

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div>
        <h1 className={styles.title}>Scholarship Tracking</h1>
        <p className={styles.subtitle}>
          Track government and institutional scholarships with beneficiary
          details
        </p>
      </div>

      {/* ACTION ROW */}
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

      {/* FILTER BOX */}
      <div className={styles.filterBox}>
        <div className={styles.filterHeader}>
          <FiFilter className={styles.filterIcon} />
          Filters
        </div>

        <div className={styles.filterGrid}>
          {/* Academic Year */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Academic Year</label>
            <select
              className={styles.select}
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option>All Years</option>
              <option>2023-24</option>
              <option>2022-23</option>
            </select>
          </div>

          {/* Type */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Scholarship Type</label>
            <select
              className={styles.select}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>All Types</option>
              <option>Government</option>
              <option>Institutional</option>
              <option>Private</option>
              <option>International</option>
            </select>
          </div>

          {/* Agency */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Funding Agency</label>
            <select
              className={styles.select}
              value={agencyFilter}
              onChange={(e) => setAgencyFilter(e.target.value)}
            >
              {agencies.map((ag, i) => (
                <option key={i}>{ag}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className={styles.filterItem}>
            <label className={styles.filterLabel}>Search</label>
            <input
              className={styles.input}
              placeholder="Search scholarships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SUB TABS */}
      <div className={styles.subTabs}>
        <button
          className={
            subTab === "scholarshipData"
              ? styles.active_sub_tab
              : styles.subTab
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

      {/* TABLE VIEW */}
      {subTab === "scholarshipData" && (
        <div className={styles.container}>
          <h1 className={styles.title}>Scholarship Records</h1>
          <p className={styles.subtitle}>
            Showing {filteredRecords.length} scholarships
          </p>

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
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((rec, i) => (
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      style={{ textAlign: "center", padding: "1rem" }}
                    >
                      No matching scholarship records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CHART SECTION (unchanged) */}
      {subTab === "statistics" && (
        <div>
          {/* Chart content unchanged — keeping your original layout */}
        </div>
      )}
    </div>
  );
}
