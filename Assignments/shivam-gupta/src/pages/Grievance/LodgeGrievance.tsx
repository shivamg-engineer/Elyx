import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./LodgeGrievance.module.css";

export default function LodgeGrievance() {
  /* ======================== FORM STATE ======================== */
  const [isEmployee, setIsEmployee] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    designation: "",
    department: "",
    email: "",
    mobile: "",
    address: "",
    category: "",
    nature: "",
    incidentDate: "",
    location: "",
    subject: "",
    description: "",
    witnesses: "",
    previousActions: "",
    files: [] as File[],
  });

  /* ======================== HELPERS ======================== */
  const updateField = (key: string, value:string) => {
    setFormData({ ...formData, [key]: value });
  };

  /* ======================== VALIDATION ======================== */
  const validateForm = () => {
    // NAME
    if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      toast.error("Full name must contain only alphabets");
      return false;
    }

    // EMPLOYEE ID
    if (isEmployee && !formData.employeeId.trim()) {
      toast.error("Employee ID is required");
      return false;
    }

    // EMAIL ✔ FIXED
    const email = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    // MOBILE
    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be exactly 10 digits");
      return false;
    }

    // CATEGORY
    if (!formData.category) {
      toast.error("Please select a category");
      return false;
    }

    // NATURE
    if (!formData.nature) {
      toast.error("Please select the nature of grievance");
      return false;
    }

    // SUBJECT
    if (!formData.subject.trim()) {
      toast.error("Subject is required");
      return false;
    }

    // DESCRIPTION
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    // DATE
    if (formData.incidentDate) {
      const selected = new Date(formData.incidentDate);
      if (selected > new Date()) {
        toast.error("Incident date cannot be in the future");
        return false;
      }
    }

    return true;
  };

  /* ======================== SAVE DRAFT ======================== */
  const saveDraft = () => {
    localStorage.setItem("grievanceDraft", JSON.stringify(formData));
    toast.success("Draft saved successfully!");
  };

  /* ======================== LOAD DRAFT (ON PAGE LOAD) ======================== */
  useEffect(() => {
    const draft = localStorage.getItem("grievanceDraft");
    if (draft) {
      try {
        setFormData(JSON.parse(draft));
        toast.info("Draft loaded");
      } catch {
        console.log("Could not parse saved draft");
      }
    }
  }, []);

  /* ======================== FILE UPLOAD ======================== */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    // Allowed file types
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // Validate all files
    const validFiles: File[] = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF, JPG, or PNG files are allowed.");
        continue;
      }
      if (file.size > maxSize) {
        toast.error(`File '${file.name}' is too large (max 5 MB).`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setFormData({ ...formData, files: [...formData.files, ...validFiles] });
    toast.success(`${validFiles.length} file(s) uploaded successfully!`);
  };

  /* ======================== SUBMIT ======================== */
  const handleSubmit = () => {
    if (!validateForm()) return;

    toast.success("Grievance submitted successfully!");
    console.log("FORM SUBMITTED:", formData);
  };

  /* ========================================================= */

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Lodge a Grievance</h1>
      <p className={styles.subtitle}>
        Submit your complaint and track its resolution status
      </p>

      {/* ===================== COMPLAINANT DETAILS ===================== */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Complainant Details</h2>

        {/* Employee Checkbox */}
        <label className={styles.checkRow}>
          <input
            type="checkbox"
            checked={isEmployee}
            onChange={(e) => setIsEmployee(e.target.checked)}
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxBox}></span>I am an employee
        </label>

        <div className={styles.formGrid}>
          {/* Full Name */}
          <div className={styles.formGroup}>
            <label>Full Name *</label>
            <input
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />
          </div>

          {/* Employee Fields */}
          {isEmployee && (
            <>
              <div className={styles.formGroup}>
                <label>Employee ID *</label>
                <input
                  value={formData.employeeId}
                  onChange={(e) => updateField("employeeId", e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Designation</label>
                <input
                  value={formData.designation}
                  onChange={(e) => updateField("designation", e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Department</label>
                <input
                  value={formData.department}
                  onChange={(e) => updateField("department", e.target.value)}
                />
              </div>
            </>
          )}

          {/* Email */}
          <div className={styles.formGroup}>
            <label>Email *</label>
            <input
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Mobile */}
          <div className={styles.formGroup}>
            <label>Mobile Number *</label>
            <input
              value={formData.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
            />
          </div>
        </div>

        {/* Address */}
        <div className={styles.formGroupFull}>
          <label>Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </div>
      </div>

      {/* ===================== GRIEVANCE DETAILS ===================== */}
      <div className={styles.card}>
        <h2 className={styles.sectionTitle}>Grievance Details</h2>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Category *</label>
            <select
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
            >
              <option value="">Select</option>
              <option>Medium</option>
              <option>High</option>
              <option>Low</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Nature *</label>
            <select
              value={formData.nature}
              onChange={(e) => updateField("nature", e.target.value)}
            >
              <option value="">Select</option>
              <option>Other</option>
              <option>Harassment</option>
              <option>Workplace Issue</option>
              <option>Facility Issue</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Incident Date</label>
            <input
              type="date"
              value={formData.incidentDate}
              onChange={(e) => updateField("incidentDate", e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formGroupFull}>
          <label>Subject *</label>
          <input
            value={formData.subject}
            onChange={(e) => updateField("subject", e.target.value)}
          />
        </div>

        <div className={styles.formGroupFull}>
          <label>Detailed Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        <div className={styles.formGroupFull}>
          <label>Witness Details (optional)</label>
          <textarea
            value={formData.witnesses}
            onChange={(e) => updateField("witnesses", e.target.value)}
          />
        </div>

        <div className={styles.formGroupFull}>
          <label>Previous Actions Taken (optional)</label>
          <textarea
            value={formData.previousActions}
            onChange={(e) => updateField("previousActions", e.target.value)}
          />
        </div>
      </div>

      {/* ===================== FILE UPLOAD ===================== */}
      <div className={styles.card}>
        <h3 className={styles.sectionTitle}>Supporting Documents</h3>

        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className={styles.fileInput}
        />

        {formData.files.length > 0 && (
          <ul className={styles.fileList}>
            {formData.files.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}

        <div className={styles.buttonRow}>
          <button className={styles.saveDraftBtn} onClick={saveDraft}>
            💾 Save Draft
          </button>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            ✈ Submit Grievance
          </button>
        </div>
      </div>
    </div>
  );
}
