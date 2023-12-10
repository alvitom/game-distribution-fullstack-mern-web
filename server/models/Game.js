const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  release_date: {
    type: Date,
  },
  developer: {
    type: String,
  },
  publisher: {
    type: String,
  },
  price: {
    type: Number,
  },
  genres: {
    type: String,
  },
  features: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  platform_support: {
    type: String,
  },
  top_seller: {
    type: Boolean,
    default: false,
  },
  most_played: {
    type: Boolean,
    default: false,
  },
  isOnSale: {
    type: Boolean,
    default: false,
  },
  discount_percentage: {
    type: Number,
  },
  discounted_price: {
    type: Number,
  },
});

const Game = mongoose.model("games", gameSchema);

module.exports = Game;
