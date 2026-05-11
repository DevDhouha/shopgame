
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { deleteContact } from "../../api";
import AdminLayout from "../../components/admin/AdminLayout";
import "../../styles/admin/admin.css";
import axios from "axios";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

 const fetchContacts = () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    axios.get(
      `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/contact`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(res => setContacts(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  };

  useEffect(() => { fetchContacts(); }, []);
 const handleDelete = async (contact) => {
    const result = await Swal.fire({
      title: "Delete Message?",
      text: `Delete message from "${contact.name}"?`,
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
      await deleteContact(contact._id);
      fetchContacts();
      Swal.fire({
        icon: "success", title: "Deleted!",
        timer: 1200, showConfirmButton: false,
        background: "#13131e", color: "#f1f1f1", iconColor: "#2ecc71",
      });
    } catch (err) {
      Swal.fire({
        icon: "error", title: "Error",
        text: "Could not delete message",
        background: "#13131e", color: "#f1f1f1",
        confirmButtonColor: "#e63946",
      });
    }
  };
  return (
    <AdminLayout>
      <div className="admin-page-header">
        <h2 className="admin-page-title">
          Contact <span>Messages</span>
        </h2>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <span className="admin-table-title">
            All Messages ({contacts.length})
          </span>
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-spinner"/></div>
        ) : contacts.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">✉️</div>
            <p>No messages yet.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c._id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td style={{ color: "var(--muted)" }}>{c.email}</td>
                  <td style={{
                    maxWidth: 260,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "var(--muted)",
                    fontSize: "0.85rem",
                  }}>
                    {c.message}
                  </td>
                  <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
                    {new Date(c.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td>
                   <button
                        className="btn-admin-danger"
                        onClick={() => handleDelete(c)}
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
