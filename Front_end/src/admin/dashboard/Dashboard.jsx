import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { to: "/admin/dashboard",      icon: "📊", label: "Dashboard Overview" },
  { to: "/admin/add-pitch",      icon: "➕", label: "Add New Pitch" },
  { to: "/admin/pitches",        icon: "⚽", label: "View All Pitches" },
  { to: "/admin/bookings",       icon: "📅", label: "Booking Management" },
  { to: "/admin/users",          icon: "👥", label: "User Management" },
  { to: "/admin/settings",       icon: "⚙️", label: "Settings" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Cairo, sans-serif" 
}}>

       <div style={{
        width: "250px", background: "#1a202c", color: "white",
        padding: "20px", display: "flex", flexDirection: "column",
        justifyContent: "space-between", flexShrink: 0,
        
      }}>
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ margin: 0, color: "#a3e635", letterSpacing: "1px", fontSize: "1.1rem" }}>
              ⚽ KickSlot Admin
            </h3>
            <p style={{ margin: "4px 0 0", color: "#718096", fontSize: "0.75rem" }}>
              Management Panel
            </p>
          </div>

          <hr style={{ borderColor: "#2d3748", marginBottom: "16px" }} />

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