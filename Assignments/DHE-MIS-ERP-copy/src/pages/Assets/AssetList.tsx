import assetData1 from "./AssetData1.json";
import styles from "./AssetList.module.css";
import { RefreshCw } from "lucide-react";
import { Plus, Search } from "lucide-react";

export const AssetList = () => {
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
            <h2 className={styles.asset_statValue}>60</h2>
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
            <div className={styles.asset_filterBox}>
              <label>Asset Type</label>
              <select>
                <option>All</option>
              </select>
            </div>

            <div className={styles.asset_filterBox}>
              <label>Status</label>
              <select>
                <option>All</option>
              </select>
            </div>

            <div className={styles.asset_filterBox}>
              <label>Condition</label>
              <select>
                <option>All</option>
              </select>
            </div>

            <div className={styles.asset_filterBox}>
              <label>Location</label>
              <select>
                <option>All</option>
              </select>
            </div>

            <div className={styles.asset_filterBox}>
              <label>Department</label>
              <select>
                <option>All</option>
              </select>
            </div>
          </div>

          {/* search bar */}
          <div className={styles.asset_searchBar}>
            <Search size={16} className={styles.asset_searchIcon} />
            <input
              type="text"
              placeholder="Search by name, code, category, or serial number..."
            />
          </div>

          <button className={styles.asset_clearBtn}>Clear Filters</button>
        </div>
      </div>

      <div className={styles.assetTable_container}>
        <h2 className={styles.assetTable_title}>Assets (60)</h2>
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
              {assetData1.map((asset, i) => (
                <tr key={i}>
                  {/* CODE */}
                  <td>{asset.code}</td>

                  {/* NAME + CATEGORY */}
                  <td>
                    <div className={styles.assetTable_name}>{asset.name}</div>
                    <div className={styles.assetTable_subname}>
                      {asset.category}
                    </div>
                  </td>

                  {/* TYPE */}
                  <td>
                    <span className={styles.assetTable_chip}>{asset.type}</span>
                  </td>

                  {/* DATE */}
                  <td>{asset.purchaseDate}</td>

                  {/* VALUE + COST */}
                  <td>
                    <div className={styles.assetTable_value}>
                      {asset.currentValue}
                    </div>
                    <div className={styles.assetTable_cost}>
                      Cost: {asset.cost}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`${styles.assetTable_status} ${
                        asset.status === "In Use"
                          ? styles.yellow
                          : asset.status === "Under Maintenance"
                          ? styles.grey
                          : ""
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>

                  {/* CONDITION */}
                  <td>
                    <span
                      className={`${styles.assetTable_cond} ${
                        asset.condition === "Excellent"
                          ? styles.green
                          : asset.condition === "Good"
                          ? styles.yellow2
                          : styles.fair
                      }`}
                    >
                      {asset.condition}
                    </span>
                  </td>

                  {/* LOCATION */}
                  <td>{asset.location}</td>

                  {/* ACTIONS */}
                  <td className={styles.assetTable_actions}>
                    <span className={styles.assetTable_icon}>👁</span>
                    <span className={styles.assetTable_icon}>✏️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* FOOTER */}
          <div className={styles.assetTable_footer}>
            <p>Showing 1 to 10 of 60 results</p>

            <div className={styles.assetTable_pagination}>
              <button>Previous</button>
              <span>Page 1 of 6</span>
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
