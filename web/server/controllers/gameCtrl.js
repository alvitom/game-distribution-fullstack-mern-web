const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const { validateMongodbId, validatePage, validateLimit } = require("../utils/validations");
const { uploadToCloudinary, cloudinaryDeleteImg } = require("../utils/cloudinary");
const { successResponse, errorResponse } = require("../utils/response");

const createGame = asyncHandler(async (req, res) => {
  const systemRequirements = JSON.parse(req.body.systemRequirements);
  const coverImage = req.files.coverImage || [];
  const images = req.files.images || [];
  const videos = req.files.videos || [];

  let urlCoverImage = {};
  const urlImages = [];
  const urlVideos = [];

  try {
    for (const image of coverImage) {
      const { path } = image;
      const newPath = await uploadToCloudinary(path, {
        folder: "games/coverImage",
        eager: [
          { width: 150, height: 150 },
          { width: 640, height: 480 },
          { width: 1280, height: 720 },
          { width: 1920, height: 1080 },
        ],
      });
      urlCoverImage = newPath;
    }

    for (const image of images) {
      const { path } = image;
      const newPath = await uploadToCloudinary(path, {
        folder: "games/images",
        eager: [
          { width: 150, height: 150 },
          { width: 640, height: 480 },
          { width: 1280, height: 720 },
          { width: 1920, height: 1080 },
        ],
      });
      urlImages.push(newPath);
    }

    for (const video of videos) {
      const { path } = video;
      const newPath = await uploadToCloudinary(path, {
        folder: "games/videos",
        resource_type: "video",
      });
      urlVideos.push(newPath);
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newGame = await Game.create({
      ...req.body,
      systemRequirements,
      coverImage: urlCoverImage,
      images: urlImages.map((file) => file),
      videos: urlVideos.map((file) => file),
    });
    successResponse(res, newGame, "Game created successfully", 201);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to create game: ${error.message}`);
  }
});

const createSaleGame = asyncHandler(async (req, res) => {
  const { title, percentage, endDate } = req.body;

  if (!title || !percentage || !endDate) {
    throw errorResponse(res, 400, "All fields are required");
  }

  try {
    const game = await Game.findOne({ title: { $regex: title, $options: "i" } });

    if (!game) {
      throw errorResponse(res, 404, "Game not found");
    }

    if (game.discount.isActive) {
      throw errorResponse(res, 400, "Game already on sale");
    }

    const updateGame = await Game.updateOne({ _id: game._id }, { $set: { discount: { percentage, endDate, isActive: true } } });

    successResponse(res, updateGame, "Sale game created successfully", 201);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to create sale game: ${error.message}`);
  }
});

const getAllGames = asyncHandler(async (req, res) => {
  const { page, limit, keyword, genre, feature, platform } = req.query;

  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }
  if (genre) {
    query.genre = genre;
  }
  if (feature) {
    query.feature = feature;
  }
  if (platform) {
    query.platform = platform;
  }

  const skip = (page - 1) * limit;

  try {
    const games = await Game.find(query).skip(skip).limit(limit);
    const total = await Game.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    successResponse(res, { games, total, page, totalPages }, "Games fetched successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to fetch games: ${error.message}`);
  }
});

