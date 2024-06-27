const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
    ],
    amountPaid: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
    paymentType: {
      type: String,
    },
    transactionTime: {
      type: Date,
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
