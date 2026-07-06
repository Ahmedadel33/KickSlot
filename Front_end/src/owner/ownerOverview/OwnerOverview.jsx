import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Overview.module.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";

export default function OwnerOverview() {
  const [pitchesCount, setPitchesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [ownerEmail] = useState(() => {
    return localStorage.getItem("ownerEmail") || "";
  }); 

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem("ownerToken");
        const res = await axios.get("http://localhost:8000/pitch/adminpitch", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.data && res.data.pitches) {
          setPitchesCount(res.data.pitches.length);
        }
      } catch (error) {
        console.error("Error fetching owner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []); 

  if (loading) return <div style={{ color: "#1a202c", padding: "20px" }}>Loading Dashboard...</div>;

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.welcomeHeader}>
         <h1>Welcome Back, {ownerEmail || "Owner"} 👋</h1>
        <p>Here is what's happening with your pitches today.</p>
      </div>

      <div className={styles.statsGrid}>
         <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#e0f2fe", color: "#0284c7" }}>
            <FontAwesomeIcon icon={faFutbol} />
          </div>
          <div>
            <h3>My Pitches</h3>
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
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div>
            <h3>Total Reviews</h3>
            <p className={styles.statNumber}>0</p>
          </div>
        </div>
      </div>
    </div>
  );
}