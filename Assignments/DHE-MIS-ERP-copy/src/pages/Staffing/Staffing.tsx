import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Staffing.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Staffing = () => {
  //  Main tabs
  const [mainTab, setMainTab] = useState<"approved" | "staff" | "salary">(
    "approved"
  );

  //  Sub tabs for Approved Seats
  const [subTab, setSubTab] = useState<
    "all" | "subject" | "category" | "gender"
  >("all");

  const approvedSeats = [
    {
      subject: "English",
      designation: "Professor",
      category: "GENERAL",
      gender: "Male",
      disability: "-",
      approved: 2,
      filled: 2,
      vacant: 0,
      fillRate: "100%",
    },
    {
      subject: "English",
      designation: "Assistant Professor",
      category: "OBC",
      gender: "Female",
      disability: "-",
      approved: 3,
      filled: 2,
      vacant: 1,
      fillRate: "67%",
    },
  ];

  // ------------------------------------------------------------------
  // STAFF LIST DATA
  // ------------------------------------------------------------------
  const staffList = [
    {
      id: "EMP001",
      name: "Dr. Rajesh Kumar",
      subject: "English",
      designation: "Professor",
      type: "Permanent",
      category: "GENERAL",
      status: "Active",
    },
    {
      id: "EMP002",
      name: "Dr. Priya Sharma",
      subject: "Mathematics",
      designation: "Associate Professor",
      type: "Temporary",
      category: "OBC",
      status: "Active",
    },
    {
      id: "EMP003",
      name: "Ms. Anjali Desai",
      subject: "Physics",
      designation: "Assistant Professor",
      type: "Contract",
      category: "SC",
      status: "Active",
    },
  ];

  // SUB PAGE DATA ---------------------------------
  const subjectStats = [
    { name: "English", approved: 8, filled: 6, vacant: 2, rate: "75.0%" },
    { name: "Mathematics", approved: 10, filled: 7, vacant: 3, rate: "70.0%" },
    { name: "Physics", approved: 8, filled: 5, vacant: 3, rate: "62.5%" },
    { name: "Chemistry", approved: 7, filled: 6, vacant: 1, rate: "85.7%" },
    { name: "History", approved: 5, filled: 3, vacant: 2, rate: "60.0%" },
    {
      name: "Computer Science",
      approved: 13,
      filled: 8,
      vacant: 5,
      rate: "61.5%",
    },
    { name: "Commerce", approved: 9, filled: 7, vacant: 2, rate: "77.8%" },
  ];

  const categoryStats = [
    { name: "GENERAL", approved: 33, filled: 26, vacant: 7 },
    { name: "OBC", approved: 19, filled: 13, vacant: 6 },
    { name: "SC", approved: 6, filled: 3, vacant: 3 },
    { name: "ST", approved: 2, filled: 0, vacant: 2 },
    { name: "EBC", approved: 0, filled: 0, vacant: 0 },
    { name: "VJNT", approved: 0, filled: 0, vacant: 0 },
    { name: "NT", approved: 0, filled: 0, vacant: 0 },
    { name: "SBC", approved: 0, filled: 0, vacant: 0 },
  ];

  const genderStats = [
    { name: "Male", approved: 29, filled: 21, vacant: 8 },
    { name: "Female", approved: 31, filled: 21, vacant: 10 },
    { name: "Other", approved: 0, filled: 0, vacant: 0 },
  ];

  // CLASS HELPERS ---------------------------------
  const getVacantClass = (vacant: number) => {
    if (vacant === 0) return styles.vacant_zero;
    if (vacant >= 1) return styles.vacant_low;
    return styles.vacant_high;
  };

  const getFillRateClass = (rate: string) => {
    const numeric = parseInt(rate.replace("%", ""), 10);
    if (numeric === 100) return styles.fill_green;
    if (numeric >= 70) return styles.fill_yellow;
    return styles.fill_red;
  };

  const getBadge = (value: string) => (
    <span className={styles.badge}>{value}</span>
  );

  const getStatusBadge = (value: string) => (
    <span className={styles.status_active}>{value}</span>
  );

  // ------------------------------------------------------------------
  // STAFF LIST RENDERER
  // ------------------------------------------------------------------
  const renderStaffList = () => (
    <>
      <div className={styles.filter_box}>
        <h3>Filters</h3>
        <p>Filter staff by various criteria</p>

        <div className={styles.filter_grid}>
          <div>
            <label>Subject</label>
            <select>
              <option>All</option>
            </select>
          </div>
          <div>
            <label>Designation</label>
            <select>
              <option>All</option>
            </select>
          </div>
          <div>
            <label>Appointment Type</label>
            <select>
              <option>All</option>
            </select>
          </div>
          <div>
            <label>Category</label>
            <select>
              <option>All</option>
            </select>
          </div>
          <div>
            <label>Gender</label>
            <select>
              <option>All</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select>
              <option>All</option>
            </select>
          </div>
        </div>

        <div className={styles.search_box}>
          <input placeholder="Search by name, ID, email, or subject..." />
        </div>

        <button className={styles.clear_btn}>Clear Filters</button>
      </div>

      <div className={styles.table_wrapper}>
        <h3>Staff Members (35)</h3>
        <p>Complete list of staff members</p>

        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Designation</th>
              <th>Type</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((s, idx) => (
              <tr key={idx}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.subject}</td>
                <td>{s.designation}</td>
                <td>{getBadge(s.type)}</td>
                <td>{getBadge(s.category)}</td>
                <td>{getStatusBadge(s.status)}</td>
                <td className={styles.actions}>
                  <Link to={`/staffing/${idx}`} className={styles.icon_view}>
                    👁️
                  </Link>
                  <Link to={`/staffing/${idx}`} className={styles.icon_edit}>
                    ✏️
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Pagination */}
      <div className={styles.pagination_row}>
        <button>Previous</button>
        <span>Page 1 of 2</span>
        <button>Next</button>
      </div>
    </>
  );

  // ------------------------------------------------------------------
  // SALARY DETAILS RENDERER
  // ------------------------------------------------------------------
  const renderSalaryDetails = () => (
    <div className={styles.salary_box}>
      <h2>Salary Details</h2>
      <p>Select a staff member to view salary details</p>

      <p>
        Please select a staff member from the Staff List tab to view their
        salary details.
      </p>

      <button
        className={styles.go_to_staff_btn}
        onClick={() => setMainTab("staff")}
      >
        Go to Staff List
      </button>
    </div>
  );
  // ------------------------------------------------------------------
  // APPROVED SEATS PAGE (YOUR EXISTING CODE)
  // ------------------------------------------------------------------
  const renderApprovedSeats = () => (
    <>
      {/* --- header text already above --- */}

      {/* FILTER BOX */}
      <div className={styles.filter_box}>
        <h3>Filters</h3>
        <p>Filter approved seats by various criteria</p>

        {/* your filter grid */}
        <div className={styles.filter_grid}>
          <div>
            <label>Subject</label>
            <select>
              <option>All Subjects</option>
            </select>
          </div>
          <div>
            <label>Designation</label>
            <select>
              <option>All Designations</option>
            </select>
          </div>
          <div>
            <label>Category</label>
            <select>
              <option>All Categories</option>
            </select>
          </div>
          <div>
            <label>Gender</label>
            <select>
              <option>All Genders</option>
            </select>
          </div>
          <div>
            <label>Disability</label>
            <select>
              <option>All Types</option>
            </select>
          </div>
          <div>
            <label>Show Vacant Only</label>
            <select>
              <option>All Positions</option>
              <option>Vacant Only</option>
            </select>
          </div>
        </div>

        <div className={styles.search_box}>
          <input placeholder="Search by subject, post, category..." />
        </div>

        <button className={styles.clear_btn}>Clear Filters</button>
      </div>

      {/* MINI TABS */}
      <div className={styles.small_tabs}>
        <button
          className={subTab === "all" ? styles.active_tab_small : ""}
          onClick={() => setSubTab("all")}
        >
          All Seats
        </button>
        <button
          className={subTab === "subject" ? styles.active_tab_small : ""}
          onClick={() => setSubTab("subject")}
        >
          By Subject
        </button>
        <button
          className={subTab === "category" ? styles.active_tab_small : ""}
          onClick={() => setSubTab("category")}
        >
          By Category
        </button>
        <button
          className={subTab === "gender" ? styles.active_tab_small : ""}
          onClick={() => setSubTab("gender")}
        >
          By Gender
        </button>
      </div>

      {/* SUBTAB CONTENT */}
      {subTab === "all" && (
        <div className={styles.table_wrapper}>
          <h3>Approved Seats (25)</h3>
          <p>Complete list of approved staff positions</p>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Designation</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Disability</th>
                <th>Approved</th>
                <th>Filled</th>
                <th>Vacant</th>
                <th>Fill Rate</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {approvedSeats.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.subject}</td>
                  <td>{s.designation}</td>
                  <td>{s.category}</td>
                  <td>{s.gender}</td>
                  <td>{s.disability}</td>
                  <td>{s.approved}</td>
                  <td className={styles.green_text}>{s.filled}</td>
                  <td className={getVacantClass(s.vacant)}>{s.vacant}</td>
                  <td className={getFillRateClass(s.fillRate)}>{s.fillRate}</td>
                  <td>
                    <Link
                      to={`/staffing/${idx}`}
                      className={styles.action_icon}
                    >
                      ✏️
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "subject" && (
        <div className={styles.card_grid}>
          {subjectStats.map((s, idx) => (
            <div key={idx} className={styles.info_card}>
              <h3>{s.name}</h3>

              <div className={styles.card_row}>
                <span>Approved:</span>
                <span>{s.approved}</span>
              </div>
              <div className={styles.card_row}>
                <span>Filled:</span>
                <span className={styles.num_green}>{s.filled}</span>
              </div>
              <div className={styles.card_row}>
                <span>Vacant:</span>
                <span className={styles.num_red}>{s.vacant}</span>
              </div>

              <div className={styles.fill_rate_label}>
                <b>Fill Rate:</b> {s.rate}
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === "category" && (
        <div className={styles.card_grid}>
          {categoryStats.map((c, idx) => (
            <div key={idx} className={styles.info_card}>
              <h3>{c.name}</h3>

              <div className={styles.card_row}>
                <span>Approved:</span>
                <span>{c.approved}</span>
              </div>
              <div className={styles.card_row}>
                <span>Filled:</span>
                <span className={styles.num_green}>{c.filled}</span>
              </div>
              <div className={styles.card_row}>
                <span>Vacant:</span>
                <span className={styles.num_red}>{c.vacant}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === "gender" && (
        <div className={styles.card_grid}>
          {genderStats.map((g, idx) => (
            <div key={idx} className={styles.info_card}>
              <h3>{g.name}</h3>

              <div className={styles.card_row}>
                <span>Approved:</span>
                <span>{g.approved}</span>
              </div>
              <div className={styles.card_row}>
                <span>Filled:</span>
                <span className={styles.num_green}>{g.filled}</span>
              </div>
              <div className={styles.card_row}>
                <span>Vacant:</span>
                <span className={styles.num_red}>{g.vacant}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className={styles.pagination_row}>
        <button>Previous</button>
        <span>Page 1 of 2</span>
        <button>Next</button>
      </div>
    </>
  );

  // SUBPAGE RENDERERS ------------------------------
  const renderBySubject = () => (
    <div className={styles.card_grid}>
      {subjectStats.map((s, idx) => (
        <div key={idx} className={styles.info_card}>
          <h3>{s.name}</h3>

          <div className={styles.card_row}>
            <span>Approved:</span>
            <span className={styles.num_black}>{s.approved}</span>
          </div>
          <div className={styles.card_row}>
            <span>Filled:</span>
            <span className={styles.num_green}>{s.filled}</span>
          </div>
          <div className={styles.card_row}>
            <span>Vacant:</span>
            <span className={styles.num_red}>{s.vacant}</span>
          </div>

          <div className={styles.fill_rate_label}>
            <b>Fill Rate:</b> {s.rate}
          </div>
        </div>
      ))}
    </div>
  );

  const renderByCategory = () => (
    <div className={styles.card_grid}>
      {categoryStats.map((c, idx) => (
        <div key={idx} className={styles.info_card}>
          <h3>{c.name}</h3>

          <div className={styles.card_row}>
            <span>Approved:</span>
            <span className={styles.num_black}>{c.approved}</span>
          </div>
          <div className={styles.card_row}>
            <span>Filled:</span>
            <span className={styles.num_green}>{c.filled}</span>
          </div>
          <div className={styles.card_row}>
            <span>Vacant:</span>
            <span className={styles.num_red}>{c.vacant}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderByGender = () => (
    <div className={styles.card_grid}>
      {genderStats.map((g, idx) => (
        <div key={idx} className={styles.info_card}>
          <h3>{g.name}</h3>

          <div className={styles.card_row}>
            <span>Approved:</span>
            <span className={styles.num_black}>{g.approved}</span>
          </div>
          <div className={styles.card_row}>
            <span>Filled:</span>
            <span className={styles.num_green}>{g.filled}</span>
          </div>
          <div className={styles.card_row}>
            <span>Vacant:</span>
            <span className={styles.num_red}>{g.vacant}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAllSeats = () => (
    <div className={styles.table_wrapper}>
      <h3>Approved Seats (25)</h3>

      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Designation</th>
            <th>Category</th>
            <th>Gender</th>
            <th>Disability</th>
            <th>Approved</th>
            <th>Filled</th>
            <th>Vacant</th>
            <th>Fill Rate</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {approvedSeats.map((s, idx) => (
            <tr key={idx}>
              <td>{s.subject}</td>
              <td>{s.designation}</td>
              <td>{s.category}</td>
              <td>{s.gender}</td>
              <td>{s.disability}</td>
              <td>{s.approved}</td>
              <td className={styles.green_text}>{s.filled}</td>
              <td className={getVacantClass(s.vacant)}>{s.vacant}</td>
              <td className={getFillRateClass(s.fillRate)}>{s.fillRate}</td>
              <td>
                <Link to={`/staffing/${idx}`} className={styles.action_icon}>
                  ✏️
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ------------------------------------------------------

  return (
    <DashboardLayout>
      <div className={styles.staffing_wrapper}>
        {/* ----- PAGE HEADER ----- */}
        <h1>Staffing Management</h1>
        <p>Manage approved seats, staff records, and salary information</p>

        {/* ----- MAIN TABS ----- */}
        <div className={styles.main_tabs}>
          <button
            className={mainTab === "approved" ? styles.active_main_tab : ""}
            onClick={() => setMainTab("approved")}
          >
            Approved Seats
          </button>

          <button
            className={mainTab === "staff" ? styles.active_main_tab : ""}
            onClick={() => setMainTab("staff")}
          >
            Staff List
          </button>

          <button
            className={mainTab === "salary" ? styles.active_main_tab : ""}
            onClick={() => setMainTab("salary")}
          >
            Salary Details
          </button>
        </div>

        {/* ----- MAIN TAB CONTENT ----- */}
        {mainTab === "approved" && renderApprovedSeats()}
        {mainTab === "staff" && renderStaffList()}
        {mainTab === "salary" && renderSalaryDetails()}
      </div>
    </DashboardLayout>
  );
};
