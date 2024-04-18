const mongoose = require("mongoose");

var featureSchema = new mongoose.Schema(
  {
    feature: {
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

module.exports = mongoose.model("Feature", featureSchema);
