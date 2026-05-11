const router  = require("express").Router();
const Contact = require("../models/Contact");
const { protect } = require("../middleware/auth");

// GET all contacts (protected)
router.get("/", protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST contact form
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: "Message received! We'll get back to you soon." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE contact (protected)
router.delete("/:id", protect, async (req, res) => {
  try { 
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});

module.exports = router;