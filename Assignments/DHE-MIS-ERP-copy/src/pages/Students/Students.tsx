import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Students.module.css";
import { FeeManagement } from "./FeeManagement";
import Timetable from "./Timetable";
import Attendance from "./Attendance"
import Examination from "./Examination";

export const Students = () => {
  const tabs = [
    "Registration",
    "Fee Management",
    "Timetable",
    "Attendance",
    "Examination",
  ];
  const [activeTab, setActiveTab] = useState("Registration");

  const subTabs = ["Personal", "Contact", "Guardian", "Academic", "Education"];
  const [activeSubTab, setActiveSubTab] = useState("Personal");
  // -------------fee structure
  const data = [
    {
      category: "Tuition",
      description: "Tuition Fee",
      amount: "₹35,000",
      status: "Paid",
      date: "15 Jul 2024",
    },
    {
      category: "Library",
      description: "Library Fee",
      amount: "₹5,000",
      status: "Paid",
      date: "10 Aug 2024",
    },
    {
      category: "Laboratory",
      description: "Laboratory Fee",
      amount: "₹8,000",
      status: "Paid",
      date: "10 Aug 2024",
    },
    {
      category: "Sports",
      description: "Sports and Cultural Fee",
      amount: "₹3,000",
      status: "Paid",
      date: "10 Aug 2024",
    },
    {
      category: "Development",
      description: "Development Fee",
      amount: "₹7,000",
      status: "Pending",
      date: "-",
    },
    {
      category: "Examination",
      description: "Examination Fee",
      amount: "₹4,000",
      status: "Paid",
      date: "10 Aug 2024",
    },
    {
      category: "Admission",
      description: "Admission Processing Fee",
      amount: "₹2,000",
      status: "Pending",
      date: "-",
    },
    {
      category: "Caution Deposit",
      description: "Caution Deposit (Refundable)",
      amount: "₹5,000",
      status: "Pending",
      date: "-",
    },
  ];

  const statusClasses = {
    Paid: styles.paidBadge,
    Pending: styles.pendingBadge,
  };
  return (
    <DashboardLayout>
      <h1>Student Academic Module</h1>
      <p>
        Manage student registration, fees, academic activities, and examinations
      </p>

      <div>
        <button
          className={
            activeTab === "Registration"
              ? `${styles.activeTab} ${styles.tab}`
              : `${styles.tab}`
          }
          onClick={() => {
            setActiveTab("Registration");
          }}
        >
          Registration
        </button>
        <button
          className={
            activeTab === "FeeManagement"
              ? `${styles.activeTab} ${styles.tab}`
              : `${styles.tab}`
          }
          onClick={() => {
            setActiveTab("FeeManagement");
          }}
        >
          Fee Management
        </button>
        <button
          className={
            activeTab === "Timetable"
              ? `${styles.activeTab} ${styles.tab}`
              : `${styles.tab}`
          }
          onClick={() => {
            setActiveTab("Timetable");
          }}
        >
          Timetable
        </button>

        <button
          className={
            activeTab === "Attendance"
              ? `${styles.activeTab} ${styles.tab}`
              : `${styles.tab}`
          }
          onClick={() => {
            setActiveTab("Attendance");
          }}
        >
          Attendance
        </button>
        <button
          className={
            activeTab === "Examination"
              ? `${styles.activeTab} ${styles.tab}`
              : `${styles.tab}`
          }
          onClick={() => {
            setActiveTab("Examination");
          }}
        >
          Examination
        </button>
      </div>

      {activeTab === "Registration" && (
        <div className={styles.card}>
          <h2 className={styles.title}>Student Registration</h2>
          <p className={styles.subtitle}>
            Register a new student by filling in all required information
          </p>

          {/* Tabs */}
          <div className={styles.tabsWrapper}>
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.activeTab : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* PERSONAL TAB CONTENT */}
          {activeSubTab === "Personal" && (
            <>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>First Name *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Middle Name</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Last Name *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Date of Birth *</label>
                  <input type="date" />
                </div>

                <div className={styles.group}>
                  <label>Gender *</label>
                  <select>
                    <option>Select gender</option>
                  </select>
                </div>

                <div className={styles.group}>
                  <label>Blood Group</label>
                  <select>
                    <option>Select blood group</option>
                  </select>
                </div>

                <div className={styles.group}>
                  <label>Nationality *</label>
                  <input type="text" defaultValue="Indian" />
                </div>

                <div className={styles.group}>
                  <label>Religion</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Mother Tongue</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Category *</label>
                  <select>
                    <option>Select category</option>
                  </select>
                </div>

                <div className={styles.group}>
                  <label>Disability</label>
                  <select>
                    <option>Select disability</option>
                  </select>
                </div>

                <div className={styles.group}>
                  <label>Student Type *</label>
                  <select>
                    <option>Select student type</option>
                  </select>
                </div>
              </div>

              {/* Minority Student */}
              <div className={styles.checkboxRow}>
                <input type="checkbox" />
                <label>Minority Student</label>
              </div>
              {/* Next Button */}
              <div className={styles.bottomRight}>
                <button className={styles.nextBtn}>Next</button>
              </div>
            </>
          )}
          {activeSubTab === "Contact" && (
            <>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Email *</label>
                  <input type="email" />
                </div>

                <div className={styles.group}>
                  <label>Mobile *</label>
                  <input type="text" placeholder="+91-9876543210" />
                </div>

                <div className={styles.groupFull}>
                  <label>Alternate Mobile</label>
                  <input type="text" placeholder="+91-9876543210" />
                </div>
              </div>

              {/* Permanent Address */}
              <h4 className={styles.sectionTitle}>Permanent Address</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Address Line 1 *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Address Line 2</label>
                  <input type="text" />
                </div>

                <div></div>

                <div className={styles.group}>
                  <label>City *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>District *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>State *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Pincode *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Country *</label>
                  <input type="text" />
                </div>
              </div>

              {/* Checkbox */}
              <div className={styles.checkboxRow}>
                <input type="checkbox" />
                <label>Current address same as permanent address</label>
              </div>

              {/* Current Address */}
              <h4 className={styles.sectionTitle}>Current Address</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Address Line 1 *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Address Line 2</label>
                  <input type="text" />
                </div>

                <div></div>

                <div className={styles.group}>
                  <label>City *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>District *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>State *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Pincode *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Country *</label>
                  <input type="text" />
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.btnRow}>
                <button className={styles.prevBtn}>Previous</button>
                <button className={styles.nextBtn}>Next</button>
              </div>
            </>
          )}

          {activeSubTab === "Guardian" && (
            <>
              {/* Father's Information */}
              <h4 className={styles.sectionTitle}>Father's Information</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Name *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Occupation *</label>
                  <input type="text" />
                </div>

                <div></div>

                <div className={styles.group}>
                  <label>Mobile *</label>
                  <input type="text" placeholder="+91-9876543210" />
                </div>

                <div className={styles.group}>
                  <label>Email</label>
                  <input type="email" />
                </div>

                <div className={styles.group}>
                  <label>Annual Income *</label>
                  <input type="text" />
                </div>
              </div>

              {/* Mother's Information */}
              <h4 className={styles.sectionTitle}>Mother's Information</h4>

              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Name *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Occupation *</label>
                  <input type="text" />
                </div>

                <div></div>

                <div className={styles.group}>
                  <label>Mobile *</label>
                  <input type="text" placeholder="+91-9876543210" />
                </div>

                <div className={styles.group}>
                  <label>Email</label>
                  <input type="email" />
                </div>

                <div className={styles.group}>
                  <label>Annual Income *</label>
                  <input type="text" />
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.btnRow}>
                <button className={styles.prevBtn}>Previous</button>
                <button className={styles.nextBtn}>Next</button>
              </div>
            </>
          )}
          {activeSubTab === "Academic" && (
            <>
              <div className={styles.grid}>
                <div className={styles.group}>
                  <label>Course *</label>
                  <input type="text" placeholder="e.g., B.A, B.Sc, M.A" />
                </div>

                <div className={styles.group}>
                  <label>Course Type *</label>
                  <select>
                    <option>Select course type</option>
                  </select>
                </div>

                <div></div>

                <div className={styles.group}>
                  <label>Year *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Semester *</label>
                  <input type="text" />
                </div>

                <div className={styles.group}>
                  <label>Academic Year *</label>
                  <input type="text" placeholder="2024-2025" />
                </div>
              </div>

              {/* Admission Date */}
              <div className={styles.groupFull}>
                <label>Admission Date *</label>
                <input type="date" />
              </div>

              {/* Buttons */}
              <div className={styles.btnRow}>
                <button className={styles.prevBtn}>Previous</button>
                <button className={styles.nextBtn}>Next</button>
              </div>
            </>
          )}
          {activeSubTab === "Education" && (
            <>
              <h4 className={styles.sectionTitle}>Previous Education</h4>

              <p className={styles.description}>
                Add at least one previous education record (SSC, HSC,
                Graduation, etc.)
              </p>

              <div className={styles.groupFull}>
                <input
                  type="text"
                  placeholder="Education history management would be implemented here with add/remove functionality"
                />
              </div>

              {/* Buttons */}
              <div className={styles.btnRow}>
                <button className={styles.prevBtn}>Previous</button>
                <button className={styles.submitBtn}>
                  Submit Registration
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Fee Management */}
      {activeTab === "FeeManagement" && <FeeManagement />}

      {/* Timetable */}
      {activeTab === "Timetable" && <Timetable />}
      {/* attendance */}
      {activeTab === "Attendance" && <Attendance/>}
      {/* examination */}
      {activeTab==="Examination" && <Examination/>}
    </DashboardLayout>
  );
};
