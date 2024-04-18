const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
  longDescription: {
    type: String,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  initialRelease: {
    type: Date,
  },
  developer: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  features: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feature",
    },
  ],
  coverImages: [],
  images: [],
  videos: [],
  ratings: [
    {
      rating: Number,
      comment: String,
      postedby: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  totalRating: {
    type: Number,
    default: 0,
  },
  platform: { type: [String], enum: ["Windows", "Mac OS", "Linux"], required: true },
  sales: {
    type: Number,
    default: 0,
  },
  players: {
    type: Number,
    default: 0,
  },
  systemRequirements: {
    minimum: {
      os: { type: String },
      processor: { type: String },
      memory: { type: String },
      graphics: { type: String },
      storage: { type: String },
      directX: { type: String },
      other: { type: String },
    },
    recommended: {
      os: { type: String },
      processor: { type: String },
      memory: { type: String },
      graphics: { type: String },
      storage: { type: String },
      directX: { type: String },
      other: { type: String },
    },
    additionalNotes: {
      type: String,
    },
    loginAccountsRequired: [String],
    languagesSupported: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
    ],
  },
});

module.exports = mongoose.model("Game", gameSchema);
