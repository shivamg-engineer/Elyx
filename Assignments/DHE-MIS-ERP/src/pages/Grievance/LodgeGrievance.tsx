import styles from "./LodgeGrievance.module.css";

export default function LodgeGrievance() {
  return (
    <div className={styles.page}>
      {/* Page Title */}
      <h1 className={styles.title}>Lodge a Grievance</h1>
      <p className={styles.subtitle}>
        Submit your complaint and track its resolution status
      </p>

      {/* Container Box */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Complainant Details</h2>
        <p className={styles.sectionSubtitle}>
          Provide your personal information
        </p>

        {/* Employee Checkbox */}
        <div className={styles.checkRow}>
          <div className={styles.checkbox}>
            <div className={styles.tick}></div>
          </div>
          <span>I am an employee</span>
        </div>

        {/* Form Grid */}
        <div className={styles.formGrid}>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label>Full Name *</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          {/* Employee ID */}
          <div className={styles.formGroup}>
            <label>Employee ID *</label>
            <input type="text" placeholder="Enter your employee ID" />
          </div>

          {/* Designation */}
          <div className={styles.formGroup}>
            <label>Designation</label>
            <input type="text" placeholder="Enter your designation" />
          </div>

          {/* Department */}
          <div className={styles.formGroup}>
            <label>Department</label>
            <input type="text" placeholder="Enter your department" />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label>Email Address *</label>
            <input type="email" placeholder="your.email@example.com" />
          </div>

          {/* Mobile */}
          <div className={styles.formGroup}>
            <label>Mobile Number *</label>
            <input type="text" placeholder="10-digit mobile number" />
          </div>
        </div>

        {/* Address */}
        <div className={styles.formGroupFull}>
          <label>Address</label>
          <textarea placeholder="Enter your complete address"></textarea>
        </div>
      </div>
      <div className={styles.card}>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>Grievance Details</h2>
        <p className={styles.sectionSubtitle}>
          Provide details about your complaint
        </p>

        {/* 2 Column Grid */}
        <div className={styles.formGrid}>
          {/* Category */}
          <div className={styles.formGroup}>
            <label>Category *</label>
            <select>
              <option>Medium</option>
              <option>High</option>
              <option>Low</option>
            </select>
          </div>

          {/* Nature */}
          <div className={styles.formGroup}>
            <label>Nature *</label>
            <select>
              <option>Other</option>
              <option>Harassment</option>
              <option>Workplace Issue</option>
              <option>Facility Issue</option>
            </select>
          </div>

          {/* Incident Date */}
          <div className={styles.formGroup}>
            <label>Incident Date</label>
            <input type="text" placeholder="mm/dd/yyyy" />
          </div>

          {/* Location */}
          <div className={styles.formGroup}>
            <label>Location</label>
            <input type="text" placeholder="Where did the incident occur?" />
          </div>
        </div>

        {/* Subject */}
        <div className={styles.formGroupFull}>
          <label>Subject *</label>
          <input type="text" placeholder="Brief subject of your grievance" />
        </div>

        {/* Detailed Description */}
        <div className={styles.formGroupFull}>
          <label>Detailed Description *</label>
          <textarea placeholder="Provide a detailed description of your grievance"></textarea>
        </div>

        {/* Witness Details */}
        <div className={styles.formGroupFull}>
          <label>Witness Details (if any)</label>
          <textarea placeholder="Names and contact details of witnesses"></textarea>
        </div>

        {/* Previous Actions */}
        <div className={styles.formGroupFull}>
          <label>Previous Actions Taken (if any)</label>
          <textarea placeholder="Describe any previous attempts to resolve this issue"></textarea>
        </div>
      </div>
      {/* SUPPORTING DOCUMENTS CARD */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Supporting Documents</h3>
        <p className={styles.sectionSubtitle}>
          Upload any supporting documents (optional)
        </p>

        <div className={styles.uploadBox}>
          <div className={styles.uploadInner}>
            <div className={styles.uploadIcon}>⬆</div>
            <p className={styles.uploadText}>Drag & drop files here</p>
            <span className={styles.uploadBrowse}>or browse files</span>

            <p className={styles.uploadFormats}>
              Accepted: .pdf, .jpg, .jpeg, .png, .doc, .docx
            </p>
            <p className={styles.uploadLimit}>Max size: 10 MB</p>
          </div>
        </div>

        <p className={styles.acceptedFormats}>
          Accepted formats: PDF, JPG, PNG, DOC, DOCX. Maximum size: 10MB per
          file
        </p>

        <div className={styles.buttonRow}>
          <button className={styles.saveDraftBtn}>💾 Save Draft</button>
          <button className={styles.submitBtn}>✈ Submit Grievance</button>
        </div>
      </div>

      {/* IMPORTANT INFORMATION CARD */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Important Information</h3>

        <ul className={styles.infoList}>
          <li>All fields marked with * are mandatory</li>
          <li>
            Provide accurate and complete information for faster resolution
          </li>
          <li>
            Upload supporting documents if available (optional but recommended)
          </li>
          <li>You will receive a unique Grievance ID upon submission</li>
          <li>Keep your Grievance ID safe for tracking and follow-up</li>
          <li>
            You will receive email and SMS notifications on status updates
          </li>
          <li>
            For urgent matters, you may contact the administration directly
          </li>
        </ul>
      </div>
    </div>
  );
}
