const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Game = require("../models/gameModel");
const validateMongodbId = require("../utils/validateMongodbId");
const { uploadToCloudinary, cloudinaryDeleteImg } = require("../utils/cloudinary");

const createGame = asyncHandler(async (req, res) => {
  try {
    const systemRequirements = JSON.parse(req.body.systemRequirements);
    const coverImages = req.files.coverImages;
    const images = req.files.images;
    const videos = req.files.videos;

    const urlCoverImages = [];
    const urlImages = [];
    const urlVideos = [];

    for (const coverImage of coverImages) {
      const { path } = coverImage;
      const newPath = await uploadToCloudinary(path, { folder: "games/coverImages" });
      urlCoverImages.push(newPath);
    }

    for (const image of images) {
      const { path } = image;
      const newPath = await uploadToCloudinary(path, { folder: "games/images" });
      urlImages.push(newPath);
    }

    for (const video of videos) {
      const { path } = video;
      const newPath = await uploadToCloudinary(path, { folder: "games/videos", resource_type: "video" });
      urlVideos.push(newPath);
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newGame = await Game.create({
      ...req.body,
      systemRequirements,
      coverImages: urlCoverImages.map((file) => file),
      images: urlImages.map((file) => file),
      videos: urlVideos.map((file) => file),
    });
    res.json(newGame);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllGames = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const keyword = req.query.keyword;
    const genre = req.query.genre;
    const feature = req.query.feature;
    const platform = req.query.platform;
    const skip = (page - 1) * limit;
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

    const games = await Game.find(query).skip(skip).limit(limit);
    const total = await Game.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      games,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const game = await Game.findById(id).populate("genres").populate("features");
    res.json(game);
  } catch (error) {
    throw new Error(error);
  }
});

const updateGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const systemRequirements = JSON.parse(req.body.systemRequirements);
    const coverImages = req.files.coverImages;
    const images = req.files.images;
    const videos = req.files.videos;

    const urlCoverImages = [];
    const urlImages = [];
    const urlVideos = [];

    for (const coverImage of coverImages) {
      const { path } = coverImage;
      const newPath = await uploadToCloudinary(path, { folder: "coverImages" });
      urlCoverImages.push(newPath);
    }

    for (const image of images) {
      const { path } = image;
      const newPath = await uploadToCloudinary(path, { folder: "images" });
      urlImages.push(newPath);
    }

    for (const video of videos) {
      const { path } = video;
      const newPath = await uploadToCloudinary(path, { folder: "videos", resource_type: "video" });
      urlVideos.push(newPath);
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateGame = await Game.findByIdAndUpdate(
      id,
      {
        ...req.body,
        systemRequirements,
        coverImages: urlCoverImages.map((file) => file),
        images: urlImages.map((file) => file),
        videos: urlVideos.map((file) => file),
      },
      {
        new: true,
      }
    );
    res.json(updateGame);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteGame = await Game.findByIdAndDelete(id);
    res.json(deleteGame);
  } catch (error) {
    throw new Error(error);
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
