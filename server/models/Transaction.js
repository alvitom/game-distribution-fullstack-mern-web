const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "games",
  },
  transaction_date: {
    type: Date,
  },
  purchase_quantity: {
    type: Number,
  },
  total_price: {
    type: Number,
  },
  payment_status: {
    type: String,
  },
});

const Transaction = mongoose.model("transactions", transactionSchema);

module.exports = Transaction;
