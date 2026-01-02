import { useState } from "react";
import styles from "./CaseMangement.module.css";
import { Eye, Calendar } from "lucide-react";

export default function LegalCasesManagement() {
  const pageSize = 10;

  // ---------------- STATES ----------------
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    type: "All",
    status: "All",
    priority: "All",
    courtType: "All",
    courtLocation: "All",
    search: "",
  });

  // ---------------- HANDLE FILTER CHANGE ----------------
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // reset to page 1 on filter change
  };

  // ---------------- CASE DATA ----------------
  const allCases = [
    {
      number: "WP/2023/1234",
      date: "15 Mar 2023",
      title: "ABC College vs. State of Maharashtra",
      subtitle: "Grant-in-Aid Dispute",
      type: "Administrative",
      court: "Bombay High Court",
      location: "Mumbai",
      status: "Under Hearing",
      priority: "High",
      nextHearing: "15 Dec 2024",
    },
    {
      number: "CS/2022/5678",
      date: "20 Aug 2022",
      title: "XYZ Institute vs. Former Employee",
      subtitle: "Service Termination Dispute",
      type: "Labor",
      court: "District Court",
      location: "Pune",
      status: "Disposed",
      priority: "Medium",
      nextHearing: "-",
    },
    {
      number: "WP/2024/3456",
      date: "10 Jan 2024",
      title: "PQR College vs. University Grants Commission",
      subtitle: "UGC Recognition Dispute",
      type: "Administrative",
      court: "Bombay High Court",
      location: "Nagpur Bench",
      status: "Pending",
      priority: "High",
      nextHearing: "20 Dec 2024",
    },
    {
      number: "RTI/2023/789",
      date: "5 Jun 2023",
      title: "Citizen vs. LMN College",
      subtitle: "RTI Appeal",
      type: "RTI",
      court: "State Information Commission",
      location: "Mumbai",
      status: "Closed",
      priority: "Low",
      nextHearing: "-",
    },
    {
      number: "WP/2024/7890",
      date: "15 May 2024",
      title: "DEF Institute vs. NAAC",
      subtitle: "NAAC Accreditation Dispute",
      type: "Administrative",
      court: "Delhi High Court",
      location: "New Delhi",
      status: "Adjourned",
      priority: "Medium",
      nextHearing: "10 Jan 2025",
    },
    // MORE DATA...
    {
      number: "CS/2023/1986",
      date: "1 Jan 2023",
      title: "College A vs. Govt Authority",
      subtitle: "Civil Matter 6",
      type: "Civil",
      court: "District Court",
      location: "Mumbai",
      status: "Pending",
      priority: "Low",
      nextHearing: "1 Feb 2024",
    },
    {
      number: "CS/2024/1087",
      date: "2 Feb 2024",
      title: "College B vs. Private Party",
      subtitle: "Service Matter 7",
      type: "Service",
      court: "Sessions Court",
      location: "Pune",
      status: "Under Hearing",
      priority: "Medium",
      nextHearing: "2 Mar 2024",
    },
    {
      number: "TA/2023/1088",
      date: "3 Mar 2023",
      title: "College C vs. Govt Authority",
      subtitle: "Labor Matter 8",
      type: "Labor",
      court: "Labour Tribunal",
      location: "Nagpur",
      status: "Adjourned",
      priority: "High",
      nextHearing: "3 Apr 2024",
    },
    {
      number: "CS/2024/1009",
      date: "4 Apr 2024",
      title: "College D vs. Private Party",
      subtitle: "Constitutional Matter 9",
      type: "Constitutional",
      court: "District Court",
      location: "Nashik",
      status: "Disposed",
      priority: "Low",
      nextHearing: "-",
    },
    {
      number: "CS/2023/1010",
      date: "5 May 2023",
      title: "College E vs. Govt Authority",
      subtitle: "Civil Matter 10",
      type: "Civil",
      court: "Sessions Court",
      location: "Aurangabad",
      status: "Pending",
      priority: "Medium",
      nextHearing: "5 Jun 2024",
    },
  ];

  // ---------------- FILTER LOGIC ----------------
  const filteredCases = allCases.filter((c) => {
    const q = filters.search.toLowerCase();

    const matchType = filters.type === "All" || c.type === filters.type;
    const matchStatus = filters.status === "All" || c.status === filters.status;
    const matchPriority = filters.priority === "All" || c.priority === filters.priority;

    const matchCourtType =
      filters.courtType === "All" ||
      c.court.toLowerCase().includes(filters.courtType.toLowerCase());

    const matchCourtLocation =
      filters.courtLocation === "All" || c.location === filters.courtLocation;

    const searchMatch =
      q === "" ||
      c.number.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.court.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q);

    return (
      matchType &&
      matchStatus &&
      matchPriority &&
      matchCourtType &&
      matchCourtLocation &&
      searchMatch
    );
  });

  // ---------------- PAGINATION ----------------
  const totalResults = filteredCases.length;
  const totalPages = Math.ceil(totalResults / pageSize);

  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalResults);

  const visibleCases = filteredCases.slice(start, end);

  return (
    <div className={styles.page}>
      {/* ---------- TOP SECTION ---------- */}
      <h1 className={styles.mainTitle}>All Cases</h1>
      <p className={styles.mainSubtitle}>
        View and manage all legal cases with filtering options
      </p>

      <h2 className={styles.sectionTitle}>Legal Case Management</h2>
      <p className={styles.sectionSubtitle}>
        Track and manage institutional legal cases
      </p>

      {/* ---------------- FILTERS ---------------- */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Filters</h3>
        <p className={styles.filterSubtitle}>Filter cases by various criteria</p>

        <div className={styles.filterGrid}>
          {/* TYPE */}
          <div className={styles.filterBox}>
            <label>Case Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option>All</option>
              <option>Civil</option>
              <option>Criminal</option>
              <option>Labor</option>
              <option>Service</option>
              <option>Administrative</option>
              <option>Constitutional</option>
              <option>RTI</option>
              <option>Other</option>
            </select>
          </div>

          {/* STATUS */}
          <div className={styles.filterBox}>
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option>All</option>
              <option>Pending</option>
              <option>Under Hearing</option>
              <option>Adjourned</option>
              <option>Judgement Reserved</option>
              <option>Disposed</option>
              <option>Closed</option>
              <option>Withdrawn</option>
            </select>
          </div>

          {/* PRIORITY */}
          <div className={styles.filterBox}>
            <label>Priority</label>
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          {/* COURT TYPE */}
          <div className={styles.filterBox}>
            <label>Court Type</label>
            <select
              name="courtType"
              value={filters.courtType}
              onChange={handleFilterChange}
            >
              <option>All</option>
              <option>Supreme Court</option>
              <option>High Court</option>
              <option>District Court</option>
              <option>Sessions Court</option>
              <option>Magistrate Court</option>
              <option>Tribunal</option>
            </select>
          </div>

          {/* COURT LOCATION */}
          <div className={styles.filterBox}>
            <label>Court Location</label>
            <select
              name="courtLocation"
              value={filters.courtLocation}
              onChange={handleFilterChange}
            >
              <option>All</option>
              <option>Aurangabad</option>
              <option>Mumbai</option>
              <option>Nagpur</option>
              <option>Nagpur Bench</option>
              <option>Nashik</option>
              <option>New Delhi</option>
              <option>Pune</option>
            </select>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            name="search"
            value={filters.search}
            placeholder="Search by case number, title, subject, or court..."
            onChange={handleFilterChange}
          />
        </div>

        <button
          className={styles.clearBtn}
          onClick={() =>
            setFilters({
              type: "All",
              status: "All",
              priority: "All",
              courtType: "All",
              courtLocation: "All",
              search: "",
            })
          }
        >
          Clear Filters
        </button>
      </div>

      {/* ---------------- CASE TABLE ---------------- */}
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Cases ({totalResults})</h2>
        <p className={styles.subtitle}>Complete list of legal cases</p>

        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Case Number</th>
                <th>Title</th>
                <th>Type</th>
                <th>Court</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Next Hearing</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleCases.map((c, i) => (
                <tr key={i}>
                  <td>
                    <div className={styles.caseNum}>{c.number}</div>
                    <div className={styles.caseDate}>{c.date}</div>
                  </td>

                  <td>
                    <div className={styles.caseTitle}>{c.title}</div>
                    <div className={styles.caseSubtitle}>{c.subtitle}</div>
                  </td>

                  <td>
                    <span className={`${styles.tag} ${styles.typeTag}`}>
                      {c.type}
                    </span>
                  </td>

                  <td>
                    <div className={styles.court}>{c.court}</div>
                    <div className={styles.courtLoc}>{c.location}</div>
                  </td>

                  <td>
                    <span className={`${styles.tag}`}>{c.status}</span>
                  </td>

                  <td>
                    <span className={`${styles.tag}`}>{c.priority}</span>
                  </td>

                  <td>
                    <div className={styles.hearingCell}>
                      {c.nextHearing !== "-" && <Calendar size={16} />}
                      <span>{c.nextHearing}</span>
                    </div>
                  </td>

                  <td>
                    <button className={styles.iconBtn}>
                      <Eye width={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ---------- FOOTER ---------- */}
          <div className={styles.footer}>
            <span>
              Showing {start + 1} to {end} of {totalResults} results
            </span>

            <div className={styles.pagination}>
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={styles.pageBtn}
              >
                Previous
              </button>

              <span className={styles.pageIndicator}>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className={styles.pageBtn}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
