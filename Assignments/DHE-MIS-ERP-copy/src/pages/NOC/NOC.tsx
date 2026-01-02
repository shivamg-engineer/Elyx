import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./NOC.module.css";
import { FiEye } from "react-icons/fi";

export const NOC = () => {
  type ApplicationRow = {
    id: string;
    institute: string;
    type: string;
    vacancies: number;
    date: string;
    status: string;
    statusType: "green" | "blue" | "red" | "gray";
  };

  // JD Office data
  const jdApplications: ApplicationRow[] = [
    {
      id: "NOC/2024/004",
      institute: "Pune College of Engineering",
      type: "New Recruitment",
      vacancies: 10,
      date: "2/1/2024",
      status: "Under Review (JD)",
      statusType: "blue",
    },
    {
      id: "NOC/2024/005",
      institute: "Mumbai Arts College",
      type: "Replacement",
      vacancies: 2,
      date: "2/3/2024",
      status: "Correction Required",
      statusType: "red",
    },
    {
      id: "NOC/2024/006",
      institute: "Nagpur Science College",
      type: "New Recruitment",
      vacancies: 7,
      date: "2/8/2024",
      status: "Submitted",
      statusType: "gray",
    },
    {
      id: "NOC/2024/010",
      institute: "Nashik Medical College",
      type: "Additional Post",
      vacancies: 12,
      date: "2/5/2024",
      status: "Forwarded to Director",
      statusType: "green",
    },
  ];

  // Director data (you can tweak as you like)
  const directorApplications: ApplicationRow[] = [
    {
      id: "NOC/2024/003",
      institute: "Maharashtra Institute of Technology",
      type: "Additional Post",
      vacancies: 6,
      date: "1/25/2024",
      status: "Under Review (Director)",
      statusType: "blue",
    },
    {
      id: "NOC/2024/010",
      institute: "Nashik Medical College",
      type: "Additional Post",
      vacancies: 12,
      date: "2/5/2024",
      status: "Forwarded to Director",
      statusType: "gray",
    },
  ];

  // Secretary data (matches your last screenshot)
  const secretaryApplications: ApplicationRow[] = [
    {
      id: "NOC/2024/001",
      institute: "Government College of Arts and Science",
      type: "New Recruitment",
      vacancies: 8,
      date: "1/15/2024",
      status: "Approved",
      statusType: "green",
    },
    {
      id: "NOC/2024/002",
      institute: "Shivaji College of Commerce",
      type: "Replacement",
      vacancies: 3,
      date: "1/20/2024",
      status: "Under Review (Secretary)",
      statusType: "blue",
    },
    {
      id: "NOC/2024/008",
      institute: "Government College of Arts and Science",
      type: "Replacement",
      vacancies: 2,
      date: "1/10/2024",
      status: "Approved",
      statusType: "green",
    },
    {
      id: "NOC/2024/009",
      institute: "Kolhapur Engineering College",
      type: "New Recruitment",
      vacancies: 8,
      date: "1/5/2024",
      status: "Rejected",
      statusType: "red",
    },
  ];

  const [tab, setTab] = useState<"JDOffice" | "Director" | "Secretary">(
    "JDOffice"
  );

  const renderStatsRow = (
    totalApplications: number,
    pending: number,
    approved: number,
    totalVacancies: number
  ) => (
    <div className={styles.statsRow}>
      <div className={styles.statBox}>
        <h3>Total Applications</h3>
        <div className={styles.statValue}>{totalApplications}</div>
      </div>

      <div className={styles.statBoxBlue}>
        <h3>Pending Review</h3>
        <div className={styles.statValue}>{pending}</div>
      </div>

      <div className={styles.statBoxGreen}>
        <h3>Approved</h3>
        <div className={styles.statValue}>{approved}</div>
      </div>

      <div className={styles.statBoxOrange}>
        <h3>Total Vacancies</h3>
        <div className={styles.statValue}>{totalVacancies}</div>
      </div>
    </div>
  );

  const renderTable = (rows: ApplicationRow[]) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Application No.</th>
          <th>Institute Name</th>
          <th>Type</th>
          <th>Vacancies</th>
          <th>Submitted Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.institute}</td>
            <td>{row.type}</td>
            <td>{row.vacancies}</td>
            <td>{row.date}</td>
            <td>
              <span className={`${styles.status} ${styles[row.statusType]}`}>
                {row.status}
              </span>
            </td>
            <td>
              <button className={styles.viewBtn}>
                <FiEye size={16} /> View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <DashboardLayout>
      <div className={styles.page}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>NOC Review & Approval</h1>
            <p className={styles.subtitle}>
              Review and process NOC applications for staff recruitment
            </p>
          </div>

          {/* ROLE TABS */}
          <div className={styles.roleTabs}>
            <button
              className={`${styles.roleBtn} ${
                tab === "JDOffice" ? styles.activeRole : ""
              }`}
              onClick={() => setTab("JDOffice")}
            >
              JD Office
            </button>
            <button
              className={`${styles.roleBtn} ${
                tab === "Director" ? styles.activeRole : ""
              }`}
              onClick={() => setTab("Director")}
            >
              Director
            </button>
            <button
              className={`${styles.roleBtn} ${
                tab === "Secretary" ? styles.activeRole : ""
              }`}
              onClick={() => setTab("Secretary")}
            >
              Secretary
            </button>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>NOC Applications</h2>
          <p className={styles.cardSub}>Review and process NOC applications</p>

          {/* SEARCH + FILTERS */}
          <div className={styles.filtersRow}>
            <input
              className={styles.searchInput}
              placeholder="Search by application number or institute name..."
            />

            <select className={styles.filterSelect}>
              <option>All Statuses</option>
            </select>

            <select className={styles.filterSelect}>
              <option>All Types</option>
            </select>
          </div>

          {/* --- JD OFFICE VIEW --- */}
          {tab === "JDOffice" && (
            <>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <h3>All Applications</h3>
                  <div className={styles.statValue}>
                    {jdApplications.length}
                  </div>
                </div>

                <div className={styles.statBoxBlue}>
                  <h3>Pending Review</h3>
                  <div className={styles.statValue}>1</div>
                </div>

                <div className={styles.statBoxGreen}>
                  <h3>Approved</h3>
                  <div className={styles.statValue}>0</div>
                </div>

                <div className={styles.statBoxOrange}>
                  <h3>Total Vacancies</h3>
                  <div className={styles.statValue}>31</div>
                </div>
              </div>

              {/* JD TABLE */}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Application No.</th>
                    <th>Institute Name</th>
                    <th>Type</th>
                    <th>Vacancies</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {jdApplications.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.institute}</td>
                      <td>{row.type}</td>
                      <td>{row.vacancies}</td>
                      <td>{row.date}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            styles[row.statusType]
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <button className={styles.viewBtn}>
                          <FiEye size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* --- DIRECTOR VIEW --- */}
          {tab === "Director" && (
            <>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <h3>Total Applications</h3>
                  <div className={styles.statValue}>2</div>
                </div>

                <div className={styles.statBoxBlue}>
                  <h3>Pending Review</h3>
                  <div className={styles.statValue}>0</div>
                </div>

                <div className={styles.statBoxGreen}>
                  <h3>Approved</h3>
                  <div className={styles.statValue}>0</div>
                </div>

                <div className={styles.statBoxOrange}>
                  <h3>Total Vacancies</h3>
                  <div className={styles.statValue}>18</div>
                </div>
              </div>

              {/* DIRECTOR TABLE */}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Application No.</th>
                    <th>Institute Name</th>
                    <th>Type</th>
                    <th>Vacancies</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {directorApplications
                    .filter(
                      (r) =>
                        r.status === "Under Review (Director)" ||
                        r.status === "Forwarded to Director"
                    )
                    .map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.institute}</td>
                        <td>{row.type}</td>
                        <td>{row.vacancies}</td>
                        <td>{row.date}</td>
                        <td>
                          <span
                            className={`${styles.status} ${
                              styles[row.statusType]
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <button className={styles.viewBtn}>
                            <FiEye size={16} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
          {tab === "Secretary" && (
            <>
              {/* STATS ROW */}
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <h3>Total Applications</h3>
                  <div className={styles.statValue}>
                    {secretaryApplications.length}
                  </div>
                </div>

                <div className={styles.statBoxBlue}>
                  <h3>Pending Review</h3>
                  <div className={styles.statValue}>
                    {
                      secretaryApplications.filter((a) =>
                        a.status.includes("Under Review")
                      ).length
                    }
                  </div>
                </div>

                <div className={styles.statBoxGreen}>
                  <h3>Approved</h3>
                  <div className={styles.statValue}>
                    {
                      secretaryApplications.filter(
                        (a) => a.status === "Approved"
                      ).length
                    }
                  </div>
                </div>

                <div className={styles.statBoxOrange}>
                  <h3>Total Vacancies</h3>
                  <div className={styles.statValue}>
                    {secretaryApplications.reduce(
                      (sum, a) => sum + a.vacancies,
                      0
                    )}
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Application No.</th>
                    <th>Institute Name</th>
                    <th>Type</th>
                    <th>Vacancies</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {secretaryApplications.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.institute}</td>
                      <td>{row.type}</td>
                      <td>{row.vacancies}</td>
                      <td>{row.date}</td>

                      <td>
                        <span
                          className={`${styles.status} ${
                            styles[row.statusType]
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td>
                        <button className={styles.viewBtn}>
                          <FiEye size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
