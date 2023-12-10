const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "games",
  },
  review_date: {
    type: Date,
  },
  review_content: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
