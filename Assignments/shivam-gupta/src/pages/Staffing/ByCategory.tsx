import styles from "./Staffing.module.css";

export const ByCategory = () => {
  const categories = [
    { name: "GENERAL", approved: 33, filled: 26, vacant: 7 },
    { name: "OBC", approved: 19, filled: 13, vacant: 6 },
    { name: "SC", approved: 6, filled: 3, vacant: 3 },
    { name: "ST", approved: 2, filled: 0, vacant: 2 },
    { name: "EBC", approved: 0, filled: 0, vacant: 0 },
    { name: "VJNT", approved: 0, filled: 0, vacant: 0 },
    { name: "NT", approved: 0, filled: 0, vacant: 0 },
    { name: "SBC", approved: 0, filled: 0, vacant: 0 },
  ];

  return (
    <div className={styles.card_grid}>
      {categories.map((c, index) => (
        <div key={index} className={styles.info_card}>
          <h3>{c.name}</h3>

          <div className={styles.card_row}>
            <span>Approved:</span> <span className={styles.num_black}>{c.approved}</span>
          </div>

          <div className={styles.card_row}>
            <span>Filled:</span> <span className={styles.num_green}>{c.filled}</span>
          </div>

          <div className={styles.card_row}>
            <span>Vacant:</span> <span className={styles.num_red}>{c.vacant}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
