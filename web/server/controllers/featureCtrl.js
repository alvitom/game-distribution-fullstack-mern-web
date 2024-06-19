const asyncHandler = require("express-async-handler");
const Feature = require("../models/featureModel");
const validateMongodbId = require("../utils/validateMongodbId");

const createFeature = asyncHandler(async (req, res) => {
  try {
    const newFeature = await Feature.create(req.body);
    res.json(newFeature);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllFeatures = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const keyword = req.query.keyword;
    const skip = (page - 1) * limit;
    const query = {};

    if (keyword) {
      query.feature = { $regex: keyword, $options: "i" };
    }

    const features = await Feature.find(query).skip(skip).limit(limit);
    const total = await Feature.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      features,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const feature = await Feature.findById(id);
    res.json(feature);
  } catch (error) {
    throw new Error(error);
  }
});

const updateFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateFeature = await Feature.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateFeature);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteFeature = await Feature.findByIdAndDelete(id);
    res.json(deleteFeature);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createFeature, getAllFeatures, getFeature, updateFeature, deleteFeature };
