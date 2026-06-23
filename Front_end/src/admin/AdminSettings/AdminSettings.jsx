import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    cancellationPolicy: "24h",
    emailNotifications: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:8000/settings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSettings(res.data.settings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSuccess("");
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put("http://localhost:8000/settings", settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Settings saved successfully!");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading settings...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#1a202c" }}>⚙️ Settings</h2>

      <div style={{ background: "white", borderRadius: "10px", padding: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", maxWidth: "600px" }}>

         <div style={{ marginBottom: "24px" }}>
          <h3 style={{ color: "#2d3748", marginBottom: "8px", fontSize: "1rem" }}>Cancellation Policy</h3>
          <select
            value={settings.cancellationPolicy}
            onChange={(e) => setSettings({ ...settings, cancellationPolicy: e.target.value })}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.95rem" }}
          >
            <option value="24h">24 hours before booking</option>
            <option value="12h">12 hours before booking</option>
            <option value="none">No cancellation allowed</option>
          </select>
        </div>

         <div style={{ marginBottom: "24px" }}>
          <h3 style={{ color: "#2d3748", marginBottom: "8px", fontSize: "1rem" }}>Notifications</h3>
          <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
            />
            <span style={{ color: "#4a5568" }}>Email notifications for new bookings</span>
          </label>
        </div>

         {success && (
          <div style={{ background: "#dcfce7", color: "#16a34a", padding: "10px", borderRadius: "8px", marginBottom: "12px", fontSize: "0.9rem" }}>
            ✅ {success}
          </div>
        )}
        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px", borderRadius: "8px", marginBottom: "12px", fontSize: "0.9rem" }}>
            ⚠ {error}
          </div>
        )}

         <button
          onClick={handleSave}
          disabled={saving}
          style={{
            background: "#a3e635", color: "#111", border: "none",
            padding: "10px 24px", borderRadius: "8px", fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer", fontSize: "0.95rem",
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}