import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddPitch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faImage, faLocationDot, faDollarSign, faAlignLeft, faTag } from "@fortawesome/free-solid-svg-icons";

export default function AddPitch() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    pitchName: "",
    pitchImage: "",
    pitchPrice: "",
    pitchLocation: "",
    pitchDescription: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess("");
    try {
const token = localStorage.getItem("adminToken");
     await axios.post("http://localhost:8000/pitch/addpitch", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Pitch added successfully!");
      setForm({ pitchName: "", pitchImage: "", pitchPrice: "", pitchLocation: "", pitchDescription: "" });
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        setErrors(data.errors.map((e) => e.message || e));
      } else {
        setErrors([data?.msg || "Something went wrong"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.pitchBg} />
      <div className={styles.pitchOverlay} />

      <div className={styles.container}>

        {/* HEADER */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            <FontAwesomeIcon icon={faFutbol} className={styles.titleIcon} />
            Add New Pitch
          </h1>
          <p className={styles.pageSubtitle}>Fill in the details to add a new pitch</p>
        </div>

        {/* FORM */}
        <div className={styles.card}>
          <form onSubmit={handleSubmit} noValidate>

            {/* Pitch Name */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Pitch Name</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  name="pitchName"
                  className={styles.input}
                  placeholder="e.g. Al Jowhara Pitch"
                  value={form.pitchName}
                  onChange={handleChange}
                  required
                />
                <span className={styles.icon}><FontAwesomeIcon icon={faTag} /></span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Image URL</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  name="pitchImage"
                  className={styles.input}
                  placeholder="https://example.com/image.jpg"
                  value={form.pitchImage}
                  onChange={handleChange}
                  required
                />
                <span className={styles.icon}><FontAwesomeIcon icon={faImage} /></span>
              </div>
              {form.pitchImage && (
                <img src={form.pitchImage} alt="preview" className={styles.preview} />
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Price per Hour (EGP)</label>
              <div className={styles.inputWrap}>
                <input
                  type="number"
                  name="pitchPrice"
                  className={styles.input}
                  placeholder="e.g. 150"
                  value={form.pitchPrice}
                  onChange={handleChange}
                  required
                />
                <span className={styles.icon}><FontAwesomeIcon icon={faDollarSign} /></span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Location</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  name="pitchLocation"
                  className={styles.input}
                  placeholder="e.g. Hay Al Yarmouk, Riyadh"
                  value={form.pitchLocation}
                  onChange={handleChange}
                  required
                />
                <span className={styles.icon}><FontAwesomeIcon icon={faLocationDot} /></span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Description</label>
              <div className={styles.inputWrap}>
                <textarea
                  name="pitchDescription"
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Describe the pitch, type, facilities..."
                  value={form.pitchDescription}
                  onChange={handleChange}
                  required
                  rows={4}
                />
                <span className={`${styles.icon} ${styles.iconTop}`}><FontAwesomeIcon icon={faAlignLeft} /></span>
              </div>
            </div>

            {errors.length > 0 && (
              <div className={styles.errorBox}>
                {errors.map((err, i) => <p key={i} className={styles.errorMsg}>⚠ {err}</p>)}
              </div>
            )}

            {success && <div className={styles.successBox}><p>✅ {success}</p></div>}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" /> : null}
              Add Pitch
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
