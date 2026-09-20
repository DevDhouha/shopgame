
import React, { useEffect, useState } from "react";
import { getGames,getPlatforms } from "../api";
import GameCard from "./GameCard";
import "../styles/game.css";



export default function Games() {
  const [games, setGames]     = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("All");

  useEffect(() => {
    Promise.all([getGames(), getPlatforms()])
      .then(([gamesRes, platsRes]) => {
        setGames(gamesRes.data);
        setPlatforms(platsRes.data);
      })
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
        {platforms.map(p => (
            <button
            key={p._id}
            onClick={() => setFilter(p.name)}
            className={`games__filter-btn ${filter === p.name ? "active" : ""}`}
          >
            {p.icon} {p.name}
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
