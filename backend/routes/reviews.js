const router = require("express").Router();
const Review = require("../models/Review");
const Game   = require("../models/Game");
const { protect } = require("../middleware/auth");
// GET reviews for a game
router.get("/:gameId", async (req, res) => {
  try {
    const reviews = await Review.find({ game: req.params.gameId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET all reviews
router.get("/", protect, async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate("game", "title platform");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST add a review
router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);

    // Update game average rating
    const reviews = await Review.find({ game: req.body.game });
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Game.findByIdAndUpdate(req.body.game, { rating: avg.toFixed(1) });

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE review 
router.delete("/:id", protect, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;