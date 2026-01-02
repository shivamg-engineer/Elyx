import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Academics.module.css";
import { Admission } from "./Admission";
import Research from "./Research";
import Scholarship  from "./Scholarship";
import { Facility } from "./Facility";

export const Academics = () => {
  const [mainTab, setMainTab] = useState("admissions");

  return (
    <DashboardLayout>
      <div>
        <h1>Academic Management</h1>
        <p>Manage admission, research activities statistics, and facilities</p>
        {/* ----- MAIN TABS ----- */}
        <div className={styles.main_tabs}>
          <button
            className={mainTab === "admissions" ? styles.active_main_tab : ""}
            onClick={() => setMainTab("admissions")}
          >
            Admissions
          </button>

          <button
            className={mainTab === "research" ? styles.active_main_tab : ""}
            onClick={() => setMainTab("research")}
          >
            Research
          </button>

          <button
            className={mainTab === "scholarships" ? styles.active_main_tab : ""}
            onClick={() => setMainTab("scholarships")}
          >
            Scholarships
          </button>

          <button
            className={mainTab === "facilities" ? styles.active_main_tab : ""}
            onClick={() => setMainTab("facilities")}
          >
            Facilities
          </button>
        </div>

        {/* Admission */}
        {mainTab=== "admissions" && (
          <Admission/>
        )}

        {/* Research */}
        {mainTab=== "research" && (
          <Research/>
        )}

        {/* Scholarship */}
        {mainTab==="scholarships" && (
          <Scholarship/>
        )}

        {/* Facilities */}
        {mainTab==="facilities" && (
          <Facility/>
        )}
      </div>
    </DashboardLayout>
  );
};
