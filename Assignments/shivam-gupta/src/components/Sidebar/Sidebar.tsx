import styles from "./Sidebar.module.css";
import { ROLE_NAVS } from "../../data/roleMenus";
import type { UserRole } from "../../types/userRole";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTranslation } from "../../utils/locale";

export default function Sidebar() {
  type SimpleMenuItem = string;

  type ParentMenuItem = {
    label: string;
    children: string[];
  };

  type MenuItem = SimpleMenuItem | ParentMenuItem;

  const role = (localStorage.getItem("role") as UserRole) || "ADMIN";
  const items = ROLE_NAVS[role] as MenuItem[];

  // Load language from localStorage
  const [lang, setLang] = useState<"English" | "मराठी">(
    (localStorage.getItem("lang") as "English" | "मराठी") || "English"
  );

  // Update Sidebar language when localStorage changes (Header updates it)
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("lang") as "English" | "मराठी";
      if (stored && stored !== lang) {
        setLang(stored);
      }
    }, 300); // check every 300ms — smooth & lightweight

    return () => clearInterval(interval);
  }, [lang]);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.menuTitle}>
        {lang === "English" ? "Menu" : "मेनू"}
      </h3>

      <ul className={styles.menu}>
        {items.map((item: MenuItem, index: number) => {
          // Simple menu item
          if (typeof item === "string") {
            return (
              <li key={index}>
                <NavLink
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                >
                  {getTranslation(item, lang)}
                </NavLink>
              </li>
            );
          }

          // Parent menu item
          return (
            <li key={index}>
              <div
                className={styles.parentItem}
                onClick={() => toggleMenu(item.label)}
              >
                {getTranslation(item.label, lang)}
              </div>

              {openMenu === item.label && (
                <ul className={styles.subMenu}>
                  {item.children.map((child: string) => (
                    <li key={child}>
                      <NavLink
                        to={`/${
                          item.label
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .split("-")[0]
                        }/${child.toLowerCase().replace(/\s+/g, "-")}`}
                        className={({ isActive }) =>
                          isActive
                            ? `${styles.subLink} ${styles.subActive}`
                            : styles.subLink
                        }
                      >
                        {getTranslation(child, lang)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
