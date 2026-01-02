import styles from "./Facility.module.css";
import { useState } from "react";

export const Facility = () => {
  const [playground, setPlayground] = useState([
    {
      id: 1,
      name: "Main Sports Ground",
      area: 15000,
      capacity: 500,
      remarks: "Multi-purpose ground for outdoor activities",
      available: true,
    },
    {
      id: 2,
      name: "Secondary Practice Ground",
      area: 8000,
      capacity: 200,
      remarks: "Used for practice sessions and training",
      available: true,
    },
  ]);

  const [cricket, setCricket] = useState([
    {
      id: 1,
      name: "Cricket Ground with Turf Pitch",
      area: 20000,
      capacity: 300,
      remarks: "Full-size cricket ground with practice nets",
      available: true,
    },
  ]);

  const [basketBall, setBasketball] = useState([
    {
      id: 1,
      name: "Outdoor Basketball Court 1",
      area: 4700,
      capacity: 50,
      remarks: "Concrete court with floodlights",
      available: true,
    },
    {
      id: 2,
      name: "Indoor Basketball Court",
      area: 5000,
      capacity: 100,
      remarks: "Under renovation - expected completion by next month",
      available: false,
    },
  ]);

  const togglePlayground = (id:number) => {
    setPlayground((prev) =>
      prev.map((f) => (f.id === id ? { ...f, available: !f.available } : f))
    );
  };

  const toggleCricket = (id:number) => {
    setCricket((prev) =>
      prev.map((f) => (f.id === id ? { ...f, available: !f.available } : f))
    );
  };

  const toggleBasketball = (id:number) => {
    setBasketball((prev) =>
      prev.map((f) => (f.id === id ? { ...f, available: !f.available } : f))
    );
  };

  const playgroundAvailable = playground.filter((f) => f.available).length;
  const playgroundTotal = playground.length;

  const cricketCount=cricket.filter((f) => f.available).length;
  const cricketTotal= cricket.length;

  const basketballCount = basketBall.filter((f) => f.available).length;
  const basketballTotal = basketBall.length;

  return (
    <div className={styles.container}>
      {/* RESEARCH MANAGEMENT */}
      <div className={styles.titleRow}>
        <div>
          <h3>Facilities Management</h3>
          <p>Manage physical education and sports facilities</p>
        </div>
        <div className={styles.actions}>
          <button>Export</button>
          <button className={styles.addBtn}>Add Guide</button>
        </div>
      </div>

      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <h4>Total Facilities</h4>
          <div className={styles.value}>18</div>
          <span className={styles.label}>Sports and recreation facilities</span>
        </div>

        <div className={styles.summaryCard}>
          <h4>Available</h4>
          <div className={styles.value}>17</div>
          <span className={styles.label}>Currently operational</span>
        </div>

        <div className={styles.summaryCard}>
          <h4>Unavailable</h4>
          <div className={styles.value}>1</div>
          <span className={styles.label}>Under maintenance or closed</span>
        </div>

        <div className={styles.summaryCard}>
          <h4>Availability Rate</h4>
          <div className={styles.value}>94.4%</div>
          <span className={styles.label}>Operational facilities</span>
        </div>
      </div>

      {/* playground */}
      <div className={styles.category}>
        <div className={styles.categoryHeader}>
          <h3>Playground</h3>
          <span className={styles.availableCount}>
            {playgroundAvailable}/{playgroundTotal} Available
          </span>
        </div>

        {playground.map((facility) => {
          const isAvailable = facility.available;
          return (
            <div
              key={facility.id}
              className={styles.combine}
              style={{
                background: isAvailable ? "#f0fff4" : "#fff8e1",
                borderLeft: `4px solid ${isAvailable ? "#22c55e" : "#f59e0b"}`,
              }}
            >
              <div className={styles.left}>
                <div className={styles.cardTitleRow}>
                  <h4>{facility.name}</h4>

                  <span
                    className={styles.badge}
                    style={{
                      background: isAvailable ? "#d1f1dd" : "#fde68a",
                      color: isAvailable ? "#166534" : "#92400e",
                    }}
                  >
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className={styles.cartContent}>
                  <div className={styles.row}>
                    <strong>Capacity:</strong> {facility.capacity} persons
                    <strong>Remarks:</strong> {facility.remarks}
                  </div>
                  <div className={styles.row}>
                    <strong>Area:</strong> {facility.area} sq ft
                  </div>
                  <div className={styles.row}>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: isAvailable ? "#16a34a" : "red" }}>
                      {isAvailable ? "Operational" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.right}>
                <button
                  onClick={() => togglePlayground(facility.id)}
                  style={{
                    background: isAvailable ? "#ffffff" : "#facc15",
                    border: isAvailable
                      ? "1px solid #d1d5db"
                      : "1px solid #f59e0b",
                    color: isAvailable ? "#111" : "#92400e",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  {isAvailable ? "Mark Unavailable" : "Mark Available"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cricket Ground */}

      <div className={styles.category}>
        <div className={styles.categoryHeader}>
          <h3>Cricket Ground</h3>
          <span className={styles.availableCount}>
            {cricketCount}/{cricketTotal} Available
          </span>
        </div>

        {cricket.map((facility) => {
    const isAvailable = facility.available;

    return (
      <div
        key={facility.id}
        className={styles.combine}
        style={{
          background: isAvailable ? "#f0fff4" : "#fff8e1",
          borderLeft: `4px solid ${
            isAvailable ? "#22c55e" : "#f59e0b"
          }`,
        }}
      >
        <div className={styles.left}>
          <div className={styles.facilityCard}>
            <div className={styles.cardTitleRow}>
              <h4>{facility.name}</h4>

              <span
                className={styles.badge}
                style={{
                  background: isAvailable ? "#d1f1dd" : "#fde68a",
                  color: isAvailable ? "#166534" : "#92400e",
                }}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>

            <div className={styles.cartContent}>
              <div className={styles.row}>
                <strong>Capacity:</strong> {facility.capacity} persons
                <strong>Remarks:</strong> {facility.remarks}
              </div>

              <div className={styles.row}>
                <strong>Area:</strong> {facility.area} sq ft
              </div>

              <div className={styles.row}>
                <strong>Status:</strong>{" "}
                <span style={{ color: isAvailable ? "#16a34a" : "red" }}>
                  {isAvailable ? "Operational" : "Closed"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <button
            onClick={() => toggleCricket(facility.id)}
            style={{
              background: isAvailable ? "#ffffff" : "#facc15",
              border: isAvailable
                ? "1px solid #d1d5db"
                : "1px solid #f59e0b",
              color: isAvailable ? "#111" : "#92400e",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {isAvailable ? "Mark Unavailable" : "Mark Available"}
          </button>
        </div>
      </div>
    );
  })}
      </div>

      {/* Basketball Court */}
      <div className={styles.category}>
        <div className={styles.categoryHeader}>
          <h3>Basketball Court</h3>
          <span className={styles.availableCount}>
            {basketballCount}/{basketballCount} Available
          </span>
        </div>

        {basketBall.map((facility) => {
          const isAvailable = facility.available;

          return (
            <>
              <div
                className={styles.combine}
                style={{
                  background: isAvailable ? "#f0fff4" : "#fff8e1",
                  borderLeft: `4px solid ${
                    isAvailable ? "#22c55e" : "#f59e0b"
                  }`,
                }}
              >
                <div className={styles.left}>
                  <div key={facility.id} className={styles.facilityCard}>
                    <div>
                      <div className={styles.cardTitleRow}>
                        <h4>Indoor Basketball Court</h4>
                        <span
                          className={styles.badge}
                          style={{
                            background: isAvailable ? "#d1f1dd" : "#fde68a",
                            color: isAvailable ? "#166534" : "#92400e",
                          }}
                        >
                          {" "}
                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </div>

                      <div className={styles.cartContent}>
                        <div className={styles.row}>
                          <strong>Capacity:</strong> {facility.capacity} persons
                          <strong>Remarks:</strong> {facility.remarks}
                        </div>
                        <div className={styles.row}>
                          <strong>Area:</strong> {facility.area} sq ft
                        </div>
                        <div className={styles.row}>
                          <strong>Status:</strong>{" "}
                          <span
                            style={{ color: isAvailable ? "#16a34a" : "red" }}
                          >
                            {isAvailable ? "Operational" : "Closed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <button
                    onClick={() => toggleBasketball(facility.id)}
                    style={{
                      background: isAvailable ? "#ffffff" : "#facc15",
                      border: isAvailable
                        ? "1px solid #d1d5db"
                        : "1px solid #f59e0b",
                      color: isAvailable ? "#111" : "#92400e",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {isAvailable ? "Mark Unavailable" : "Mark Available"}
                  </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
