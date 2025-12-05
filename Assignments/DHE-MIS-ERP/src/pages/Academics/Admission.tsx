import  StatisticsSection from "./StatisticsSection";
import styles from "./Academics.module.css";
import { useState } from "react";

export const Admission = () => {

  const [subTab, setSubTab] = useState("admissionData");

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
  return (
    <div>
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

      {/* filters */}
      <div className={styles.filters}>
        <h1>Filters</h1>
        <br />
        <div className={styles.filterRow}>
          <div>
            Academic Year <br />
            <select>
              <option value="">All Years</option>
              <option>2025-24</option>
              <option>2024-23</option>
              <option>2023-22</option>
              <option>2022-21</option>
            </select>
          </div>

          <div>
            Course <br />
            <select>
              <option value="">All Courses</option>
              <option>BA</option>
              <option>B.COM</option>
              <option>Bsc</option>
              <option>Diploma in computer application</option>
            </select>
          </div>

          <div>
            Course Type <br />
            <select>
              <option value="">All Types</option>
              <option>Under Graduate</option>
              <option>Post Graduate</option>
              <option>Diploma</option>
              <option>Certificate</option>
            </select>
          </div>

          <div>
            Search <br />
            <input placeholder="Search courses..." />
          </div>
        </div>
      </div>

      {/* sub tabs */}
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

      {/* content of sub tabs */}
      {subTab === "admissionData" && (
        <div className={styles.admissionRecord}>
          <h1>Admission Records</h1>
          <p>Showing 22 records</p>
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
                {AdmissionRecord.map((record) => (
                  <tr>
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
                ))}
              </thead>
            </table>
          </div>
        </div>
      )}

      {subTab === "statistics" && <StatisticsSection />}
    </div>
  );
};
