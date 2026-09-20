
const mongoose  = require("mongoose");
const Platform  = require("./models/Platform");
require("dotenv").config();

const platforms = [
  { name: "PC",     icon: "🖥️",  color: "#3b82f6", description: "Windows / Mac / Linux" },
  { name: "PS5",    icon: "🎮",  color: "#003791", description: "PlayStation 5" },
  { name: "Xbox",   icon: "🟢",  color: "#107C10", description: "Xbox Series X/S" },
  { name: "Mobile", icon: "📱",  color: "#f59e0b", description: "iOS / Android" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    await Platform.deleteMany({});
    await Platform.insertMany(platforms);
    console.log("✅ Platforms seeded!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seed();
