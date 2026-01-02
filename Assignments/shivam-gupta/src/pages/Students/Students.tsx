// src/pages/Students/Students.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Students.module.css";
import { FeeManagement } from "./FeeManagement";
import Timetable from "./Timetable";
import Attendance from "./Attendance";
import Examination from "./Examination";
import { toast } from "react-toastify";

type TabKey =
  | "Registration"
  | "FeeManagement"
  | "Timetable"
  | "Attendance"
  | "Examination";
type SubTabKey = "Personal" | "Contact" | "Guardian" | "Academic" | "Education";

interface FormData {
  // PERSONAL
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  religion: string;
  motherTongue: string;
  category: string;
  disability: string;
  studentType: string;
  minority: boolean;

  // CONTACT
  email: string;
  mobile: string;
  altMobile: string;

  permanentLine1: string;
  permanentLine2: string;
  permanentCity: string;
  permanentDistrict: string;
  permanentState: string;
  permanentPincode: string;
  permanentCountry: string;

  currentLine1: string;
  currentLine2: string;
  currentCity: string;
  currentDistrict: string;
  currentState: string;
  currentPincode: string;
  currentCountry: string;

  // GUARDIAN - father
  fatherName: string;
  fatherOccupation: string;
  fatherMobile: string;
  fatherEmail: string;
  fatherIncome: string;

  // GUARDIAN - mother
  motherName: string;
  motherOccupation: string;
  motherMobile: string;
  motherEmail: string;
  motherIncome: string;

  // ACADEMIC
  course: string;
  courseType: string;
  year: string;
  semester: string;
  academicYear: string;
  admissionDate: string;

  // EDUCATION
  educationHistory: string;
}

type Errors = Partial<Record<keyof FormData, string>>;

const STORAGE_KEY = "students_registration_draft_v1";

