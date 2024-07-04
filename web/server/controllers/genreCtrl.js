const asyncHandler = require("express-async-handler");
const Genre = require("../models/genreModel");
const { validateMongodbId, validatePage, validateLimit, } = require("../utils/validations");
const { successResponse, errorResponse } = require("../utils/response");

const createGenre = asyncHandler(async (req, res) => {
  const { genre } = req.body;

  if (!genre) {
    return errorResponse(res, 400, "Genre is required");
  }

  try {
    const genre = await Genre.findOne({ genre });

    if (genre) {
      return errorResponse(res, 400, "Genre already exists");
    }

    const newGenre = await Genre.create(req.body);
    successResponse(res, newGenre, "Genre created successfully", 201);
  } catch (error) {
    errorResponse(res, 500, "Failed to create genre");
  }
});

const getAllGenres = asyncHandler(async (req, res) => {
  const { page, limit, keyword } = req.query;
  
  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const skip = (page - 1) * limit;
  const query = keyword ? { genre: { $regex: keyword, $options: "i" } } : {};

  try {
    const genres = await Genre.find(query).skip(skip).limit(limit);
    const total = await Genre.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    successResponse(res, { genres, total, page, totalPages }, "Genres fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch genres");
  }
});

const getGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const genre = await Genre.findById(id);
    successResponse(res, genre, "Genre fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch genre");
  }
});

const updateGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);
  const { genre } = req.body;

  if (!genre) {
    return errorResponse(res, 400, "Genre is required");
  }

  try {
    const updateGenre = await Genre.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    successResponse(res, updateGenre, "Genre updated successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to update genre");
  }
});

const deleteGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const deleteGenre = await Genre.findByIdAndDelete(id);
    successResponse(res, deleteGenre, "Genre deleted successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to delete genre");
  }
});

module.exports = { createGenre, getAllGenres, getGenre, updateGenre, deleteGenre };
