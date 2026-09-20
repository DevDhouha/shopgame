
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  getPlatforms, createPlatform, updatePlatform, deletePlatform
} from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/admin/admin.css";

const EMPTY_FORM = { name: "", description: "", icon: "🎮", color: "#3b82f6" };

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);

  const fetchPlatforms = () => {
    setLoading(true);
    getPlatforms()
      .then(res => setPlatforms(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPlatforms(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, icon: p.icon, color: p.color });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      editing
        ? await updatePlatform(editing._id, form)
        : await createPlatform(form);
      setShowModal(false);
      fetchPlatforms();
      Swal.fire({
        icon: "success",
        title: editing ? "Platform Updated!" : "Platform Created!",
        timer: 1500, showConfirmButton: false,
        background: "#13131e", color: "#f1f1f1", iconColor: "#2ecc71",
      });
    } catch (err) {
      Swal.fire({
        icon: "error", title: "Error",
        text: err.response?.data?.message || "Something went wrong",
        background: "#13131e", color: "#f1f1f1",
        confirmButtonColor: "#e63946",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    const result = await Swal.fire({
      title: "Delete Platform?",
      text: `Delete "${p.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e63946",
      cancelButtonColor: "#2a2a3a",
      confirmButtonText: "Yes, delete",
      background: "#13131e", color: "#f1f1f1",
    });
    if (!result.isConfirmed) return;
    try {
      await deletePlatform(p._id);
      fetchPlatforms();
      Swal.fire({
        icon: "success", title: "Deleted!",
        timer: 1200, showConfirmButton: false,
        background: "#13131e", color: "#f1f1f1", iconColor: "#2ecc71",
      });
    } catch (err) {
      Swal.fire({
        icon: "error", title: "Error",
        text: "Could not delete",
        background: "#13131e", color: "#f1f1f1",
        confirmButtonColor: "#e63946",
      });
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <h2 className="admin-page-title">Game <span>Platforms</span></h2>
        <button className="btn-admin-primary" onClick={openCreate}>
          ＋ Add Platform
        </button>
      </div>

      {/* ── Table ── */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <span className="admin-table-title">
            All Platforms ({platforms.length})
          </span>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"/></div>
        ) : platforms.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">🕹️</div>
            <p>No platforms yet. Add your first one!</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Description</th>
                <th>Color</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(p => (
                <tr key={p._id}>

                  {/* ── Icon ── */}
                  <td>
                    <div style={{
                      width: 40, height: 40,
                      borderRadius: 10,
                      background: `${p.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                    }}>
                      {p.icon}
                    </div>
                  </td>

                  {/* ── Name ── */}
                  <td>
                    <span style={{
                      fontFamily: "'Bebas Neue'",
                      fontSize: "1.1rem",
                      letterSpacing: 1,
                      color: p.color,
                    }}>
                      {p.name}
                    </span>
                  </td>

                  {/* ── Description ── */}
                  <td style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                    {p.description || "—"}
                  </td>

                  {/* ── Color ── */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 20, height: 20,
                        borderRadius: 4,
                        background: p.color,
                        flexShrink: 0,
                      }}/>
                      <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                        {p.color}
                      </span>
                    </div>
                  </td>

                  {/* ── Created ── */}
                  <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                    {new Date(p.createdAt).toLocaleDateString("fr-FR")}
                  </td>

                  {/* ── Actions ── */}
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-admin-edit" onClick={() => openEdit(p)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-admin-danger" onClick={() => handleDelete(p)}>
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

      {/* ── Modal ── */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered className="admin-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Edit Platform" : "Add Platform"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="platform-form" onSubmit={handleSave}>
            <div className="admin-form-group">
              <label className="admin-form-label">Name *</label>
              <input className="admin-form-input" name="name"
                placeholder="e.g. PC, PS5, Xbox..."
                value={form.name} onChange={handleChange} required />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <input className="admin-form-input" name="description"
                placeholder="Short description..."
                value={form.description} onChange={handleChange} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Icon (emoji)</label>
                <input className="admin-form-input" name="icon"
                  placeholder="🎮" value={form.icon} onChange={handleChange} />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Color</label>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input type="color" name="color" value={form.color}
                    onChange={handleChange}
                    style={{ width: 48, height: 38, borderRadius: 8, border: "none", cursor: "pointer" }}
                  />
                  <input className="admin-form-input" name="color"
                    value={form.color} onChange={handleChange}
                    placeholder="#3b82f6" />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-admin-edit" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="btn-admin-primary"
            type="submit" form="platform-form" disabled={saving}>
            {saving ? "Saving..." : editing ? "Update" : "Create"}
          </button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
}
