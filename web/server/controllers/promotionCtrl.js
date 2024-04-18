const asyncHandler = require("express-async-handler");
const Promotion = require("../models/promotionModel");
const validateMongodbId = require("../utils/validateMongodbId");

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
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    throw new Error(error);
  }
});

const getDetailPromoGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const promotion = await Promotion.findById(id).populate("gameId");
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
