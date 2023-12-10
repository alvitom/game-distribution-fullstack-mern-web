const express = require("express");
const router = express.Router();
const Promotion = require("../models/Promotion");

router.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.find()
    res.json(promotions);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/:gameId", async (req, res) => {
  try {
    const promotion = await Promotion.findOne({ game_id: req.params.gameId });
    res.json(promotion);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
