import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import "./AnalyticsSection.css";

const roleData = [
  { role: "Institute Admin", count: 320 },
  { role: "JD Office", count: 40 },
  { role: "Director", count: 10 },
  { role: "Secretary", count: 20 },
  { role: "Investigation Officer", count: 30 },
  { role: "Citizen", count: 1100 },
];

const performanceData = [
  { day: "Mon", uptime: 100 },
  { day: "Tue", uptime: 99.6 },
  { day: "Wed", uptime: 99.8 },
  { day: "Thu", uptime: 99.7 },
  { day: "Fri", uptime: 99.9 },
  { day: "Sat", uptime: 99.8 },
  { day: "Sun", uptime: 99.9 },
];

const AnalyticsSection = () => {
  return (
    <div className="analytics-container">
      <h2 className="section-title">Analytics</h2>

      <div className="analytics-grid">
        {/* Users by Role */}
        <div className="analytics-card">
          <h3>Users by Role</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleData}>
                {/* Soft gridlines */}
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

                <XAxis dataKey="role" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4285F4" radius={[5, 5, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Performance */}
        <div className="analytics-card">
          <h3>System Performance</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                {/* clean gridlines */}
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 110]} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uptime"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
