
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  getGames, createGame, updateGame, deleteGame,
  getCategories, getPlatforms,
} from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/admin/admin.css";

const EMPTY_FORM = {
  title: "", description: "", genre: "",
  price: "", platform: "PC", rating: 0,
  image: "", downloadUrl: "", featured: false,
};


export default function GamesPage() {
  const [games, setGames]     = useState([]);
    const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);

  const fetchGames = () => {
    setLoading(true);
   Promise.all([getGames(), getCategories(), getPlatforms()])
      .then(([gamesRes, catsRes, platsRes]) => {
        setGames(gamesRes.data);
        setCategories(catsRes.data);
        setPlatforms(platsRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchGames(); }, []);

  const openCreate = () => {
    setEditing(null);
      setForm({
      ...EMPTY_FORM,
      genre:    categories[0]?.name || "",
      platform: platforms[0]?.name  || "",
    });
    setShowModal(true);
  };

  const openEdit = (game) => {
    setEditing(game);
    setForm({
      title:       game.title,
      description: game.description,
      genre:       game.genre,
      price:       game.price,
      platform:    game.platform,
      rating:      game.rating,
      image:       game.image || "",
      downloadUrl: game.downloadUrl || "",
      featured:    game.featured || false,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateGame(editing._id, form);
      } else {
        await createGame(form);
      }
      setShowModal(false);
      fetchGames();
      Swal.fire({
        icon: "success",
        title: editing ? "Game Updated!" : "Game Created!",
        timer: 1500,
        showConfirmButton: false,
        background: "#13131e",
        color: "#f1f1f1",
        iconColor: "#2ecc71",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
        background: "#13131e",
        color: "#f1f1f1",
        confirmButtonColor: "#e63946",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (game) => {
    const result = await Swal.fire({
      title: "Delete Game?",
      text: `Are you sure you want to delete "${game.title}"?`,
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
      await deleteGame(game._id);
      fetchGames();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
        background: "#13131e",
        color: "#f1f1f1",
        iconColor: "#2ecc71",
      });
    } catch (err) {
      Swal.fire({
        icon: "error", title: "Error",
        text: err.response?.data?.message || "Could not delete",
        background: "#13131e", color: "#f1f1f1",
        confirmButtonColor: "#e63946",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <h2 className="admin-page-title">
          Game <span>Catalog</span>
        </h2>
        <button className="btn-admin-primary" onClick={openCreate}>
          ＋ Add Game
        </button>
      </div>

      {/* ── Table ── */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <span className="admin-table-title">
            All Games ({games.length})
          </span>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"/></div>
        ) : games.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">🎮</div>
            <p>No games yet. Add your first game!</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Platform</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map(game => (
                <tr key={game._id}>
                  <td>
                    {game.image ? (
                      <img
                        src={game.image}
                        alt={game.title}
                        style={{
                          width: 48, height: 36,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                        onError={e => e.target.style.display = "none"}
                      />
                    ) : (
                      <span style={{ fontSize: "1.5rem" }}>🎮</span>
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{game.title}</td>
                  <td style={{ color: "var(--muted)" }}>{game.genre}</td>
                  <td>
                    <span className="badge badge-platform">{game.platform}</span>
                  </td>
                  <td style={{ color: "var(--accent2)", fontWeight: 600 }}>
                    {game.price === 0 ? "FREE" : `$${game.price}`}
                  </td>
                  <td style={{ color: "#f4c430" }}>
                    {"★".repeat(Math.round(game.rating))}
                  </td>
                  <td>
                    {game.featured ? (
                      <span className="badge badge-featured">⭐ Yes</span>
                    ) : (
                      <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>—</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn-admin-edit"
                        onClick={() => openEdit(game)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-admin-danger"
                        onClick={() => handleDelete(game)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Create / Edit Modal ── */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered size="lg"
        className="admin-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Edit Game" : "Add New Game"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="game-form" onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

              <div className="admin-form-group">
                <label className="admin-form-label">Title *</label>
                <input className="admin-form-input" name="title"
                  value={form.title} onChange={handleChange} required />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Genre *</label>
                <select className="admin-form-select" name="genre"
                  value={form.genre} onChange={handleChange} required>
                  <option value="">-- Select Genre --</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Price ($) *</label>
                <input className="admin-form-input" name="price"
                  type="number" min="0" step="0.01"
                  value={form.price} onChange={handleChange} required />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Platform *</label>
                <select className="admin-form-select" name="platform"
                  value={form.platform} onChange={handleChange} required>
                  <option value="">-- Select Platform --</option>
                  {platforms.map(p => (
                    <option key={p._id} value={p.name}>
                      {p.icon} {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Image Path</label>
                <input className="admin-form-input" name="image"
                  placeholder="/images/game.jpg"
                  value={form.image} onChange={handleChange} />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Download URL</label>
                <input className="admin-form-input" name="downloadUrl"
                  placeholder="https://..."
                  value={form.downloadUrl} onChange={handleChange} />
              </div>

            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description *</label>
              <textarea className="admin-form-input" name="description"
                rows={3} value={form.description}
                onChange={handleChange} required />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox" id="featured"
                name="featured" checked={form.featured}
                onChange={handleChange}
                style={{ width: 16, height: 16, cursor: "pointer" }}
              />
              <label htmlFor="featured" style={{
                color: "var(--muted)", fontSize: "0.85rem", cursor: "pointer"
              }}>
                Mark as Featured Game
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-admin-edit"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn-admin-primary"
            type="submit" form="game-form"
            disabled={saving}
          >
            {saving ? "Saving..." : editing ? "Update Game" : "Create Game"}
          </button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
}
