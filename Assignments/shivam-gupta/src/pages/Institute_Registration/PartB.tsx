import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./InstituteRegister.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PartB() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Part B: Recognition & Status</h1>
        <p className={styles.subtitle}>Provide recognition and accreditation details</p>

        {/* Your full UI from screenshot can be added here later */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Recognition Information</h3>
          
          <p style={{marginTop:20}}>📌 Add all UI fields here (Year of Establishment, Recognition Status, Documents Upload etc)</p>
        </div>

        <div className={styles.buttonRow}>
          <button className={styles.secondaryBtn} onClick={() => navigate(-1)}>Previous</button>
          <button className={styles.primaryBtn} onClick={() => navigate("/institute/part-c")}>
            Next Step
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
