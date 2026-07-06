import { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerPitches() {
  const [pitches, setPitches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPitch, setEditPitch] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("ownerToken");

  const fetchPitches = async () => {
    try {
      const res = await axios.get("http://localhost:8000/pitch/adminpitch", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPitches(res.data.pitches || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPitches(); }, []);

  const handleEditOpen = (pitch) => {
    setEditPitch(pitch._id);
    setEditForm({
      pitchName: pitch.pitchName,
      pitchImage: pitch.pitchImage,
      pitchPrice: pitch.pitchPrice,
      pitchLocation: pitch.pitchLocation,
      pitchDescription: pitch.pitchDescription,
    });
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      await axios.put(`http://localhost:8000/pitch/updatepitch/${editPitch}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditPitch(null);
      fetchPitches();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/pitch/deletepitch/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeleteId(null);
      fetchPitches();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading pitches...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#1a202c" }}>⚽ My Pitches</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
          <thead style={{ background: "#1a202c", color: "white" }}>
            <tr>
              {["Image", "Name", "Location", "Price/hr", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.85rem" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pitches.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "20px", textAlign: "center", color: "#718096" }}>No pitches found</td></tr>
            ) : pitches.map((p, i) => (
              <tr key={p._id} style={{ background: i % 2 === 0 ? "#f7fafc" : "white" }}>
                <td style={{ padding: "12px 16px" }}>
                  <img src={p.pitchImage} alt={p.pitchName} style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "6px" }} />
                </td>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>{p.pitchName}</td>
                <td style={{ padding: "12px 16px", color: "#718096" }}>{p.pitchLocation}</td>
                <td style={{ padding: "12px 16px", color: "#16a34a", fontWeight: 700 }}>{p.pitchPrice} EGP</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleEditOpen(p)}
                      style={{ background: "#a3e635", color: "#111", border: "none", padding: "6px 14px", borderRadius: "6px", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(p._id)}
                      style={{ background: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 14px", borderRadius: "6px", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editPitch && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "24px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ marginBottom: "16px" }}>✏️ Edit Pitch</h3>
            {[
              { label: "Pitch Name", key: "pitchName", type: "text" },
              { label: "Image URL", key: "pitchImage", type: "text" },
              { label: "Price (EGP)", key: "pitchPrice", type: "number" },
              { label: "Location", key: "pitchLocation", type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key} style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px", color: "#4a5568" }}>{label}</label>
                <input
                  type={type}
                  value={editForm[key]}
                  onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.9rem" }}
                />
              </div>
            ))}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px", color: "#4a5568" }}>Description</label>
              <textarea
                value={editForm.pitchDescription}
                onChange={(e) => setEditForm({ ...editForm, pitchDescription: e.target.value })}
                rows={3}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "0.9rem", resize: "none" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button onClick={() => setEditPitch(null)} style={{ padding: "8px 18px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleEditSave} disabled={saving} style={{ padding: "8px 18px", borderRadius: "8px", background: "#a3e635", border: "none", fontWeight: 700, cursor: "pointer" }}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: "16px", padding: "24px", width: "100%", maxWidth: "360px", textAlign: "center" }}>
            <p style={{ fontSize: "3rem", margin: 0 }}>🗑</p>
            <h3 style={{ margin: "12px 0 8px" }}>Delete Pitch?</h3>
            <p style={{ color: "#718096", fontSize: "0.9rem", marginBottom: "20px" }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: "8px 20px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "white", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: "8px 20px", borderRadius: "8px", background: "#dc2626", color: "white", border: "none", fontWeight: 700, cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}