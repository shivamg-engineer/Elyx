import { useState } from "react";
import styles from "./Attendance.module.css";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";

const subjects = ["All Subjects", "CS301", "CS302", "CS303", "CS304", "CS305"];

const historyData = [
  // ----------------- CS301 -----------------
  {
    date: "04 Dec 2025",
    subject: "Data Structures",
    code: "CS301",
    type: "Lecture",
    faculty: "Dr. Sharma",
    status: "Present",
  },
  {
    date: "03 Dec 2025",
    subject: "Data Structures",
    code: "CS301",
    type: "Practical",
    faculty: "Dr. Sharma",
    status: "Present",
  },
  {
    date: "02 Dec 2025",
    subject: "Data Structures",
    code: "CS301",
    type: "Practical",
    faculty: "Dr. Sharma",
    status: "Late",
  },

  // ----------------- CS302 -----------------
  {
    date: "04 Dec 2025",
    subject: "Database Management",
    code: "CS302",
    type: "Lecture",
    faculty: "Prof. Patel",
    status: "Present",
  },
  {
    date: "03 Dec 2025",
    subject: "Database Management",
    code: "CS302",
    type: "Practical",
    faculty: "Prof. Patel",
    status: "Present",
  },
  {
    date: "02 Dec 2025",
    subject: "Database Management",
    code: "CS302",
    type: "Lecture",
    faculty: "Prof. Patel",
    status: "Late",
  },

  // ----------------- CS303 -----------------
  {
    date: "04 Dec 2025",
    subject: "Operating Systems",
    code: "CS303",
    type: "Lecture",
    faculty: "Dr. Kumar",
    status: "Present",
  },
  {
    date: "03 Dec 2025",
    subject: "Operating Systems",
    code: "CS303",
    type: "Lecture",
    faculty: "Dr. Kumar",
    status: "Late",
  },
  {
    date: "03 Dec 2025",
    subject: "Operating Systems",
    code: "CS303",
    type: "Practical",
    faculty: "Dr. Kumar",
    status: "Absent",
  },

  // ----------------- CS304 -----------------
  {
    date: "04 Dec 2025",
    subject: "Computer Networks",
    code: "CS304",
    type: "Lecture",
    faculty: "Prof. Singh",
    status: "Present",
  },
  {
    date: "03 Dec 2025",
    subject: "Computer Networks",
    code: "CS304",
    type: "Lecture",
    faculty: "Prof. Singh",
    status: "Present",
  },
  {
    date: "02 Dec 2025",
    subject: "Computer Networks",
    code: "CS304",
    type: "Practical",
    faculty: "Prof. Singh",
    status: "Late",
  },

  // ----------------- CS305 -----------------
  {
    date: "04 Dec 2025",
    subject: "Software Engineering",
    code: "CS305",
    type: "Practical",
    faculty: "Dr. Mehta",
    status: "Present",
  },
  {
    date: "03 Dec 2025",
    subject: "Software Engineering",
    code: "CS305",
    type: "Lecture",
    faculty: "Dr. Mehta",
    status: "Present",
  },
  {
    date: "02 Dec 2025",
    subject: "Software Engineering",
    code: "CS305",
    type: "Practical",
    faculty: "Dr. Mehta",
    status: "Late",
  },
];


const barData = [
  { subject: "Data Structures", code: "CS301", percent: 86, attended: 38, total: 44 },
  { subject: "Database Management", code: "CS302", percent: 93, attended: 42, total: 45 },
  { subject: "Operating Systems", code: "CS303", percent: 100, attended: 42, total: 42 },
  { subject: "Computer Networks", code: "CS304", percent: 87, attended: 39, total: 45 },
  { subject: "Software Engineering", code: "CS305", percent: 93, attended: 39, total: 42 },
];

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("All Subjects");

  const filteredHistory =
    activeTab === "All Subjects"
      ? historyData
      : historyData.filter((item) => item.code === activeTab);

  const getStatusBadge = (status:string) => {
    if (status === "Present")
      return (
        <span className={`${styles.badge} ${styles.present}`}>
          <CheckCircle size={14} /> Present
        </span>
      );

    if (status === "Late")
      return (
        <span className={`${styles.badge} ${styles.late}`}>
          <AlertTriangle size={14} /> Late
        </span>
      );

    return (
      <span className={`${styles.badge} ${styles.absent}`}>
        <XCircle size={14} /> Absent
      </span>
    );
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Attendance Tracking</h2>
      <p className={styles.subtitle}>
        B.Sc. Computer Science – Year 2, Semester 3
      </p>

      {/* -------- Overall Attendance Card -------- */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Overall Attendance</h3>
        <p className={styles.desc}>
          Your attendance summary across all subjects
        </p>

        <div className={styles.overallRow}>
          <div className={styles.overallLeft}>
            <h1 className={styles.overallPercent}>92%</h1>
            <p className={styles.lightText}>200 out of 218 classes</p>
          </div>

          <div className={styles.goodBox}>
            <CheckCircle size={18} />
            Good Standing
          </div>
        </div>

        <div className={styles.progressOuter}>
          <div className={styles.progressFill} style={{ width: "92%" }}></div>
        </div>
      </div>

      {/* -------- Subject-wise Attendance -------- */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Subject-wise Attendance</h3>

        {barData.map((item) => (
          <div key={item.code} className={styles.subjectRow}>
            <div>
              <p className={styles.subName}>{item.subject}</p>
              <p className={styles.subCode}>{item.code}</p>
            </div>

            <div className={styles.subjectRight}>
              <TrendingUp size={16} />
              <span className={styles.percentText}>{item.percent}%</span>
              <span className={styles.classInfo}>
                {item.attended}/{item.total} classes
              </span>
            </div>

            <div className={styles.progressOuter}>
              <div
                className={styles.progressFill}
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* -------- Attendance History -------- */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Attendance History</h3>

        {/* Tabs */}
        <div className={styles.tabs}>
          {subjects.map((s) => (
            <button
              key={s}
              className={`${styles.tab} ${
                activeTab === s ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Faculty</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.map((item, index) => (
              <tr key={index}>
                <td>
                  <Calendar size={16} className={styles.icon} />
                  {item.date}
                </td>

                <td>
                  <p className={styles.subName}>{item.subject}</p>
                  <p className={styles.subCode}>{item.code}</p>
                </td>

                <td>
                  <span className={styles.typeChip}>{item.type}</span>
                </td>

                <td>{item.faculty}</td>

                <td>{getStatusBadge(item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
