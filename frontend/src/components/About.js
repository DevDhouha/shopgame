import React from "react";
import "../styles/about.css";
export default function About() {
  const stats = [
    { value: "500+", label: "Games" },
    { value: "50K+", label: "Players" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <section id="about" className="about">
      <h2 className="section-title">ABOUT <span>US</span></h2>
      <div className="about-content">
        <div className="about-text">
          ShopGame is your ultimate destination for discovering, reviewing, and celebrating the best video games across all platforms.
          We bring together a passionate community of gamers to share honest reviews and recommendations.
        </div>
        <div className="about-stats">
          {stats.map(s => (
            <div key={s.label} className="about-stat">
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}