
import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/admin/admin.css";

const PAGE_TITLES = {
  "/admin/dashboard":  { title: "Dashboard",  sub: "Overview of your store" },
  "/admin/games":      { title: "Games",       sub: "Manage your game catalog" },
  "/admin/categories": { title: "Categories",  sub: "Manage game categories" },
  "/admin/reviews":    { title: "Reviews",     sub: "Manage user reviews" },
  "/admin/contacts":   { title: "Contacts",    sub: "View contact messages" },
};

export default function AdminHeader() {
  const location = useLocation();
  const page     = PAGE_TITLES[location.pathname] || { title: "Admin", sub: "" };

  return (
    <header className="admin-header">
      <div className="admin-header__left">
        <h1>{page.title}</h1>
        <p>{page.sub}</p>
      </div>

      <div className="admin-header__right">
        <span className="admin-header__badge">🎮 ShopGame Admin</span>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="admin-header__view-site"
        >
          🌐 View Site
        </a>
      </div>
    </header>
  );
}
