import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import styles from "./Institute.module.css"

export const Institute = () => {
     const pieData = [
    { name: "College", value: 980, color: "#4285F4" },
    { name: "University", value: 145, color: "#34A853" },
    { name: "Deemed University", value: 67, color: "#FBBC05" },
    { name: "Autonomous", value: 55, color: "#EA4335" },
  ];

  const barData = [
    { name: "Mumbai Univ.", value: 320 },
    { name: "Pune Univ.", value: 260 },
    { name: "Nagpur Univ.", value: 190 },
    { name: "Shivaji Univ.", value: 165 },
    { name: "Others", value: 390 },
  ];

  return (
    <div className={styles.mainContainer}>
      {/* LEFT PIE CHART */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Institute Types</h3>
        <p className={styles.cardSub}>Distribution by type</p>

        <div className={styles.pieSection}>
          <div className={styles.pieLeft}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={55}
                  paddingAngle={2}
                >
                  {pieData.map((item, idx) => (
                    <Cell key={idx} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.pieRight}>
            <p style={{ color: "#4285F4" }}>College: 980</p>
            <p style={{ color: "#34A853" }}>University: 145</p>
            <p style={{ color: "#FBBC05" }}>Deemed University: 67</p>
            <p style={{ color: "#EA4335" }}>Autonomous: 55</p>
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legendRow}>
          <span
            className={styles.legendDot}
            style={{ background: "#4285F4" }}
          ></span>{" "}
          College
          <span
            className={styles.legendDot}
            style={{ background: "#34A853" }}
          ></span>{" "}
          University
          <span
            className={styles.legendDot}
            style={{ background: "#FBBC05" }}
          ></span>{" "}
          Deemed University
          <span
            className={styles.legendDot}
            style={{ background: "#EA4335" }}
          ></span>{" "}
          Autonomous
        </div>
      </div>

      {/* RIGHT BAR CHART */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>University-wise Distribution</h3>
        <p className={styles.cardSub}>Institutes by university</p>

        <div className={styles.barWrap}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={110} />
              <Tooltip />
              <Bar dataKey="value" fill="#A066FF" radius={[6, 6, 6, 6]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
