const router   = require("express").Router();
const Platform = require("../models/Platform");
const { protect } = require("../middleware/auth");

// GET all platforms
router.get("/", async (req, res) => {
  try {
    const platforms = await Platform.find().sort({ name: 1 });
    res.json(platforms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create platform
router.post("/", protect, async (req, res) => {
  try {
    const platform = await Platform.create(req.body);
    res.status(201).json(platform);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update platform
router.put("/:id", protect, async (req, res) => {
  try {
    const platform = await Platform.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!platform) return res.status(404).json({ message: "Platform not found" });
    res.json(platform);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE platform 
router.delete("/:id", protect, async (req, res) => {
  try {
    await Platform.findByIdAndDelete(req.params.id);
    res.json({ message: "Platform deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;