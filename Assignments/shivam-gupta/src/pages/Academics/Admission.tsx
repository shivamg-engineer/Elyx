import StatisticsSection from "./StatisticsSection";
import styles from "./Academics.module.css";
import { useState, useMemo } from "react";

export const Admission = () => {
  const [subTab, setSubTab] = useState("admissionData");

  // -----------------------------
  // FILTER STATES
  // -----------------------------
  const [filterYear, setFilterYear] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");

  const AdmissionRecord = [
    {
      year: "2023-24",
      course: "B.A. (Bachelor of Arts)",
      type: "Undergraduate",
      total: 120,
      gender: { male: 55, female: 63, other: 2 },
      minority: 18,
      ph: 4,
      nri: 2,
      foreign: 1,
    },
    {
      year: "2023-24",
      course: "B.Sc. (Bachelor of Science)",
      type: "Undergraduate",
      total: 150,
      gender: { male: 85, female: 63, other: 2 },
      minority: 22,
      ph: 5,
      nri: 3,
      foreign: 2,
    },
    {
      year: "2023-24",
      course: "B.Com. (Bachelor of Commerce)",
      type: "Undergraduate",
      total: 180,
      gender: { male: 95, female: 83, other: 2 },
      minority: 28,
      ph: 6,
      nri: 4,
      foreign: 2,
    },
    {
      year: "2023-24",
      course: "M.A. (Master of Arts)",
      type: "Postgraduate",
      total: 60,
      gender: { male: 28, female: 31, other: 1 },
      minority: 9,
      ph: 2,
      nri: 1,
      foreign: 1,
    },
    {
      year: "2023-24",
      course: "M.Sc. (Master of Science)",
      type: "Postgraduate",
      total: 80,
      gender: { male: 45, female: 34, other: 1 },
      minority: 12,
      ph: 3,
      nri: 2,
      foreign: 2,
    },
    {
      year: "2023-24",
      course: "M.Com. (Master of Commerce)",
      type: "Postgraduate",
      total: 70,
      gender: { male: 38, female: 31, other: 1 },
      minority: 11,
      ph: 2,
      nri: 1,
      foreign: 1,
    },
    {
      year: "2022-23",
      course: "B.A. (Bachelor of Arts)",
      type: "Undergraduate",
      total: 115,
      gender: { male: 52, female: 61, other: 2 },
      minority: 17,
      ph: 3,
      nri: 1,
      foreign: 1,
    },
    {
      year: "2022-23",
      course: "B.Sc. (Bachelor of Science)",
      type: "Undergraduate",
      total: 145,
      gender: { male: 82, female: 61, other: 2 },
      minority: 21,
      ph: 4,
      nri: 2,
      foreign: 1,
    },
    {
      year: "2022-23",
      course: "B.Com. (Bachelor of Commerce)",
      type: "Undergraduate",
      total: 175,
      gender: { male: 92, female: 81, other: 2 },
      minority: 26,
      ph: 5,
      nri: 3,
      foreign: 2,
    },
    {
      year: "2022-23",
      course: "M.A. (Master of Arts)",
      type: "Postgraduate",
      total: 55,
      gender: { male: 26, female: 28, other: 1 },
      minority: 8,
      ph: 2,
      nri: 1,
      foreign: 0,
    },
  ];

  // -----------------------------
  // FILTER LOGIC (MEMOIZED)
  // -----------------------------
  const filteredRecords = useMemo(() => {
    const q = search.trim().toLowerCase();

    return AdmissionRecord.filter((rec) => {
      const matchYear = !filterYear || rec.year === filterYear;
      const matchCourse = !filterCourse || rec.course.includes(filterCourse);
      const matchType = !filterType || rec.type === filterType;

      const matchSearch =
        !q ||
        rec.course.toLowerCase().includes(q) ||
        rec.year.toLowerCase().includes(q) ||
        rec.type.toLowerCase().includes(q);

      return matchYear && matchCourse && matchType && matchSearch;
    });
  }, [filterYear, filterCourse, filterType, search]);

  return (
    <div>
      {/* HEADER */}
      <div className={styles.secondary_header}>
        <div>
          <h1>Admission Records</h1>
          <p>Manage and view admission statistics across academic years</p>
        </div>
        <div>
          <button className={styles.warn}>Export</button>
          <button className={styles.success}>+ Add Record</button>
        </div>
      </div>

      {/* CARDS */}
      <div className={styles.card_Grid2}>
        <div className={styles.card}>
          <span className={styles.cardTitle}>Total admission</span>
          <h3>2,345</h3>
          <p>across 7 courses</p>
        </div>

        <div className={styles.card}>
          <span className={styles.cardTitle}>Minority students</span>
          <h3>14.7%</h3>
          <p>Of total admissions</p>
        </div>

        <div className={styles.card}>
          <span className={styles.cardTitle}>PH Students</span>
          <h3>2.9%</h3>
          <p>physically handicapped</p>
        </div>

        <div className={styles.card}>
          <span className={styles.cardTitle}>International</span>
          <h3>54</h3>
          <p>NRI + Foreign students</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className={styles.filters}>
        <h1>Filters</h1>
        <br />

        <div className={styles.filterRow}>
          {/* Year Filter */}
          <div>
            Academic Year <br />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="">All Years</option>
              <option>2023-24</option>
              <option>2022-23</option>
            </select>
          </div>

          {/* Course Filter */}
          <div>
            Course <br />
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              <option>B.A.</option>
              <option>B.Sc.</option>
              <option>B.Com.</option>
              <option>M.A.</option>
              <option>M.Sc.</option>
              <option>M.Com.</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            Course Type <br />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option>Undergraduate</option>
              <option>Postgraduate</option>
            </select>
          </div>

          {/* Search Filter */}
          <div>
            Search <br />
            <input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SUB TABS */}
      <div className={styles.subTab}>
        <button
          className={subTab === "admissionData" ? styles.active_sub_tab : ""}
          onClick={() => setSubTab("admissionData")}
        >
          Admissions
        </button>

        <button
          className={subTab === "statistics" ? styles.active_sub_tab : ""}
          onClick={() => setSubTab("statistics")}
        >
          Statistics & Charts
        </button>
      </div>

      {/* TAB CONTENT */}
      {subTab === "admissionData" && (
        <div className={styles.admissionRecord}>
          <h1>Admission Records</h1>
          <p>Showing {filteredRecords.length} records</p>

          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>Academic Year</th>
                  <th>Course</th>
                  <th>Type</th>
                  <th>Total</th>
                  <th>Gender (M/F/O)</th>
                  <th>Minority</th>
                  <th>PH</th>
                  <th>NRI</th>
                  <th>Foreign</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.year}</td>
                      <td>{record.course}</td>
                      <td>
                        <span className={styles.badge}>{record.type}</span>
                      </td>
                      <td>{record.total}</td>
                      <td>
                        {record.gender.male}/{record.gender.female}/
                        {record.gender.other}
                      </td>
                      <td>{record.minority}</td>
                      <td>{record.ph}</td>
                      <td>{record.nri}</td>
                      <td>{record.foreign}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                      No matching admission records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === "statistics" && <StatisticsSection />}
    </div>
  );
};
