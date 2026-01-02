import { useState, useMemo } from "react";
import assetData1 from "./AssetData1.json";
import styles from "./AssetList.module.css";
import { Plus, Search } from "lucide-react";

export const AssetList = () => {
  // ----------------------------
  // FILTER STATES
  // ----------------------------
  const [assetType, setAssetType] = useState("All");
  const [status, setStatus] = useState("All");
  const [condition, setCondition] = useState("All");
  const [location, setLocation] = useState("All");
  const [department, setDepartment] = useState("All");
  const [search, setSearch] = useState("");

  // ----------------------------
  // FILTER LOGIC
  // ----------------------------
  const filteredAssets = useMemo(() => {
    const q = search.trim().toLowerCase();

    return assetData1.filter((a) => {
      // SEARCH MATCH
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
        // a.serialNumber?.toLowerCase().includes(q);

      // TYPE
      const matchType = assetType === "All" || a.type === assetType;

      // STATUS
      const matchStatus = status === "All" || a.status === status;

      // CONDITION
      const matchCondition = condition === "All" || a.condition === condition;

      // LOCATION
      const matchLocation = location === "All" || a.location === location;

      // DEPARTMENT
      // const matchDepartment =
      //   department === "All" || a.department === department;

      return (
        matchSearch &&
        matchType &&
        matchStatus &&
        matchCondition &&
        matchLocation 
        // matchDepartment
      );
    });
  }, [assetType, status, condition, location, department, search]);

  // ----------------------------
  // COMPONENT
  // ----------------------------
  return (
    <div>
      <div className={styles.asset_page}>
        {/* ---------- PAGE HEADER ---------- */}
        <div className={styles.asset_header}>
          <div>
            <h1 className={styles.asset_title}>Asset Management</h1>
            <p className={styles.asset_subtitle}>
              Track and manage institutional assets
            </p>
          </div>

          <button className={styles.asset_addBtn}>
            <Plus size={16} /> Add Asset
          </button>
        </div>

        {/* ---------- STATS CARDS ---------- */}
        <div className={styles.asset_statsGrid}>
          <div className={styles.asset_statCard}>
            <p className={styles.asset_statLabel}>Total Assets</p>
            <h2 className={styles.asset_statValue}>{assetData1.length}</h2>
            <p className={styles.asset_statHint}>Tracked assets</p>
          </div>

          <div className={styles.asset_statCard}>
            <p className={styles.asset_statLabel}>Current Value</p>
            <h2 className={styles.asset_statValue}>₹44,71,347.87</h2>
            <p className={styles.asset_statHint}>Total asset value</p>
          </div>

          <div className={styles.asset_statCard}>
            <p className={styles.asset_statLabel}>Depreciation</p>
            <h2 className={styles.asset_statValue}>₹47,08,652.13</h2>
            <p className={styles.asset_statHint}>Accumulated depreciation</p>
          </div>
        </div>

        {/* ---------- FILTERS ---------- */}
        <div className={styles.asset_filterCard}>
          <h3 className={styles.asset_filterTitle}>Filters</h3>
          <p className={styles.asset_filterSubtitle}>
            Filter assets by various criteria
          </p>

          <div className={styles.asset_filterGrid}>
            {/* ASSET TYPE */}
            <div className={styles.asset_filterBox}>
              <label>Asset Type</label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
              >
                <option>All</option>
                <option>Furniture</option>
                <option>Equipment</option>
                <option>Computer</option>
                <option>Vehicle</option>
                <option>Laboratory</option>
                <option>Library</option>
                <option>Sports</option>
                <option>Building</option>
                <option>Other</option>
              </select>
            </div>

            {/* STATUS */}
            <div className={styles.asset_filterBox}>
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All</option>
                <option>Available</option>
                <option>In Use</option>
                <option>Under Maintenance</option>
                <option>Damaged</option>
                <option>Disposed</option>
                <option>Lost</option>
              </select>
            </div>

            {/* CONDITION */}
            <div className={styles.asset_filterBox}>
              <label>Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option>All</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </div>

            {/* LOCATION */}
            <div className={styles.asset_filterBox}>
              <label>Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All</option>
                <option>Admin Office</option>
                <option>Auditorium</option>
                <option>Basement</option>
                <option>Biology Lab</option>
                <option>Central Library</option>
                <option>Chemistry Lab</option>
                <option>Classroom</option>
                <option>College Parking</option>
                <option>Computer Lab 1</option>
                <option>Computer Lab 2</option>
                <option>Faculty Room</option>
                <option>Gymnasium</option>
                <option>Library</option>
                <option>Physics Lab</option>
                <option>Sports Ground</option>
              </select>
            </div>

            {/* DEPARTMENT */}
            {/* <div className={styles.asset_filterBox}>
              <label>Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option>All</option>
                <option>Academic</option>
                <option>Administration</option>
                <option>Biology</option>
                <option>Chemistry</option>
                <option>Computer Science</option>
                <option>Facilities</option>
                <option>Library</option>
                <option>Physical Education</option>
                <option>Physics</option>
                <option>Transport</option>
              </select>
            </div> */}
          </div>

          {/* SEARCH BAR */}
          <div className={styles.asset_searchBar}>
            <Search size={16} className={styles.asset_searchIcon} />
            <input
              type="text"
              placeholder="Search by name, code, category, or serial number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* CLEAR FILTERS */}
          <button
            className={styles.asset_clearBtn}
            onClick={() => {
              setAssetType("All");
              setStatus("All");
              setCondition("All");
              setLocation("All");
              setDepartment("All");
              setSearch("");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* ---------- ASSET TABLE ---------- */}
      <div className={styles.assetTable_container}>
        <h2 className={styles.assetTable_title}>
          Assets ({filteredAssets.length})
        </h2>
        <p className={styles.assetTable_sub}>
          Complete list of institutional assets
        </p>

        <div className={styles.assetTable_wrapper}>
          <table className={styles.assetTable_table}>
            <thead>
              <tr>
                <th>Asset Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Purchase Date</th>
                <th>Current Value</th>
                <th>Status</th>
                <th>Condition</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((asset, i) => (
                <tr key={i}>
                  <td>{asset.code}</td>

                  <td>
                    <div className={styles.assetTable_name}>{asset.name}</div>
                    <div className={styles.assetTable_subname}>
                      {asset.category}
                    </div>
                  </td>

                  <td>
                    <span className={styles.assetTable_chip}>{asset.type}</span>
                  </td>

                  <td>{asset.purchaseDate}</td>

                  <td>
                    <div className={styles.assetTable_value}>
                      {asset.currentValue}
                    </div>
                    <div className={styles.assetTable_cost}>
                      Cost: {asset.cost}
                    </div>
                  </td>

                  <td>
                    <span className={styles.assetTable_status}>
                      {asset.status}
                    </span>
                  </td>

                  <td>
                    <span className={styles.assetTable_cond}>
                      {asset.condition}
                    </span>
                  </td>

                  <td>{asset.location}</td>

                  <td className={styles.assetTable_actions}>
                    <span className={styles.assetTable_icon}>👁</span>
                    <span className={styles.assetTable_icon}>✏️</span>
                  </td>
                </tr>
              ))}

              {filteredAssets.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    style={{ padding: "1rem", textAlign: "center" }}
                  >
                    No matching assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* FOOTER */}
          <div className={styles.assetTable_footer}>
            <p>Showing {filteredAssets.length} results</p>
          </div>
        </div>
      </div>
    </div>
  );
};
