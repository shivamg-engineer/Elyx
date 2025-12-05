import { useState } from "react";
import styles from "./Examination.module.css";
import { Eye, CreditCard } from "lucide-react";
import { Download, Printer } from "lucide-react";

export default function Examination() {
  type Subject = {
    code: string;
    name: string;
    credits: number;
    fee: number;
  };

  const [examType, setExamType] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const [subTab, setSubTab] = useState("Applications");

  const applications = [
    {
      number: "EXAM2024001",
      examType: "Semester",
      semester: 4,
      subjects: 5,
      fee: 1500,
      status: "Approved",
    },
    {
      number: "EXAM2024002",
      examType: "Semester",
      semester: 4,
      subjects: 4,
      fee: 1200,
      status: "Payment Completed",
    },
    {
      number: "EXAM2024003",
      examType: "Semester",
      semester: 4,
      subjects: 5,
      fee: 1700,
      status: "Payment Pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Approved")
      return (
        <span className={`${styles.badge} ${styles.approved}`}>Approved</span>
      );

    if (status === "Payment Completed")
      return (
        <span className={`${styles.badge} ${styles.completed}`}>
          Payment Completed
        </span>
      );

    return (
      <span className={`${styles.badge} ${styles.pending}`}>
        Payment Pending
      </span>
    );
  };

  const filtered = applications.filter((app) => {
    const matchesType = examType === "All" || app.examType === examType;
    const matchesStatus = status === "All" || app.status === status;
    const matchesSearch =
      search === "" || app.number.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  //   apply for exam

  const [semester, setSemester] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const student = {
    name: "Rahul Sharma",
    roll: "2024-PU1001-CS-0001",
    course: "B.Tech Computer Science",
    examType: "Semester",
    semester: 4,
    center: "Main Examination Center",
    seat: "Room R-101, Seat S-15",
    admitId: "ADM2024001",
  };

  const subjects = [
    {
      code: "CS101",
      name: "Data Structures",
      credits: 4,
      fee: 300,
      date: "2024-05-15 at 10:00 AM",
    },
    {
      code: "CS102",
      name: "Database Management Systems",
      credits: 4,
      fee: 300,
      date: "2024-05-17 at 10:00 AM",
    },
    {
      code: "CS103",
      name: "Operating Systems",
      credits: 4,
      fee: 300,
      date: "2024-05-19 at 10:00 AM",
    },
    {
      code: "CS104",
      name: "Computer Networks",
      credits: 4,
      fee: 300,
      date: "2024-05-21 at 10:00 AM",
    },
    {
      code: "CS105",
      name: "Software Engineering",
      credits: 4,
      fee: 300,
      date: "2024-05-23 at 10:00 AM",
    },
  ];
  const resultSubject = [
    {
      code: "CS101",
      name: "Data Structures",
      credits: 4,
      marks: "78/100",
      grade: "A",
      gp: 8.5,
      status: "pass",
    },
    {
      code: "CS102",
      name: "Database Management Systems",
      credits: 4,
      marks: "85/100",
      grade: "A+",
      gp: 9,
      status: "pass",
    },
    {
      code: "CS103",
      name: "Operating Systems",
      credits: 4,
      marks: "72/100",
      grade: "B+",
      gp: 7.5,
      status: "pass",
    },
    {
      code: "CS104",
      name: "Computer Networks",
      credits: 4,
      marks: "80/100",
      grade: "A",
      gp: 8,
      status: "pass",
    },
    {
      code: "CS105",
      name: "Software Engineering",
      credits: 4,
      marks: "88/100",
      grade: "A+",
      gp: 9.5,
      status: "pass",
    },
  ];

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const examFee = selectedSubjects.length * 300;
  const lateFee = 0;
  const totalFee = examFee + lateFee;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Examination Module</h2>
      <p className={styles.subtitle}>
        Manage exam applications, admit cards, and view results
      </p>

      {/* ---------- Tabs ---------- */}
      <div className={styles.tabs}>
        <button
          className={
            subTab === "Applications"
              ? `${styles.tab} ${styles.activeTab}`
              : `${styles.tab}`
          }
          onClick={() => setSubTab("Applications")}
        >
          Applications
        </button>
        <button
          className={
            subTab === "Apply"
              ? `${styles.tab} ${styles.activeTab}`
              : `${styles.tab}`
          }
          onClick={() => setSubTab("Apply")}
        >
          Apply for Exam
        </button>
        <button
          className={
            subTab === "AdmitCards"
              ? `${styles.tab} ${styles.activeTab}`
              : `${styles.tab}`
          }
          onClick={() => setSubTab("AdmitCards")}
        >
          Admit Cards
        </button>
        <button
          className={
            subTab === "Results"
              ? `${styles.tab} ${styles.activeTab}`
              : `${styles.tab}`
          }
          onClick={() => setSubTab("Results")}
        >
          Results
        </button>
      </div>

      {/* ---------- Filters Section ---------- */}

      {/* application  */}
      {subTab === "Applications" && (
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>My Exam Applications</h3>
          <p className={styles.desc}>
            View and track your examination applications
          </p>

          <div className={styles.filters}>
            <div className={styles.filterBox}>
              <label>Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
              >
                <option value="All">All types</option>
                <option value="Semester">Semester</option>
              </select>
            </div>

            <div className={styles.filterBox}>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All statuses</option>
                <option value="Approved">Approved</option>
                <option value="Payment Completed">Payment Completed</option>
                <option value="Payment Pending">Payment Pending</option>
              </select>
            </div>

            <div className={styles.filterBox}>
              <label>Search</label>
              <input
                type="text"
                placeholder="Application number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* ---------- Table ---------- */}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Application No.</th>
                <th>Exam Type</th>
                <th>Semester</th>
                <th>Subjects</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((app, i) => (
                <tr key={i}>
                  <td>{app.number}</td>
                  <td>{app.examType}</td>
                  <td>{app.semester}</td>
                  <td>{app.subjects}</td>
                  <td>₹{app.fee}</td>
                  <td>{getStatusBadge(app.status)}</td>

                  <td className={styles.actions}>
                    <button className={styles.iconBtn}>
                      <Eye size={18} />
                    </button>

                    {app.status === "Payment Pending" && (
                      <button className={styles.payBtn}>
                        <CreditCard size={16} /> Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {subTab === "Apply" && (
        <div className={styles.page}>
          <h2 className={styles.title}>Apply for Examination</h2>
          <p className={styles.subtitle}>
            Fill in the details to apply for upcoming examinations
          </p>

          <div className={styles.card}>
            {/* TOP FORM */}
            <div className={styles.row}>
              <div className={styles.inputBox}>
                <label>Exam Type</label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                >
                  <option value="">Select exam type</option>
                  <option value="Semester">Semester</option>
                </select>
              </div>

              <div className={styles.inputBox}>
                <label>Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select semester</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>

            {/* SUBJECT LIST */}
            <div className={styles.subjectCard}>
              <h4>Select Subjects</h4>

              {subjects.map((sub) => (
                <label key={sub.code} className={styles.subjectRow}>
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(sub.code)}
                    onChange={() => toggleSubject(sub.code)}
                  />
                  <span className={styles.subjectText}>
                    {sub.code} - {sub.name} ({sub.credits} credits)
                  </span>
                </label>
              ))}
            </div>

            {/* FEE SUMMARY */}
            <div className={styles.feeBox}>
              <div className={styles.feeRow}>
                <span>Exam Fee:</span>
                <span>₹{examFee}</span>
              </div>
              <div className={styles.feeRow}>
                <span>Late Fee:</span>
                <span>₹{lateFee}</span>
              </div>

              <div className={styles.totalRow}>
                <span>Total Fee:</span>
                <span>₹{totalFee}</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className={styles.btnRow}>
              <button className={styles.payBtn}>Proceed to Payment</button>
              <button className={styles.draftBtn}>Save as Draft</button>
            </div>
          </div>
        </div>
      )}

      {subTab === "AdmitCards" && (
  <div className={styles.admit_page}>
    <h2 className={styles.admit_title}>Admit Cards</h2>
    <p className={styles.admit_subtitle}>
      Download your admit cards for upcoming examinations
    </p>

    <div className={styles.admit_card}>
      {/* LEFT: Photo */}
      <div className={styles.admit_left}>
        <div className={styles.admit_photo}></div>
        <p className={styles.admit_photoLabel}>Student Photo</p>
      </div>

      {/* MIDDLE: Student Information */}
      <div className={styles.admit_center}>
        <h3 className={styles.admit_name}>Rahul Sharma</h3>
        <p className={styles.admit_roll}>2024-PU1001-CS-0001</p>
        <p className={styles.admit_course}>B.Tech Computer Science</p>

        <div className={styles.admit_row}>
          <span className={styles.admit_icon}>📄</span>
          <span className={styles.admit_label}>Exam Type:</span>
          <span className={styles.admit_value}>Semester</span>
        </div>

        <div className={styles.admit_row}>
          <span className={styles.admit_icon}>📚</span>
          <span className={styles.admit_label}>Semester:</span>
          <span className={styles.admit_value}>4</span>
        </div>

        <h4 className={styles.admit_subjectHeading}>
          Subjects (5)
        </h4>

        <div className={styles.admit_subjectGrid}>
          <div className={styles.admit_subjectBox}>
            <strong>CS101 - Data Structures</strong>
            <p>2024-05-15 at 10:00 AM</p>
          </div>

          <div className={styles.admit_subjectBox}>
            <strong>CS102 - Database Management Systems</strong>
            <p>2024-05-17 at 10:00 AM</p>
          </div>

          <div className={styles.admit_subjectBox}>
            <strong>CS103 - Operating Systems</strong>
            <p>2024-05-19 at 10:00 AM</p>
          </div>

          <div className={styles.admit_subjectBox}>
            <strong>CS104 - Computer Networks</strong>
            <p>2024-05-21 at 10:00 AM</p>
          </div>

          <div className={styles.admit_subjectBoxFull}>
            <strong>CS105 - Software Engineering</strong>
            <p>2024-05-23 at 10:00 AM</p>
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.admit_btnRow}>
          <button className={styles.admit_downloadBtn}>⭳ Download</button>
          <button className={styles.admit_printBtn}>🖨 Print</button>
        </div>
      </div>

      {/* RIGHT: Badge */}
      <div className={styles.admit_right}>
        <div className={styles.admit_badge}>ADM2024001</div>
      </div>
    </div>
  </div>
)}

{subTab === "Results" && (
  <div className={styles.result_page}>
    <h2 className={styles.result_title}>Examination Results</h2>
    <p className={styles.result_subtitle}>
      View your examination results and download mark sheets
    </p>

    <div className={styles.result_card}>
      {/* HEADER */}
      <div className={styles.result_header}>
        <div>
          <h3 className={styles.result_name}>Rahul Sharma</h3>
          <p className={styles.result_roll}>2024-PU1001-CS-0001</p>
          <p className={styles.result_course}>
            B.Tech Computer Science - Semester 4
          </p>
        </div>

        <div className={styles.result_passBadgeMain}>PASS</div>
      </div>

      {/* SUMMARY GRID */}
      <div className={styles.result_summaryGrid}>
        <div className={styles.result_summaryBox}>
          <h3>80.60%</h3>
          <p>Percentage</p>
        </div>

        <div className={styles.result_summaryBox}>
          <h3>8.50</h3>
          <p>SGPA</p>
        </div>

        <div className={styles.result_summaryBox}>
          <h3>8.50</h3>
          <p>CGPA</p>
        </div>

        <div className={styles.result_summaryBox}>
          <h3>403/500</h3>
          <p>Total Marks</p>
        </div>
      </div>

      {/* SUBJECT TABLE */}
      <h3 className={styles.result_sectionTitle}>Subject-wise Performance</h3>

      <table className={styles.result_table}>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Credits</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Grade Point</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {resultSubject.map((s, i) => (
            <tr key={i}>
              <td><strong>{s.code}</strong></td>
              <td>{s.name}</td>
              <td>{s.credits}</td>
              <td>{s.marks}</td>
              <td>
                <span className={styles.result_gradeBadge}>{s.grade}</span>
              </td>
              <td>{s.gp}</td>
              <td>
                <span className={styles.result_passBadge}>pass</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MARK SHEET BOX */}
      <div className={styles.result_sheetBox}>
        <div>
          <p className={styles.result_sheetTitle}>Mark Sheet Available</p>
          <p>Mark Sheet No: MS2024001</p>
          <p>Issued on: 6/20/2024</p>
        </div>

        <button className={styles.result_downloadBtn}>
          ⭳ Download Mark Sheet
        </button>
      </div>
    </div>
  </div>
)}


      
    </div>
  );
}
