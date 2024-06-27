const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const { validateMongodbId, validatePageAndLimit } = require("../utils/validations");
const { uploadToCloudinary, cloudinaryDeleteImg } = require("../utils/cloudinary");
const { successResponse, errorResponse } = require("../utils/response");

const createGame = asyncHandler(async (req, res) => {
  try {
    const systemRequirements = JSON.parse(req.body.systemRequirements);
    const coverImage = req.files.coverImage || [];
    const images = req.files.images || [];
    const videos = req.files.videos || [];

    let urlCoverImage = {};
    const urlImages = [];
    const urlVideos = [];

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
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((value) => value.message);
      return errorResponse(res, 400, messages);
    }
    errorResponse(res, 500, "Failed to create game");
    console.log(error);
  }
});

const getAllGames = asyncHandler(async (req, res) => {
  const { page, limit, keyword, genre, feature, platform } = req.query;
  const sanitizedPage = parseInt(page);
  const sanitizedLimit = parseInt(limit);

  // if (Number.isNaN(sanitizedPage) || sanitizedPage < 1) {
  //   errorResponse(res, 400, "Invalid page parameter");
  // }

  // if (Number.isNaN(sanitizedLimit) || sanitizedLimit < 1) {
  //   errorResponse(res, 400, "Invalid limit parameter");
  // }

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

  const skip = (sanitizedPage - 1) * sanitizedLimit;

  try {
    const games = await Game.find(query).skip(skip).limit(sanitizedLimit);
    const total = await Game.countDocuments(query);
    const totalPages = Math.ceil(total / sanitizedLimit);

    successResponse(res, { games, total, page: sanitizedPage, totalPages }, "Games fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch games");
  }
});

const getGame = asyncHandler(async (req, res) => {
  const { title } = req.params;

  if (!title) {
    errorResponse(res, 404, "Game not found");
  }

  try {
    const game = await Game.findOne({ slug: title }).populate("genres").populate("features");
    successResponse(res, game, "Game fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch game");
  }
});

const updateGame = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateMongodbId(id)) {
    errorResponse(res, 404, "Game not found");
  }

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

  if (!validateMongodbId(id)) {
    errorResponse(res, 404, "Game not found");
  }

  try {
    await Game.findByIdAndDelete(id);
    successResponse(res, null, "Game deleted successfully", 200);
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

module.exports = { createGame, getAllGames, getGame, updateGame, deleteGame, /* uploadImages,  */ deleteImages };
