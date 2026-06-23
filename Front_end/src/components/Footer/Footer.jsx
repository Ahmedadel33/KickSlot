import { Link, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const location = useLocation();

  const hiddenPaths = ["/login", "/register", "/admin/login", "/"];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <FontAwesomeIcon icon={faFutbol} className={styles.brandIcon} />
          <span>KICK SLOT</span>
        </div>

        <div className={styles.links}>
          <Link to="/pitches" className={styles.link}>Pitches</Link>
          <Link to="/my-bookings" className={styles.link}>My Bookings</Link>
          <Link to="/profile" className={styles.link}>Profile</Link>
        </div>

        <p className={styles.copy}>
     © 2026 Kick Slot&nbsp;&nbsp;&nbsp;&nbsp;Made with by Eng : Ahmed Adel
 </p>

      </div>
    </footer>
  );
}