import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import styles from "./Students.module.css";

export const Students = () => {
  const enrollmentTrend = [
    { year: "2019", students: 2400000 },
    { year: "2020", students: 2600000 },
    { year: "2021", students: 2800000 },
    { year: "2022", students: 3000000 },
    { year: "2023", students: 3150000 },
  ];
  // 2Course-wise Enrollment
  const courseEnrollment = [
    { course: "BA", students: 850000 },
    { course: "BSc", students: 730000 },
    { course: "BCom", students: 690000 },
    { course: "BTech", students: 410000 },
    { course: "MA", students: 180000 },
    { course: "MSc", students: 150000 },
    { course: "MCom", students: 120000 },
    { course: "MTech", students: 55000 },
    { course: "PhD", students: 25000 },
  ];
  // Chart 1 - Staff by Category
  const categoryData = [
    { name: "General", count: 24000 },
    { name: "OBC", count: 16000 },
    { name: "SC", count: 7000 },
    { name: "ST", count: 4000 },
    { name: "EWS", count: 1500 },
  ];
  // 4Scholarship Distribution
  const scholarshipData = [
    { type: "Central Govt", count: 450000 },
    { type: "State Govt", count: 680000 },
    { type: "Institutional", count: 260000 },
    { type: "Private", count: 130000 },
  ];
  // 3Category-wise Students

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#A855F7"];

  return (
    <div className={styles.grid}>
      {/* CARD 1 */}
      <div className={styles.card}>
        <h3 className={styles.title}>Student Enrollment Trend</h3>
        <p className={styles.subtitle}>Year-over-year growth</p>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={enrollmentTrend}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="students"
              stroke="#A78BFA"
              fill="#A78BFA"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CARD 2 */}
      <div className={styles.card}>
        <h3 className={styles.title}>Course-wise Enrollment</h3>
        <p className={styles.subtitle}>Students by course</p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={courseEnrollment}>
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#EC4899" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CARD 3 */}
      <div className={styles.card}>
        <h3 className={styles.title}>Category-wise Students</h3>
        <p className={styles.subtitle}>Student distribution by category</p>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="count"
              nameKey="name"
              outerRadius={90}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className={styles.legendRow}>
          {categoryData.map((item, i) => (
            <span key={i} className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: COLORS[i] }}
              ></span>
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* CARD 4 */}
      <div className={styles.card}>
        <h3 className={styles.title}>Scholarship Distribution</h3>
        <p className={styles.subtitle}>Students availing scholarships</p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={scholarshipData}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#F97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
