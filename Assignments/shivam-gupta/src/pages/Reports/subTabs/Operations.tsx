import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, XAxis, YAxis, Line, BarChart, Legend, Bar } from "recharts";
import styles from "./Operations.module.css";

export const Operations=()=>{
      // //////////////////////for Operations
  // 1 Grievance Status
  const grievanceData = [
    { name: "Pending", value: 23, color: "#3B82F6" },
    { name: "Under Investigation", value: 15, color: "#10B981" },
    { name: "Resolved", value: 145, color: "#F59E0B" },
    { name: "Closed", value: 87, color: "#EF4444" },
  ];
    // 2 RTI Applications Trend
  const rtiTrend = [
    { month: "Jan", applications: 80 },
    { month: "Feb", applications: 90 },
    { month: "Mar", applications: 100 },
    { month: "Apr", applications: 93 },
    { month: "May", applications: 105 },
    { month: "Jun", applications: 113 },
  ];
    // 3 Asset Utilization
  const assetData = [
    { category: "Computers", total: 20000, allocated: 15000 },
    { category: "Furniture", total: 40000, allocated: 38000 },
    { category: "Lab Equipment", total: 12000, allocated: 9000 },
    { category: "Vehicles", total: 15000, allocated: 9000 },
    { category: "Books", total: 2500000, allocated: 2100000 },
  ];
  // 4Legal Cases Status
  const legalCases = [
    { name: "Active", value: 34, color: "#3B82F6" },
    { name: "Pending Hearing", value: 18, color: "#10B981" },
    { name: "Under Review", value: 12, color: "#F59E0B" },
    { name: "Closed", value: 156, color: "#EF4444" },
  ];

    return (
        <div className={styles.grid}>
                        {/* CARD 1 - Grievance Status */}
                        <div className={styles.card}>
                          <h3 className={styles.title}>Grievance Status</h3>
                          <p className={styles.subtitle}>
                            Current grievance distribution
                          </p>
        
                          <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                              <Pie
                                data={grievanceData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label={({ name, value }) => `${name}: ${value}`}
                              >
                                {grievanceData.map((item, idx) => (
                                  <Cell key={idx} fill={item.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
        
                          <div className={styles.legendRow}>
                            {grievanceData.map((item, i) => (
                              <span key={i} className={styles.legendItem}>
                                <span
                                  className={styles.legendDot}
                                  style={{ background: item.color }}
                                ></span>
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
        
                        {/* CARD 2 - RTI Applications */}
                        <div className={styles.card}>
                          <h3 className={styles.title}>RTI Applications</h3>
                          <p className={styles.subtitle}>Monthly RTI requests</p>
        
                          <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={rtiTrend}>
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="applications"
                                stroke="#14B8A6"
                                strokeWidth={3}
                                dot
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
        
                        {/* CARD 3 - Asset Utilization */}
                        <div className={styles.card}>
                          <h3 className={styles.title}>Asset Utilization</h3>
                          <p className={styles.subtitle}>Assets by category</p>
        
                          <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={assetData}>
                              <XAxis dataKey="category" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar
                                dataKey="total"
                                fill="#3B82F6"
                                radius={[6, 6, 0, 0]}
                              />
                              <Bar
                                dataKey="allocated"
                                fill="#10B981"
                                radius={[6, 6, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
        
                        {/* CARD 4 - Legal Cases */}
                        <div className={styles.card}>
                          <h3 className={styles.title}>Legal Cases Status</h3>
                          <p className={styles.subtitle}>Active and closed cases</p>
        
                          <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                              <Pie
                                data={legalCases}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={90}
                                label={({ name, value }) => `${name}: ${value}`}
                              >
                                {legalCases.map((item, idx) => (
                                  <Cell key={idx} fill={item.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
        
                          <div className={styles.legendRow}>
                            {legalCases.map((item, i) => (
                              <span key={i} className={styles.legendItem}>
                                <span
                                  className={styles.legendDot}
                                  style={{ background: item.color }}
                                ></span>
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
    );
}