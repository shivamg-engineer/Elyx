import DashboardLayout from "../../layout/DashboardLayout";
import { useState } from "react";
import styles from "./InstituteProfile.module.css";

export const InstituteProfile = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              Maharashtra Institute of Technology
            </h1>
            <p className={styles.code}>Institute Code: MIT-2024-001</p>
          </div>

          <span className={styles.statusBadge}>Approved</span>
        </div>

        {/* STATS CARDS */}
        <div className={styles.startRow}>
          <div className={styles.statCard}>
            <span className={styles.icon}>👥</span>
            <div>
              <h3 className={styles.statNum}>2500</h3>
              <p className={styles.statLabel}>Total Students</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.icon}>👨‍🏫</span>
            <div>
              <h3 className={styles.statNum}>180</h3>
              <p className={styles.statLabel}>Faculty Members</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.icon}>📄</span>
            <div>
              <h3 className={styles.statNum}>12</h3>
              <p className={styles.statLabel}>Programs</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <span className={styles.icon}>📅</span>
            <div>
              <h3 className={styles.statNum}>2010</h3>
              <p className={styles.statLabel}>Established</p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className={styles.tabs}>
          {["basic", "contact", "admin", "infra", "programs"].map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "basic" && "Basic Info"}
              {tab === "contact" && "Contact"}
              {tab === "admin" && "Administration"}
              {tab === "infra" && "Infrastructure"}
              {tab === "programs" && "Programs"}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className={styles.tabContent}>
          {/* BASIC INFO */}
          {activeTab === "basic" && (
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Basic Information</h2>
              <p className={styles.cardSubtitle}>
                Institute registration and approval details
              </p>

              <div className={styles.infoGrid}>
                <div>
                  <label>Institute Name</label>
                  <h4>Maharashtra Institute of Technology</h4>
                </div>

                <div>
                  <label>Institute Code</label>
                  <h4>MIT-2024-001</h4>
                </div>

                <div>
                  <label>Type</label>
                  <h4>Engineering College</h4>
                </div>

                <div>
                  <label>Status</label>
                  <span className={styles.chip}>Approved</span>
                </div>

                <div>
                  <label>Established Year</label>
                  <h4>2010</h4>
                </div>

                <div>
                  <label>Affiliated To</label>
                  <h4>University of Mumbai</h4>
                </div>

                <div>
                  <label>AICTE Approval Number</label>
                  <h4>AICTE/2010/MIT/001</h4>
                </div>

                <div>
                  <label>Registration Date</label>
                  <h4>2024-01-15</h4>
                </div>

                <div>
                  <label>Accreditation</label>
                  <h4>NAAC A+ Grade</h4>
                </div>

                <div>
                  <label>NIRF Ranking</label>
                  <h4>NIRF Rank: 150</h4>
                </div>
              </div>
            </section>
          )}
          {/* CONTACT INFO */}
          {activeTab === "contact" && (
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Contact Information</h2>
              <p className={styles.cardSubtitle}>
                Address and communication details
              </p>

              <div className={styles.infoGridFull}>
                <div>
                  <label>Address</label>
                  <h4>
                    123 Education Road, Andheri East
                    <br />
                    Mumbai, Maharashtra - 400069
                  </h4>
                </div>

                <div>
                  <label>Phone</label>
                  <h4>+91 22 1234 5678</h4>
                </div>

                <div>
                  <label>Email</label>
                  <h4>info@mit.edu.in</h4>
                </div>

                <div>
                  <label>Fax</label>
                  <h4>+91 22 1234 5679</h4>
                </div>

                <div>
                  <label>Website</label>
                  <h4>www.mit.edu.in</h4>
                </div>
              </div>
            </section>
          )}

          {/* ADMINISTRATION */}
          {activeTab === "admin" && (
            <div className={styles.adminGrid}>
              {[
                {
                  title: "Principal",
                  name: "Dr. Rajesh Kumar",
                  qual: "Ph.D. in Computer Science",
                  exp: "25 years",
                  email: "principal@mit.edu.in",
                  phone: "+91 98765 43210",
                },
                {
                  title: "Registrar",
                  name: "Prof. Sunita Sharma",
                  qual: "M.Tech",
                  exp: "15 years",
                  email: "registrar@mit.edu.in",
                  phone: "+91 98765 43211",
                },
                {
                  title: "Chairman",
                  name: "Mr. Anil Mehta",
                  qual: "Chairman, Governing Body",
                  exp: "",
                  email: "chairman@mit.edu.in",
                  phone: "+91 98765 43212",
                },
              ].map((p) => (
                <div key={p.title} className={styles.card}>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  <label>Name</label>
                  <h4>{p.name}</h4>

                  <label>Qualification</label>
                  <h4>{p.qual}</h4>

                  <label>Experience</label>
                  <h4>{p.exp}</h4>

                  <label>Email</label>
                  <h4>{p.email}</h4>

                  <label>Phone</label>
                  <h4>{p.phone}</h4>
                </div>
              ))}
            </div>
          )}

          {/* INFRASTRUCTURE */}
          {activeTab === "infra" && (
            <section className={styles.card}>
              <h2 className={styles.cardTitle}> Infrastructure Details</h2>

              <div className={styles.infoGrid}>
                <div>
                  <label>Total Area</label>
                  <h4>50 acres</h4>
                </div>
                <div>
                  <label>Built-up Area</label>
                  <h4>2,50,000 sq ft</h4>
                </div>
                <div>
                  <label>Classrooms</label>
                  <h4>45</h4>
                </div>
                <div>
                  <label>Laboratories</label>
                  <h4>25</h4>
                </div>
              </div>

              <h3 className={styles.subHeading}>Library</h3>
              <div className={styles.rowBoxes}>
                <div className={styles.box}>
                  Books
                  <br />
                  <strong>50,000+</strong>
                </div>
                <div className={styles.box}>
                  Journals
                  <br />
                  <strong>200+</strong>
                </div>
                <div className={styles.box}>
                  Digital Resources
                  <br />
                  <strong>Yes</strong>
                </div>
                <div className={styles.box}>
                  Reading Capacity
                  <br />
                  <strong>500</strong>
                </div>
              </div>

              <h3 className={styles.subHeading}>Hostel Facilities</h3>
              <div className={styles.rowBoxes}>
                <div className={styles.box}>
                  Boys Hostel
                  <br />
                  <strong>Capacity: 500</strong>
                </div>
                <div className={styles.box}>
                  Girls Hostel
                  <br />
                  <strong>Capacity: 300</strong>
                </div>
              </div>

              <h3 className={styles.subHeading}>Sports Facilities</h3>
              <p>Cricket Ground, Basketball Court, Indoor Games</p>

              <h3 className={styles.subHeading}>Auditorium</h3>
              <p>Capacity: 1000</p>
            </section>
          )}

          {/* PROGRAMS */}
          {activeTab === "programs" && (
            <section className={styles.card}>
              <h1 className={styles.cardTitle}>Academic Programs</h1>
              <p>List of approved programs and their intake capacity</p>
              {[
                {
                  name: "B.Tech Computer Science",
                  duration: "4 years",
                  intake: 120,
                },
                { name: "B.Tech Electronics", duration: "4 years", intake: 60 },
                { name: "B.Tech Mechanical", duration: "4 years", intake: 60 },
                { name: "MBA", duration: "2 years", intake: 120 },
              ].map((item, index) => (
                <div key={index} className={styles.program_card}>
                  <div>
                    <div className={styles.program_name}>{item.name}</div>
                    <div className={styles.program_duration}>
                      Duration: {item.duration}
                    </div>
                  </div>

                  <div className={styles.right}>
                    <div className={styles.intake}>
                      Intake
                      <br />
                      {item.intake}
                    </div>
                    <span className={styles.approved_badge}>Approved</span>
                  </div>
                </div>
              ))}

              {/* Verified Documents */}
              <h1 className={styles.cardTitle}>Verified Documents</h1>
              <p>All submitted documents and their verification status</p>
              {[
                { title: "AICTE Approval Letter", date: "2024-01-10" },
                {
                  title: "University Affiliation Certificate",
                  date: "2024-01-12",
                },
                { title: "Land Documents", date: "2024-01-08" },
                { title: "Building Plan Approval", date: "2024-01-09" },
                { title: "Fire Safety Certificate", date: "2024-01-11" },
                { title: "NOC from Local Authority", date: "2024-01-07" },
              ].map((doc, index) => (
                <div key={index} className={styles.doc_card}>
                  <div className={styles.left}>
                    <div className={styles.icon}>
                      📄
                    </div>
                    <div >
                      <div className={styles.doc_title}>{doc.title}</div>
                      <div className={styles.doc_date}>
                        Verified on: {doc.date}
                      </div>
                    </div>
                  </div>
                  <span className={styles.verified_badge}>Verified</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </DashboardLayout>
  );

  //    {activeTab === "programs" && ()}
};
