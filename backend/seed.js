
const mongoose = require("mongoose");
const Game = require("./models/Game");
require("dotenv").config();

const games = [
  {
    title: "Cyberpunk 2077",
    description: "An open-world action RPG set in the megalopolis of Night City.",
    genre: "RPG",
    price: 59.99,
    platform: "PC",
    rating: 4,
    featured: true,
    image: "/images/cyberpunk.jpg",
    downloadUrl: "https://store.steampowered.com/agecheck/app/1091500/",
  },
  {
    title: "God of War",
    description: "Kratos and his son Atreus embark on a mythic journey through Norse realms.",
    genre: "Action",
    price: 49.99,
    platform: "PS5",
    rating: 5,
    featured: true,
    image: "/images/gow.jpg",
    downloadUrl: "https://god-of-war.en.softonic.com/?ex=RAMP-4296.2&rex=true",
  },
  {
    title: "Halo Infinite",
    description: "Master Chief returns in an epic battle to save humanity.",
    genre: "FPS",
    price: 39.99,
    platform: "Xbox",
    rating: 4,
    featured: false,
    image: "/images/halo.jpg",
    downloadUrl: "https://store.steampowered.com/app/1240440/Halo_Infinite/",
  },
  {
    title: "PUBG Mobile",
    description: "The legendary battle royale experience on your mobile device.",
    genre: "Battle Royale",
    price: 0,
    platform: "Mobile",
    rating: 4,
    featured: false,
    image: "/images/pubg.jpg",
    downloadUrl: "https://play.google.com/store/apps/details?id=com.tencent.ig&hl=en",
  },
  {
    title: "Elden Ring",
    description: "A vast open world dark fantasy RPG from FromSoftware and George R.R. Martin.",
    genre: "RPG",
    price: 59.99,
    platform: "PC",
    rating: 5,
    featured: true,
    image: "/images/eldenring.jpg",
    downloadUrl: "https://store.steampowered.com/agecheck/app/1245620/",
  },
  {
    title: "FIFA 24",
    description: "The world is your pitch. Experience football like never before.",
    genre: "Sports",
    price: 49.99,
    platform: "PS5",
    rating: 3,
    featured: false,
    image: "/images/football.jpg",
    downloadUrl: "https://ea-sports-fc.en.softonic.com/?ex=RAMP-4296.2&rex=true#google_vignette",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Game.deleteMany({});
    console.log("🗑️  Old games cleared");

    await Game.insertMany(games);
    console.log("🎮 Games seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();
