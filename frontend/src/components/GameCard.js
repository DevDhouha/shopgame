
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addReview, getReviews } from "../api";
import "../styles/game-card.css";

const stars = (n) => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

// ── Review Modal ─────────────────────────────────────────
function ReviewModal({ game, show, onClose }) {
  const [reviews, setReviews]     = useState([]);
  const [loaded, setLoaded]       = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ author: "", comment: "", rating: 5 });

  React.useEffect(() => {
    if (!show) return;
    setSubmitted(false);
    setLoaded(false);
 
  }, [show, game._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview({ ...form, game: game._id });
    setSubmitted(true);
    const res = await getReviews(game._id);
    setReviews(res.data);
    setForm({ author: "", comment: "", rating: 5 });
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      contentClassName="modal-custom"
      enforceFocus={false}
      restoreFocus={false}
      style={{ zIndex: 99999 }}
    >
      {/* ── Header ── */}
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title className="modal__title">
          ADD REVIEWS — <span className="modal__game-name">{game.title}</span>
        </Modal.Title>
      </Modal.Header>

      {/* ── Body ── */}
      <Modal.Body>
      

        {!submitted ? (
          <form onSubmit={handleSubmit} className="modal__form">
            <input
              className="modal__input"
              placeholder="Your name"
              value={form.author}
              onChange={e => setForm({ ...form, author: e.target.value })}
              required
            />
            <textarea
              className="modal__input"
              rows={3}
              placeholder="Your review..."
              value={form.comment}
              onChange={e => setForm({ ...form, comment: e.target.value })}
              required
            />
            <select
              className="modal__select"
              value={form.rating}
              onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>
                  {stars(n)} — {n} star{n !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <button type="submit" className="modal__submit">
              SUBMIT REVIEW
            </button>
          </form>
        ) : (
          <p className="modal__success">✅ Review submitted! Thank you.</p>
        )}
      </Modal.Body>

      {/* ── Footer ── */}
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          CLOSE
        </Button>
      </Modal.Footer>

    </Modal>
  );
}

// ── GameCard ─────────────────────────────────────────────
export default function GameCard({ game }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="game-card">

        {/* ── Image ── */}
        <div className="game-card__image-wrapper">
          {game.image ? (
            <img
              src={game.image}
              alt={game.title}
              className="game-card__image"
              onError={e => e.target.style.display = "none"}
            />
          ) : (
            <div className="game-card__no-image">🎮</div>
          )}
          <span className="game-card__platform">{game.platform}</span>
          {game.featured && (
            <span className="game-card__featured">⭐ FEATURED</span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="game-card__body">
          <div className="game-card__header">
            <h3 className="game-card__title">{game.title}</h3>
            <span className="game-card__price">
              {game.price === 0 ? "FREE" : `$${game.price}`}
            </span>
          </div>

          <p className="game-card__genre">{game.genre}</p>
          <p className="game-card__description">{game.description}</p>

          {/* ── Clickable Stars ── */}
          <div
            className="game-card__stars"
            onClick={() => setShowModal(true)}
            title="Click to read & add reviews"
          >
            {stars(game.rating)}
            <span className="game-card__stars-hint">▸ reviews</span>
          </div>

          {/* ── Download Button ── */}
          
           <a href={game.downloadUrl || "#"}
            className="game-card__download"
            target="_blank"
            rel="noreferrer"
          >
            ⬇ DOWNLOAD
          </a>
        </div>
      </div>

      {/* ── Modal ── */}
      <ReviewModal
        game={game}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
