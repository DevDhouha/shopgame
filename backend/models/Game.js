const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    genre:       { type: String, required: true },
    price:       { type: Number, required: true },
    image:       { type: String, default: "" },
    rating:      { type: Number, default: 0, min: 0, max: 5 },
    platform:    { type: String, enum: ["PC", "PS5", "Xbox", "Mobile"], default: "PC" },
    featured:    { type: Boolean, default: false },
    downloadUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);