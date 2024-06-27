const asyncHandler = require("express-async-handler");
const Promotion = require("../models/promotionModel");
const { validateMongodbId } = require("../utils/validations");

const createPromotion = asyncHandler(async (req, res) => {
  try {
    const newPromo = await Promotion.create(req.body);
    res.json(newPromo);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPromotions = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const keyword = req.query.keyword;
    const skip = (page - 1) * limit;
    const query = {};

    if (keyword) {
      query.game = { $regex: keyword, $options: "i" };
    }

    const promotions = await Promotion.find(query).skip(skip).limit(limit).populate("game");
    const total = await Promotion.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      promotions,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getDetailPromoGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const promotion = await Promotion.findById(id).populate("game");
    res.json(promotion);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePromotion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updatePromo = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatePromo);
  } catch (error) {
    throw new Error(error);
  }
});

const deletePromotion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deletePromo = await Promotion.findByIdAndDelete(id);
    res.json(deletePromo);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createPromotion, getAllPromotions, getDetailPromoGame, updatePromotion, deletePromotion };
