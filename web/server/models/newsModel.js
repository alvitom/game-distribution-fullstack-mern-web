const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: String,
      default: "Admin",
    },
    numViews: {
      type: Number,
      default: 0,
    },
    coverImage: { type: String },
    images: [],
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("News", newsSchema);
