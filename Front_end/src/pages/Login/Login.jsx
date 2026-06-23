import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // this is profisional way
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
    showpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Sending Login Data:", logindata.email, logindata.password);

    try {
      const res = await axios.post(
"http://localhost:8000/auth/login",  {
    email: logindata.email,
    password: logindata.password,
  }
);

      console.log("Server Response Successfully:", res.data);

     if (res.data && res.data.token) {
  localStorage.setItem("token", res.data.token);
  navigate("/pitches");
} else {
  setError("Login succeeded, but token structure is incorrect.");
}
    } catch (err) {
      console.error("Full Axios Error Object:", err);
      console.error("Error Response Data from Server:", err.response?.data);
      console.error("Error Status Code:", err.response?.status);

      setError(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Invalid Email or Password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.pitchBg} />
      <div className={styles.pitchOverlay} />

      <div
        className={`${styles.loginWrapper} d-flex flex-column align-items-center justify-content-between`}
      >
        <div className={`${styles.brandTop} text-center`}>
          <h1 className={styles.brandTitle}>KICK SLOT</h1>
          <p className={styles.brandSub}>Welcome Back</p>
        </div>

        <div className={styles.loginCard}>
          <form onSubmit={handleSubmit} noValidate>
            <div className={`${styles.fieldGroup} mb-3`}>
              <label className={styles.fieldLabel}>Email</label>
              <div className={styles.inputWrap}>
                <input
                  type="email"
                  className={styles.kickInput}
                  placeholder="email@example.com"
                  value={logindata.email}
                  onChange={(e) =>
                    setlogindata({ ...logindata, email: e.target.value })
                  }
                  required
                />
                <span className={styles.inputIcon}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
            </div>

            <div className={`${styles.fieldGroup} mb-2`}>
              <label className={styles.fieldLabel}>Password</label>
              <div className={styles.inputWrap}>
                <input
                  type={logindata.showpassword ? "text" : "password"}
                  className={styles.kickInput}
                  placeholder="••••••••"
                  value={logindata.password}
                  onChange={(e) =>
                    setlogindata({ ...logindata, password: e.target.value })
                  }
                  required
                />
                <span
                  className={`${styles.inputIcon} ${styles.clickable}`}
                  onClick={() =>
                    setlogindata({
                      ...logindata,
                      showpassword: !logindata.showpassword,
                    })
                  }
                >
                  <span className={styles.showpassword}>
                    {logindata.showpassword ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </span>
                </span>
                <span className={styles.inputIconRight}>🔒</span>
              </div>
            </div>

            <div className="text-end mb-4">
              <a href="#" className={styles.forgotLink}>
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className={`${styles.kickBtn} w-100`}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" />
              ) : null}
              Sign In
            </button>

            {error && (
              <div
                className={styles.errorBox}
                style={{
                  marginTop: "15px",
                  backgroundColor: "#ffdddd",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <p
                  className={styles.errorMsg}
                  style={{ color: "#cc0000", margin: 0, fontSize: "14px" }}
                >
                  ⚠ {error}
                </p>
              </div>
            )}
          </form>

          <div className={`${styles.divider} my-4`}>
            <span>Or continue with</span>
          </div>

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

        <div className={`${styles.bottomLink} text-center pb-4`}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className={styles.registerLink}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
