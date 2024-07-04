const asyncHandler = require("express-async-handler");
const Promotion = require("../models/promotionModel");
const Game = require("../models/gameModel");
const { validateMongodbId, validatePage, validateLimit } = require("../utils/validations");
const { errorResponse, successResponse } = require("../utils/response");

const createPromotion = asyncHandler(async (req, res) => {
  const { game, discount, endDate } = req.body;

  if (!game || !discount || !endDate) {
    return errorResponse(res, 400, "All fields are required");
  }

  try {
    const findGame = await Game.findOne({ title: game });

    if (!findGame) {
      return errorResponse(res, 404, "Game not found");
    }

    const promotion = await Promotion.findOne({ game: findGame._id });

    if (promotion) {
      return errorResponse(res, 400, "Game already has a promotion");
    }

    const newPromo = await Promotion.create({ ...req.body, game: findGame._id });
    successResponse(res, newPromo, "Promotion created successfully", 201);
  } catch (error) {
    errorResponse(res, 500, "Failed to create promotion");
  }
});

const getAllPromotions = asyncHandler(async (req, res) => {
  const { page, limit, keyword } = req.query;

  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const skip = (page - 1) * limit;
  const query = keyword ? { game: { $regex: keyword, $options: "i" } } : {};

  try {
    const promotions = await Promotion.find(query).skip(skip).limit(limit).populate("game");
    const total = await Promotion.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    successResponse(res, { promotions, total, page, totalPages }, "Promotions retrieved successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to retrieve promotions");
  }
});

const getDetailPromoGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const promotion = await Promotion.findById(id).populate("game");
    successResponse(res, promotion, "Promotion retrieved successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to retrieve promotion");
  }
});

const updatePromotion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);
  const { discount, endDate } = req.body;

  if (!discount || !endDate) {
    return errorResponse(res, 400, "Please provide all required fields");
  }

  try {
    const updatePromo = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    successResponse(res, updatePromo, "Promotion updated successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to update promotion");
  }
});

const deletePromotion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const deletePromo = await Promotion.findByIdAndDelete(id);
    successResponse(res, deletePromo, "Promotion deleted successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to delete promotion");
  }
});

module.exports = { createPromotion, getAllPromotions, getDetailPromoGame, updatePromotion, deletePromotion };
