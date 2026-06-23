import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowsePitches, PitchDetails } from "./pages/Pitches/Pitches";
import AddPitch from "./admin/AddPitch";
import AdminLogin from "./admin/AdminLogin";
import AdminGuard from "./components/guard/AdminGuard";
import Dashboard from "./admin/dashboard/Dashboard"; 
import AdminOverview from "./admin/adminOverwiew/AdminOverview"; 
import AdminPitches from "./admin/AdminPitches/AdminPitches";
import AdminBookings from "./admin/AdminBookings/AdminBookings";
import AdminUsers from "./admin/AdminUsers/AdminUsers";
import AdminSettings from "./admin/AdminSettings/AdminSettings";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
export default function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pitches" element={<BrowsePitches />} />
        <Route path="/pitch/:id" element={<PitchDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
<Route element={<AdminGuard />}>
  <Route element={<Dashboard />}>
    <Route path="/admin/dashboard" element={<AdminOverview />} />
    <Route path="/admin/add-pitch" element={<AddPitch />} />
    <Route path="/admin/pitches" element={<AdminPitches />} />
    <Route path="/admin/bookings" element={<AdminBookings />} />
    <Route path="/admin/users" element={<AdminUsers />} />
    <Route path="/admin/settings" element={<AdminSettings />} />
    
  </Route>
</Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
         <Footer />
    </Router>
  );
}