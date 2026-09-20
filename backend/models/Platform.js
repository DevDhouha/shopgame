const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: "" },
    icon:        { type: String, default: "🎮" },
    color:       { type: String, default: "#3b82f6" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Platform", platformSchema);