const router  = require("express").Router();
const Contact = require("../models/Contact");

// POST contact form
router.post("/", async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: "Message received! We'll get back to you soon." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;