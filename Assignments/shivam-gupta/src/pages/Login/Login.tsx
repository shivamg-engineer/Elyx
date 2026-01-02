import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Language from "../../assets/language.svg";
import { useNavigate } from "react-router-dom";
import { demoUsers } from "../../data/demoUsers";
import { useOTP } from "../../hooks/useOTP"; // <-- NEW HOOK

export default function Login() {
  const [language, setLanguage] = useState<"English" | "मराठी">("English");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState<"login" | "otp">("login");

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const navigate = useNavigate();

  // -----------------------------
  // OTP HOOK
  // -----------------------------
  const {
    otp,
    timer,
    canResend,
    generateOtp,
    handleOtpChange,
    handleBackspace,
    resendOtp
  } = useOTP(6, 30);

  // -----------------------------
  // Load language
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "English" || saved === "मराठी") setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  useEffect(() => {
  if (step === "otp") {
    setTimeout(() => {
      const first = document.getElementById("otp-0");
      first?.focus();
    }, 50);
  }
}, [step]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "English" ? "मराठी" : "English"));
  };

  // -----------------------------
  // LOGIN SUBMIT
  // -----------------------------
  const handleSubmit = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // CHECK USER
    const user = demoUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Invalid username or password!");
      return;
    }

    // save user session
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    );
    localStorage.setItem("role", user.role);

    // Generate OTP
    generateOtp();

    setStep("otp");
  };

  // ------------------------------------------------------------
  // RENDER UI
  // ------------------------------------------------------------
  return (
    <div className={styles.login_page}>
      <button className={styles.language_btn} onClick={toggleLanguage}>
        <img src={Language} alt="icon" width={24} /> {language}
      </button>

      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.badge}>DHE</div>
          <h2 className={styles.title}>DHE MIS</h2>
          <p className={styles.subtitle}>
            {language === "English"
              ? "Department of Higher Education - Management Information System"
              : "उच्च शिक्षण विभाग - व्यवस्थापन माहिती प्रणाली"}
          </p>
        </div>

        {/* ------------ LOGIN UI ------------- */}
        {step === "login" && (
          <div className={styles.login_container}>
            <h3>Login to DHE MIS</h3>

            <label>Username *</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}

            <label>Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}

            <button onClick={handleSubmit} className="login-btn">
              Send OTP
            </button>

            <p className="demo">
              Demo: admin/admin, institute/institute, jd/jd, director/director,
              secretary/secretary
            </p>
          </div>
        )}

        {/* ------------ OTP SCREEN ------------- */}
        {step === "otp" && (
          <div className={styles.login_container}>
            <h3>Verify OTP</h3>
            <p className={styles.small_text}>
              Enter the OTP sent to your registered number
            </p>

            <p className={styles.logged_in_as}>Logged-in as: {username}</p>

            <div className={styles.otp_boxes}>
              {otp.map((val, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  maxLength={1}
                  value={val}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, idx, (success) => {
                      if (success) {
                        alert("OTP Verified Successfully!");
                        navigate("/dashboard");
                      } else {
                        alert("Incorrect OTP! Please try again.");
                      }
                    })
                  }
                  onKeyDown={(e) => handleBackspace(e, idx)}
                />
              ))}
            </div>

            {!canResend ? (
              <p className={styles.resend}>
                Resend OTP in <span>({timer}s)</span>
              </p>
            ) : (
              <p className={styles.resend_link} onClick={resendOtp}>
                Resend OTP
              </p>
            )}

            <button
              className={styles.back_btn}
              onClick={() => setStep("login")}
            >
              ← Back to Login
            </button>
          </div>
        )}

        {/* FOOTER */}
        <p className={styles.footer}>
          © 2024 Department of Higher Education, Maharashtra. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
