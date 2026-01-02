import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import styles from "./Staffing.module.css";

export const Staffing = () => {

    
  // ///////////////////////////
  // Chart 1 - Staff by Category
  const categoryData = [
    { name: "General", count: 24000 },
    { name: "OBC", count: 16000 },
    { name: "SC", count: 7000 },
    { name: "ST", count: 4000 },
    { name: "EWS", count: 1500 },
  ];

  // Chart 2 - Approved vs Filled Positions
  const positionsData = [
    { dept: "Computer Science", approved: 3500, filled: 3100 },
    { dept: "Mathematics", approved: 2800, filled: 2600 },
    { dept: "Physics", approved: 2500, filled: 2300 },
    { dept: "Chemistry", approved: 2300, filled: 2100 },
    { dept: "English", approved: 2000, filled: 1800 },
    { dept: "Commerce", approved: 3300, filled: 3000 },
  ];

  // Chart 3 - Salary Distribution
  const salaryData = [
    { range: "< 30k", count: 8000 },
    { range: "30k-50k", count: 15000 },
    { range: "50k-70k", count: 19000 },
    { range: "70k-100k", count: 8000 },
    { range: "> 100k", count: 3000 },
  ];

  // Chart 4 - NOC Applications Trend
  const nocTrend = [
    { month: "Jan", applications: 24, approved: 20 },
    { month: "Feb", applications: 28, approved: 24 },
    { month: "Mar", applications: 22, approved: 18 },
    { month: "Apr", applications: 30, approved: 25 },
    { month: "May", applications: 27, approved: 22 },
    { month: "Jun", applications: 32, approved: 28 },
  ];

  return (
    <div className={styles.grid}>
      {/* CARD 1 */}
      <div className={styles.card}>
        <h3 className={styles.title}>Staff by Category</h3>
        <p className={styles.subtitle}>Category-wise distribution</p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={categoryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className={styles.legend}>
          <span className={styles.greenDot}></span> count
        </div>
      </div>

      {/* CARD 2 */}
      <div className={styles.card}>
        <h3 className={styles.title}>Approved vs Filled Positions</h3>
        <p className={styles.subtitle}>Department-wise comparison</p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={positionsData}>
            <XAxis dataKey="dept" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="approved" fill="#3B82F6" radius={[5, 5, 0, 0]} />
            <Bar dataKey="filled" fill="#10B981" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CARD 3 */}
      <div className={styles.card}>
        <h3 className={styles.title}>Salary Distribution</h3>
        <p className={styles.subtitle}>Salary ranges across staff</p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={salaryData}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10B981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CARD 4 */}
      <div className={styles.card}>
        <h3 className={styles.title}>NOC Applications Trend</h3>
        <p className={styles.subtitle}>Monthly NOC requests</p>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={nocTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#F59E0B"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="approved"
              stroke="#10B981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
