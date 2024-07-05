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
  },
  discount: {
    percentage: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
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
  coverImage: {},
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
  playCount: {
    type: Number,
    default: 0,
  },
  trendScore: {
    type: Number,
    default: 0,
  },
  systemRequirements: {
    windows: {
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
    },
    macOS: {
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
    },
    linux: {
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
  fileDownload: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);
