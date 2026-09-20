const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: "" },
    icon:        { type: String, default: "🎮" },
    color:       { type: String, default: "#e63946" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);