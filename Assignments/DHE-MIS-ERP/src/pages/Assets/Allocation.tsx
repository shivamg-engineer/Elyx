import { useState } from "react";
import styles from "./Allocation.module.css";
import { Search } from "lucide-react";
import allocationData from "./allocationData.json";

import { PieChart, Pie, Cell } from "recharts";
import AssetCharts from "./AssetCharts";

export default function Allocation() {
  const [filters, setFilters] = useState({
    type: "All",
    status: "All",
    search: "",
  });

  const [subTab, setSubTab] = useState("Allocation");

  const handleChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // FILTER LOGIC
  const filtered = allocationData.filter((a) => {
    const typeMatch = filters.type === "All" || a.type === filters.type;
    const statusMatch =
      filters.status === "All" ||
      (filters.status === "Allocated" && a.allocated) ||
      (filters.status === "Available" && !a.allocated);

    const searchMatch =
      filters.search.trim() === "" ||
      a.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      a.code.toLowerCase().includes(filters.search.toLowerCase()) ||
      a.staff?.toLowerCase().includes(filters.search.toLowerCase());

    return typeMatch && statusMatch && searchMatch;
  });

  // REPORTS DATA
  const allocated = 17;
  const available = 43;

  const pieData = [
    { name: "Allocated", value: allocated, color: "#14b57a" },
    { name: "Available", value: available, color: "#687280" },
  ];

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Asset Allocation & Reporting</h1>
          <p className={styles.subtitle}>
            Manage asset allocations and view utilization reports
          </p>
        </div>

        <div className={styles.tabs}>
          <button
            onClick={() => setSubTab("Allocation")}
            className={subTab === "Allocation" ? styles.activeTab : ""}
          >
            Allocations
          </button>

          <button
            onClick={() => setSubTab("Reports")}
            className={subTab === "Reports" ? styles.activeTab : ""}
          >
            Reports
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className={styles.summaryRow}>
        <div className={styles.card}>
          <p className={styles.cardLabel}>Total Assets</p>
          <h2 className={styles.cardValue}>60</h2>
          <span className={styles.cardHint}>All tracked assets</span>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Allocated</p>
          <h2 className={`${styles.cardValue} ${styles.green}`}>17</h2>
          <span className={styles.cardHint}>Currently in use</span>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Available</p>
          <h2 className={styles.cardValue}>43</h2>
          <span className={styles.cardHint}>Ready for allocation</span>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Utilization Rate</p>
          <h2 className={`${styles.cardValue} ${styles.blue}`}>28.3%</h2>
          <span className={styles.cardHint}>Asset usage efficiency</span>
        </div>
      </div>

      {/* ALLOCATION TAB */}
      {subTab === "Allocation" && (
        <>
          {/* FILTER SECTION */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Filters</h3>
            <p className={styles.filterSub}>
              Filter assets by type and allocation status
            </p>

            <div className={styles.filterRow}>
              <div className={styles.filterBox}>
                <label>Asset Type</label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleChange}
                >
                  <option>All</option>
                  <option>Computer</option>
                </select>
              </div>

              <div className={styles.filterBox}>
                <label>Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleChange}
                >
                  <option>All</option>
                  <option>Allocated</option>
                  <option>Available</option>
                </select>
              </div>

              <div className={`${styles.filterBox} ${styles.searchBox}`}>
                <label>Search</label>
                <div className={styles.searchInputWrapper}>
                  <Search size={16} className={styles.searchIcon} />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    placeholder="Search by name, code, or staff..."
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                setFilters({ type: "All", status: "All", search: "" })
              }
              className={styles.clearBtn}
            >
              Clear Filters
            </button>
          </div>

          {/* TABLE */}
          <div className={styles.tableWrapper}>
            <h3 className={styles.tableTitle}>Asset Allocations (60)</h3>
            <p className={styles.tableSub}>
              Manage asset allocations to staff members
            </p>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Asset Code</th>
                  <th>Asset Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Allocated To</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, i) => (
                  <tr key={i}>
                    <td>{item.code}</td>

                    <td>
                      <div className={styles.assetName}>{item.name}</div>
                      <div className={styles.assetCategory}>
                        {item.category}
                      </div>
                    </td>

                    <td>
                      <span className={styles.chip}>{item.type}</span>
                    </td>

                    <td>{item.value}</td>

                    <td>
                      {item.allocated ? (
                        <div>
                          <div>{item.staff}</div>
                          <div className={styles.since}>Since {item.since}</div>
                        </div>
                      ) : (
                        <span className={styles.available}>Available</span>
                      )}
                    </td>

                    <td>
                      {item.allocated ? (
                        <button className={styles.actionBtn}>Deallocate</button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* REPORTS TAB */}
      {subTab === "Reports" && (
        <div>
          <div className={styles.reportRow}>
            {/* LEFT – PIE CHART */}
            <div className={styles.reportCard}>
              <h3 className={styles.cardTitle}>⏱ Asset Utilization</h3>
              <p className={styles.cardSubtitle}>Overall allocation status</p>

              <PieChart width={260} height={260}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>

              <div className={styles.chartLabels}>
                <span className={styles.green}>
                  Allocated: {allocated} (28%)
                </span>
                <span className={styles.grey}>
                  Available: {available} (72%)
                </span>
              </div>
            </div>

            {/* RIGHT – DEPRECIATION */}
            <div className={styles.reportCard}>
              <h3 className={styles.cardTitle}>〰️ Depreciation Summary</h3>
              <p className={styles.cardSubtitle}>Asset value depreciation</p>

              <div className={styles.depBox}>
                <p className={styles.depLabel}>Total Current Value</p>
                <p className={styles.depValueGreen}>₹44,71,348</p>
              </div>

              <div className={styles.depBox}>
                <p className={styles.depLabel}>Accumulated Depreciation</p>
                <p className={styles.depValueRed}>₹47,08,652</p>
              </div>

              <div className={styles.depBox}>
                <p className={styles.depLabel}>Original Purchase Value</p>
                <p className={styles.depValueDark}>₹91,80,000</p>
              </div>
            </div>
          </div>
          <AssetCharts />
        </div>
      )}
    </div>
  );
}
