import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./OwnerLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock, faStore } from "@fortawesome/free-solid-svg-icons";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", showPassword: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/owner/login", {
        email: form.email.trim(),
        password: form.password,
      });
      localStorage.setItem("ownerToken", res.data.token);
      localStorage.setItem("ownerEmail", res.data.user.email);
      localStorage.setItem("ownerName", res.data.user.name);
      navigate("/owner/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pitchBg} />
      <div className={styles.pitchOverlay} />
      <div className={styles.wrapper}>

        <div className={styles.brandTop}>
          <div className={styles.storeIcon}>
            <FontAwesomeIcon icon={faStore} />
          </div>
          <h1 className={styles.brandTitle}>KICK SLOT</h1>
          <p className={styles.brandSub}>Owner Portal</p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Owner Access</h2>
          <p className={styles.cardSub}>Manage your pitches and bookings</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email</label>
              <div className={styles.inputWrap}>
                <input
                  type="email"
                  className={styles.input}
                  placeholder="owner@kickslot.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <span className={styles.iconRight}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrap}>
                <input
                  type={form.showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <span
                  className={`${styles.iconLeft} ${styles.clickable}`}
                  onClick={() => setForm({ ...form, showPassword: !form.showPassword })}
                >
                  <FontAwesomeIcon icon={form.showPassword ? faEye : faEyeSlash} />
                </span>
                <span className={styles.iconRight}>
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>

            {error && (
              <div className={styles.errorBox}>
                <p className={styles.errorMsg}>⚠ {error}</p>
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Sign In as Owner
            </button>
          </form>
        </div>

        <div className={styles.bottomLink}>
          <a href="/login" className={styles.userLink}>← Back to User Login</a>
        </div>
      </div>
    </div>
  );
}