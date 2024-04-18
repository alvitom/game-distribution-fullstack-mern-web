const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const Genre = require("../models/genreModel");
const Feature = require("../models/featureModel");
const validateMongodbId = require("../utils/validateMongodbId");
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require("../utils/cloudinary");

const createGame = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newGame = await Game.create(req.body);
    res.json(newGame);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllGames = asyncHandler(async (req, res) => {
  try {
    // Filter
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((item) => delete queryObj[item]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Game.find(JSON.parse(queryStr));

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limit the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(limitFields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    if (req.query.page) {
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      const gameCount = await Game.countDocuments();
      if (skip >= gameCount) throw new Error("This page doesn't exists");
    }

    // Genre
    if (req.query.genre) {
      let genreIds = [];
      const genreArray = req.query.genre.split(",").join(" ");
      const genres = await Genre.find({ genre: { $in: genreArray } });
      genreIds = genres.map((genre) => genre._id);
      query = Game.find({ genres: { $in: genreIds } });
    }

    // Feature
    if (req.query.feature) {
      let featureIds = [];
      const featureArray = req.query.feature.split(",").join(" ");
      const features = await Feature.find({ feature: { $in: featureArray } });
      featureIds = features.map((feature) => feature._id);
      query = Game.find({ features: { $in: featureIds } });
      console.log(featureArray);
    }

    const games = await query;
    res.json(games);
  } catch (error) {
    throw new Error(error);
  }
});

const getGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const game = await Game.findById(id)
      .populate("genres", {
        genre: 1,
        _id: 0,
      })
      .populate("features", {
        feature: 1,
        _id: 0,
      });
    res.json(game);
  } catch (error) {
    throw new Error(error);
  }
});

const updateGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateGame = await Game.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateGame);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteGame = await Game.findByIdAndDelete(id);
    res.json(deleteGame);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
    }
    const uploadImg = await Game.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file),
      },
      {
        new: true,
      }
    );
    res.json(uploadImg);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { imageId } = req.body;
  try {
    cloudinaryDeleteImg(imageId);
    const game = await Game.findById(id);
    game.images = game.images.filter((image) => image.public_id !== imageId);
    await game.save();
    res.json({
      message: "Delete image successful",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createGame, getAllGames, getGame, updateGame, deleteGame, uploadImages, deleteImages };
