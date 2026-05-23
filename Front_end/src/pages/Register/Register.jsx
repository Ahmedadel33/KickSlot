import styles from "./Register.module.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    try {
      const res = await api.post("/auth/register", form);
      console.log(res)
      navigate("/login");
    } catch (error) {
      console.log(error)
      const data = error.response?.data;
      if (data?.errors) {
        setErrors(data.errors.map((err) => err.message || err));
      } else {
        setErrors([data?.msg || "Something went wrong"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.pitchBg} />
      <div className={styles.pitchOverlay} />

      <div
        className={`${styles.registerWrapper} d-flex flex-column align-items-center justify-content-between`}
      >
        {/* BRAND */}
        <div className={`${styles.brandTop} text-center`}>
          <h1 className={styles.brandTitle}>KICK SLOT</h1>
          <p className={styles.brandSub}>Join the Pitch</p>
        </div>

        {/* CARD */}
        <div className={styles.registerCard}>
          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className={`${styles.fieldGroup} mb-3`}>
              <label className={styles.fieldLabel}>Full Name</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  name="name"
                  className={styles.kickInput}
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <span className={styles.inputIconRight}>
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
            </div>

            {/* Email */}
            <div className={`${styles.fieldGroup} mb-3`}>
              <label className={styles.fieldLabel}>Email</label>
              <div className={styles.inputWrap}>
                <input
                  type="email"
                  name="email"
                  className={styles.kickInput}
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <span className={styles.inputIconRight}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className={`${styles.fieldGroup} mb-3`}>
              <label className={styles.fieldLabel}>Phone Number</label>
              <div className={styles.inputWrap}>
                <input
                  type="tel"
                  name="phone"
                  className={styles.kickInput}
                  placeholder="01XXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <span className={styles.inputIconRight}>
                  <FontAwesomeIcon icon={faPhone} />
                </span>
              </div>
            </div>

            <div className={`${styles.fieldGroup} mb-3`}>
              <label className={styles.fieldLabel}>Password</label>
              <div className={styles.inputWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={styles.kickInput}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className={`${styles.inputIconLeft} ${styles.clickable}`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className={styles.showpassword}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </span>
                <span className={styles.inputIconRight}>
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>
            </div>

            {/* Terms */}
            <div className={`${styles.termsRow} mb-4`}>
              <input
                type="checkbox"
                id="terms"
                className={styles.checkbox}
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="terms" className={styles.termsLabel}>
                I agree to the{" "}
                <a href="#" className={styles.termsLink}>
                  Terms & Conditions
                </a>{" "}
                of Kick Slot
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`${styles.kickBtn} w-100`}
              disabled={loading || !agreed}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" />
              ) : null}
              Create Account
            </button>

            {/* Errors */}
            {errors.length > 0 && (
              <div className={styles.errorBox}>
                {errors.map((err, i) => (
                  <p key={i} className={styles.errorMsg}>
                    ⚠ {err}
                  </p>
                ))}
              </div>
            )}
          </form>

          {/* Divider */}
          <div className={`${styles.divider} my-4`}>
            <span>Or sign up with</span>
          </div>

          {/* Social */}
          <div className="d-flex gap-3">
            <button className={`${styles.socialBtn} flex-fill`}>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width="20"
                alt="Google"
              />
              <span>Google</span>
            </button>
            <button className={`${styles.socialBtn} flex-fill`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className={`${styles.bottomLink} text-center pb-4`}>
          <p>
            Already have an account?{" "}
            <a href="/login" className={styles.loginLink}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
