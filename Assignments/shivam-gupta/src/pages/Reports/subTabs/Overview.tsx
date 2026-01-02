import { Area, AreaChart, Bar, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styles from "./Overview.module.css";

  // --- Chart Data ---
  const monthlyRegistrations = [
    { month: "Jan", value: 16 },
    { month: "Feb", value: 18 },
    { month: "Mar", value: 22 },
    { month: "Apr", value: 25 },
    { month: "May", value: 20 },
    { month: "Jun", value: 28 },
    { month: "Jul", value: 30 },
    { month: "Aug", value: 28 },
  ];

  
  const applicationStatus = [
    { name: "Approved", value: 63, color: "#f6a11a" },
    { name: "Pending", value: 19, color: "#4f8dfd" },
    { name: "Under Review", value: 9, color: "#08c07c" },
    { name: "Rejected", value: 3, color: "#e04444" },
    { name: "Correction Required", value: 5, color: "#b44fff" },
  ];
    const regionInstitutes = [
    { name: "Mumbai", value: 290 },
    { name: "Pune", value: 240 },
    { name: "Nagpur", value: 170 },
    { name: "Nashik", value: 150 },
    { name: "Aurangabad", value: 140 },
    { name: "Others", value: 260 },
  ];
  const monthlyActivity = [
    { m: "Jan", applications: 40, approved: 35, rejected: 5 },
    { m: "Feb", applications: 50, approved: 45, rejected: 5 },
    { m: "Mar", applications: 45, approved: 42, rejected: 3 },
    { m: "Apr", applications: 55, approved: 50, rejected: 5 },
    { m: "May", applications: 58, approved: 53, rejected: 5 },
    { m: "Jun", applications: 62, approved: 57, rejected: 5 },
  ];

export const Overview = () => {
  return (
    <div className={styles.gridWrapper}>
      {/* -------- CARD 1: Monthly Registration Trend -------- */}
      <div className={styles.card}>
        <h3>Monthly Registrations Trend</h3>
        <p>Institute registrations over time</p>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlyRegistrations}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#4f8dfd" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* -------- CARD 2: Pie Chart Application Status -------- */}
      <div className={styles.card}>
        <h3>Application Status</h3>
        <p>Current application distribution</p>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={applicationStatus}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {applicationStatus.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* -------- CARD 3: Bar Chart Region-wise Distribution -------- */}
      <div className={styles.card}>
        <h3>Region-wise Institute Distribution</h3>
        <p>Institutes across Maharashtra</p>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={regionInstitutes}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4f8dfd" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* -------- CARD 4: Monthly Activity Overview -------- */}
      <div className={styles.card}>
        <h3>Monthly Activity Overview</h3>
        <p>Applications, approvals, and rejections</p>

        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthlyActivity}>
            <XAxis dataKey="m" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area dataKey="applications" stroke="#4f8dfd" fill="#4f8dfd40" />
            <Area dataKey="approved" stroke="#08c07c" fill="#08c07c40" />
            <Area dataKey="rejected" stroke="#e04444" fill="#e0444440" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
