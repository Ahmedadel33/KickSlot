import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:8000/auth/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#1a202c" }}>👥 User Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#1a202c", color: "white" }}>
          <tr>
            {["Name", "Email", "Phone", "Role"].map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.85rem" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={4} style={{ padding: "20px", textAlign: "center", color: "#718096" }}>No users found</td></tr>
          ) : users.map((u, i) => (
            <tr key={u._id} style={{ background: i % 2 === 0 ? "#f7fafc" : "white" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600 }}>{u.name}</td>
              <td style={{ padding: "12px 16px", color: "#718096" }}>{u.email}</td>
              <td style={{ padding: "12px 16px" }}>{u.phone}</td>
              <td style={{ padding: "12px 16px" }}>
                <span style={{
                  background: u.role === "admin" ? "#dcfce7" : "#e0f2fe",
                  color: u.role === "admin" ? "#16a34a" : "#0284c7",
                  padding: "3px 10px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700
                }}>
                  {u.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}