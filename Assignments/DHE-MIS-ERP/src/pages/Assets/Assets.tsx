import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Assets.module.css";
import { RefreshCw } from "lucide-react";
import { Plus, Search } from "lucide-react";
import { AssetList } from "./AssetList";
import Allocation from "./Allocation";
import AddAsset from "./AddAsset";
export const Assets = () => {
  const [tab, setTab] = useState("AssetList");

  return (
    <DashboardLayout>
      <div className={styles.asset_page}>
        {/* PAGE HEADER */}
        <h1 className={styles.asset_title}>Complete Asset Management System</h1>
        <p className={styles.asset_subtitle}>
          Manage institutional assets, track allocations, and generate
          utilization reports.
        </p>

        {/* TABS */}
        <div className={styles.asset_tabs}>
          <button
            className={
              tab === "AssetList"
                ? `${styles.asset_tab} ${styles.asset_tabActive}`
                : styles.asset_tab
            }
            onClick={() => setTab("AssetList")}
          >
            <span className={styles.asset_tabIcon}>🗂</span> Asset List
          </button>

          <button
            className={
              tab === "Allocation"
                ? `${styles.asset_tab} ${styles.asset_tabActive}`
                : styles.asset_tab
            }
            onClick={() => setTab("Allocation")}
          >
            <RefreshCw size={14} /> Allocation & Reports
          </button>

          <button
            className={
              tab === "AddAsset"
                ? `${styles.asset_tab} ${styles.asset_tabActive}`
                : styles.asset_tab
            }
            onClick={() => setTab("AddAsset")}
          >
            <Plus size={14} /> Add Asset
          </button>
        </div>

        {/* CONTENT BASED ON TAB */}
        <div className={styles.asset_content}>
          {tab === "AssetList" && (
           <AssetList/> 
          )}

          {tab === "Allocation" && (
            <Allocation/>
          )}

          {tab === "AddAsset" && (
            <AddAsset/>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
