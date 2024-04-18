const mongoose = require("mongoose");

var genreSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Genre", genreSchema);
