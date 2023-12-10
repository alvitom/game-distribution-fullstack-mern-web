const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
  payment_method: {
    type: String,
  },
  card_number: {
    type: String,
  },
  expiration_date: {
    type: Date,
  },
  cardholder_name: {
    type: String,
  },
});

const PaymentMethod = mongoose.model("payment_methods", paymentMethodSchema);

module.exports = PaymentMethod;
