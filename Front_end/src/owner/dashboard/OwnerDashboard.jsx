import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { to: "/owner/dashboard",  icon: "📊", label: "Overview" },
  { to: "/owner/add-pitch",  icon: "➕", label: "Add New Pitch" },
  { to: "/owner/pitches",    icon: "⚽", label: "My Pitches" },
  { to: "/owner/bookings",   icon: "📅", label: "Bookings" },
  { to: "/owner/reviews",    icon: "⭐", label: "Reviews" },
  { to: "/owner/settings",   icon: "⚙️", label: "Settings" },
];

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const ownerName = localStorage.getItem("ownerName") || "Owner";

  const handleLogout = () => {
    localStorage.removeItem("ownerToken");
    localStorage.removeItem("ownerEmail");
    localStorage.removeItem("ownerName");
    navigate("/owner/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Cairo, sans-serif" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "250px", background: "#1a202c", color: "white",
        padding: "20px", display: "flex", flexDirection: "column",
        justifyContent: "space-between", flexShrink: 0
      }}>
        <div>
          {/* BRAND */}
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ margin: 0, color: "#a3e635", letterSpacing: "1px", fontSize: "1.1rem" }}>
              ⚽ Kick Slot
            </h3>
            <p style={{ margin: "4px 0 0", color: "#718096", fontSize: "0.75rem" }}>
              Owner Portal
            </p>
          </div>

          {/* OWNER INFO */}
          <div style={{
            background: "rgba(163,230,53,0.1)", border: "1px solid rgba(163,230,53,0.2)",
            borderRadius: "10px", padding: "10px 12px", marginBottom: "16px"
          }}>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#718096" }}>Logged in as</p>
            <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: "#a3e635" }}>{ownerName}</p>
          </div>

          <hr style={{ borderColor: "#2d3748", marginBottom: "16px" }} />

          {/* NAV ITEMS */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map(item => {
              const isActive = location.pathname === item.to;
              return (
                <li key={item.to} style={{ marginBottom: "4px" }}>
                  <Link
                    to={item.to}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "10px 12px", borderRadius: "8px",
                      color: isActive ? "#a3e635" : "rgba(255,255,255,0.75)",
                      background: isActive ? "rgba(163,230,53,0.1)" : "transparent",
                      textDecoration: "none", fontSize: "0.9rem",
                      borderLeft: isActive ? "3px solid #a3e635" : "3px solid transparent",
                      transition: "all 0.2s"
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            background: "#e53e3e", color: "white", border: "none",
            padding: "10px 15px", borderRadius: "8px", cursor: "pointer",
            width: "100%", textAlign: "left", fontSize: "0.9rem",
            display: "flex", alignItems: "center", gap: "8px",
            fontFamily: "Cairo, sans-serif"
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={{
        flex: 1, padding: "24px", overflowY: "auto",
        backgroundColor: "#f7fafc"
      }}>
        <Outlet />
      </div>
    </div>
  );
}