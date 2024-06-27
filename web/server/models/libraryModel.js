const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  purchasedDate: { type: Date, default: Date.now() },
  isFavorite: { type: Boolean, default: false },
});

module.exports = mongoose.model("Library", librarySchema);
