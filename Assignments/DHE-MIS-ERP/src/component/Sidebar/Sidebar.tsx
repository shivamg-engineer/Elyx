import styles from "./Sidebar.module.css";
import { ROLE_NAVS } from "../../data/roleMenus";
import type { UserRole } from "../../types/userRole";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const role = (localStorage.getItem("role") as UserRole) || "ADMIN";
  const items = ROLE_NAVS[role];

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.menuTitle}>Menu</h3>

      <ul className={styles.menu}>
        {items.map((item: any, index: number) => {
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
                  {item}
                </NavLink>
              </li>
            );
          }

          // Nested menu item
          return (
            <li key={index}>
              <div
                className={styles.parentItem}
                onClick={() => {
                  console.log(styles);

                  toggleMenu(item.label);
                }}
              >
                {item.label}
              </div>

              {openMenu === item.label && (
                <ul className={styles.subMenu}>
                  {item.children.map((child: string) => (
                    <li key={child}>
                      <NavLink
                        to={`/${item.label
                          .toLowerCase()
                          .replace(/\s+/g, "-")}/${child
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className={({ isActive }) =>
                          isActive
                            ? `${styles.subLink} ${styles.subActive}`
                            : styles.subLink
                        }
                      >
                        {child}
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
