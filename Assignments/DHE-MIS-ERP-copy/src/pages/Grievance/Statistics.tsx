import styles from "./Statistics.module.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Tooltip,
  Bar,
  YAxis,
  CartesianGrid,
  XAxis,
} from "recharts";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";

const statusData = [
  { name: "Pending", value: 37, color: "#ff914d" },
  { name: "Under Investigation", value: 32, color: "#f4b400" },
  { name: "Resolved", value: 32, color: "#0fbf8c" },
];

const categoryData = [
  { name: "Major", value: 35, color: "#007bff" },
  { name: "Medium", value: 35, color: "#0fbf8c" },
  { name: "Minor", value: 30, color: "#f4b400" },
];

const data = [
  { name: "Advance", count: 2 },
  { name: "Benefits", count: 3 },
  { name: "Leave", count: 3 },
  { name: "Salary", count: 3 },
  { name: "Promotion", count: 3 },
  { name: "Transfer", count: 2 },
  { name: "Working Conditions", count: 1 },
  { name: "Harassment", count: 1 },
  { name: "Other", count: 2 },
];

// office data
const officesData = [
  { office: "Accounts Department", count: 7 },
  { office: "HR Department", count: 5 },
  { office: "Administration", count: 5 },
  { office: "Establishment Section", count: 5 },
  { office: "Welfare Department", count: 4 },
  { office: "Maintenance Department", count: 3 },
  { office: "Complaints Committee", count: 3 },
  { office: "Training & Development", count: 3 },
  { office: "General Administration", count: 3 },
];

// for detailed breakdown
const natureData = [
  { label: "Advance", value: 2 },
  { label: "Benefits", value: 3 },
  { label: "Leave", value: 3 },
  { label: "Salary", value: 3 },
  { label: "Promotion", value: 3 },
  { label: "Transfer", value: 2 },
  { label: "Working Conditions", value: 1 },
  { label: "Harassment", value: 1 },
  { label: "Other", value: 2 },
];

export default function Statistics() {
  return (
    <div className={styles.statsPage}>
      {/* ---------------- TOP NAV ---------------- */}
      <div className={styles.topNav}>
        <button className={styles.backBtn}>← Back to List</button>

        <button className={styles.exportBtn}>📥 Export Report</button>
      </div>

      {/* ---------------- FILTER SECTION ---------------- */}
      <div className={styles.filterCard}>
        <h2 className={styles.sectionTitle}>Filter Statistics</h2>

        <div className={styles.filterGrid}>
          <div className={styles.filterBox}>
            <label>From Date</label>
            <input type="date" placeholder="mm/dd/yyyy" />
          </div>

          <div className={styles.filterBox}>
            <label>To Date</label>
            <input type="date" placeholder="mm/dd/yyyy" />
          </div>
        </div>

        <div className={styles.filterActions}>
          <button className={styles.applyBtn}>Apply Filters</button>
          <button className={styles.resetBtn}>Reset</button>
        </div>
      </div>

      {/* ---------------- SUMMARY CARDS ---------------- */}
      <div className={styles.summaryRow}>
        <div className={styles.card}>
          <p className={styles.cardLabel}>Total Grievances</p>
          <h2 className={styles.cardValue}>20</h2>
          <p className={styles.cardHint}>All time</p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Pending</p>
          <h2 className={`${styles.cardValue} ${styles.warn}`}>7</h2>
          <p className={styles.cardHint}>35.0% of total</p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Under Investigation</p>
          <h2 className={`${styles.cardValue} ${styles.yellow}`}>6</h2>
          <p className={styles.cardHint}>30.0% of total</p>
        </div>

        <div className={styles.card}>
          <p className={styles.cardLabel}>Resolved</p>
          <h2 className={`${styles.cardValue} ${styles.green}`}>6</h2>
          <p className={styles.cardHint}>30.0% of total</p>
        </div>
      </div>

      {/* ---------------- AVERAGE RESOLUTION ---------------- */}
      <div className={styles.avgCard}>
        <h3 className={styles.avgTitle}>⏱ Average Resolution Time</h3>
        <h1 className={styles.avgValue}>13 days</h1>
        <p className={styles.avgHint}>
          Average time taken to resolve grievances
        </p>
      </div>

      {/* pie chart */}
      <div className={styles.rowWrapper}>
        {/* LEFT CARD */}
        <div className={styles.card}>
          <h3 className={styles.title}>Status Distribution</h3>
          <p className={styles.subtitle}>Current status of all grievances</p>

          <div className={styles.chartWrapper}>
            <div className={styles.leftLabel}>Under Investigation: 32%</div>

            <PieChart width={260} height={260}>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                labelLine={false}
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            <div className={styles.rightLabels}>
              <div className={styles.label}>Pending: 37%</div>
              <div className={styles.label}>Resolved: 32%</div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className={styles.card}>
          <h3 className={styles.title}>Category Distribution</h3>
          <p className={styles.subtitle}>Grievances by severity category</p>

          <div className={styles.chartWrapperRight}>
            <div className={styles.leftLabelsRight}>
              <div className={styles.labelBlue}>Major: 35%</div>
            </div>

            <PieChart width={260} height={260}>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                labelLine={false}
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            <div className={styles.rightLabelsRight}>
              <div className={styles.labelGreen}>Medium: 35%</div>
              <div className={styles.labelYellow}>Minor: 30%</div>
            </div>
          </div>
        </div>

        {/*------------ bar1 ---------------------------------- */}
        <div className={`${styles.bar_chartCard} ${styles.fullWidthRow}`}>
          <h2 className={styles.bar_title}>Grievances by Nature</h2>
          <p className={styles.bar_subtitle}>
            Distribution of grievances by type
          </p>

          <div className={styles.bar_chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 50 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.4}
                />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[0, 3]}
                  ticks={[0, 0.75, 1.5, 2.25, 3]}
                />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#9b8dfa"
                  barSize={45}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.bar_legend}>
            <span className={styles.bar_legendColor}></span> Count
          </div>
        </div>

        {/* bar 2 */}
        <div className={`${styles.horizontalCard} ${styles.fullWidthRow}`}>
          <h2 className={styles.hTitle}>Top Offices by Grievance Count</h2>
          <p className={styles.hSubtitle}>Offices with most grievances</p>

          <div className={styles.hChartWrapper}>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart
                layout="vertical"
                data={officesData}
                margin={{ top: 20, right: 40, left: 50, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  opacity={0.4}
                />

                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="office"
                  type="category"
                  tick={{ fontSize: 12 }}
                  width={180}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#7BCFA1"
                  barSize={22}
                  radius={[4, 4, 4, 4]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.hLegend}>
            <span className={styles.hLegendColor}></span> Grievances
          </div>
        </div>

        
      </div>
      {/* -------------- detailed breakdown */}
        <div className={styles.breakdownCard}>
          <h2 className={styles.breakdownTitle}>Detailed Breakdown</h2>

          {/* ---------------- CATEGORY ---------------- */}
          <h3 className={`${styles.subHeading}`}>
            By Category
          </h3>
          <div className={styles.categoryGrid}>
            {categoryData.map((item, i) => (
              <div key={i} className={styles.breakItem}>
                <div className={styles.breakValue}>{item.value}</div>
                <div className={styles.breakLabel}>{item.name}</div>
              </div>
            ))}
          </div>

          {/* ---------------- NATURE ---------------- */}
          <h3 className={styles.subHeading}>By Nature</h3>
          <div className={styles.natureGrid}>
            {natureData.map((item, i) => (
              <div key={i} className={styles.breakItem}>
                <div className={styles.breakValue}>{item.value}</div>
                <div className={styles.breakLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}
