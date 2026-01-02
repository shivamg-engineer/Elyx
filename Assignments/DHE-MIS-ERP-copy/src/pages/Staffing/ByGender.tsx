    import styles from "./Staffing.module.css";

export const ByGender = () => {
  const genders = [
    { name: "Male", approved: 29, filled: 21, vacant: 8 },
    { name: "Female", approved: 31, filled: 21, vacant: 10 },
    { name: "Other", approved: 0, filled: 0, vacant: 0 },
  ];

  return (
    <div className={styles.card_grid}>
      {genders.map((g, index) => (
        <div key={index} className={styles.info_card}>
          <h3>{g.name}</h3>

          <div className={styles.card_row}>
            <span>Approved:</span> <span className={styles.num_black}>{g.approved}</span>
          </div>

          <div className={styles.card_row}>
            <span>Filled:</span> <span className={styles.num_green}>{g.filled}</span>
          </div>

          <div className={styles.card_row}>
            <span>Vacant:</span> <span className={styles.num_red}>{g.vacant}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
