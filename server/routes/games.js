const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

router.get('/', async (req, res) => {
  try {
    // Mendapatkan ID game dari parameter query
    const gameIds = req.query.ids.split(',');

    // Mengambil data game berdasarkan ID yang diberikan
    const games = await Game.find({ _id: { $in: gameIds } });
    res.json(games);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/top-sellers", async (req, res) => {
  try {
    const topSellers = await Game.find({ top_seller: true });
    res.json(topSellers);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/sale", async (req, res) => {
  try {
    const onSaleGames = await Game.find({ isOnSale: true });
    res.json(onSaleGames);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:gameTitle", async (req, res) => {
  try {
    const game = await Game.findOne({ title: req.params.gameTitle });
    res.json(game);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/most-played", async (req, res) => {
  try {
    const mostPlayed = await Game.find({ most_played: true });
    res.json(mostPlayed);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/most-played/:gameTitle", async (req, res) => {
  try {
    const gameMostPlayed = await Game.findOne({ title: req.params.gameTitle });
    res.json(gameMostPlayed);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
