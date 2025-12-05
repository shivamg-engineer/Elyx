import DashboardLayout from "../../layout/DashboardLayout";
import { useRef } from "react";
import styles from "./InstituteRegister.module.css"

export function InstituteRegister() {




  const fileInputRef=useRef<HTMLInputElement>(null);
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Selected files:", e.target.files);
  };


  return <DashboardLayout>
    <div className={styles.container}>
      {/* Page Title */}
      <h1 className={styles.pageTitle}>Institute Registration</h1>
      <p className={styles.subtitle}>
        Complete all three parts to register your institution with the Department of Higher Education
      </p>

      {/* Step Header */}
      <div className={styles.stepHeader}>
        <div>
          <p className={styles.stepLabel}>Step 1 of 3</p>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: "33%" }}></div>
          </div>
        </div>

        <span className={styles.progressText}>33% Complete</span>
      </div>

      {/* Step Tabs */}
      <div className={styles.stepTabs}>
        <button className={`${styles.tab} ${styles.activeTab}`}>Part A: Basic Information</button>
        <button className={styles.tab}>Part B: Recognition & Status</button>
        <button className={styles.tab}>Part C: Courses & Intake</button>
      </div>

      {/* SECTION: Part A */}
      <h2 className={styles.sectionHeading}>Part A: Basic Information</h2>
      <p className={styles.sectionDesc}>Enter institute details and contact information</p>

      {/* -------- BASIC INFORMATION CARD -------- */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Basic Information</h3>
        <p className={styles.cardSubtitle}>Enter the base details of your Institute</p>

        <div className={styles.grid1}>
          <div className={styles.inputGroup}>
            <label>Institute Name *</label>
            <input type="text" placeholder="Enter Institute name" />
          </div>

          
          <div className={styles.inputGroup}>
            <label>Institute Type *</label>
            <select>
              <option>Select Institute type</option>
              <option>Government</option>
              <option>Private</option>
              <option>Aided</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Apex Body</label>
            <input type="text" placeholder="e.g., University Grants Commission" />
          </div>

          {/* Upload Section */}
          <div className={styles.inputGroupFull}>
            <label>Apex Body Permission Document *</label>

            <div className={styles.uploadBox}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className={styles.uploadInner}>
                ⬆️
                <p>Drag & drop files here</p>
                <small>or <span className={styles.browse}>browse files</span></small>
                <small className={styles.muted}>Accepted: PDF, JPG, PNG (Max size: 5MB)</small>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className={styles.hiddenInput}
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </section>

      {/* -------- ADDRESS INFORMATION CARD -------- */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Address Information</h3>
        <p className={styles.cardSubtitle}>Enter the complete address of your Institution</p>

        <div className={styles.grid1}>
          <div className={styles.inputGroup}>
            <label>Address Line 1 *</label>
            <input type="text" placeholder="Building name, street" />
          </div>

          <div className={styles.inputGroup}>
            <label>Address Line 2</label>
            <input type="text" placeholder="Area, locality (optional)" />
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
            <label>City *</label>
            <input type="text" placeholder="Enter city" />
          </div>

          <div className={styles.inputGroup}>
            <label>District *</label>
            <input type="text" placeholder="Enter district" />
          </div>

          <div className={styles.inputGroup}>
            <label>State *</label>
            <select>
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Karnataka</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Pincode *</label>
            <input type="text" placeholder="6-digit pincode" />
          </div>
          </div>
        </div>
      </section>

      {/* -------- PRINCIPAL CONTACT INFORMATION -------- */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Principal Contact Information</h3>
        <p className={styles.cardSubtitle}>Enter the contact details of the principal</p>

        <div className={styles.grid1}>
          <div className={styles.inputGroup}>
            <label>Principal Name *</label>
            <input type="text" placeholder="Enter principal’s full name" />
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
            <label>Mobile Number *</label>
            <input type="text" placeholder="10-digit mobile number" />
          </div>

          <div className={styles.inputGroup}>
            <label>Email *</label>
            <input type="email" placeholder="principal@example.com" />
          </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Alternate Phone</label>
            <input type="text" placeholder="10-digit mobile number (optional)" />
          </div>
        </div>
      </section>

      {/* -------- REGISTRAR CONTACT INFORMATION -------- */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>Registrar Contact Information</h3>
        <p className={styles.cardSubtitle}>Enter the contact details of the registrar</p>

        <div className={styles.grid1}>
          <div className={styles.inputGroup}>
            <label>Registrar Name *</label>
            <input type="text" placeholder="Enter registrar’s full name" />
          </div>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
            <label>Email *</label>
            <input type="email" placeholder="registrar@example.com" />
          </div>

          <div className={styles.inputGroup}>
            <label>Mobile Number *</label>
            <input type="text" placeholder="10-digit mobile number" />
          </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Alternate Phone</label>
            <input type="text" placeholder="10-digit mobile number (optional)" />
          </div>
        </div>
      </section>

      {/* -------- BOTTOM BUTTONS -------- */}
      <div className={styles.buttonRow}>
        <button className={styles.secondaryBtn}>Save Draft</button>
        <button className={styles.primaryBtn}>Next Step</button>
      </div>
    </div>
  </DashboardLayout>;
}
