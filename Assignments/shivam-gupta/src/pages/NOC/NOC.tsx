import { useState, useMemo } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./NOC.module.css";
import { FiEye } from "react-icons/fi";

/* ------------------------------------------
   TYPE DEFINITIONS
-------------------------------------------*/
type Role = "JDOffice" | "Director" | "Secretary";

type StatusFilter =
  | "All Statuses"
  | "Submitted"
  | "Under Review"
  | "Correction Required"
  | "Approved"
  | "Rejected";

type TypeFilter =
  | "All Types"
  | "New Recruitment"
  | "Replacement"
  | "Additional Post";

type ApplicationRow = {
  id: string;
  institute: string;
  type: TypeFilter | string;
  vacancies: number;
  date: string;
  status: string;
  statusType: "green" | "blue" | "red" | "gray";
};

/* ------------------------------------------
   COMPONENT
-------------------------------------------*/
export const NOC = () => {
  /* ------------ DATA ------------ */
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

  /* ------------ STATES ------------ */
  const [tab, setTab] = useState<Role>("JDOffice");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All Statuses");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All Types");

  const roles: Role[] = ["JDOffice", "Director", "Secretary"];

  /* ------------ FILTER LOGIC ------------ */
  const getCurrentData = () => {
    if (tab === "JDOffice") return jdApplications;
    if (tab === "Director") return directorApplications;
    return secretaryApplications;
  };

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    const rows = getCurrentData();

    return rows.filter((r) => {
      const matchSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.institute.toLowerCase().includes(q);

      const normalizedStatus = r.status.toLowerCase();

      const matchStatus =
        statusFilter === "All Statuses" ||
        normalizedStatus.includes(statusFilter.toLowerCase());

      const matchType = typeFilter === "All Types" || r.type === typeFilter;

      return matchSearch && matchStatus && matchType;
    });
  }, [tab, search, statusFilter, typeFilter]);

  /* ------------ TABLE UI ------------ */
  const renderTable = () => (
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
        {filteredRows.length > 0 ? (
          filteredRows.map((row) => (
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
          ))
        ) : (
          <tr>
            <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
              No matching applications found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  /* ------------ PAGE UI ------------ */
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

          <div className={styles.roleTabs}>
            {roles.map((role) => (
              <button
                key={role}
                className={`${styles.roleBtn} ${
                  tab === role ? styles.activeRole : ""
                }`}
                onClick={() => setTab(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CARD */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>NOC Applications</h2>

          {/* FILTERS */}
          <div className={styles.filtersRow}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              placeholder="Search by application number or institute name..."
            />

            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as StatusFilter)
              }
            >
              <option>All Statuses</option>
              <option>Submitted</option>
              <option>Under Review</option>
              <option>Correction Required</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <select
              className={styles.filterSelect}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
            >
              <option>All Types</option>
              <option>New Recruitment</option>
              <option>Replacement</option>
              <option>Additional Post</option>
            </select>
          </div>

          {/* TABLE */}
          {renderTable()}
        </div>
      </div>
    </DashboardLayout>
  );
};
