import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { BrowsePitches, PitchDetails } from "./pages/Pitches/Pitches";
import OwnerDashboard from "./owner/dashboard/OwnerDashboard";
import OwnerLogin from "./owner/OwnerLogin/OwnerLogin";
import OwnerGuard from "./components/guard/OwnerGuard";
import OwnerOverview from "./owner/ownerOverview/OwnerOverview";
import OwnerAddPitch from "./owner/addpitch/AddPitch";
import OwnerPitches from "./owner/OwnerPitches/OwnerPitches";
import OwnerBookings from "./owner/OwnerBookings/OwnerBookings";
import OwnerReviews from "./owner/OwnerReviews/OwnerReviews";
import OwnerSettings from "./owner/OwnerSettings/OwnerSettings";

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

        <Route path="/owner/login" element={<OwnerLogin />} />

        <Route element={<OwnerGuard />}>
          <Route element={<OwnerDashboard />}>
            <Route path="/owner/dashboard" element={<OwnerOverview />} />
            <Route path="/owner/add-pitch" element={<OwnerAddPitch />} />
            <Route path="/owner/pitches" element={<OwnerPitches />} />
            <Route path="/owner/bookings" element={<OwnerBookings />} />
            <Route path="/owner/reviews" element={<OwnerReviews />} />
            <Route path="/owner/settings" element={<OwnerSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}