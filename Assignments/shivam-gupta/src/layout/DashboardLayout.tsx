import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import styles from "./DashboardLayout.module.css";
import { Footer } from "../components/Footer/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <Header />

      <div className={styles.body}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <main className={styles.content}>{children}</main>
      </div>

      <Footer/>
    </div>
  );
}
