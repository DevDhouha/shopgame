
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin/admin.css";

const NAV_ITEMS = [
  {
    section: "Main",
    links: [
      { path: "/admin/dashboard",  icon: "📊", label: "Dashboard"  },
    ]
  },
  {
    section: "Manage",
    links: [
      { path: "/admin/games",      icon: "🎮", label: "Games"      },
      { path: "/admin/categories", icon: "🏷️",  label: "Categories" },
      { path: "/admin/platforms",  icon: "🕹️",  label: "Platforms"  },
      { path: "/admin/reviews",    icon: "⭐", label: "Reviews"    },
    ]
  },
  {
    section: "Store",
    links: [
      { path: "/admin/contacts",   icon: "✉️",  label: "Contacts"   },
    ]
  }
];

export default function Sidebar() {
  const { admin, logout } = useAuth();
  const navigate          = useNavigate();
  const location          = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      {/* ── Logo ── */}
      <div className="sidebar__logo">
        <img src="/images/logo.png" alt="ShopGame Logo" width={200} height={100} />
      </div>

      {/* ── Navigation ── */}
      {NAV_ITEMS.map(section => (
        <div key={section.section} className="sidebar__section">
          <div className="sidebar__section-label">{section.section}</div>
          <nav className="sidebar__nav">
            {section.links.map(link => (
              <button
                key={link.path}
                className={`sidebar__link ${isActive(link.path) ? "active" : ""}`}
                onClick={() => navigate(link.path)}
              >
                <span className="sidebar__link-icon">{link.icon}</span>
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      ))}

      {/* ── Footer ── */}
      <div className="sidebar__footer">
        <div className="sidebar__admin-info">
          <div className="sidebar__admin-avatar">
            {admin?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="sidebar__admin-name">{admin?.username}</div>
            <div className="sidebar__admin-role">Administrator</div>
          </div>
        </div>

        <button className="sidebar__logout" onClick={handleLogout}>
          🚪 Sign out
        </button>
      </div>
    </aside>
  );
}
