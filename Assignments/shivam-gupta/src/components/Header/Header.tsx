import styles from "./Header.module.css";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Language from "../../assets/language.svg";

export default function Header() {
  const [language, setLanguage] = useState<"English" | "मराठी">("English");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "English" || savedLang === "मराठी") {
      setLanguage(savedLang);
    }
  }, []);

  // Store language whenever it changes
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((prev) => (prev === "English" ? "मराठी" : "English"));
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -----------------------------
  // LOAD USER DATA FROM LOCALSTORAGE
  // -----------------------------
  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const userName = userData.name || userData.username || "User";
  const userEmail = userData.email || "example@dhe.gov.in";

  const userRoleMap: Record<string, string> = {
    ADMIN: "System Admin",
    INSTITUTE: "Institute",
    JD: "Joint Director",
    DIRECTOR: "Director",
    SECRETARY: "Secretary",
  };

  const userRole = userRoleMap[userData.role] || "User";

  return (
    <div className={styles.header}>
      {/* LEFT SECTION */}
      <div className={styles.left}>
        <div className={styles.badge}>DHE</div>

        <div>
          <h1 className={styles.title}>DHE MIS</h1>
          <p className={styles.subtitle}>
            {language === "English"
              ? "Department of Higher Education - Management Information System"
              : "उच्च शिक्षण विभाग - व्यवस्थापन माहिती प्रणाली"}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.right}>
        {/* LANGUAGE SWITCH */}
        <button className={styles.langBtn} onClick={toggleLanguage}>
          <img src={Language} alt="icon" width={24} /> {language}
        </button>

        {/* NOTIFICATION */}
        <button className={styles.btn}>
          <FaBell className={styles.icon} />
        </button>

        {/* USER DROPDOWN */}
        <div className={styles.profileWrapper} ref={menuRef}>
          <button
            className={styles.btn}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <FaUserCircle className={styles.icon} />
          </button>

          {showMenu && (
            <div className={styles.profileMenu}>
              <div className={styles.profileHeader}>
                <h3>{userName}</h3>
                <p className={styles.email}>{userEmail}</p>
                <span className={styles.role}>{userRole}</span>
              </div>

              <div
                className={styles.profileItem}
                onClick={() => {
                  navigate("/settings/profile");
                  setShowMenu(false);
                }}
              >
                Profile
              </div>

              <div
                className={styles.profileItem}
                onClick={() => {
                  navigate("/settings/preferences");
                  setShowMenu(false);
                }}
              >
                Settings
              </div>

              <div className={styles.logout} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
