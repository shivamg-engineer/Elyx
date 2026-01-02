import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./RTI.module.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// -----------------------------
// ✅ 1. Strong Types
// -----------------------------
type RTIFormData = {
  fullName: string;
  email: string;
  mobile: string;
  identityType: string;
  identityNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  category: string;
  subject: string;
  description: string;
  infoSought: string;
  period: string;
  mode: string;
  language: string;
  file: File | null;
};

type RTIErrors = Partial<Record<keyof RTIFormData, string>>;

// -----------------------------
// Component
// -----------------------------
export const RTI = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<RTIFormData>({
    fullName: "",
    email: "",
    mobile: "",
    identityType: "Aadhaar Card",
    identityNumber: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    category: "",
    subject: "",
    description: "",
    infoSought: "",
    period: "",
    mode: "",
    language: "",
    file: null,
  });

  const [errors, setErrors] = useState<RTIErrors>({});

  // -----------------------------
  // File Upload Handler
  // -----------------------------
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(uploadedFile.type)) {
      toast.error("Only PDF, JPG, or PNG files are allowed.");
      return;
    }

    if (uploadedFile.size > maxSize) {
      toast.error("File size must be less than 5 MB.");
      return;
    }

    setFormData((prev) => ({ ...prev, file: uploadedFile }));
    localStorage.setItem("rtiFileName", uploadedFile.name);
    toast.success("File uploaded successfully!");
  };

  // -----------------------------
  // Validate Form Inputs
  // -----------------------------
  const validateForm = (): RTIErrors => {
    const newErrors: RTIErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Full Name must contain only alphabets";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    if (!formData.identityNumber.trim()) {
      newErrors.identityNumber = "Identity Number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.infoSought.trim()) {
      newErrors.infoSought = "Information sought is required";
    }

    if (!formData.mode.trim()) {
      newErrors.mode = "Mode of action is required";
    }

    if (!formData.language.trim()) {
      newErrors.language = "Preferred language is required";
    }

    return newErrors;
  };

  // -----------------------------
  // Save draft
  // -----------------------------
  const saveDraft = () => {
    localStorage.setItem("rtiDraft", JSON.stringify(formData));
    toast.success("Draft saved successfully!");
  };

  // -----------------------------
  // Load draft
  // -----------------------------
  useEffect(() => {
    const savedDraft = localStorage.getItem("rtiDraft");
    const savedFileName = localStorage.getItem("rtiFileName");

    if (savedDraft) {
      setFormData(JSON.parse(savedDraft));
    }

    if (savedFileName) {
      setFormData((prev) => ({
        ...prev,
        file: { name: savedFileName } as File, // fake file object for display
      }));
    }
  }, []);

  // -----------------------------
  // Submit Handler
  // -----------------------------
  const handleProceed = () => {
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      const firstKey = Object.keys(formErrors)[0] as keyof RTIErrors;
      toast.error(formErrors[firstKey]!);
      return;
    }

    toast.success("Proceeding to payment...");
  };

  // -----------------------------
  // JSX
  // -----------------------------
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>RTI Application</h1>
        <p>Submit your right to information request</p>

        {/* PERSONAL DETAILS */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Personal Details</h2>

          <div className={styles.grid2}>
            {/* Full Name */}
            <div className={styles.inputGroup}>
              <label>Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className={styles.error}>{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.inputGroup}>
              <label>Email *</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your.email@example.com"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div className={styles.inputGroup}>
              <label>Mobile Number *</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                placeholder="10-digit mobile number"
              />
              {errors.mobile && <p className={styles.error}>{errors.mobile}</p>}
            </div>

            {/* Identity Type */}
            <div className={styles.inputGroup}>
              <label>Identity Proof *</label>
              <select
                value={formData.identityType}
                onChange={(e) =>
                  setFormData({ ...formData, identityType: e.target.value })
                }
              >
                <option>Aadhaar Card</option>
                <option>PAN Card</option>
                <option>Voter ID</option>
              </select>
            </div>

            {/* Identity Number */}
            <div className={styles.inputGroup}>
              <label>Identity Number *</label>
              <input
                type="text"
                value={formData.identityNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    identityNumber: e.target.value,
                  })
                }
                placeholder="Enter identity number"
              />
              {errors.identityNumber && (
                <p className={styles.error}>{errors.identityNumber}</p>
              )}
            </div>

            {/* Address */}
            <div className={styles.inputGroupFull}>
              <label>Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter complete address"
              />
              {errors.address && (
                <p className={styles.error}>{errors.address}</p>
              )}
            </div>

            {/* City */}
            <div className={styles.inputGroup}>
              <label>City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Enter city"
              />
              {errors.city && <p className={styles.error}>{errors.city}</p>}
            </div>

            {/* State */}
            <div className={styles.inputGroup}>
              <label>State *</label>
              <select
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              >
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
              </select>
            </div>

            {/* Pincode */}
            <div className={styles.inputGroup}>
              <label>Pincode *</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) =>
                  setFormData({ ...formData, pincode: e.target.value })
                }
                placeholder="6-digit pincode"
              />
              {errors.pincode && (
                <p className={styles.error}>{errors.pincode}</p>
              )}
            </div>
          </div>
        </section>

        {/* REQUEST DETAILS */}
        <section className={styles.card}>
          <h2>Request Details</h2>

          <div className={styles.grid2}>
            {/* Category */}
            <div className={styles.inputGroup}>
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select</option>
                <option>Admission Related</option>
                <option>Examination Related</option>
                <option>Staff Related</option>
                <option>Infrastructure</option>
                <option>Financial Information</option>
                <option>General Information</option>
                <option>Other</option>
              </select>
              {errors.category && (
                <p className={styles.error}>{errors.category}</p>
              )}
            </div>

            {/* Subject */}
            <div className={styles.inputGroup}>
              <label>Subject *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
              {errors.subject && (
                <p className={styles.error}>{errors.subject}</p>
              )}
            </div>

            {/* Description */}
            <div className={styles.inputGroupFull}>
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {errors.description && (
                <p className={styles.error}>{errors.description}</p>
              )}
            </div>

            {/* Information Sought */}
            <div className={styles.inputGroupFull}>
              <label>Information Sought *</label>
              <textarea
                value={formData.infoSought}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    infoSought: e.target.value,
                  })
                }
              />
              {errors.infoSought && (
                <p className={styles.error}>{errors.infoSought}</p>
              )}
            </div>

            {/* Period */}
            <div className={styles.inputGroupFull}>
              <label>Period of Information</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) =>
                  setFormData({ ...formData, period: e.target.value })
                }
              />
            </div>
          </div>

          {/* Mode of Action */}
          <div className={styles.radioGroup}>
            <label>Mode of Action *</label>
            <div className={styles.radioList}>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="online"
                  checked={formData.mode === "online"}
                  onChange={(e) =>
                    setFormData({ ...formData, mode: e.target.value })
                  }
                />
                Online
              </label>

              <label>
                <input
                  type="radio"
                  name="mode"
                  value="physical"
                  checked={formData.mode === "physical"}
                  onChange={(e) =>
                    setFormData({ ...formData, mode: e.target.value })
                  }
                />
                Physical
              </label>
            </div>
            {errors.mode && <p className={styles.error}>{errors.mode}</p>}
          </div>

          {/* Preferred Language */}
          <div className={styles.radioGroup}>
            <label>Preferred Language *</label>
            <div className={styles.radioList}>
              <label>
                <input
                  type="radio"
                  name="lang"
                  value="English"
                  checked={formData.language === "English"}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                />
                English
              </label>

              <label>
                <input
                  type="radio"
                  name="lang"
                  value="Marathi"
                  checked={formData.language === "Marathi"}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                />
                Marathi
              </label>
            </div>
            {errors.language && (
              <p className={styles.error}>{errors.language}</p>
            )}
          </div>
        </section>

        {/* DOCUMENT UPLOAD */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Supporting Documents</h2>

          <div className={styles.uploadBox}>
            <div
              className={styles.uploadContent}
              onClick={() => fileInputRef.current?.click()}
            >
              <span className={styles.uploadIcon}>⬆️</span>
              <p>Drag & drop files here</p>
              <small className={styles.browseText}>or browse files</small>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className={styles.hiddenFileInput}
              onChange={handleFileSelect}
            />
          </div>

          {formData.file && (
            <div className={styles.fileRow}>
              <p>Selected File: {formData.file.name}</p>
              <button
                className={styles.removeFileBtn}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, file: null }));
                  localStorage.removeItem("rtiFileName");
                  toast.info("File removed");
                }}
              >
                Remove
              </button>
            </div>
          )}
        </section>

        {/* BUTTONS */}
        <div className={styles.actionRow}>
          <button className={styles.btnSecondary} onClick={saveDraft}>
            Save Draft
          </button>

          <button className={styles.btnPrimary} onClick={handleProceed}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
