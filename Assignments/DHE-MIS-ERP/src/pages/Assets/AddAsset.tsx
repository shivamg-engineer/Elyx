import styles from "./AddAsset.module.css";

export default function AddAsset() {
  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <button className={styles.backBtn}>← Back</button>

        <div>
          <h1 className={styles.title}>Add New Asset</h1>
          <p className={styles.subtitle}>Enter details for the new asset</p>
        </div>
      </div>

      {/* BASIC INFORMATION */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Basic Information</h2>
        <p className={styles.sectionSub}>Enter the basic details of the asset</p>

        <div className={styles.grid}>
          <div className={styles.inputBox}>
            <label>Asset Name *</label>
            <input type="text" placeholder="e.g., Desktop Computer" />
          </div>

          <div className={styles.inputBox}>
            <label>Asset Type *</label>
            <input type="text" placeholder="equipment" />
          </div>

          <div className={styles.inputBox}>
            <label>Category *</label>
            <input type="text" placeholder="e.g., Desktop, Laptop" />
          </div>

          <div className={styles.inputBox}>
            <label>Manufacturer</label>
            <input type="text" placeholder="e.g., Dell, HP" />
          </div>

          <div className={styles.inputBox}>
            <label>Model</label>
            <input type="text" placeholder="e.g., OptiPlex 3000" />
          </div>

          <div className={styles.inputBox}>
            <label>Serial Number</label>
            <input type="text" placeholder="e.g., SN12345" />
          </div>

          <div className={styles.fullBox}>
            <label>Description</label>
            <textarea placeholder="Enter a detailed description of the asset"></textarea>
          </div>
        </div>
      </div>

      {/* PURCHASE INFORMATION */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Purchase Information</h2>
        <p className={styles.sectionSub}>
          Enter purchase and supplier details
        </p>

        <div className={styles.grid}>
          <div className={styles.inputBox}>
            <label>Purchase Date *</label>
            <input type="date" />
          </div>

          <div className={styles.inputBox}>
            <label>Purchase Cost (₹) *</label>
            <input type="number" placeholder="0" />
          </div>

          <div className={styles.inputBox}>
            <label>Supplier</label>
            <input type="text" placeholder="e.g., Tech Solutions Ltd" />
          </div>

          <div className={styles.inputBox}>
            <label>Invoice Number</label>
            <input type="text" placeholder="e.g., INV2024-001" />
          </div>

          <div className={styles.inputBox}>
            <label>Warranty Expiry Date</label>
            <input type="date" />
          </div>
        </div>
      </div>

      {/* STATUS AND LOCATION */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Status & Location</h2>
        <p className={styles.sectionSub}>
          Current status and location of the asset
        </p>

        <div className={styles.grid}>
          <div className={styles.inputBox}>
            <label>Status *</label>
            <input type="text" placeholder="available" />
          </div>

          <div className={styles.inputBox}>
            <label>Condition *</label>
            <input type="text" placeholder="excellent" />
          </div>

          <div className={styles.inputBox}>
            <label>Location *</label>
            <input type="text" placeholder="e.g., Computer Lab 1" />
          </div>

          <div className={styles.inputBox}>
            <label>Department</label>
            <input type="text" placeholder="e.g., Computer Science" />
          </div>
        </div>
      </div>

      {/* DEPRECIATION SETTINGS */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Depreciation Settings</h2>
        <p className={styles.sectionSub}>
          Configure depreciation calculation for the asset
        </p>

        <div className={styles.grid}>
          <div className={styles.inputBox}>
            <label>Depreciation Method *</label>
            <input type="text" placeholder="e.g., Straight Line" />
          </div>

          <div className={styles.inputBox}>
            <label>Depreciation Rate (%) *</label>
            <input type="number" placeholder="10" />
          </div>

          <div className={styles.inputBox}>
            <label>Useful Life (years) *</label>
            <input type="number" placeholder="5" />
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className={styles.submitRow}>
        <button className={styles.submitBtn}>Add Asset</button>
      </div>
    </div>
  );
}
