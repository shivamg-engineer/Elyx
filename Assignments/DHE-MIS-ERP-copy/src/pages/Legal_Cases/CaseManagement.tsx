import { useState } from "react";
import styles from "./CaseMangement.module.css";
import { Gavel, CalendarClock, Activity, Eye, Calendar } from "lucide-react";

export default function LegalCasesManagement() {
  const pageSize = 10;
  const [page, setPage] = useState(1);

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
      court: "District Court Pune",
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
    // ADD MORE DATA so pagination can work
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

  const totalResults = allCases.length;
  const totalPages = Math.ceil(totalResults / pageSize);

  // ---------------- PAGINATION SLICE ----------------
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);

  const visibleCases = allCases.slice(startIndex, endIndex);

  // ---------------- BUTTON HANDLERS ----------------
  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

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

      {/* ---------- SUMMARY CARDS ---------- */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <Gavel size={20} />
            <span>Total Cases</span>
          </div>
          <h3 className={styles.cardValue}>18</h3>
          <p className={styles.cardLabel}>All cases</p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <Activity size={20} />
            <span>Active Cases</span>
          </div>
          <h3 className={styles.cardValue}>13</h3>
          <p className={styles.cardLabel}>Ongoing cases</p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <CalendarClock size={20} />
            <span>Upcoming Hearings</span>
          </div>
          <h3 className={styles.cardValue}>13</h3>
          <p className={styles.cardLabel}>Scheduled hearings</p>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <Gavel size={20} />
            <span>Disposed Cases</span>
          </div>
          <h3 className={styles.cardValue}>4</h3>
          <p className={styles.cardLabel}>Completed cases</p>
        </div>
      </div>

      {/* ---------- FILTER SECTION ---------- */}
      <div className={styles.filterCard}>
        <h3 className={styles.filterTitle}>Filters</h3>
        <p className={styles.filterSubtitle}>
          Filter cases by various criteria
        </p>

        <div className={styles.filterGrid}>
          <div className={styles.filterBox}>
            <label>Case Type</label>
            <select>
              <option>All</option>
            </select>
          </div>

          <div className={styles.filterBox}>
            <label>Status</label>
            <select>
              <option>All</option>
            </select>
          </div>

          <div className={styles.filterBox}>
            <label>Priority</label>
            <select>
              <option>All</option>
            </select>
          </div>

          <div className={styles.filterBox}>
            <label>Court Type</label>
            <select>
              <option>All</option>
            </select>
          </div>

          <div className={styles.filterBox}>
            <label>Court Location</label>
            <select>
              <option>All</option>
            </select>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search by case number, title, subject, or court..."
          />
        </div>

        <button className={styles.clearBtn}>Clear Filters</button>
      </div>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Cases ({totalResults})</h2>
        <p className={styles.subtitle}>Complete list of legal cases</p>

        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Case Number</th>
                <th>Case Title</th>
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
                    <span
                      className={`${styles.tag} ${
                        styles[
                          c.status
                            .replace(" ", "")
                            .replace("&", "")
                            .toLowerCase()
                        ]
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`${styles.tag} ${
                        c.priority === "High"
                          ? styles.high
                          : c.priority === "Medium"
                          ? styles.medium
                          : styles.low
                      }`}
                    >
                      {c.priority}
                    </span>
                  </td>

                  <td>
                    <div className={styles.hearingCell}>
                      {c.nextHearing !== "-" && <Calendar width={16} />}
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
            {/* DYNAMIC TEXT */}
            <span>
              Showing {startIndex + 1} to {endIndex} of {totalResults} results
            </span>

            {/* PAGINATION BUTTONS */}
            <div className={styles.pagination}>
              <button
                disabled={page === 1}
                onClick={prevPage}
                className={styles.pageBtn}
              >
                Previous
              </button>

              <span className={styles.pageIndicator}>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={nextPage}
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
