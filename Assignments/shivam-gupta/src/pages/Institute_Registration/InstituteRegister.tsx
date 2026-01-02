import DashboardLayout from "../../layout/DashboardLayout";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./InstituteRegister.module.css";

type FormDataType = {
  instituteName: string;
  instituteType: string;
  apexBody: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  principalName: string;
  principalMobile: string;
  principalEmail: string;
  principalAltPhone: string;
  registrarName: string;
  registrarEmail: string;
  registrarMobile: string;
  registrarAltPhone: string;
};

type RecognitionData = {
  yearOfEstablishment: string;
  recognitionStatus: string;
  recognitionFiles: string[];
  ugcStatus: string;
  ncteStatus: string;
  naacGrade: string;
  affiliatedUniversity: string;
  affiliatedUniversityName: string;
};

type CourseType = {
  id: number;
  name: string;
  courseType: string;
  subjects: string[];
  subjectDraft: string;
  intake: string;
  duration: string;
};

const LOCAL_DRAFT_KEY = "instituteDraft_v1";
const LOCAL_FILE_KEY = "instituteDraft_fileName_v1";
const LOCAL_PARTB_KEY = "instituteDraft_partB_v1";
const LOCAL_PARTC_KEY = "instituteDraft_partC_v1";

export function InstituteRegister() {
  const navigate = useNavigate();
  const apexFileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionFileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<"A" | "B" | "C">("A");

  const [formData, setFormData] = useState<FormDataType>({
    instituteName: "",
    instituteType: "",
    apexBody: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "Maharashtra",
    pincode: "",
    principalName: "",
    principalMobile: "",
    principalEmail: "",
    principalAltPhone: "",
    registrarName: "",
    registrarEmail: "",
    registrarMobile: "",
    registrarAltPhone: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [recognitionData, setRecognitionData] = useState<RecognitionData>({
    yearOfEstablishment: "",
    recognitionStatus: "",
    recognitionFiles: [],
    ugcStatus: "",
    ncteStatus: "",
    naacGrade: "",
    affiliatedUniversity: "",
    affiliatedUniversityName: "",
  });

  const [courses, setCourses] = useState<CourseType[]>([
    {
      id: Date.now(),
      name: "",
      courseType: "",
      subjects: [],
      subjectDraft: "",
      intake: "",
      duration: "",
    },
  ]);

  // showErrors = false until user clicks Next Step
  const [showErrors, setShowErrors] = useState(false);
  const [showPartBErrors, setShowPartBErrors] = useState(false);
  const [showPartCErrors, setShowPartCErrors] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [partBErrors, setPartBErrors] = useState<Record<string, string>>({});
  const [partCErrors, setPartCErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved draft + file name
    const raw = localStorage.getItem(LOCAL_DRAFT_KEY);
    const savedFileName = localStorage.getItem(LOCAL_FILE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as FormDataType | null;
        if (parsed) setFormData(parsed);
        toast.info("Draft loaded");
      } catch {
        // ignore
      }
    }
    if (savedFileName) setFileName(savedFileName);

    const partB = localStorage.getItem(LOCAL_PARTB_KEY);
    if (partB) {
      try {
        const parsed = JSON.parse(partB) as RecognitionData;
        setRecognitionData(parsed);
      } catch {
        // ignore
      }
    }

    const partC = localStorage.getItem(LOCAL_PARTC_KEY);
    if (partC) {
      try {
        const parsed = JSON.parse(partC) as CourseType[];
        if (Array.isArray(parsed) && parsed.length) setCourses(parsed);
      } catch {
        // ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateField = (key: keyof FormDataType, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    // If we've started showing errors, validate this field live and clear error if valid
    if (showErrors) {
      const err = validateSingleField(key, value);
      setErrors((prev) => {
        const copy = { ...prev };
        if (!err) delete copy[key as string];
        else copy[key as string] = err;
        return copy;
      });
    }
  };

  // Single-field validation (returns error message or empty string)
  const validateSingleField = (key: keyof FormDataType, value: string): string => {
    const trimmed = value.trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    switch (key) {
      case "instituteName":
        if (!trimmed) return "Institute Name is required";
        if (!nameRegex.test(trimmed)) return "Institute Name should contain letters and spaces only";
        return "";
      case "instituteType":
        if (!trimmed) return "Institute Type is required";
        return "";
      case "addressLine1":
        if (!trimmed) return "Address Line 1 is required";
        return "";
      case "city":
        if (!trimmed) return "City is required";
        return "";
      case "district":
        if (!trimmed) return "District is required";
        return "";
      case "pincode":
        if (!pincodeRegex.test(trimmed)) return "Pincode must be exactly 6 digits";
        return "";
      case "principalName":
        if (!trimmed) return "Principal Name is required";
        if (!nameRegex.test(trimmed)) return "Principal Name should contain letters and spaces only";
        return "";
      case "principalMobile":
        if (!mobileRegex.test(trimmed)) return "Principal Mobile must be exactly 10 digits";
        return "";
      case "principalEmail":
        if (!emailRegex.test(trimmed)) return "Principal Email is invalid";
        return "";
      case "registrarName":
        if (!trimmed) return "Registrar Name is required";
        if (!nameRegex.test(trimmed)) return "Registrar Name should contain letters and spaces only";
        return "";
      case "registrarMobile":
        if (!mobileRegex.test(trimmed)) return "Registrar Mobile must be exactly 10 digits";
        return "";
      case "registrarEmail":
        if (!emailRegex.test(trimmed)) return "Registrar Email is invalid";
        return "";
      default:
        return "";
    }
  };

  const validateAll = (): Record<string, string> => {
    const res: Record<string, string> = {};
    (Object.keys(formData) as (keyof FormDataType)[]).forEach((k) => {
      const err = validateSingleField(k, String(formData[k]));
      if (err) res[k as string] = err;
    });

    // file required
    if (!file && !fileName) {
      res["file"] = "Apex Body Permission Document is required";
    }

    return res;
  };

  // File selection + validation (type + size)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    const allowed = ["pdf", "jpg", "jpeg", "png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const ext = uploaded.name.split(".").pop()?.toLowerCase() ?? "";
    if (!allowed.includes(ext)) {
      toast.error("File type not allowed. Use PDF / JPG / PNG.");
      return;
    }
    if (uploaded.size > maxSize) {
      toast.error("File exceeds 5MB limit.");
      return;
    }

    setFile(uploaded);
    setFileName(uploaded.name);
    localStorage.setItem(LOCAL_FILE_KEY, uploaded.name);
    toast.success("File selected");
    // clear file error if present and showErrors true
    if (showErrors) setErrors((prev) => { const cp = { ...prev }; delete cp["file"]; return cp; });
  };

  const saveDraft = () => {
    localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(formData));
    localStorage.setItem(LOCAL_PARTB_KEY, JSON.stringify(recognitionData));
    localStorage.setItem(LOCAL_PARTC_KEY, JSON.stringify(courses));
    if (fileName) localStorage.setItem(LOCAL_FILE_KEY, fileName);
    toast.success("Draft saved");
  };

  const handleNextStep = () => {
    setShowErrors(true);

    const validation = validateAll();
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      // show first error as toast for quick feedback
      const first = validation[Object.keys(validation)[0]];
      toast.error(first);
      // scroll to first invalid field (if exists)
      const firstFieldKey = Object.keys(validation)[0];
      const el = document.querySelector(`[data-field="${firstFieldKey}"]`);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // All good — save draft and move to Part B
    saveDraft();
    toast.success("Part A validated — continue to Part B");
    setActiveTab("B");
  };

  const validatePartB = () => {
    const err: Record<string, string> = {};
    const year = recognitionData.yearOfEstablishment.trim();
    const yearNum = Number(year);
    const currentYear = new Date().getFullYear();

    if (!year) err.yearOfEstablishment = "Year of establishment is required";
    else if (!/^\d{4}$/.test(year) || yearNum < 1800 || yearNum > currentYear) {
      err.yearOfEstablishment = "Enter a valid 4-digit year";
    }

    if (!recognitionData.recognitionStatus) {
      err.recognitionStatus = "Select recognition status";
    }

    if (recognitionData.recognitionFiles.length === 0) {
      err.recognitionFiles = "At least one recognition document is required";
    }

    return err;
  };

  const validatePartC = () => {
    const err: Record<string, string> = {};
    if (!courses.length) {
      err.general = "Add at least one course";
      return err;
    }

    courses.forEach((course) => {
      const nameKey = `${course.id}-name`;
      const typeKey = `${course.id}-courseType`;
      const subjectKey = `${course.id}-subjects`;
      const intakeKey = `${course.id}-intake`;
      const durationKey = `${course.id}-duration`;

      if (!course.name.trim()) err[nameKey] = "Course name is required";
      if (!course.courseType) err[typeKey] = "Course type is required";
      if (!course.subjects.length) err[subjectKey] = "Add at least one subject";

      const intakeNum = Number(course.intake);
      if (!course.intake.trim() || !Number.isFinite(intakeNum) || intakeNum <= 0) {
        err[intakeKey] = "Enter a valid intake";
      }

      const durationNum = Number(course.duration);
      if (!course.duration.trim() || !Number.isFinite(durationNum) || durationNum <= 0) {
        err[durationKey] = "Enter course duration in years";
      }
    });

    return err;
  };

  const handlePartBNext = () => {
    setShowPartBErrors(true);
    const validation = validatePartB();
    setPartBErrors(validation);
    if (Object.keys(validation).length) {
      toast.error(validation[Object.keys(validation)[0]]);
      return;
    }
    saveDraft();
    setActiveTab("C");
    toast.success("Part B saved");
  };

  const handleSubmit = () => {
    setShowPartCErrors(true);
    const validation = validatePartC();
    setPartCErrors(validation);
    if (Object.keys(validation).length) {
      const first = validation[Object.keys(validation)[0]];
      toast.error(first);
      return;
    }
    saveDraft();
    toast.success("All parts saved — proceeding");
    navigate("/institute-registration/profile");
  };

  // Helper to get input class with error border when showErrors && error exists
  const inputClass = (fieldKey: string) =>
    `${styles.inputElement} ${showErrors && errors[fieldKey] ? styles.errorInput : ""}`;

  const recognitionInputClass = styles.inputElement;

  const handleRecognitionChange = (key: keyof RecognitionData, value: string) => {
    setRecognitionData((prev) => ({ ...prev, [key]: value }));
  };

  const handleRecognitionFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = Array.from(e.target.files ?? []);
    if (!uploaded.length) return;

    const allowed = ["pdf", "jpg", "jpeg", "png"];
    const maxSize = 5 * 1024 * 1024;
    const validNames: string[] = [];

    for (const file of uploaded) {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!allowed.includes(ext)) {
        toast.error(`${file.name} has invalid type`);
        continue;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 5MB`);
        continue;
      }
      validNames.push(file.name);
    }

    if (!validNames.length) return;

    setRecognitionData((prev) => ({
      ...prev,
      recognitionFiles: [...prev.recognitionFiles, ...validNames],
    }));
    toast.success(`${validNames.length} file(s) added`);
  };

  const removeRecognitionFile = (name: string) => {
    setRecognitionData((prev) => ({
      ...prev,
      recognitionFiles: prev.recognitionFiles.filter((f) => f !== name),
    }));
  };

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        courseType: "",
        subjects: [],
        subjectDraft: "",
        intake: "",
        duration: "",
      },
    ]);
  };

  const updateCourseField = (id: number, key: keyof CourseType, value: string) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
  };

  const addSubject = (id: number) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id && c.subjectDraft.trim()
          ? { ...c, subjects: [...c.subjects, c.subjectDraft.trim()], subjectDraft: "" }
          : c
      )
    );
  };

  const removeSubject = (id: number, subject: string) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, subjects: c.subjects.filter((s) => s !== subject) } : c
      )
    );
  };

  const removeCourse = (id: number) => {
    setCourses((prev) => (prev.length === 1 ? prev : prev.filter((c) => c.id !== id)));
  };

  const totalIntake = courses.reduce((sum, c) => {
    const n = Number(c.intake);
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);

  const progressPercent = activeTab === "A" ? 33 : activeTab === "B" ? 67 : 100;

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Institute Registration</h1>
        <p className={styles.subtitle}>
          Complete all three parts to register your institution with the Department of Higher
          Education.
        </p>

        {/* Step header */}
        <div className={styles.stepHeader}>
          <div>
            <p className={styles.stepLabel}>
              {activeTab === "A" ? "Step 1 of 3" : activeTab === "B" ? "Step 2 of 3" : "Step 3 of 3"}
            </p>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <span className={styles.progressText}>{progressPercent}% Complete</span>
        </div>

        {/* Tabs */}
        <div className={styles.stepTabs}>
          <button
            className={`${styles.tab} ${activeTab === "A" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("A")}
          >
            Part A: Basic Information
          </button>
          <button
            className={`${styles.tab} ${activeTab === "B" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("B")}
          >
            Part B: Recognition & Status
          </button>
          <button
            className={`${styles.tab} ${activeTab === "C" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("C")}
          >
            Part C: Courses & Intake
          </button>
        </div>

        {activeTab === "A" && (
          <>
            {/* Part A content */}
            <h2 className={styles.sectionHeading}>Part A: Basic Information</h2>
            <p className={styles.sectionDesc}>Enter institute details and contact information</p>

            {/* Basic info */}
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Basic Information</h3>
              <div className={styles.grid1}>
                <div className={styles.inputGroup}>
                  <label>Institute Name *</label>
                  <input
                    data-field="instituteName"
                    className={inputClass("instituteName")}
                    value={formData.instituteName}
                    onChange={(e) => updateField("instituteName", e.target.value)}
                    placeholder="Enter Institute name"
                  />
                  {showErrors && errors.instituteName && <p className={styles.errorText}>{errors.instituteName}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label>Institute Type *</label>
                  <select
                    data-field="instituteType"
                    className={inputClass("instituteType")}
                    value={formData.instituteType}
                    onChange={(e) => updateField("instituteType", e.target.value)}
                  >
                    <option value="">Select Institute type</option>
                    <option>Government</option>
                    <option>Private</option>
                    <option>Aided</option>
                  </select>
                  {showErrors && errors.instituteType && <p className={styles.errorText}>{errors.instituteType}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label>Apex Body</label>
                  <input
                    data-field="apexBody"
                    className={styles.inputElement}
                    value={formData.apexBody}
                    onChange={(e) => updateField("apexBody", e.target.value)}
                    placeholder="e.g., University Grants Commission"
                  />
                </div>

                <div className={styles.inputGroupFull}>
                  <label>Apex Body Permission Document *</label>

                  <div
                    className={styles.uploadBox}
                    onClick={() => apexFileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.uploadInner}>⬆️ <p>Drag & drop files here</p><small>or <span className={styles.browse}>browse files</span></small></div>
                  </div>

                  <input
                    ref={apexFileInputRef}
                    type="file"
                    className={styles.hiddenInput}
                    onChange={handleFileSelect}
                    data-field="file"
                  />

                  {showErrors && errors.file && <p className={styles.errorText}>{errors.file}</p>}
                  {fileName && <p className={styles.fileName}>Selected File: {fileName}</p>}
                </div>
              </div>
            </section>

            {/* Address */}
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Address Information</h3>

              <div className={styles.grid1}>
                <div className={styles.inputGroup}>
                  <label>Address Line 1 *</label>
                  <input
                    data-field="addressLine1"
                    className={inputClass("addressLine1")}
                    value={formData.addressLine1}
                    onChange={(e) => updateField("addressLine1", e.target.value)}
                    placeholder="Building name, street"
                  />
                  {showErrors && errors.addressLine1 && <p className={styles.errorText}>{errors.addressLine1}</p>}
                </div>

                <div className={styles.inputGroup}>
                  <label>Address Line 2</label>
                  <input
                    data-field="addressLine2"
                    className={styles.inputElement}
                    value={formData.addressLine2}
                    onChange={(e) => updateField("addressLine2", e.target.value)}
                    placeholder="Area, locality (optional)"
                  />
                </div>

                <div className={styles.grid2}>
                  <div className={styles.inputGroup}>
                    <label>City *</label>
                    <input
                      data-field="city"
                      className={inputClass("city")}
                      value={formData.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Enter city"
                    />
                    {showErrors && errors.city && <p className={styles.errorText}>{errors.city}</p>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label>District *</label>
                    <input
                      data-field="district"
                      className={inputClass("district")}
                      value={formData.district}
                      onChange={(e) => updateField("district", e.target.value)}
                      placeholder="Enter district"
                    />
                    {showErrors && errors.district && <p className={styles.errorText}>{errors.district}</p>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label>State *</label>
                    <select
                      data-field="state"
                      className={inputClass("state")}
                      value={formData.state}
                      onChange={(e) => updateField("state", e.target.value)}
                    >
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Pincode *</label>
                    <input
                      data-field="pincode"
                      className={inputClass("pincode")}
                      value={formData.pincode}
                      onChange={(e) => updateField("pincode", e.target.value)}
                      placeholder="6-digit pincode"
                    />
                    {showErrors && errors.pincode && <p className={styles.errorText}>{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </section>

            {/* Principal */}
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Principal Contact Information</h3>
              <div className={styles.grid1}>
                <div className={styles.inputGroup}>
                  <label>Principal Name *</label>
                  <input
                    data-field="principalName"
                    className={inputClass("principalName")}
                    value={formData.principalName}
                    onChange={(e) => updateField("principalName", e.target.value)}
                    placeholder="Enter principal’s full name"
                  />
                  {showErrors && errors.principalName && <p className={styles.errorText}>{errors.principalName}</p>}
                </div>

                <div className={styles.grid2}>
                  <div className={styles.inputGroup}>
                    <label>Mobile Number *</label>
                    <input
                      data-field="principalMobile"
                      className={inputClass("principalMobile")}
                      value={formData.principalMobile}
                      onChange={(e) => updateField("principalMobile", e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                    {showErrors && errors.principalMobile && <p className={styles.errorText}>{errors.principalMobile}</p>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Email *</label>
                    <input
                      data-field="principalEmail"
                      className={inputClass("principalEmail")}
                      value={formData.principalEmail}
                      onChange={(e) => updateField("principalEmail", e.target.value)}
                      placeholder="principal@example.com"
                    />
                    {showErrors && errors.principalEmail && <p className={styles.errorText}>{errors.principalEmail}</p>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Alternate Phone</label>
                  <input
                    data-field="principalAltPhone"
                    className={styles.inputElement}
                    value={formData.principalAltPhone}
                    onChange={(e) => updateField("principalAltPhone", e.target.value)}
                    placeholder="10-digit mobile number (optional)"
                  />
                </div>
              </div>
            </section>

            {/* Registrar */}
            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Registrar Contact Information</h3>
              <div className={styles.grid1}>
                <div className={styles.inputGroup}>
                  <label>Registrar Name *</label>
                  <input
                    data-field="registrarName"
                    className={inputClass("registrarName")}
                    value={formData.registrarName}
                    onChange={(e) => updateField("registrarName", e.target.value)}
                    placeholder="Enter registrar’s full name"
                  />
                  {showErrors && errors.registrarName && <p className={styles.errorText}>{errors.registrarName}</p>}
                </div>

                <div className={styles.grid2}>
                  <div className={styles.inputGroup}>
                    <label>Email *</label>
                    <input
                      data-field="registrarEmail"
                      className={inputClass("registrarEmail")}
                      value={formData.registrarEmail}
                      onChange={(e) => updateField("registrarEmail", e.target.value)}
                      placeholder="registrar@example.com"
                    />
                    {showErrors && errors.registrarEmail && <p className={styles.errorText}>{errors.registrarEmail}</p>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Mobile Number *</label>
                    <input
                      data-field="registrarMobile"
                      className={inputClass("registrarMobile")}
                      value={formData.registrarMobile}
                      onChange={(e) => updateField("registrarMobile", e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                    {showErrors && errors.registrarMobile && <p className={styles.errorText}>{errors.registrarMobile}</p>}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Alternate Phone</label>
                  <input
                    data-field="registrarAltPhone"
                    className={styles.inputElement}
                    value={formData.registrarAltPhone}
                    onChange={(e) => updateField("registrarAltPhone", e.target.value)}
                    placeholder="10-digit mobile number (optional)"
                  />
                </div>
              </div>
            </section>

            {/* Buttons */}
            <div className={styles.buttonRow}>
              <button className={styles.secondaryBtn} onClick={saveDraft}>Save Draft</button>
              <button className={styles.primaryBtn} onClick={handleNextStep}>Next Step</button>
            </div>
          </>
        )}

        {activeTab === "B" && (
          <>
            <h2 className={styles.sectionHeading}>Part B: Recognition & Status</h2>
            <p className={styles.sectionDesc}>Provide recognition and accreditation details</p>

            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Recognition Information</h3>
              <p className={styles.cardSubtitle}>Enter recognition and establishment details</p>

              <div className={styles.grid1}>
                <div className={styles.inputGroup}>
                  <label>Year of Establishment *</label>
                  <input
                    className={`${recognitionInputClass} ${showPartBErrors && partBErrors.yearOfEstablishment ? styles.errorInput : ""}`}
                    value={recognitionData.yearOfEstablishment}
                    onChange={(e) => handleRecognitionChange("yearOfEstablishment", e.target.value)}
                    placeholder="e.g., 2024"
                  />
                  {showPartBErrors && partBErrors.yearOfEstablishment && (
                    <p className={styles.errorText}>{partBErrors.yearOfEstablishment}</p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>Recognition Status *</label>
                  <select
                    className={`${recognitionInputClass} ${showPartBErrors && partBErrors.recognitionStatus ? styles.errorInput : ""}`}
                    value={recognitionData.recognitionStatus}
                    onChange={(e) => handleRecognitionChange("recognitionStatus", e.target.value)}
                  >
                    <option value="">Select recognition status</option>
                    <option>Provisional</option>
                    <option>Permanent</option>
                    <option>Renewal in progress</option>
                  </select>
                  {showPartBErrors && partBErrors.recognitionStatus && (
                    <p className={styles.errorText}>{partBErrors.recognitionStatus}</p>
                  )}
                </div>

                <div className={styles.inputGroupFull}>
                  <label>Recognition Documents *</label>
                  <div
                    className={styles.uploadBox}
                    onClick={() => recognitionFileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.uploadInner}>⬆️ <p>Drag & drop files here</p><small>or <span className={styles.browse}>browse files</span></small></div>
                    <small className={styles.muted}>Accepted: pdf, jpg, jpeg, png | Max size: 5MB</small>
                  </div>
                  <input
                    ref={recognitionFileInputRef}
                    type="file"
                    multiple
                    className={styles.hiddenInput}
                    onChange={handleRecognitionFileSelect}
                  />
                  {showPartBErrors && partBErrors.recognitionFiles && (
                    <p className={styles.errorText}>{partBErrors.recognitionFiles}</p>
                  )}
                  {recognitionData.recognitionFiles.length > 0 && (
                    <div className={styles.fileList}>
                      {recognitionData.recognitionFiles.map((f) => (
                        <div key={f} className={styles.fileRow}>
                          <span>{f}</span>
                          <button type="button" className={styles.removeTag} onClick={() => removeRecognitionFile(f)}>
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className={styles.card}>
              <h3 className={styles.cardTitle}>UGC Status</h3>
              <p className={styles.cardSubtitle}>University Grants Commission recognition details</p>
              <select
                className={recognitionInputClass}
                value={recognitionData.ugcStatus}
                onChange={(e) => handleRecognitionChange("ugcStatus", e.target.value)}
              >
                <option value="">Select UGC status</option>
                <option>Recognized</option>
                <option>Applied</option>
                <option>Not Applied</option>
              </select>
            </section>

            <section className={styles.card}>
              <h3 className={styles.cardTitle}>NCTE Status</h3>
              <p className={styles.cardSubtitle}>National Council for Teacher Education recognition details</p>
              <select
                className={recognitionInputClass}
                value={recognitionData.ncteStatus}
                onChange={(e) => handleRecognitionChange("ncteStatus", e.target.value)}
              >
                <option value="">Select NCTE status</option>
                <option>Recognized</option>
                <option>Applied</option>
                <option>Not Applicable</option>
              </select>
            </section>

            <section className={styles.card}>
              <h3 className={styles.cardTitle}>NAAC Accreditation</h3>
              <p className={styles.cardSubtitle}>National Assessment and Accreditation Council grade</p>
              <select
                className={recognitionInputClass}
                value={recognitionData.naacGrade}
                onChange={(e) => handleRecognitionChange("naacGrade", e.target.value)}
              >
                <option value="">Select NAAC grade</option>
                <option>A++</option>
                <option>A+</option>
                <option>A</option>
                <option>B++</option>
                <option>B+</option>
                <option>B</option>
                <option>C</option>
                <option>Not Accredited</option>
              </select>
            </section>

            <section className={styles.card}>
              <h3 className={styles.cardTitle}>University Affiliation</h3>
              <p className={styles.cardSubtitle}>Details of affiliated university (if applicable)</p>

              <div className={styles.grid1}>
                <div className={styles.inputGroup}>
                  <label>Affiliated University</label>
                  <input
                    className={recognitionInputClass}
                    value={recognitionData.affiliatedUniversity}
                    onChange={(e) => handleRecognitionChange("affiliatedUniversity", e.target.value)}
                    placeholder="Enter affiliated university"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Enter university name (if applicable)</label>
                  <input
                    className={recognitionInputClass}
                    value={recognitionData.affiliatedUniversityName}
                    onChange={(e) => handleRecognitionChange("affiliatedUniversityName", e.target.value)}
                    placeholder="Enter university name"
                  />
                </div>
              </div>
            </section>

            <div className={styles.buttonRow}>
              <button className={styles.secondaryBtn} onClick={() => setActiveTab("A")}>Previous Step</button>
              <button className={styles.secondaryBtn} onClick={saveDraft}>Save Draft</button>
              <button className={styles.primaryBtn} onClick={handlePartBNext}>Next Step</button>
            </div>
          </>
        )}

        {activeTab === "C" && (
          <>
            <h2 className={styles.sectionHeading}>Part C: Courses & Intake</h2>
            <p className={styles.sectionDesc}>Add courses and student intake information</p>

            <section className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Courses Offered</h3>
                <p className={styles.cardSubtitle}>Add all courses offered by your institution.</p>
                <button className={styles.secondaryBtn} onClick={addCourse}>+ Add Course</button>
              </div>

              <div className={styles.courseList}>
                {courses.map((course, idx) => (
                  <div key={course.id} className={styles.courseCard}>
                    <div className={styles.courseCardHeader}>
                      <h4 className={styles.cardTitle}>Course {idx + 1}</h4>
                      <button
                        className={styles.removeTag}
                        onClick={() => removeCourse(course.id)}
                        aria-label="Remove course"
                      >
                        ✕
                      </button>
                    </div>

                    <div className={styles.grid1}>
                      <div className={styles.inputGroup}>
                        <label>Course Name *</label>
                        <input
                          className={`${styles.inputElement} ${showPartCErrors && partCErrors[`${course.id}-name`] ? styles.errorInput : ""}`}
                          value={course.name}
                          onChange={(e) => updateCourseField(course.id, "name", e.target.value)}
                          placeholder="e.g., Bachelor of Arts"
                        />
                        {showPartCErrors && partCErrors[`${course.id}-name`] && (
                          <p className={styles.errorText}>{partCErrors[`${course.id}-name`]}</p>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Course Type *</label>
                        <select
                          className={`${styles.inputElement} ${showPartCErrors && partCErrors[`${course.id}-courseType`] ? styles.errorInput : ""}`}
                          value={course.courseType}
                          onChange={(e) => updateCourseField(course.id, "courseType", e.target.value)}
                        >
                          <option value="">Select course type</option>
                          <option>Undergraduate</option>
                          <option>Postgraduate</option>
                          <option>Diploma</option>
                          <option>Certificate</option>
                        </select>
                        {showPartCErrors && partCErrors[`${course.id}-courseType`] && (
                          <p className={styles.errorText}>{partCErrors[`${course.id}-courseType`]}</p>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Subjects *</label>
                        <div className={styles.addSubjectRow}>
                          <input
                            className={styles.inputElement}
                            value={course.subjectDraft}
                            onChange={(e) => updateCourseField(course.id, "subjectDraft", e.target.value)}
                            placeholder="Enter subject name"
                          />
                          <button type="button" className={styles.addSubjectBtn} onClick={() => addSubject(course.id)}>
                            +
                          </button>
                        </div>
                        {showPartCErrors && partCErrors[`${course.id}-subjects`] && (
                          <p className={styles.errorText}>{partCErrors[`${course.id}-subjects`]}</p>
                        )}
                        {course.subjects.length > 0 && (
                          <div className={styles.tagList}>
                            {course.subjects.map((subj) => (
                              <span key={subj} className={styles.tag}>
                                {subj}
                                <button
                                  type="button"
                                  className={styles.removeTag}
                                  onClick={() => removeSubject(course.id, subj)}
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className={styles.grid2}>
                        <div className={styles.inputGroup}>
                          <label>Student Intake *</label>
                          <input
                            className={`${styles.inputElement} ${showPartCErrors && partCErrors[`${course.id}-intake`] ? styles.errorInput : ""}`}
                            value={course.intake}
                            onChange={(e) => updateCourseField(course.id, "intake", e.target.value)}
                            placeholder="e.g., 30"
                          />
                          {showPartCErrors && partCErrors[`${course.id}-intake`] && (
                            <p className={styles.errorText}>{partCErrors[`${course.id}-intake`]}</p>
                          )}
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Course Duration *</label>
                          <div className={styles.durationRow}>
                            <input
                              className={`${styles.inputElement} ${showPartCErrors && partCErrors[`${course.id}-duration`] ? styles.errorInput : ""}`}
                              value={course.duration}
                              onChange={(e) => updateCourseField(course.id, "duration", e.target.value)}
                              placeholder="e.g., 3"
                            />
                            <span className={styles.muted}>Years</span>
                          </div>
                          {showPartCErrors && partCErrors[`${course.id}-duration`] && (
                            <p className={styles.errorText}>{partCErrors[`${course.id}-duration`]}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.card}>
              <h3 className={styles.cardTitle}>Total Intake Summary</h3>
              <p className={styles.cardSubtitle}>Automatically calculated from all courses</p>
              <div className={styles.summaryBox}>
                <span>Total Student Intake</span>
                <span className={styles.summaryValue}>{totalIntake}</span>
              </div>
            </section>

            <div className={styles.buttonRow}>
              <button className={styles.secondaryBtn} onClick={() => setActiveTab("B")}>Previous Step</button>
              <button className={styles.secondaryBtn} onClick={saveDraft}>Save Draft</button>
              <button className={styles.primaryBtn} onClick={handleSubmit}>Proceed to OTP Verification</button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
