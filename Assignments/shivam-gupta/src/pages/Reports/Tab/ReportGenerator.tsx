import { LuFileSpreadsheet, LuCalendar, LuDownload, LuFileText } from "react-icons/lu";
import styles from "../Reports.module.css";

export const ReportGenerator = () => {
  return (
    <div className={styles.reportContainer}>
      {/* TITLE */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <LuFileSpreadsheet size={20} /> Generate Custom Report
        </h2>
        <p className={styles.sectionSubtitle}>
          Select filters and criteria to generate comprehensive reports
        </p>
      </div>

      {/* FORM CARD */}
      <div className={styles.reportCard}>
        {/* Report Type */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Report Type <span className={styles.required}>*</span>
          </label>
          <select className={styles.selectInput}>
            <option>Select report type</option>
          </select>
          <span className={styles.error}>Required</span>
        </div>

        {/* Date Row */}
        <div className={styles.rowTwo}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Date From</label>
            <div className={styles.inputWithIcon}>
              <LuCalendar size={18} className={styles.icon} />
              <input type="date" className={styles.dateInput} />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Date To</label>
            <div className={styles.inputWithIcon}>
              <LuCalendar size={18} className={styles.icon} />
              <input type="date" className={styles.dateInput} />
            </div>
          </div>
        </div>

        {/* Region + University */}
        <div className={styles.rowTwo}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Region</label>
            <select className={styles.selectInput}>
              <option>Select region</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>University</label>
            <select className={styles.selectInput}>
              <option>Select university</option>
            </select>
          </div>
        </div>

        {/* Course + Category */}
        <div className={styles.rowTwo}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Course</label>
            <select className={styles.selectInput}>
              <option>Select course</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Category</label>
            <select className={styles.selectInput}>
              <option>Select category</option>
            </select>
          </div>
        </div>

        {/* Export Format */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Export Format <span className={styles.required}>*</span>
          </label>
          <select className={styles.selectInput}>
            <option>PDF Document</option>
          </select>
        </div>

        {/* Buttons */}
        <div className={styles.btnRow}>
          <button className={styles.generateBtn}>
            <LuDownload size={18} /> Generate Report
          </button>

          <button className={styles.clearBtn}>Clear Filters</button>
        </div>
      </div>

      {/* QUICK REPORTS */}
      <div className={styles.quickReports}>
        <h3 className={styles.quickTitle}>Quick Report Templates</h3>
        <p className={styles.quickSub}>
          Generate commonly used reports with pre-configured filters
        </p>

        <div className={styles.quickList}>
          <button className={styles.quickItem}>
            <LuFileText size={18} /> Monthly Registrations
          </button>

          <button className={styles.quickItem}>
            <LuFileText size={18} /> Staff Summary
          </button>

          <button className={styles.quickItem}>
            <LuFileText size={18} /> Student Enrollment
          </button>
        </div>
      </div>
    </div>
  );
};
