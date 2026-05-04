import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0 5%", height: "70px",
    background: scrolled ? "rgba(10,10,15,0.95)" : "#000a0f",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    borderBottom: scrolled ? "1px solid var(--border)" : "none",
    transition: "all 0.3s ease",
  };

  const links = ["Home", "About", "Games", "Contact"];

  return (
    <nav style={navStyle}>
      <div style={{ fontFamily: "'Bebas Neue'", fontSize: "1.8rem", letterSpacing: "3px" }}>
        SHOP<span style={{ color: "var(--accent)" }}>GAME</span>
      </div>
      <div style={{ display: "flex", gap: "32px" }}>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{
              color: "var(--text)", textDecoration: "none",
              fontFamily: "'Bebas Neue'", fontSize: "1.1rem",
              letterSpacing: "2px", transition: "color 0.2s",
            }}
            onMouseOver={e => e.target.style.color = "var(--accent)"}
            onMouseOut={e => e.target.style.color = "var(--text)"}
          >{link}</a>
        ))}
      </div>
    </nav>
  );
}
