import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./addpitch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faLocationDot, faDollarSign, faAlignLeft, faTag, faUpload } from "@fortawesome/free-solid-svg-icons";

export default function OwnerAddPitch() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    pitchName: "",
    pitchPrice: "",
    pitchLocation: "",
    pitchDescription: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccess("");

    try {
      const token = localStorage.getItem("ownerToken");

      const formData = new FormData();
      formData.append("pitchName", form.pitchName);
      formData.append("pitchPrice", form.pitchPrice);
      formData.append("pitchLocation", form.pitchLocation);
      formData.append("pitchDescription", form.pitchDescription);
      if (imageFile) formData.append("pitchImage", imageFile);

      await axios.post("http://localhost:8000/owner/add-pitch", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Pitch added successfully!");
      setForm({ pitchName: "", pitchPrice: "", pitchLocation: "", pitchDescription: "" });
      setImageFile(null);
      setPreview(null);
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
        <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            <FontAwesomeIcon icon={faFutbol} className={styles.titleIcon} />
            Add New Pitch
          </h1>
          <p className={styles.pageSubtitle}>Fill in the details to list your pitch</p>
        </div>

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

            {/* Image Upload */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Pitch Image</label>
              <label className={styles.uploadArea}>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                {preview ? (
                  <img src={preview} alt="preview" className={styles.preview} />
                ) : (
                  <div className={styles.uploadPlaceholder}>
                    <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon} />
                    <p>Click to upload image</p>
                    <span>JPG, PNG, WEBP — Max 3MB</span>
                  </div>
                )}
              </label>
            </div>

            {/* Price */}
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

            {/* Location */}
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Location</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  name="pitchLocation"
                  className={styles.input}
                  placeholder="e.g. Hay Al Yarmouk, Cairo"
                  value={form.pitchLocation}
                  onChange={handleChange}
                  required
                />
                <span className={styles.icon}><FontAwesomeIcon icon={faLocationDot} /></span>
              </div>
            </div>

            {/* Description */}
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