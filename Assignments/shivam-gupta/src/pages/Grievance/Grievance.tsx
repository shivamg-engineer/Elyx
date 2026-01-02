import { useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import styles from "./Grievance.module.css";
import LodgeGrievance from "./LodgeGrievance";
import TrackGrievances from "./TrackGrievances";
import Statistics from "./Statistics";

export const Grievance=()=>{
    const [tab,setTab]=useState("LodgeGrievance");

    return (
        <DashboardLayout>
            <div>
                <h1>Grievance Redressal</h1>
                <p>Lodge grievances, track status, and view statistics</p>
            </div>

            <div className={styles.tabs}>
               <button
               className={tab==="LodgeGrievance" ? `${styles.activeTab} ${styles.tab}`:`${styles.tab}`}
               onClick={()=>setTab("LodgeGrievance")}
               >Lodge Grievance</button>
               <button 
               className={tab==="TrackGrievances" ? `${styles.activeTab} ${styles.tab}`:`${styles.tab}`}
                onClick={()=>setTab("TrackGrievances")}
               > Track Grievances</button>
               <button
               className={tab==="Statistics" ? `${styles.activeTab} ${styles.tab}`:`${styles.tab}`}
                 onClick={()=>setTab("Statistics")}
               >Statistics</button>
            </div>

            {tab==="LodgeGrievance" && (
                <LodgeGrievance/>
            )}
            {tab==="TrackGrievances" && (
                <TrackGrievances/>
            )}
            {tab === "Statistics" && (
                <Statistics/>
            )}
        </DashboardLayout>
    );
}