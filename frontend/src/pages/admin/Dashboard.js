
import React, { useEffect, useState } from "react";
import { getStats } from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/admin/admin.css";

const STAT_CARDS = [
  { key: "games",      icon: "🎮", label: "Total Games",      color: "#e63946" },
  { key: "categories", icon: "🏷️",  label: "Categories",       color: "#3b82f6" },
  { key: "reviews",    icon: "⭐", label: "Total Reviews",    color: "#f59e0b" },
  { key: "contacts",   icon: "✉️",  label: "Contact Messages", color: "#10b981" },
];

export default function DashboardPage() {
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      {loading ? (
        <div className="admin-loading">
          <div className="admin-spinner" />
        </div>
      ) : (
        <>
          {/* ── Stat Cards ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "32px"
          }}>
            {STAT_CARDS.map(card => (
              <div key={card.key} className="stat-card">
                <div className="stat-card__icon" style={{ background: `${card.color}20` }}>
                  {card.icon}
                </div>
                <div>
                  <div className="stat-card__value">
                    {stats?.totals?.[card.key] ?? 0}
                  </div>
                  <div className="stat-card__label">{card.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Recent Reviews ── */}
          <div className="admin-table-wrapper">
            <div className="admin-table-header">
              <span className="admin-table-title">Recent Reviews</span>
            </div>
            {stats?.recentReviews?.length === 0 ? (
              <div className="admin-empty">
                <div className="admin-empty-icon">⭐</div>
                <p>No reviews yet</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Game</th>
                    <th>Rating</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentReviews?.map(r => (
                    <tr key={r._id}>
                      <td>{r.author}</td>
                      <td>{r.game?.title || "—"}</td>
                   <td>
  <span style={{
    color: "#f4c430",
    letterSpacing: 2,
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    display: "inline-block",
  }}>
    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
  </span>
</td>
                      <td style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.comment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* ── Platform Stats ── */}
          <div className="admin-table-wrapper" style={{ marginTop: 24 }}>
            <div className="admin-table-header">
              <span className="admin-table-title">Games by Platform</span>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>Games</th>
                </tr>
              </thead>
              <tbody>
                {stats?.platformStats?.map(p => (
                  <tr key={p._id}>
                    <td><span className="badge badge-platform">{p._id}</span></td>
                    <td>{p.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
}