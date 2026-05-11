
const router   = require("express").Router();
const Game     = require("../models/Game");
const Review   = require("../models/Review");
const Contact  = require("../models/Contact");
const Category = require("../models/Category");
const Platform = require("../models/Platform");
const { protect } = require("../middleware/auth");

// GET /api/stats - Get dashboard statistics
router.get("/", protect, async (req, res) => {
  try {
    const [games, reviews, contacts, categories, platforms] = await Promise.all([
      Game.countDocuments(),
      Review.countDocuments(),
      Contact.countDocuments(),
      Category.countDocuments(),
      Platform.countDocuments(),
    ]);

    const featuredGames  = await Game.countDocuments({ featured: true });
    const recentReviews  = await Review.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("game", "title");

    const platformStats  = await Game.aggregate([
      { $group: { _id: "$platform", count: { $sum: 1 } } }
    ]);

    res.json({
      totals: { games, reviews, contacts, categories, platforms },
      featuredGames,
      recentReviews,
      platformStats,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
