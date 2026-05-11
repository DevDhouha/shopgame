
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  getCategories, createCategory, updateCategory, deleteCategory
} from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/admin/admin.css";

const EMPTY_FORM = {
  name: "", description: "", color: "#e63946"
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [saving, setSaving]         = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    getCategories()
      .then(res => setCategories(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({
      name:        cat.name,
      description: cat.description,
      // icon:        cat.icon,
      color:       cat.color,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await updateCategory(editing._id, form);
      } else {
        await createCategory(form);
      }
      setShowModal(false);
      fetchCategories();
      Swal.fire({
        icon: "success",
        title: editing ? "Category Updated!" : "Category Created!",
        timer: 1500,
        showConfirmButton: false,
        background: "#13131e",
        color: "#f1f1f1",
        iconColor: "#2ecc71",
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

  const handleDelete = async (cat) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: `Are you sure you want to delete "${cat.name}"?`,
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
      await deleteCategory(cat._id);
      fetchCategories();
      Swal.fire({
        icon: "success", title: "Deleted!",
        timer: 1200, showConfirmButton: false,
        background: "#13131e", color: "#f1f1f1",
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
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AdminLayout>
      {/* ── Page Header ── */}
      <div className="admin-page-header">
        <h2 className="admin-page-title">
          Game <span>Categories</span>
        </h2>
        <button className="btn-admin-primary" onClick={openCreate}>
          ＋ Add Category
        </button>
      </div>

      {/* ── Table ── */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <span className="admin-table-title">
            All Categories ({categories.length})
          </span>
        </div>
      {loading ? (
        <div className="admin-loading"><div className="admin-spinner"/></div>
      ) : categories.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">🏷️</div>
          <p>No categories yet. Create your first one!</p>
        </div>
      ) : (
<table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Color</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat._id}>
                  {/* ── Name ── */}
                  <td>
                    <span style={{
                      fontFamily: "'Bebas Neue'",
                      fontSize: "1.1rem",
                      letterSpacing: 1,
                      color: cat.color,
                    }}>
                      {cat.name}
                    </span>
                  </td>

                  {/* ── Description ── */}
                  <td style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                    {cat.description || "—"}
                  </td>

                  {/* ── Color ── */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 20, height: 20,
                        borderRadius: 4,
                        background: cat.color,
                        flexShrink: 0,
                      }}/>
                      <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                        {cat.color}
                      </span>
                    </div>
                  </td>

                

                  {/* ── Actions ── */}
                  <td>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-admin-edit" onClick={() => openEdit(cat)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-admin-danger" onClick={() => handleDelete(cat)}>
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
        centered
        className="admin-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="cat-form" onSubmit={handleSave}>
            <div className="admin-form-group">
              <label className="admin-form-label">Name *</label>
              <input className="admin-form-input" name="name"
                placeholder="e.g. Action, RPG..."
                value={form.name} onChange={handleChange} required />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <input className="admin-form-input" name="description"
                placeholder="Short description..."
                value={form.description} onChange={handleChange} />
            </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Color</label>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input
                    type="color"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    style={{ width: 48, height: 38, borderRadius: 8, border: "none", cursor: "pointer", background: "none" }}
                  />
                  <input className="admin-form-input" name="color"
                    value={form.color} onChange={handleChange}
                    placeholder="#e63946" />
                </div>
              </div>
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-admin-edit" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className="btn-admin-primary"
            type="submit" form="cat-form"
            disabled={saving}
          >
            {saving ? "Saving..." : editing ? "Update" : "Create"}
          </button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
}
