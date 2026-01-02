import { useState } from "react";
import styles from "./Login.module.css";
import Language from "../../assets/language.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { demoUsers } from "../../data/demoUsers";

export default function Login() {
  const [language, setLanguage] = useState<"English" | "मराठी">("English");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [step, setStep] = useState<"login" | "otp">("login");
  const [timer, setTimer] = useState(26);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();



  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    if (timer === 0) {
      setCanResend(true);
    }
  }, [step, timer]);

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  function toggleLanguage() {
    setLanguage((prevLang) => (prevLang === "English" ? "मराठी" : "English"));
  }

  function handleSubmit() {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "password is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length> 0) return;
    

    const user = demoUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Invalid username or password!");
      return;
    }
 // Store user temporarily (OTP pending)
    localStorage.setItem("user",JSON.stringify(user));
    localStorage.setItem("role", user.role);

    // Go to OTP step
  setStep("otp");
  }

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  function handleOtpChange(value: string, index: number) {
    if (!/^[0-9]?$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    const next = document.getElementById(`otp-${index + 1}`);
    if (value && next) next.focus();

    const isComplete = newOtp.every((digit) => digit !== "");
    if (isComplete) {
      navigate("/dashboard");
    }
  }

  function handleBackspace(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) prev.focus();
    }
  }

  function handleResend() {
    setTimer(26);
    setCanResend(false);
    console.log("OTP resent");
  }

  return (
    <div className={styles.login_page}>
      <button className={styles.language_btn} onClick={toggleLanguage}>
        <img src={Language} alt="icon" width={24} /> {language}
      </button>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>DHE</div>
          <h2 className={styles.title}>DHE MIS</h2>
          <p className={styles.subtitle}>
            Department of Higher Education Management Information System
          </p>
        </div>

        {/* LOGIN SCREEN */}
        {step === "login" && (
          <div className={styles.login_container}>
            <h3>Login to DHE MIS</h3>
            <p className={styles.small_text}>
              Enter your credentials to access the system
            </p>

            <label>Username *</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <label>Password *</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <button onClick={handleSubmit} className="login-btn">
              Send OTP
            </button>

            <p className="demo">
              Demo credentials: admin/admin, institute/institute, jd/jd,
              director/director, secretary/secretary
            </p>
          </div>
        )}

        {/* OTP SCREEN */}
        {step === "otp" && (
          <div className={styles.login_container}>
            <h3>Verify OTP</h3>
            <p className={styles.small_text}>
              Enter the 6-digit OTP sent to your registered mobile number
            </p>

            <p className={styles.logged_in_as}>Logged in as: {username}</p>

            <div className={styles.otp_boxes}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  onKeyDown={(e) => handleBackspace(e, idx)}
                />
              ))}
            </div>

            {!canResend ? (
              <p className={styles.resend}>
                Resend OTP <span>({timer}s)</span>
              </p>
            ) : (
              <p className={styles.resend_link} onClick={handleResend}>
                Resend OTP
              </p>
            )}

            <p className={styles.small_text}>
              For demo purposes, enter any 6-digit code
            </p>
            <button className={styles.back_btn} onClick={() => setStep("login")}>
              ← Back to Login
            </button>
          </div>
        )}

        {/* Footer */}
        <p className={styles.footer}>
          © 2024 Department of Higher Education, Maharashtra. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
