import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function StatisticsSection() {
  const data = [
    { year: "2020-21", admissions: 400 },
    { year: "2021-22", admissions: 650 },
    { year: "2022-23", admissions: 620 },
    { year: "2023", admissions: 660 },
  ];
  // Course Bar
  const courseData = [
    { course: "B.A.", value: 450 },
    { course: "B.Sc.", value: 580 },
    { course: "B.Com.", value: 710 },
    { course: "M.A.", value: 180 },
    { course: "M.Sc.", value: 230 },
    { course: "M.Com.", value: 190 },
    { course: "Other Applications", value: 70 },
  ];

  // Category Pie
  const categoryData = [
    { name: "General", value: 39, color: "#3B82F6" },
    { name: "OBC", value: 28, color: "#8B5CF6" },
    { name: "SC", value: 17, color: "#10B981" },
    { name: "ST", value: 11, color: "#F59E0B" },
    { name: "EBC", value: 4, color: "#EF4444" },
    { name: "VJNT", value: 1, color: "#A855F7" },
    { name: "NT", value: 0.5, color: "#6366F1" },
  ];

  // Gender Pie
  const genderData = [
    { name: "Male", value: 53, color: "#3B82F6" },
    { name: "Female", value: 46, color: "#EF4444" },
    { name: "Other", value: 1, color: "#F59E0B" },
  ];

  // Category breakdown list
  const breakdown = [
    { name: "General", value: 925, percent: "39.4%", color: "#3B82F6" },
    { name: "OBC", value: 647, percent: "27.6%", color: "#8B5CF6" },
    { name: "SC", value: 390, percent: "16.6%", color: "#10B981" },
    { name: "ST", value: 248, percent: "10.6%", color: "#F59E0B" },
    { name: "EBC", value: 89, percent: "3.8%", color: "#EF4444" },
    { name: "VJNT", value: 35, percent: "1.5%", color: "#A855F7" },
    { name: "NT", value: 11, percent: "0.5%", color: "#6366F1" },
  ];

  return (
    <>
      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.06)",
          width: "100%",
          height: "360px",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 600 }}>
          Year-wise Admission Trend
        </h2>
        <p style={{ margin: "4px 0 18px", color: "#666" }}>
          Admission trends across academic years
        </p>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="admissions"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Admissions"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          width: "100%",
        }}
      >
        {/* 1️⃣ Course-wise Distribution */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            border: "1px solid #e5e5e5",
            height: "360px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Course-wise Distribution</h2>
          <p style={{ marginTop: 0, color: "#666" }}>Admissions by course</p>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2️⃣ Category-wise Distribution (Pie Chart) */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            border: "1px solid #e5e5e5",
            height: "360px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Category-wise Distribution</h2>
          <p style={{ marginTop: 0, color: "#666" }}>Admissions by category</p>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip />
              <Pie
                data={categoryData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {categoryData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3️⃣ Gender-wise Distribution */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            border: "1px solid #e5e5e5",
            height: "360px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Gender-wise Distribution</h2>
          <p style={{ marginTop: 0, color: "#666" }}>Admissions by gender</p>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Tooltip />
              <Pie
                data={genderData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {genderData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 4️⃣ Category Breakdown (List + Values) */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "25px",
            border: "1px solid #e5e5e5",
            height: "360px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ marginTop: 0 }}>Category Breakdown</h2>
            <p style={{ marginTop: 0, color: "#666" }}>
              Detailed category-wise statistics
            </p>

            <ul
              style={{ listStyle: "none", paddingLeft: 0, lineHeight: "28px" }}
            >
              {breakdown.map((b, i) => (
                <li key={i} style={{ color: b.color }}>
                  ● {b.name}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ textAlign: "right", lineHeight: "28px" }}>
            {breakdown.map((b, i) => (
              <div key={i}>
                <strong>{b.value}</strong>{" "}
                <span style={{ color: "#666", fontSize: "13px" }}>
                  ({b.percent})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
