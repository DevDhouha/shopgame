
const mongoose = require("mongoose");
const Admin    = require("./models/Admin");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Admin.deleteMany({});

    await Admin.create({
      username: process.env.ADMIN_USERNAME || "admin",
      password: process.env.ADMIN_PASSWORD || "shopgame2026",
    });

    console.log("✅ Admin created!");
    console.log("   Username:", process.env.ADMIN_USERNAME || "admin");
    console.log("   Password:", process.env.ADMIN_PASSWORD || "shopgame2026");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedAdmin();
