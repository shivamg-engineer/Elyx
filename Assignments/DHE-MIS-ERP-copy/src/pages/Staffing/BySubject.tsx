import styles from "./Staffing.module.css";

export const BySubject = () => {
  const subjects = [
    { name: "English", approved: 8, filled: 6, vacant: 2, rate: "75.0%" },
    { name: "Mathematics", approved: 10, filled: 7, vacant: 3, rate: "70.0%" },
    { name: "Physics", approved: 8, filled: 5, vacant: 3, rate: "62.5%" },
    { name: "Chemistry", approved: 7, filled: 6, vacant: 1, rate: "85.7%" },
    { name: "History", approved: 5, filled: 3, vacant: 2, rate: "60.0%" },
    { name: "Computer Science", approved: 13, filled: 8, vacant: 5, rate: "61.5%" },
    { name: "Commerce", approved: 9, filled: 7, vacant: 2, rate: "77.8%" },
  ];

  return (
    <div className={styles.card_grid}>
      {subjects.map((s, index) => (
        <div key={index} className={styles.info_card}>
          <h3>{s.name}</h3>

          <div className={styles.card_row}>
            <span>Approved:</span> <span className={styles.num_black}>{s.approved}</span>
          </div>

          <div className={styles.card_row}>
            <span>Filled:</span> <span className={styles.num_green}>{s.filled}</span>
          </div>

          <div className={styles.card_row}>
            <span>Vacant:</span> <span className={styles.num_red}>{s.vacant}</span>
          </div>

          <div className={styles.fill_rate_label}>
            <b>Fill Rate:</b> {s.rate}
          </div>
        </div>
      ))}
    </div>
  );
};
