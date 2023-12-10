const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

require("./utils/db-connection");
const Game = require("./models/Game");
const Promotion = require("./models/Promotion");

// const User = require("./models/User");
// const Library = require("./models/Library");
// const PaymentMethod = require("./models/PaymentMethod");
// const Review = require("./models/review");
// const Transaction = require("./models/Transaction");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Main
app.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes
const gameRoutes = require("./routes/games");
app.use("/games", gameRoutes);

const promotionRoutes = require("./routes/promotions");
app.use("/promotions", promotionRoutes);

// Cron job untuk menghapus diskon yang telah berakhir
cron.schedule("0 0 * * *", async () => {
  try {
    // Menghapus data diskon yang sudah melewati batas akhir waktu
    await Promotion.deleteMany({ end_date: { $lt: new Date() } });
  } catch (error) {
    console.error("Error deleting expired discounts:", error);
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
