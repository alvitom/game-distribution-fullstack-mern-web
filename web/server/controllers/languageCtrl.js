const asyncHandler = require("express-async-handler");
const Language = require("../models/languageModel");
const validateMongodbId = require("../utils/validateMongodbId");

const createLanguage = asyncHandler(async (req, res) => {
  try {
    const newLanguage = await Language.create(req.body);
    res.json(newLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllLanguages = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const keyword = req.query.keyword;
    const skip = (page - 1) * limit;
    const query = {};

    if (keyword) {
      query.language = { $regex: keyword, $options: "i" };
    }

    const languages = await Language.find(query).skip(skip).limit(limit);
    const total = await Language.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      languages,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getLanguage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const language = await Language.findById(id);
    res.json(language);
  } catch (error) {
    throw new Error(error);
  }
});

const updateLanguage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateLanguage = await Language.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteLanguage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteLanguage = await Language.findByIdAndDelete(id);
    res.json(deleteLanguage);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createLanguage, getAllLanguages, getLanguage, updateLanguage, deleteLanguage };
