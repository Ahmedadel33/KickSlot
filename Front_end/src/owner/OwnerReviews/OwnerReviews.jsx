import { useEffect, useState } from "react";
import axios from "axios";

export default function OwnerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("ownerToken");
        // هنا هيربط مع الـ endpoint بتاعة التقييمات للـ owner لما تعمل الـ backend بتاعها
        const res = await axios.get("http://localhost:8000/pitch/owner-reviews", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "20px", color: "#1a202c" }}>⭐ Reviews & Ratings</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#1a202c", color: "white" }}>
          <tr>
            {["Customer Name", "Pitch", "Rating", "Comment"].map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "0.85rem" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr><td colSpan={4} style={{ padding: "20px", textAlign: "center", color: "#718096" }}>No reviews found yet</td></tr>
          ) : reviews.map((r, i) => (
            <tr key={r._id} style={{ background: i % 2 === 0 ? "#f7fafc" : "white" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600 }}>{r.userName}</td>
              <td style={{ padding: "12px 16px", color: "#718096" }}>{r.pitchName}</td>
              <td style={{ padding: "12px 16px", color: "#ffa500", fontWeight: 700 }}>{"⭐".repeat(r.rating)} ({r.rating}/5)</td>
              <td style={{ padding: "12px 16px" }}>{r.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}