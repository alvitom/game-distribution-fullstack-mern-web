const asyncHandler = require("express-async-handler");
const Genre = require("../models/genreModel");
const validateMongodbId = require("../utils/validateMongodbId");

const createGenre = asyncHandler(async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body);
    res.json(newGenre);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllGenres = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const keyword = req.query.keyword;
    const skip = (page - 1) * limit;
    const query = {};

    if (keyword) {
      query.genre = { $regex: keyword, $options: "i" };
    }

    const genres = await Genre.find(query).skip(skip).limit(limit);
    const total = await Genre.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      genres,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const genre = await Genre.findById(id);
    res.json(genre);
  } catch (error) {
    throw new Error(error);
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateGenre = await Genre.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateGenre);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteGenre = await Genre.findByIdAndDelete(id);
    res.json(deleteGenre);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createGenre, getAllGenres, getGenre, updateGenre, deleteGenre };
