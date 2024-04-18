const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var checkoutSchema = new mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    subtotal: Number,
    discount: Number,
    total: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Checkout", checkoutSchema);
