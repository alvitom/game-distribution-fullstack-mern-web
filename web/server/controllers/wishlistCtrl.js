const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validations");
const Wishlist = require("../models/wishlistModel");
const { successResponse, errorResponse } = require("../utils/response");

const addWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { gameId } = req.body;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  if (!validateMongodbId(gameId)) {
    return errorResponse(res, 400, "Invalid game ID");
  }

  try {
    const existingWishlistItem = await Wishlist.find({ gameId, userId: id });

    if (existingWishlistItem.length > 0) {
      return errorResponse(res, 400, "Game already in wishlist");
    }

    const wishlist = await Wishlist.create({ gameId, userId: id });
    successResponse(res, wishlist, "Game added to wishlist successfully", 201);
  } catch (error) {
    errorResponse(res, 500, "Failed to add game to wishlist");
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  try {
    const wishlist = await Wishlist.find({ userId: id }).populate("gameId");

    const wishlistLength = wishlist.length;

    successResponse(res, { wishlist, wishlistLength }, "Wishlist fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch wishlist");
  }
});

const deleteWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  if (!validateMongodbId(req.params.wishlistItemId)) {
    return errorResponse(res, 400, "Invalid wishlist item ID");
  }

  try {
    const wishlist = await Wishlist.deleteOne({ userId: id, _id: req.params.wishlistItemId });
    
    if (wishlist.deletedCount <= 0) {
      return errorResponse(res, 404, "Wishlist item not found");
    }

    successResponse(res, null, "Wishlist item deleted successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to delete wishlist item");
  }
});

module.exports = { addWishlist, getWishlist, deleteWishlist };
