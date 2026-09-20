
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllReviews, deleteReview } from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/admin/admin.css";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("");

  const fetchReviews = () => {
    setLoading(true);
    getAllReviews()
      .then(res => setReviews(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleDelete = async (review) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: `Delete review by "${review.author}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#2a2a3a",
      confirmButtonText: "Yes, delete",
      background: "#13131e",
      color: "#f1f1f1",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteReview(review._id);
      fetchReviews();
      Swal.fire({
        icon: "success", title: "Deleted!",
        timer: 1200, showConfirmButton: false,
        background: "#13131e", color: "#f1f1f1",
        iconColor: "#2ecc71",
      });
    } catch (err) {
      Swal.fire({
        icon: "error", title: "Error",
        text: "Could not delete review",
        background: "#13131e", color: "#f1f1f1",
        confirmButtonColor: "#e63946",
      });
    }
  };

  const filtered = reviews.filter(r =>
    r.author?.toLowerCase().includes(filter.toLowerCase()) ||
    r.game?.title?.toLowerCase().includes(filter.toLowerCase()) ||
    r.comment?.toLowerCase().includes(filter.toLowerCase())
  );

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <h2 className="admin-page-title">
          User <span>Reviews</span>
        </h2>
        <input
          className="admin-form-input"
          style={{ width: 260 }}
          placeholder="🔍 Search reviews..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* ── Table ── */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <span className="admin-table-title">
            All Reviews ({filtered.length})
          </span>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"/></div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">⭐</div>
            <p>No reviews found.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Game</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(review => (
                <tr key={review._id}>
                  <td style={{ fontWeight: 600 }}>{review.author}</td>
                  <td>
                    <span className="badge badge-platform">
                      {review.game?.title || "—"}
                    </span>
                  </td>
                  <td style={{ color: "#f4c430", letterSpacing: 2 }}>
                    {stars(review.rating)}
                  </td>
                  <td style={{
                    maxWidth: 280,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                  }}>
                    {review.comment}
                  </td>
                  <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                    {new Date(review.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td>
                    <button
                      className="btn-admin-danger"
                      onClick={() => handleDelete(review)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
