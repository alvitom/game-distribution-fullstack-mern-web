const asyncHandler = require("express-async-handler");
const Feature = require("../models/featureModel");
const { validateMongodbId, validatePage, validateLimit } = require("../utils/validations");
const { errorResponse, successResponse } = require("../utils/response");

const createFeature = asyncHandler(async (req, res) => {
  const { feature } = req.body;

  if (!feature) {
    return errorResponse(res, 400, "Feature is required");
  }

  try {
    const feature = await Feature.findOne({ feature });

    if (feature) {
      return errorResponse(res, 400, "Feature already exists");
    }

    const newFeature = await Feature.create(req.body);
    successResponse(res, newFeature, "Feature created successfully", 201);
  } catch (error) {
    errorResponse(res, 500, "Failed to create feature");
  }
});

const getAllFeatures = asyncHandler(async (req, res) => {
  const { page, limit, keyword } = req.query;

  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const skip = (page - 1) * limit;
  const query = keyword ? { feature: { $regex: keyword, $options: "i" } } : {};

  try {
    const features = await Feature.find(query).skip(skip).limit(limit);
    const total = await Feature.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    successResponse(res, { features, total, page, totalPages }, "All features fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch features");
  }
});

const getFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const feature = await Feature.findById(id);
    successResponse(res, feature, "Feature fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch feature");
  }
});

const updateFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);
  const { feature } = req.body;

  if (!feature) {
    return errorResponse(res, 400, "Feature is required");
  }

  try {
    const updateFeature = await Feature.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    successResponse(res, updateFeature, "Feature updated successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to update feature");
  }
});

const deleteFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const deleteFeature = await Feature.findByIdAndDelete(id);
    successResponse(res, deleteFeature, "Feature deleted successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to delete feature");
  }
});

module.exports = { createFeature, getAllFeatures, getFeature, updateFeature, deleteFeature };
