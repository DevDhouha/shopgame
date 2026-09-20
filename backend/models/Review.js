const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    game:    { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    author:  { type: String, required: true, trim: true },
    comment: { type: String, required: true },
    rating:  { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);