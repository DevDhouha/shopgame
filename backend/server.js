const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ─── Middleware ───────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────
app.use("/api/auth",       require("./routes/auth"));
app.use("/api/games",   require("./routes/games"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/platforms",  require("./routes/platforms"));
app.use("/api/stats",      require("./routes/stats"));
// ─── Health check ────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "ShopGame API is running 🎮" });
});

// ─── Error handler ───────────────────────────────
app.use(require("./middleware/errorHandler"));

// ─── Connect to MongoDB + Start server ───────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });