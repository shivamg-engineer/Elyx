import { Link } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Verification.module.css";
import { useState, useMemo } from "react";

export const Verification = () => {
  const applications = [
    {
      id: "DHE/2024/001",
      institute: "St. Xavier’s College",
      type: "Aided College",
      region: "Mumbai",
      status: "Submitted",
      verification: "Pending",
      submitted: "15 Jan 2024",
      dhe: "-",
    },
    {
      id: "DHE/2024/002",
      institute: "Fergusson College",
      type: "Government College",
      region: "Pune",
      status: "Under Review",
      verification: "In Progress",
      submitted: "16 Jan 2024",
      dhe: "-",
    },
  ];

  // -----------------------------
  // FILTER STATES
  // -----------------------------
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("");

  // -----------------------------
  // BADGE FUNCTION
  // -----------------------------
  const badge = (value: string) => (
    <span
      className={`${styles.badge} ${
        styles[value.replace(" ", "").toLowerCase()]
      }`}
    >
      {value}
    </span>
  );

  // -----------------------------
  // FILTER LOGIC
  // -----------------------------
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const searchMatch =
        app.id.toLowerCase().includes(search.toLowerCase()) ||
        app.institute.toLowerCase().includes(search.toLowerCase()) ||
        app.dhe.toLowerCase().includes(search.toLowerCase());

      const statusMatch = statusFilter ? app.status === statusFilter : true;
      const verificationMatch = verificationFilter
        ? app.verification === verificationFilter
        : true;

      return searchMatch && statusMatch && verificationMatch;
    });
  }, [search, statusFilter, verificationFilter]);

  return (
    <DashboardLayout>
      <div className={styles.verification_wrapper}>
        {/* Header */}
        <div className={styles.header_row}>
          <div>
            <h2>Application Verification</h2>
            <p>Review and verify institute registration applications</p>
          </div>
          <button className={styles.export_btn}>Export</button>
        </div>

        {/* Search + Filters */}
        <div className={styles.search_filter_row}>
          <input
            className={styles.search_input}
            placeholder="Search by application number, institute name, or DHE code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Status Filter */}
          <select
            className={styles.filter_dropdown}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
          </select>

          {/* Verification Filter */}
          <select
            className={styles.filter_dropdown}
            value={verificationFilter}
            onChange={(e) => setVerificationFilter(e.target.value)}
          >
            <option value="">Verification</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Reset Button */}
          <button
            className={styles.filter_btn}
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setVerificationFilter("");
            }}
          >
            Reset
          </button>
        </div>

        {/* Summary Cards */}
        <div className={styles.summary_row}>
          <div className={styles.summary_card}>
            <h3>30</h3>
            <p>Total Applications</p>
          </div>

          <div className={`${styles.summary_card} ${styles.yellow}`}>
            <h3>6</h3>
            <p>Pending</p>
          </div>

          <div className={`${styles.summary_card} ${styles.blue}`}>
            <h3>6</h3>
            <p>In Progress</p>
          </div>

          <div className={`${styles.summary_card} ${styles.green}`}>
            <h3>6</h3>
            <p>Approved</p>
          </div>
        </div>

        {/* Table */}
        <div className={styles.application_table}>
          <table>
            <thead>
              <tr>
                <th>Application No.</th>
                <th>Institute Name</th>
                <th>Type</th>
                <th>Region</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Submitted</th>
                <th>DHE Code</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((a, i) => (
                <tr key={i}>
                  <td>{a.id}</td>
                  <td>{a.institute}</td>
                  <td>{a.type}</td>
                  <td>{a.region}</td>
                  <td>{badge(a.status)}</td>
                  <td>{badge(a.verification)}</td>
                  <td>{a.submitted}</td>
                  <td>{a.dhe}</td>

                  <td>
                    <Link
                      to={`/verification/application/${a.id}`}
                      className={styles.view_link}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: "1rem" }}>
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination_row}>
          <button className={styles.page_btn}>{`<<`}</button>
          <button className={`${styles.page_btn} ${styles.active}`}>1</button>
          <button className={styles.page_btn}>2</button>
          <button className={styles.page_btn}>3</button>
          <button className={styles.page_btn}>{`>>`}</button>

          <div className={styles.rows_per_page}>
            <label>Rows per page:</label>
            <select>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
