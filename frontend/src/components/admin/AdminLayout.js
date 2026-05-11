
import React from "react";
import Sidebar     from "./Sidebar";
import AdminHeader from "./Header";
import "../../styles/admin/admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
