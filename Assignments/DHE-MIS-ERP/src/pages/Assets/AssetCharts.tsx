import React from "react";
import styles from "./AssetCharts.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AssetCharts() {
  const typeData = [
    { type: "computer", allocated: 13, available: 3 },
    { type: "laboratory", allocated: 0, available: 12 },
    { type: "furniture", allocated: 4, available: 11 },
    { type: "vehicle", allocated: 0, available: 3 },
    { type: "library", allocated: 0, available: 5 },
    { type: "sports", allocated: 0, available: 5 },
    { type: "other", allocated: 0, available: 5 },
  ];

  const deptData = [
    { dept: "Computer Science", allocated: 13, available: 3 },
    { dept: "Physics", allocated: 0, available: 4 },
    { dept: "Chemistry", allocated: 0, available: 4 },
    { dept: "Biology", allocated: 0, available: 4 },
    { dept: "Administration", allocated: 0, available: 7 },
    { dept: "Academic", allocated: 4, available: 7 },
    { dept: "Transport", allocated: 0, available: 3 },
    { dept: "Library", allocated: 0, available: 5 },
    { dept: "Physical Education", allocated: 0, available: 5 },
    { dept: "Facilities", allocated: 0, available: 4 },
  ];

  return (
    <div className={styles.container}>
      {/* CHART 1 — BY TYPE */}
      <div className={styles.card}>
        <h3 className={styles.title}>
          📊 Asset Distribution by Type
        </h3>
        <p className={styles.subtitle}>
          Allocation status across asset types
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={typeData}>
            <XAxis
              dataKey="type"
              tick={{ fontSize: 12 }}
              angle={-35}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="allocated" fill="#14b57a" name="Allocated" />
            <Bar dataKey="available" fill="#687280" name="Available" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CHART 2 — BY DEPARTMENT */}
      <div className={styles.card}>
        <h3 className={styles.title}>
          📊 Asset Distribution by Department
        </h3>
        <p className={styles.subtitle}>Top 10 departments by asset count</p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deptData}>
            <XAxis
              dataKey="dept"
              tick={{ fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              height={75}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="allocated" fill="#14b57a" name="Allocated" />
            <Bar dataKey="available" fill="#687280" name="Available" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