const getSaleGames = asyncHandler(async (req, res) => {
  const { page, limit, keyword } = req.query;

  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const skip = (page - 1) * limit;
  const query = keyword ? { title: { $regex: keyword, $options: "i" } } : {};

  query["discount.isActive"] = true;

  try {
    const saleGames = await Game.find(query).skip(skip).limit(limit);
    const total = await Game.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    successResponse(res, { saleGames, total, page, totalPages }, "Sale games retrieved successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to retrieve sale games: ${error.message}`);
  }
});

const getTopSellerGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const query = { sales: { $gt: 2000 } };

  try {
    const topSellerGames = await Game.find(query).limit(limit).sort({ sales: -1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { topSellerGames, total }, "Top seller games retrieved successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to retrieve top seller games: ${error.message}`);
  }
});

const getMostPlayedGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const query = { playCount: { $gt: 30000 } };

  try {
    const mostPlayedGames = await Game.find(query).limit(limit).sort({ playCount: -1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { mostPlayedGames, total }, "Most played games retrieved successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to retrieve most played games: ${error.message}`);
  }
});

const getNewReleaseGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const pastDate = new Date();
  pastDate.setMonth(new Date().getMonth() - 5);
  const query = { releaseDate: { $gte: pastDate, $lte: new Date() } };
  try {
    const newReleaseGames = await Game.find(query).limit(limit).sort({ releaseDate: -1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { newReleaseGames, total }, "New release games retrieved successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to retrieve new release games: ${error.message}`);
  }
});

const getTrendingGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const query = { trendScore: { $gt: 70 } };

  try {
    const trendingGames = await Game.find(query).limit(limit).sort({ trendScore: -1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { trendingGames, total }, "Trending games retrieved successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to retrieve trending games: ${error.message}`);
  }
});

const getUpcomingGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const query = { $or: [{ releaseDate: { $gt: new Date() } }, { releaseDate: null }] };

  try {
    const upcomingGames = await Game.find(query).limit(limit).sort({ releaseDate: 1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { upcomingGames, total }, "Upcoming games retrieved successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to retrieve upcoming games: ${error.message}`);
  }
});

const getGame = asyncHandler(async (req, res) => {
  const { title } = req.params;

  try {
    const game = await Game.findOne({ slug: title }).populate("genres").populate("features");

    if (!game) {
      throw errorResponse(res, 404, "Game not found");
    }

    const totalNetPrice = game.price;

    let newPrice = 0;
    if (game.discount.isActive) {
      newPrice += game.price - ((game.discount.percentage / 100) * game.price).toFixed(0);
    }

    const totalDiscount = newPrice - totalNetPrice;

    const serviceFee = 1000;

    const total = game.discount.isActive ? newPrice + serviceFee : totalNetPrice + serviceFee;

    successResponse(res, { game, totalNetPrice, totalDiscount, newPrice, serviceFee, total }, "Game fetched successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to fetch game: ${error.message}`);
  }
});

const updateGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  try {
    const systemRequirements = JSON.parse(req.body.systemRequirements);
    const { coverImages, images, videos } = req.files;

    const urlCoverImages = [];
    const urlImages = [];
    const urlVideos = [];

    for (const coverImage of coverImages) {
      const { path } = coverImage;
      const size = coverImage.fieldname;
      const newPath = await uploadToCloudinary(path, { folder: "games/coverImages" });
      urlCoverImages.push({ url: newPath, size });
    }

    for (const image of images) {
      const { path } = image;
      const newPath = await uploadToCloudinary(path, { folder: "games/images" });
      urlImages.push({ url: newPath });
    }

    for (const video of videos) {
      const { path } = video;
      const newPath = await uploadToCloudinary(path, { folder: "games/videos", resource_type: "video" });
      urlVideos.push({ url: newPath });
    }

    const updateGame = await Game.findByIdAndUpdate(
      id,
      {
        ...req.body,
        systemRequirements,
        coverImages: urlCoverImages,
        images: urlImages,
        videos: urlVideos,
      },
      {
        new: true,
      }
    );
    successResponse(res, updateGame, "Game updated successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to update game: ${error.message}`);
  }
});

const updateSaleGame = asyncHandler(async (req, res) => {
  const { title } = req.params;
  const { percentage, endDate } = req.body;

  if (!percentage || !endDate) {
    throw errorResponse(res, 400, "All fields are required");
  }

  try {
    const updateGame = await Game.updateOne({ slug: title }, { $set: { discount: req.body } });

    successResponse(res, updateGame, "Sale game updated successfully", 201);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to update sale game: ${error.message}`);
  }
});

const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const deleteGame = await Game.findByIdAndDelete(id);
    successResponse(res, deleteGame, "Game deleted successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to delete game: ${error.message}`);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { imageId } = req.body;
  try {
    cloudinaryDeleteImg(imageId);
    const game = await Game.findById(id);
    game.images = game.images.filter((image) => image.public_id !== imageId);
    await game.save();
    successResponse(res, game, "Image deleted successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to delete image: ${error.message}`);
  }
});

module.exports = { createGame, createSaleGame, getAllGames, getSaleGames, getTopSellerGames, getMostPlayedGames, getNewReleaseGames, getTrendingGames, getUpcomingGames, getGame, updateGame, updateSaleGame, deleteGame, deleteImages };
