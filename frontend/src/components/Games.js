
import React, { useEffect, useState } from "react";
import { getGames } from "../api";
import GameCard from "./GameCard";
import "../styles/game.css";

const PLATFORMS = ["All", "PC", "PS5", "Xbox", "Mobile"];

export default function Games() {
  const [games, setGames]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");

  useEffect(() => {
    getGames()
      .then(res => setGames(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All"
    ? games
    : games.filter(g => g.platform === filter);

  return (
    <section id="games" className="games">
      <h2 className="section-title">OUR <span>GAMES</span></h2>

      {/* ── Filter Buttons ── */}
      <div className="games__filters">
        {PLATFORMS.map(p => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`games__filter-btn ${filter === p ? "active" : ""}`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div className="games__loading">
          <div className="games__spinner" />
          <p>Loading games...</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="games__empty">No games found for this platform. 🎮</p>
      ) : (
        <div className="games__grid">
          {filtered.map(game => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      )}
    </section>
  );
}
