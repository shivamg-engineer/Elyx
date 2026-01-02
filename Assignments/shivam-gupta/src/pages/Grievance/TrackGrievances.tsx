import React, { useMemo, useState } from "react";
import styles from "./TrackGrievances.module.css";

export default function TrackGrievances() {
  const initialRows = [
    {
      id: "GRV/2024/001",
      name: "Rajesh Kumar",
      emp: "EMP01000",
      category: "Major",
      nature: "Advance",
      subject: "Delay in salary payment for last three months",
      date: "01/15/2024",
      status: "Resolved",
    },
    {
      id: "GRV/2024/002",
      name: "Priya Sharma",
      emp: "EMP01001",
      category: "Medium",
      nature: "Benefits",
      subject: "Leave application rejected without proper justification",
      date: "01/20/2024",
      status: "Under Investigation",
    },
    {
      id: "GRV/2024/003",
      name: "Amit Patel",
      emp: "EMP01002",
      category: "Minor",
      nature: "Leave",
      subject: "Advance payment request pending for six months",
      date: "01/25/2024",
      status: "Pending",
    },
    {
      id: "GRV/2024/004",
      name: "Sunita Deshmukh",
      emp: "EMP01003",
      category: "Major",
      nature: "Salary",
      subject: "Benefits not provided as per service rules",
      date: "01/10/2024",
      status: "Resolved",
    },
    {
      id: "GRV/2024/005",
      name: "Vikram Singh",
      emp: "EMP01004",
      category: "Medium",
      nature: "Promotion",
      subject: "Promotion denied despite meeting all criteria",
      date: "02/01/2024",
      status: "Under Investigation",
    },
    {
      id: "GRV/2024/006",
      name: "Neha Gupta",
      emp: "EMP01005",
      category: "Minor",
      nature: "Transfer",
      subject: "Transfer request not processed",
      date: "02/05/2024",
      status: "Pending",
    },
    {
      id: "GRV/2024/007",
      name: "Rahul Verma",
      emp: "EMP01006",
      category: "Major",
      nature: "Working Conditions",
      subject: "Poor working conditions in department",
      date: "01/05/2024",
      status: "Resolved",
    },
    {
      id: "GRV/2024/008",
      name: "Pooja Nair",
      emp: "EMP01007",
      category: "Medium",
      nature: "Harassment",
      subject: "Harassment by senior colleague",
      date: "02/08/2024",
      status: "Under Investigation",
    },
    {
      id: "GRV/2024/009",
      name: "Suresh Patil",
      emp: "EMP01008",
      category: "Minor",
      nature: "Other",
      subject: "Increment not granted as per rules",
      date: "02/10/2024",
      status: "Pending",
    },
    {
      id: "GRV/2024/010",
      name: "Meena Joshi",
      emp: "EMP01009",
      category: "Major",
      nature: "Advance",
      subject: "Medical reimbursement claim rejected",
      date: "01/12/2024",
      status: "Resolved",
    },
  ];

  // filter state (controlled)
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    category: "All",
    nature: "All",
    fromDate: "",
    toDate: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const clearFilters = () =>
    setFilters({
      search: "",
      status: "All",
      category: "All",
      nature: "All",
      fromDate: "",
      toDate: "",
    });

  // Parse mm/dd/yyyy or yyyy-mm-dd into a Date (local)
  const parseDate = (str: string | null): Date | null => {
    if (!str) return null;

    // Case 1: HTML date input (yyyy-mm-dd)
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      const d = new Date(str);
      return isNaN(d.getTime()) ? null : d;
    }

    // Case 2: mm/dd/yyyy
    const parts = str.split("/");
    if (parts.length === 3) {
      const mm = parseInt(parts[0], 10) - 1;
      const dd = parseInt(parts[1], 10);
      const yyyy = parseInt(parts[2], 10);

      const d = new Date(yyyy, mm, dd);
      return isNaN(d.getTime()) ? null : d;
    }

    // Fallback — last attempt
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  };

  // filtered rows memoized
  const filtered = useMemo(() => {
    const s = filters.search.trim().toLowerCase();
    const from = parseDate(filters.fromDate);
    const to = parseDate(filters.toDate);

    return initialRows.filter((r) => {
      // search across id, name, emp, subject
      const matchesSearch =
        !s ||
        r.id.toLowerCase().includes(s) ||
        r.name.toLowerCase().includes(s) ||
        r.emp.toLowerCase().includes(s) ||
        r.subject.toLowerCase().includes(s);

      // status
      const matchesStatus =
        filters.status === "All" || r.status === filters.status;

      // category
      const matchesCategory =
        filters.category === "All" || r.category === filters.category;

      // nature
      const matchesNature =
        filters.nature === "All" || r.nature === filters.nature;

      // date range
      const rowDate: Date | null = parseDate(r.date);
      let matchesDate = true;
      if (from || to) {
        if (!rowDate) {
          matchesDate = false; // invalid or missing date => exclude
        } else if (from && to) {
          matchesDate = rowDate >= from && rowDate <= to;
        } else if (from) {
          matchesDate = rowDate >= from;
        } else if (to) {
          matchesDate = rowDate <= to;
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesNature &&
        matchesDate
      );
    });
  }, [filters, initialRows]);

  // statistics updated according to filtered results
  const stats = useMemo(() => {
    const tally = {
      Total: filtered.length,
      Submitted: 0,
      "Under Investigation": 0,
      Pending: 0,
      Resolved: 0,
      Closed: 0,
    };
    filtered.forEach((r) => {
      if (r.status === "Submitted") tally.Submitted++;
      else if (r.status === "Under Investigation")
        tally["Under Investigation"]++;
      else if (r.status === "Pending") tally.Pending++;
      else if (r.status === "Resolved") tally.Resolved++;
      else if (r.status === "Closed") tally.Closed++;
    });
    return tally;
  }, [filtered]);

  return (
    <div className={styles.page}>
      {/* Filters card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Search &amp; Filter Grievances</h3>
          <p className={styles.cardSubtitle}>
            Filter by grievance ID, nature, category, and date of complaint
          </p>
        </div>

        <div className={styles.filterGrid}>
          <div className={styles.filterItem}>
            <label>Search</label>
            <input
              name="search"
              value={filters.search}
              onChange={onChange}
              placeholder="Grievance ID, name, or employee ID"
            />
          </div>

          <div className={styles.filterItem}>
            <label>Status</label>
            <select name="status" value={filters.status} onChange={onChange}>
              <option>All</option>
              <option>Submitted</option>
              <option>Under Investigation</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={onChange}
            >
              <option>All</option>
              <option>Minor</option>
              <option>Medium</option>
              <option>Major</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label>Nature</label>
            <select name="nature" value={filters.nature} onChange={onChange}>
              <option>All</option>
              <option>Advance</option>
              <option>Benefits</option>
              <option>Leave</option>
              <option>Salary</option>
              <option>Promotion</option>
              <option>Transfer</option>
              <option>Harassment</option>
              <option>Working Conditions</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <label>From Date</label>
            <input
              name="fromDate"
              onChange={onChange}
              value={filters.fromDate}
              placeholder="mm/dd/yyyy"
            />
          </div>

          <div className={styles.filterItem}>
            <label>To Date</label>
            <input
              name="toDate"
              onChange={onChange}
              value={filters.toDate}
              placeholder="mm/dd/yyyy"
            />
          </div>
        </div>

        <div className={styles.filterActions}>
          <button
            className={styles.searchBtn}
            onClick={() => {
              /* UI-only, no API */
            }}
          >
            🔍 Search
          </button>
          <button className={styles.resetBtn} onClick={clearFilters}>
            Reset
          </button>
        </div>
      </div>

      {/* Grievance list card */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Grievance List</h3>
        <p className={styles.cardSubtitle}>
          Found {filtered.length} grievance(s)
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Grievance ID</th>
                <th>Complainant</th>
                <th>Category</th>
                <th>Nature</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((r, idx) => (
                <tr key={idx}>
                  <td className={styles.idCell}>{r.id}</td>

                  <td>
                    <div className={styles.name}>{r.name}</div>
                    <div className={styles.emp}>{r.emp}</div>
                  </td>

                  <td>
                    <span className={styles.categoryBadge}>{r.category}</span>
                  </td>

                  <td>{r.nature}</td>

                  <td className={styles.subjectCol}>
                    <div className={styles.subjectText}>{r.subject}</div>
                  </td>

                  <td>{r.date}</td>

                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        r.status === "Resolved"
                          ? styles.resolved
                          : r.status === "Under Investigation"
                          ? styles.investigating
                          : r.status === "Pending"
                          ? styles.pending
                          : r.status === "Closed"
                          ? styles.closed
                          : ""
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className={styles.actions}>
                    <span className={styles.eye}>👁</span>
                    <span className={styles.viewText}>View</span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ padding: 18, color: "#6b7280" }}>
                    No records found for the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <div>
            Showing 1 to {Math.min(10, filtered.length)} of {filtered.length}{" "}
            results
          </div>
          <div className={styles.pagination}>
            <button className={styles.pageBtn}>Previous</button>
            <span>Page 1 of 1</span>
            <button className={styles.pageBtn}>Next</button>
          </div>
        </div>
      </div>

      {/* Stats cards (updated by filtered results) */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <p className={styles.statLabel}>Total</p>
          <h4 className={styles.statValue}>{stats.Total}</h4>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Submitted</p>
          <h4 className={styles.statValue}>{stats.Submitted}</h4>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Under Investigation</p>
          <h4 className={styles.statValue}>{stats["Under Investigation"]}</h4>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Pending</p>
          <h4 className={styles.statValue}>{stats.Pending}</h4>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Resolved</p>
          <h4 className={styles.statValue}>{stats.Resolved}</h4>
        </div>

        <div className={styles.statCard}>
          <p className={styles.statLabel}>Closed</p>
          <h4 className={styles.statValue}>{stats.Closed}</h4>
        </div>
      </div>
    </div>
  );
}
