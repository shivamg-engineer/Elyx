import styles from "./CategoryBreakdown.module.css";

export default function CategoryBreakdown() {
  const categories = [
    { label: "General", count: 925, percentage: "39.4%", color: "#1d4ed8" },
    { label: "OBC", count: 647, percentage: "27.6%", color: "#6366f1" },
    { label: "SC", count: 390, percentage: "16.6%", color: "#10b981" },
    { label: "ST", count: 248, percentage: "10.6%", color: "#f59e0b" },
    { label: "EBC", count: 89, percentage: "3.8%", color: "#dc2626" },
    { label: "VJNT", count: 35, percentage: "1.5%", color: "#06b6d4" },
    { label: "NT", count: 11, percentage: "0.5%", color: "#a855f7" },
  ];

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Category Breakdown</h2>
      <p className={styles.subtitle}>Detailed category-wise statistics</p>

      <div className={styles.list}>
        {categories.map((cat, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.left}>
              <span
                className={styles.dot}
                style={{ backgroundColor: cat.color }}
              ></span>
              <span className={styles.label}>{cat.label}</span>
            </div>

            <div className={styles.right}>
              <span className={styles.count}>{cat.count}</span>
              <span className={styles.percent}>({cat.percentage})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