export const Students: React.FC = () => {
  const tabs: TabKey[] = [
    "Registration",
    "FeeManagement",
    "Timetable",
    "Attendance",
    "Examination",
  ];
  const subTabs: SubTabKey[] = [
    "Personal",
    "Contact",
    "Guardian",
    "Academic",
    "Education",
  ];

  const [activeTab, setActiveTab] = useState<TabKey>("Registration");
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>("Personal");

  const defaultFormData: FormData = useMemo(
    () => ({
      // PERSONAL
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      bloodGroup: "",
      nationality: "Indian",
      religion: "",
      motherTongue: "",
      category: "",
      disability: "",
      studentType: "",
      minority: false,

      // CONTACT
      email: "",
      mobile: "",
      altMobile: "",

      permanentLine1: "",
      permanentLine2: "",
      permanentCity: "",
      permanentDistrict: "",
      permanentState: "",
      permanentPincode: "",
      permanentCountry: "",

      currentLine1: "",
      currentLine2: "",
      currentCity: "",
      currentDistrict: "",
      currentState: "",
      currentPincode: "",
      currentCountry: "",

      // GUARDIAN
      fatherName: "",
      fatherOccupation: "",
      fatherMobile: "",
      fatherEmail: "",
      fatherIncome: "",

      motherName: "",
      motherOccupation: "",
      motherMobile: "",
      motherEmail: "",
      motherIncome: "",

      // ACADEMIC
      course: "",
      courseType: "",
      year: "",
      semester: "",
      academicYear: "",
      admissionDate: "",

      // EDUCATION
      educationHistory: "",
    }),
    []
  );

  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<Errors>({});
  const saveTimerRef = useRef<number | null>(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormData>;
        setFormData((prev) => ({ ...prev, ...parsed }));
        toast.info("Loaded saved registration draft.");
      }
    } catch (e) {
      console.warn("Failed to load draft", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save draft (debounced)
  useEffect(() => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        toast.dismiss();
        toast.success("Draft auto-saved", { autoClose: 900 });
      } catch (e) {
        console.warn("Auto-save failed", e);
      }
    }, 700);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [formData]);

  // Generic change handler
  const handleChange =
    (key: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setFormData((prev) => ({ ...prev, [key]: value } as FormData));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  // helpers
  const isAlpha = (s: string) => /^[A-Za-z\s]+$/.test(s.trim());
  const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
  const isMobile = (s: string) => /^\d{10}$/.test(s);
  const isPincode = (s: string) => /^\d{6}$/.test(s);

  // VALIDATORS (all required * fields)
  const validatePersonal = (): Errors => {
    const e: Errors = {};
    if (!formData.firstName.trim()) e.firstName = "First name is required";
    else if (!isAlpha(formData.firstName))
      e.firstName = "Only alphabets allowed";

    if (!formData.lastName.trim()) e.lastName = "Last name is required";
    else if (!isAlpha(formData.lastName)) e.lastName = "Only alphabets allowed";

    if (!formData.dob.trim()) e.dob = "Date of birth is required";

    if (!formData.gender.trim()) e.gender = "Gender is required";

    if (!formData.nationality.trim()) e.nationality = "Nationality is required";

    if (!formData.category.trim()) e.category = "Category is required";

    if (!formData.studentType.trim())
      e.studentType = "Student type is required";

    return e;
  };

  const validateContact = (): Errors => {
    const e: Errors = {};
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!isEmail(formData.email)) e.email = "Invalid email";

    if (!formData.mobile.trim()) e.mobile = "Mobile is required";
    else if (!isMobile(formData.mobile)) e.mobile = "Mobile must be 10 digits";

    // Permanent
    if (!formData.permanentLine1.trim())
      e.permanentLine1 = "Address Line 1 is required";
    if (!formData.permanentCity.trim()) e.permanentCity = "City is required";
    if (!formData.permanentDistrict.trim())
      e.permanentDistrict = "District is required";
    if (!formData.permanentState.trim()) e.permanentState = "State is required";
    if (!formData.permanentPincode.trim())
      e.permanentPincode = "Pincode is required";
    else if (!isPincode(formData.permanentPincode))
      e.permanentPincode = "Pincode must be 6 digits";
    if (!formData.permanentCountry.trim())
      e.permanentCountry = "Country is required";

    // Current
    if (!formData.currentLine1.trim())
      e.currentLine1 = "Address Line 1 is required";
    if (!formData.currentCity.trim()) e.currentCity = "City is required";
    if (!formData.currentDistrict.trim())
      e.currentDistrict = "District is required";
    if (!formData.currentState.trim()) e.currentState = "State is required";
    if (!formData.currentPincode.trim())
      e.currentPincode = "Pincode is required";
    else if (!isPincode(formData.currentPincode))
      e.currentPincode = "Pincode must be 6 digits";
    if (!formData.currentCountry.trim())
      e.currentCountry = "Country is required";

    return e;
  };

  const validateGuardian = (): Errors => {
    const e: Errors = {};
    if (!formData.fatherName.trim()) e.fatherName = "Father's name is required";
    if (!formData.fatherMobile.trim())
      e.fatherMobile = "Father's mobile is required";
    else if (!isMobile(formData.fatherMobile))
      e.fatherMobile = "Must be 10 digits";
    if (!formData.fatherIncome.trim())
      e.fatherIncome = "Father's annual income is required";

    if (!formData.motherName.trim()) e.motherName = "Mother's name is required";
    if (!formData.motherMobile.trim())
      e.motherMobile = "Mother's mobile is required";
    else if (!isMobile(formData.motherMobile))
      e.motherMobile = "Must be 10 digits";
    if (!formData.motherIncome.trim())
      e.motherIncome = "Mother's annual income is required";

    return e;
  };

  const validateAcademic = (): Errors => {
    const e: Errors = {};
    if (!formData.course.trim()) e.course = "Course is required";
    if (!formData.courseType.trim()) e.courseType = "Course type is required";
    if (!formData.year.trim()) e.year = "Year is required";
    if (!formData.semester.trim()) e.semester = "Semester is required";
    if (!formData.academicYear.trim())
      e.academicYear = "Academic year is required";
    if (!formData.admissionDate.trim())
      e.admissionDate = "Admission date is required";
    return e;
  };

  const validateEducation = (): Errors => {
    const e: Errors = {};
    if (!formData.educationHistory.trim())
      e.educationHistory = "Please add at least one education record";
    return e;
  };

  const validateSubTab = (subTab: SubTabKey): Errors => {
    switch (subTab) {
      case "Personal":
        return validatePersonal();
      case "Contact":
        return validateContact();
      case "Guardian":
        return validateGuardian();
      case "Academic":
        return validateAcademic();
      case "Education":
        return validateEducation();
      default:
        return {};
    }
  };

  // Navigation
  const getCurrentSubTabIndex = () => subTabs.indexOf(activeSubTab);

  const goToNextSubTab = () => {
    const validationErrors = validateSubTab(activeSubTab);
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...validationErrors }));
      const firstKey = Object.keys(validationErrors)[0] as keyof FormData;
      toast.error((validationErrors as any)[firstKey]);
      // scroll to field if present
      const el = document.querySelector(
        `[name="${firstKey}"]`
      ) as HTMLElement | null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const idx = getCurrentSubTabIndex();
    if (idx < subTabs.length - 1) setActiveSubTab(subTabs[idx + 1]);
  };

  const goToPreviousSubTab = () => {
    const idx = getCurrentSubTabIndex();
    if (idx > 0) setActiveSubTab(subTabs[idx - 1]);
  };

  type FormErrors = Partial<Record<keyof FormData, string>>;
  // Submit
  const handleSubmitRegistration = () => {
    const allErrors: FormErrors = {
      ...validatePersonal(),
      ...validateContact(),
      ...validateGuardian(),
      ...validateAcademic(),
      ...validateEducation(),
    };

    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) {
      const firstKey = Object.keys(allErrors)[0] as keyof FormData;

      // Show the first error safely
      toast.error(allErrors[firstKey]!);

      // navigate to subtab that likely contains the field
      const personalKeys = [
        "firstName",
        "lastName",
        "dob",
        "gender",
        "nationality",
        "category",
        "studentType",
      ];
      const contactKeys = [
        "email",
        "mobile",
        "permanentLine1",
        "permanentCity",
        "permanentPincode",
        "permanentCountry",
        "currentLine1",
        "currentPincode",
        "currentCountry",
      ];
      const guardianKeys = [
        "fatherName",
        "fatherMobile",
        "fatherIncome",
        "motherName",
        "motherMobile",
        "motherIncome",
      ];
      const academicKeys = [
        "course",
        "courseType",
        "year",
        "semester",
        "academicYear",
        "admissionDate",
      ];
      const educationKeys = ["educationHistory"];

      if (personalKeys.includes(firstKey as string))
        setActiveSubTab("Personal");
      else if (contactKeys.includes(firstKey as string))
        setActiveSubTab("Contact");
      else if (guardianKeys.includes(firstKey as string))
        setActiveSubTab("Guardian");
      else if (academicKeys.includes(firstKey as string))
        setActiveSubTab("Academic");
      else if (educationKeys.includes(firstKey as string))
        setActiveSubTab("Education");
      // scroll to field
      const el = document.querySelector(
        `[name="${firstKey}"]`
      ) as HTMLElement | null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // submit
    try {
      console.log("Submitting student registration payload:", formData);
      localStorage.removeItem(STORAGE_KEY);
      toast.success("Student registration submitted successfully!");
      setFormData(defaultFormData);
      setActiveSubTab("Personal");
      setActiveTab("Registration");
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit registration. Try again.");
    }
  };

  // field error helper
  const fieldError = (k: keyof FormData) => errors[k] as string | undefined;

  return (
    <DashboardLayout>
      <h1>Student Academic Module</h1>
      <p>
        Manage student registration, fees, academic activities, and examinations
      </p>

      <div style={{ marginBottom: 12 }}>
        {tabs.map((t) => (
          <button
            key={t}
            className={
              activeTab === t ? `${styles.activeTab} ${styles.tab}` : styles.tab
            }
            onClick={() => setActiveTab(t)}
            style={{ marginRight: 8 }}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Registration" && (
        <div className={styles.card}>
          <h2 className={styles.title}>Student Registration</h2>
          <p className={styles.subtitle}>
            Register a new student by filling in all required information
          </p>

          <div className={styles.tabsWrapper} style={{ marginBottom: 18 }}>
            {subTabs.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSubTab(s)}
                className={`${styles.tab} ${
                  activeSubTab === s ? styles.activeSubTab : ""
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* PERSONAL */}
          {activeSubTab === "Personal" && (
            <>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>First Name *</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange("firstName")}
                  />
                  {fieldError("firstName") && (
                    <p className={styles.error}>{fieldError("firstName")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Middle Name</label>
                  <input
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange("middleName")}
                  />
                </div>

                <div className={styles.group}>
                  <label>Last Name *</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange("lastName")}
                  />
                  {fieldError("lastName") && (
                    <p className={styles.error}>{fieldError("lastName")}</p>
                  )}
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Date of Birth *</label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange("dob")}
                  />
                  {fieldError("dob") && (
                    <p className={styles.error}>{fieldError("dob")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange("gender")}
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  {fieldError("gender") && (
                    <p className={styles.error}>{fieldError("gender")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange("bloodGroup")}
                  >
                    <option value="">Select blood group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Nationality *</label>
                  <input
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange("nationality")}
                  />
                  {fieldError("nationality") && (
                    <p className={styles.error}>{fieldError("nationality")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Religion</label>
                  <input
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange("religion")}
                  />
                </div>

                <div className={styles.group}>
                  <label>Mother Tongue</label>
                  <input
                    name="motherTongue"
                    value={formData.motherTongue}
                    onChange={handleChange("motherTongue")}
                  />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange("category")}
                  >
                    <option value="">Select category</option>
                    <option>General</option>
                    <option>OBC</option>
                    <option>SC</option>
                    <option>ST</option>
                  </select>
                  {fieldError("category") && (
                    <p className={styles.error}>{fieldError("category")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Disability</label>
                  <select
                    name="disability"
                    value={formData.disability}
                    onChange={handleChange("disability")}
                  >
                    <option value="">Select disability</option>
                    <option>None</option>
                    <option>Visual</option>
                    <option>Hearing</option>
                  </select>
                </div>

                <div className={styles.group}>
                  <label>Student Type *</label>
                  <select
                    name="studentType"
                    value={formData.studentType}
                    onChange={handleChange("studentType")}
                  >
                    <option value="">Select student type</option>
                    <option>Regular</option>
                    <option>Self-Finance</option>
                  </select>
                  {fieldError("studentType") && (
                    <p className={styles.error}>{fieldError("studentType")}</p>
                  )}
                </div>
              </div>

              <div className={styles.checkboxRow} style={{ marginTop: 12 }}>
                <input
                  type="checkbox"
                  name="minority"
                  checked={formData.minority}
                  onChange={handleChange("minority")}
                />
                <label>Minority Student</label>
              </div>

              <div className={styles.bottomRight}>
                <button className={styles.nextBtn} onClick={goToNextSubTab}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* CONTACT */}
          {activeSubTab === "Contact" && (
            <>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                  />
                  {fieldError("email") && (
                    <p className={styles.error}>{fieldError("email")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Mobile *</label>
                  <input
                    name="mobile"
                    type="text"
                    value={formData.mobile}
                    onChange={handleChange("mobile")}
                    placeholder="+91-9876543210"
                  />
                  {fieldError("mobile") && (
                    <p className={styles.error}>{fieldError("mobile")}</p>
                  )}
                </div>
              </div>

              <div className={styles.groupFull} style={{ marginTop: 12 }}>
                <label>Alternate Mobile</label>
                <input
                  name="altMobile"
                  type="text"
                  value={formData.altMobile}
                  onChange={handleChange("altMobile")}
                  placeholder="+91-9876543210"
                />
              </div>

              <h4 className={styles.sectionTitle}>Permanent Address</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Address Line 1 *</label>
                  <input
                    name="permanentLine1"
                    value={formData.permanentLine1}
                    onChange={handleChange("permanentLine1")}
                  />
                  {fieldError("permanentLine1") && (
                    <p className={styles.error}>
                      {fieldError("permanentLine1")}
                    </p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Address Line 2</label>
                  <input
                    name="permanentLine2"
                    value={formData.permanentLine2}
                    onChange={handleChange("permanentLine2")}
                  />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>City *</label>
                  <input
                    name="permanentCity"
                    value={formData.permanentCity}
                    onChange={handleChange("permanentCity")}
                  />
                  {fieldError("permanentCity") && (
                    <p className={styles.error}>
                      {fieldError("permanentCity")}
                    </p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>District *</label>
                  <input
                    name="permanentDistrict"
                    value={formData.permanentDistrict}
                    onChange={handleChange("permanentDistrict")}
                  />
                  {fieldError("permanentDistrict") && (
                    <p className={styles.error}>
                      {fieldError("permanentDistrict")}
                    </p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>State *</label>
                  <input
                    name="permanentState"
                    value={formData.permanentState}
                    onChange={handleChange("permanentState")}
                  />
                  {fieldError("permanentState") && (
                    <p className={styles.error}>
                      {fieldError("permanentState")}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Pincode *</label>
                  <input
                    name="permanentPincode"
                    value={formData.permanentPincode}
                    onChange={handleChange("permanentPincode")}
                  />
                  {fieldError("permanentPincode") && (
                    <p className={styles.error}>
                      {fieldError("permanentPincode")}
                    </p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Country *</label>
                  <input
                    name="permanentCountry"
                    value={formData.permanentCountry}
                    onChange={handleChange("permanentCountry")}
                  />
                  {fieldError("permanentCountry") && (
                    <p className={styles.error}>
                      {fieldError("permanentCountry")}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.checkboxRow} style={{ marginTop: 12 }}>
                <input
                  type="checkbox"
                  checked={
                    !!(formData.currentLine1 && formData.currentLine1.length)
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData((prev) => ({
                        ...prev,
                        currentLine1: prev.permanentLine1,
                        currentLine2: prev.permanentLine2,
                        currentCity: prev.permanentCity,
                        currentDistrict: prev.permanentDistrict,
                        currentState: prev.permanentState,
                        currentPincode: prev.permanentPincode,
                        currentCountry: prev.permanentCountry,
                      }));
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        currentLine1: "",
                        currentLine2: "",
                        currentCity: "",
                        currentDistrict: "",
                        currentState: "",
                        currentPincode: "",
                        currentCountry: "",
                      }));
                    }
                  }}
                />
                <label>Current address same as permanent address</label>
              </div>

              <h4 className={styles.sectionTitle}>Current Address</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Address Line 1 *</label>
                  <input
                    name="currentLine1"
                    value={formData.currentLine1}
                    onChange={handleChange("currentLine1")}
                  />
                  {fieldError("currentLine1") && (
                    <p className={styles.error}>{fieldError("currentLine1")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Address Line 2</label>
                  <input
                    name="currentLine2"
                    value={formData.currentLine2}
                    onChange={handleChange("currentLine2")}
                  />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>City *</label>
                  <input
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleChange("currentCity")}
                  />
                  {fieldError("currentCity") && (
                    <p className={styles.error}>{fieldError("currentCity")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>District *</label>
                  <input
                    name="currentDistrict"
                    value={formData.currentDistrict}
                    onChange={handleChange("currentDistrict")}
                  />
                  {fieldError("currentDistrict") && (
                    <p className={styles.error}>
                      {fieldError("currentDistrict")}
                    </p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>State *</label>
                  <input
                    name="currentState"
                    value={formData.currentState}
                    onChange={handleChange("currentState")}
                  />
                  {fieldError("currentState") && (
                    <p className={styles.error}>{fieldError("currentState")}</p>
                  )}
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Pincode *</label>
                  <input
                    name="currentPincode"
                    value={formData.currentPincode}
                    onChange={handleChange("currentPincode")}
                  />
                  {fieldError("currentPincode") && (
                    <p className={styles.error}>
                      {fieldError("currentPincode")}
                    </p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Country *</label>
                  <input
                    name="currentCountry"
                    value={formData.currentCountry}
                    onChange={handleChange("currentCountry")}
                  />
                  {fieldError("currentCountry") && (
                    <p className={styles.error}>
                      {fieldError("currentCountry")}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.btnRow}>
                <button className={styles.prevBtn} onClick={goToPreviousSubTab}>
                  Previous
                </button>
                <button className={styles.nextBtn} onClick={goToNextSubTab}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* GUARDIAN */}
          {activeSubTab === "Guardian" && (
            <>
              <h4 className={styles.sectionTitle}>Father's Information</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Name *</label>
                  <input
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange("fatherName")}
                  />
                  {fieldError("fatherName") && (
                    <p className={styles.error}>{fieldError("fatherName")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Occupation *</label>
                  <input
                    name="fatherOccupation"
                    value={formData.fatherOccupation}
                    onChange={handleChange("fatherOccupation")}
                  />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Mobile *</label>
                  <input
                    name="fatherMobile"
                    value={formData.fatherMobile}
                    onChange={handleChange("fatherMobile")}
                    placeholder="+91-9876543210"
                  />
                  {fieldError("fatherMobile") && (
                    <p className={styles.error}>{fieldError("fatherMobile")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Email</label>
                  <input
                    name="fatherEmail"
                    value={formData.fatherEmail}
                    onChange={handleChange("fatherEmail")}
                  />
                </div>

                <div className={styles.group}>
                  <label>Annual Income *</label>
                  <input
                    name="fatherIncome"
                    value={formData.fatherIncome}
                    onChange={handleChange("fatherIncome")}
                  />
                  {fieldError("fatherIncome") && (
                    <p className={styles.error}>{fieldError("fatherIncome")}</p>
                  )}
                </div>
              </div>

              <h4 className={styles.sectionTitle}>Mother's Information</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Name *</label>
                  <input
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange("motherName")}
                  />
                  {fieldError("motherName") && (
                    <p className={styles.error}>{fieldError("motherName")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Occupation *</label>
                  <input
                    name="motherOccupation"
                    value={formData.motherOccupation}
                    onChange={handleChange("motherOccupation")}
                  />
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Mobile *</label>
                  <input
                    name="motherMobile"
                    value={formData.motherMobile}
                    onChange={handleChange("motherMobile")}
                    placeholder="+91-9876543210"
                  />
                  {fieldError("motherMobile") && (
                    <p className={styles.error}>{fieldError("motherMobile")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Email</label>
                  <input
                    name="motherEmail"
                    value={formData.motherEmail}
                    onChange={handleChange("motherEmail")}
                  />
                </div>

                <div className={styles.group}>
                  <label>Annual Income *</label>
                  <input
                    name="motherIncome"
                    value={formData.motherIncome}
                    onChange={handleChange("motherIncome")}
                  />
                  {fieldError("motherIncome") && (
                    <p className={styles.error}>{fieldError("motherIncome")}</p>
                  )}
                </div>
              </div>

              <div className={styles.btnRow}>
                <button className={styles.prevBtn} onClick={goToPreviousSubTab}>
                  Previous
                </button>
                <button className={styles.nextBtn} onClick={goToNextSubTab}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* ACADEMIC */}
          {activeSubTab === "Academic" && (
            <>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Course *</label>
                  <input
                    name="course"
                    value={formData.course}
                    onChange={handleChange("course")}
                    placeholder="e.g., B.A, B.Sc, M.A"
                  />
                  {fieldError("course") && (
                    <p className={styles.error}>{fieldError("course")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Course Type *</label>
                  <select
                    name="courseType"
                    value={formData.courseType}
                    onChange={handleChange("courseType")}
                  >
                    <option value="">Select course type</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                  </select>
                  {fieldError("courseType") && (
                    <p className={styles.error}>{fieldError("courseType")}</p>
                  )}
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Year *</label>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange("year")}
                  />
                  {fieldError("year") && (
                    <p className={styles.error}>{fieldError("year")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Semester *</label>
                  <input
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange("semester")}
                  />
                  {fieldError("semester") && (
                    <p className={styles.error}>{fieldError("semester")}</p>
                  )}
                </div>

                <div className={styles.group}>
                  <label>Academic Year *</label>
                  <input
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleChange("academicYear")}
                    placeholder="2024-2025"
                  />
                  {fieldError("academicYear") && (
                    <p className={styles.error}>{fieldError("academicYear")}</p>
                  )}
                </div>
              </div>

              <div className={styles.groupFull} style={{ marginTop: 12 }}>
                <label>Admission Date *</label>
                <input
                  name="admissionDate"
                  type="date"
                  value={formData.admissionDate}
                  onChange={handleChange("admissionDate")}
                />
                {fieldError("admissionDate") && (
                  <p className={styles.error}>{fieldError("admissionDate")}</p>
                )}
              </div>

              <div className={styles.btnRow}>
                <button className={styles.prevBtn} onClick={goToPreviousSubTab}>
                  Previous
                </button>
                <button className={styles.nextBtn} onClick={goToNextSubTab}>
                  Next
                </button>
              </div>
            </>
          )}

          {/* EDUCATION */}
          {activeSubTab === "Education" && (
            <>
              <h4 className={styles.sectionTitle}>Previous Education</h4>

              <p className={styles.description}>
                Add at least one previous education record (SSC, HSC,
                Graduation, etc.)
              </p>

              <div className={styles.groupFull}>
                <label>Education History *</label>
                <input
                  name="educationHistory"
                  value={formData.educationHistory}
                  onChange={handleChange("educationHistory")}
                  placeholder="e.g., SSC - 2018, HSC - 2020, B.A - 2024"
                />
                {fieldError("educationHistory") && (
                  <p className={styles.error}>
                    {fieldError("educationHistory")}
                  </p>
                )}
              </div>

              <div className={styles.btnRow}>
                <button className={styles.prevBtn} onClick={goToPreviousSubTab}>
                  Previous
                </button>
                <button
                  className={styles.submitBtn}
                  onClick={handleSubmitRegistration}
                >
                  Submit Registration
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Other tabs */}
      {activeTab !== "Registration" && (
        <>
          {activeTab === "FeeManagement" && <FeeManagement />}
          {activeTab === "Timetable" && <Timetable />}
          {activeTab === "Attendance" && <Attendance />}
          {activeTab === "Examination" && <Examination />}
        </>
      )}
    </DashboardLayout>
  );
};

export default Students;
