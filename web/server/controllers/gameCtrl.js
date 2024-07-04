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
    errorResponse(res, 500, "Failed to create game");
  }
});

const createSaleGame = asyncHandler(async (req, res) => {
  const { title, percentage, endDate } = req.body;

  if (!title || !percentage || !endDate) {
    return errorResponse(res, 400, "All fields are required");
  }

  try {
    const game = await Game.findOne({ title });

    if (!game) {
      return errorResponse(res, 404, "Game not found");
    }

    if (game.discount.isActive) {
      return errorResponse(res, 400, "Game already on sale");
    }

    await Game.updateOne({ _id: game._id }, { $set: { discount: { percentage, endDate, isActive: true } } }, { new: true });

    successResponse(res, null, "Sale game created successfully", 201);
  } catch (error) {
    errorResponse(res, 500, "Failed to create sale game");
    console.log(error);
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
    errorResponse(res, 500, "Failed to fetch games");
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
    errorResponse(res, 500, "Failed to retrieve sale games");
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
    errorResponse(res, 500, "Failed to retrieve top seller games");
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
    errorResponse(res, 500, "Failed to retrieve most played games");
  }
});

const getNewReleaseGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const pastDate = new Date();
  pastDate.setMonth(new Date().getMonth() - 3);
  const query = { releaseDate: { $gte: pastDate, $lte: new Date() } };
  try {
    const newReleaseGames = await Game.find(query).limit(limit).sort({ releaseDate: -1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { newReleaseGames, total }, "New release games retrieved successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to retrieve new release games");
  }
});

const getTrendingGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const query = { trendScore: { $gt: 50 } };

  try {
    const trendingGames = await Game.find(query).limit(limit).sort({ trendScore: -1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { trendingGames, total }, "Trending games retrieved successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to retrieve trending games");
  }
});

const getUpcomingGames = asyncHandler(async (req, res) => {
  const { limit } = req.query;

  if (limit) {
    validateLimit(res, limit);
  }

  const query = { releaseDate: { $gt: new Date() } };

  try {
    const upcomingGames = await Game.find(query).limit(limit).sort({ releaseDate: 1 });
    const total = await Game.countDocuments(query);
    successResponse(res, { upcomingGames, total }, "Upcoming games retrieved successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to retrieve upcoming games");
  }
});

const getGame = asyncHandler(async (req, res) => {
  const { title } = req.params;

  try {
    const game = await Game.findOne({ slug: title }).populate("genres").populate("features");

    if (!game) {
      return errorResponse(res, 404, "Game not found");
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
    errorResponse(res, 500, "Failed to fetch game");
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
    errorResponse(res, 500, "Failed to update game");
  }
});

const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const deleteGame = await Game.findByIdAndDelete(id);
    successResponse(res, deleteGame, "Game deleted successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to delete game");
  }
});

// const uploadImages = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongodbId(id);
//   try {
//     const uploader = (path) => cloudinaryUploadImg(path);
//     const urls = [];
//     const files = req.files;
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//     }
//     const uploadImg = await Game.findByIdAndUpdate(
//       id,
//       {
//         images: urls.map((file) => file),
//       },
//       {
//         new: true,
//       }
//     );
//     res.json(uploadImg);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { imageId } = req.body;
  try {
    cloudinaryDeleteImg(imageId);
    const game = await Game.findById(id);
    game.images = game.images.filter((image) => image.public_id !== imageId);
    await game.save();
    res.json({
      message: "Delete image successful",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createGame, createSaleGame, getAllGames, getSaleGames, getTopSellerGames, getMostPlayedGames, getNewReleaseGames, getTrendingGames, getUpcomingGames, getGame, updateGame, deleteGame, /* uploadImages,  */ deleteImages };
