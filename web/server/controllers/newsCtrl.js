const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");

const createNews = asyncHandler(async (req, res) => {
  try {
    const addNews = await News.create(req.body);
    res.json(addNews);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createNews };
