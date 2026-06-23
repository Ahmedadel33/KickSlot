import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFutbol, faCalendarCheck, faUser,
  faRightFromBracket, faGauge, faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const adminToken = localStorage.getItem("adminToken");
  const isAdmin = !!adminToken;

  const hiddenPaths = ["/login", "/register", "/admin/login", "/"];
  if (hiddenPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminEmail");
      navigate("/admin/login");
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <Link to={isAdmin ? "/admin/dashboard" : "/pitches"} className={styles.logo}>
        <FontAwesomeIcon icon={faFutbol} className={styles.logoIcon} />
        KICK SLOT
        {isAdmin && <span className={styles.adminBadge}>Admin</span>}
      </Link>

      <div className={styles.links}>
        {isAdmin ? (
          <>
            <Link to="/admin/dashboard" className={`${styles.link} ${isActive("/admin/dashboard") ? styles.active : ""}`}>
              <FontAwesomeIcon icon={faGauge} /> Dashboard
            </Link>
            <Link to="/admin/add-pitch" className={`${styles.link} ${isActive("/admin/add-pitch") ? styles.active : ""}`}>
              <FontAwesomeIcon icon={faPlusCircle} /> Add Pitch
            </Link>
          </>
        ) : (
          <>
            <Link to="/pitches" className={`${styles.link} ${isActive("/pitches") ? styles.active : ""}`}>
              <FontAwesomeIcon icon={faFutbol} /> Pitches
            </Link>
            <Link to="/my-bookings" className={`${styles.link} ${isActive("/my-bookings") ? styles.active : ""}`}>
              <FontAwesomeIcon icon={faCalendarCheck} /> My Bookings
            </Link>
            <Link to="/profile" className={`${styles.link} ${isActive("/profile") ? styles.active : ""}`}>
              <FontAwesomeIcon icon={faUser} /> Profile
            </Link>
          </>
        )}

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </button>
      </div>
    </nav>
  );
}