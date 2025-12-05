import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./RTI.module.css";
import { useRef } from "react";

export const RTI = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  console.log("Selected files:", files);
};
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>RTI Application</h1>
        <p>Submit your right to information for RTI application</p>

        {/* PERSONAL DETAILS */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Personal Details</h2>
          <p className={styles.sectionSubtitle}>
            Provide your personal information for RTI application
          </p>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <label>Full Name *</label>
              <input type="text" placeholder="Enter your full name" />
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address *</label>
              <input type="text" placeholder="your.email@example.com" />
            </div>

            <div className={styles.inputGroup}>
              <label>Mobile Number *</label>
              <input type="text" placeholder="10-digit mobile number" />
            </div>

            <div className={styles.inputGroup}>
              <label>Identity Proof *</label>
              <select>
                <option>Aadhaar Card</option>
                <option>PAN Card</option>
                <option>Voter ID</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>Identity Number</label>
              <input type="text" placeholder="Enter identity proof number" />
            </div>

            <div className={styles.inputGroupFull}>
              <label>Address *</label>
              <textarea placeholder="Enter complete address"></textarea>
            </div>

            <div className={styles.inputGroup}>
              <label>City *</label>
              <input type="text" placeholder="Enter city" />
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
        </section>

        {/* REQUEST DETAILS */}
        <section className={styles.card}>
          <h2>Request Details</h2>
          <p>Provide details about the information you are seeking</p>

          <div className={styles.grid2}>
            <div className={styles.inputGroup}>
              <label>Category *</label>
              <select>
                <option>Admission Related</option>
                <option>Examination Related</option>
                <option>Staff Related</option>
                <option>Infrastructure</option>
                <option>Financial Information</option>
                <option>General Information</option>
                <option>Other</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label>subject *</label>
              <input
                type="text"
                placeholder="Brief subject of your RTI request"
              />
            </div>

            <div className={styles.inputGroupFull}>
              <label>Description *</label>
              <input
                type="textArea"
                placeholder="Provide a detailed descriptoin of your request"
              />
            </div>

            <div className={styles.inputGroupFull}>
              <label>Information Sought *</label>
              <input
                type="text"
                placeholder="Clearly specify what information you are seeking"
              />
            </div>

            <div className={styles.inputGroupFull}>
              <label>Period of Information</label>
              <input
                type="text"
                placeholder="e.g., Academic  year 202-24, January 2024, etc."
              />
            </div>
          </div>

          <div className={styles.radioGroup}>
            <label>Mode of Action *</label>
            <div className={styles.radioList}>
              <label>
                <input type="radio" name="mode" /> Online (Receive information
                via email)
              </label>
              <label>
                <input type="radio" name="mode" /> Physical (Collect information
                in person)
              </label>
            </div>
          </div>

          <div className={styles.radioGroup}>
            <label>Preferred Language *</label>
            <div className={styles.radioList}>
              <label>
                <input type="radio" name="lang" /> English
              </label>
              <label>
                <input type="radio" name="lang" /> Marathi
              </label>
            </div>
          </div>
        </section>

        {/* DOCUMENT UPLOAD */}
          <section className={styles.card}>
        <h2 className={styles.sectionTitle}>Supporting Documents</h2>
        <p className={styles.sectionSubtitle}>Upload any supporting documents (optional)</p>

        <div className={styles.uploadBox}>
          <div className={styles.uploadContent}  onClick={() => fileInputRef.current?.click()}>
            <span className={styles.uploadIcon}>⬆️</span>
            <p>Drag & drop files here</p>
            <small className={styles.browseText}>or browse files</small>
            <small className={styles.muted}>Accepted formats: PDF, JPG, PNG (Max size: 5MB)</small>
          </div>

          {/* Hidden input */}
    <input
      type="file"
      ref={fileInputRef}
      className={styles.hiddenFileInput}
      multiple
      onChange={handleFileSelect}
    />
        </div>
      </section>

        {/* ACTION BUTTONS */}
          <div className={styles.actionRow}>
        <button className={styles.btnSecondary}>Save Draft</button>
        <button className={styles.btnPrimary}>Proceed to Payment</button>
      </div>

        {/* FOOTNOTE */}
         <section className={styles.about}>
        <h3>About RTI</h3>
        <p>
          The Right to Information Act, 2005 empowers citizens to seek information from public authorities.
        </p>
        <p>Application Fee: ₹10 (as per RTI rules 2005)</p>
        <p>Response Time: Information should be provided within 30 days of application.</p>
      </section>
      </div>
    </DashboardLayout>
  );
};
