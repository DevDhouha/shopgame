
import React, { useState, useEffect } from "react";
import "../styles/hero.css";

const SLIDES = [
  {
    id: 1,
    image: "/images/cute-cat-nature.jpg?w=1600&q=80",
    label: "NATURE & SIMULATION",
  },
  {
    id: 2,
    image: "/images/full-shot-men-playing-sports.jpg?w=1600&q=80",
    label: "SPORTS & RACING",
  },
  {
    id: 3,
    image: "/images/man-wearing-vr-glasses-gaming.jpg?w=1600&q=80",
    label: "ACTION & ADVENTURE",
  },
  {
    id: 4,
    image: "/images/view-3d-video-game-controller.jpg?w=1600&q=80",
    label: "MULTIPLAYER",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">

      {/* ── Background Slider ── */}
      <div className="hero__slider">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* ── Overlay & Grid ── */}
      <div className="hero__overlay" />
      <div className="hero__grid" />

      {/* ── Main Content ── */}
      <div className="hero__content">
       
        <h1 className="hero__title">
          THE BEST
          <span>GAMES</span><br />
          ARE HERE
        </h1>

        <p className="hero__subtitle">
          Discover top-rated games across all platforms.
          Rated by real players, curated for champions.
        </p>

        <div className="hero__buttons">
          <a href="#games" className="btn--primary">BROWSE GAMES</a>
          <a href="#contact" className="btn--outline">CONTACT US</a>
        </div>

        {/* ── Dots navigation ── */}
        <div className="hero__dots">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              className={`hero__dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

    

    </section>
  );
}
