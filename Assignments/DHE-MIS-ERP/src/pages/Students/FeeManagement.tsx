import { useState } from "react";
import styles from "./FeeManagement.module.css";

export const FeeManagement = () => {
  const [subTab, setSubTab] = useState("FeeStructure");

  const FEE_ITEMS = [
    {
      id: 1,
      category: "Tuition",
      description: "Tuition Fee",
      amount: "₹35,000",
      status: "Paid",
      paidDate: "15 Jul 2024",
    },
    {
      id: 2,
      category: "Library",
      description: "Library Fee",
      amount: "₹5,000",
      status: "Paid",
      paidDate: "10 Aug 2024",
    },
    {
      id: 3,
      category: "Laboratory",
      description: "Laboratory Fee",
      amount: "₹8,000",
      status: "Paid",
      paidDate: "10 Aug 2024",
    },
    {
      id: 4,
      category: "Sports",
      description: "Sports and Cultural Fee",
      amount: "₹3,000",
      status: "Paid",
      paidDate: "10 Aug 2024",
    },
    {
      id: 5,
      category: "Development",
      description: "Development Fee",
      amount: "₹7,000",
      status: "Pending",
      paidDate: "-",
    },
    {
      id: 6,
      category: "Examination",
      description: "Examination Fee",
      amount: "₹4,000",
      status: "Paid",
      paidDate: "10 Aug 2024",
    },
    {
      id: 7,
      category: "Admission",
      description: "Admission Processing Fee",
      amount: "₹2,000",
      status: "Pending",
      paidDate: "-",
    },
    {
      id: 8,
      category: "Caution Deposit",
      description: "Caution Deposit (Refundable)",
      amount: "₹5,000",
      status: "Pending",
      paidDate: "-",
    },
  ];

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev: any) =>
      prev.includes(id) ? prev.filter((x: any) => x !== id) : [...prev, id]
    );
  };

  // payment history
  const payments = [
    {
      id: "TXN2024001",
      date: "15 Jul 2024",
      amount: "₹35,000",
      mode: "ONLINE",
      status: "Completed",
    },
    {
      id: "TXN2024002",
      date: "10 Aug 2024",
      amount: "₹20,000",
      mode: "ONLINE",
      status: "Completed",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Fee Management</h2>
      <p className={styles.subtitle}>Manage fee payments and view receipts</p>

      {/* Student Info */}
      <div className={styles.infoCard}>
        <div className={styles.infoRow}>
          <div>
            <label className={styles.infoLabel}>Name</label>
            <p className={styles.infoValue}>Student</p>
          </div>

          <div>
            <label className={styles.infoLabel}>Registration ID</label>
            <p className={styles.infoValue}>N/A</p>
          </div>

          <div>
            <label className={styles.infoLabel}>Course</label>
            <p className={styles.infoValue}>Bachelor of Arts</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryRow}>
        <div className={styles.summaryCard}>
          <label>Total Fee</label>
          <p className={styles.totalFee}>₹69,000</p>
        </div>

        <div className={styles.summaryCard}>
          <label>Paid Amount</label>
          <p className={styles.paidAmount}>₹55,000</p>
        </div>

        <div className={styles.summaryCard}>
          <label>Balance Due</label>
          <p className={styles.balanceAmount}>₹14,000</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsRow}>
        <button
          className={subTab==="FeeStructure" ?`${styles.tab} ${styles.activeTab}`:styles.tab}
          onClick={() => setSubTab("FeeStructure")}
        >
          Fee Structure
        </button>
        <button
          className={subTab==="PaymentHistory" ?`${styles.tab} ${styles.activeTab}`:styles.tab}
          onClick={() => setSubTab("PaymentHistory")}
        >
          Payment History
        </button>
        <button
         className={subTab==="Receipts" ?`${styles.tab} ${styles.activeTab}`:styles.tab}
          
         onClick={() => setSubTab("Receipts")}>
          Receipts
        </button>
      </div>

      {subTab === "FeeStructure" && (
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.title}>Fee Structure - 2024-25</h2>
              <p className={styles.subtitle}>
                Select fee items to pay. Semester 1
              </p>
            </div>
          </div>

          <div className={styles.table}>
            <div className={`${styles.row} ${styles.headerRow}`}>
              <div className={`${styles.cell} ${styles.selectCol}`}>Select</div>
              <div className={`${styles.cell} ${styles.categoryCol}`}>
                Category
              </div>
              <div className={`${styles.cell} ${styles.descriptionCol}`}>
                Description
              </div>
              <div className={`${styles.cell} ${styles.amountCol}`}>Amount</div>
              <div className={`${styles.cell} ${styles.statusCol}`}>Status</div>
              <div className={`${styles.cell} ${styles.dateCol}`}>
                Paid Date
              </div>
            </div>

            {FEE_ITEMS.map((item) => {
              const selected = selectedIds.includes(item.id);
              const isPaid = item.status === "Paid";

              return (
                <div key={item.id} className={styles.row}>
                  <div className={`${styles.cell} ${styles.selectCol}`}>
                    <button
                      type="button"
                      className={`${styles.toggle} ${
                        selected ? styles.toggleOn : ""
                      }`}
                      onClick={() => toggleSelect(item.id)}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>

                  <div className={`${styles.cell} ${styles.categoryCol}`}>
                    <span className={styles.categoryPill}>{item.category}</span>
                  </div>

                  <div className={`${styles.cell} ${styles.descriptionCol}`}>
                    {item.description}
                  </div>

                  <div className={`${styles.cell} ${styles.amountCol}`}>
                    {item.amount}
                  </div>

                  <div className={`${styles.cell} ${styles.statusCol}`}>
                    <span
                      className={`${styles.statusChip} ${
                        isPaid ? styles.statusPaid : styles.statusPending
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className={`${styles.cell} ${styles.dateCol}`}>
                    {item.paidDate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* payment history */}
      {subTab === "PaymentHistory" && (
        <div className={styles.card}>
          <h2 className={styles.title}>Payment History</h2>
          <p className={styles.subtitle}>View all your payment transactions</p>

          {/* Table header */}
          <div className={`${styles.row} ${styles.headerRow}`}>
            <div className={styles.colId}>Transaction ID</div>
            <div className={styles.colDate}>Date</div>
            <div className={styles.colAmount}>Amount</div>
            <div className={styles.colMode}>Payment Mode</div>
            <div className={styles.colStatus}>Status</div>
          </div>

          {/* Rows */}
          {payments.map((item, index) => (
            <div key={index} className={styles.row}>
              <div className={styles.colId}>{item.id}</div>
              <div className={styles.colDate}>{item.date}</div>
              <div className={styles.colAmount}>{item.amount}</div>

              <div className={styles.colMode}>
                <span className={styles.modePill}>{item.mode}</span>
              </div>

              <div className={styles.colStatus}>
                <span className={styles.statusPill}>Completed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
