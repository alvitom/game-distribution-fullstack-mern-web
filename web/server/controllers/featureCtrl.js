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
    const features = await Feature.find();
    res.json(features);
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
