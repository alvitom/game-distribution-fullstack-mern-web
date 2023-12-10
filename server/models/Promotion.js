const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "games",
  },
  discount: {
    type: Number,
  },
  end_date: {
    type: Date,
  },
  // discount_code: {
  //   type: String,
  // },
});

const Promotion = mongoose.model("promotions", promotionSchema);

module.exports = Promotion;
