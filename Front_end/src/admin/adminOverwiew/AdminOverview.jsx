import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Overview.module.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faCalendarDays, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function AdminOverview() {
  const [pitchesCount, setPitchesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [adminEmail] = useState(() => {
    return localStorage.getItem("adminEmail") || "";
  }); 

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:8000/pitch/adminpitch", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data && res.data.pitches) {
          setPitchesCount(res.data.pitches.length);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []); 

  if (loading) return <div style={{ color: "#1a202c", padding: "20px" }}>Loading Dashboard...</div>;

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.welcomeHeader}>
         <h1>Welcome Back, {adminEmail || "Admin"} 👋</h1>
        <p>Here is what's happening with KickSlot today.</p>
      </div>

      <div className={styles.statsGrid}>
         <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#e0f2fe", color: "#0284c7" }}>
            <FontAwesomeIcon icon={faFutbol} />
          </div>
          <div>
            <h3>Total Pitches</h3>
            <p className={styles.statNumber}>{pitchesCount}</p>
          </div>
        </div>

         <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#dcfce7", color: "#16a34a" }}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </div>
          <div>
            <h3>Bookings Today</h3>
            <p className={styles.statNumber}>0</p> 
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#fef3c7", color: "#d97706" }}>
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div>
            <h3>Total Users</h3>
            <p className={styles.statNumber}>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}