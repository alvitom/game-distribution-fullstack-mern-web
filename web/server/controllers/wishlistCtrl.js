const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const Wishlist = require("../models/wishlistModel");

const addWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { gameId } = req.body;
  try {
    const wishlist = await Wishlist.find({ userId: id });

    const existingItem = wishlist.find((item) => item?.gameId.toString() === gameId);

    if (existingItem) {
      throw new Error("Game already in wishlist");
    } else {
      const newWishlist = await Wishlist.create({ gameId, userId: id });
      res.json(newWishlist);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const wishlist = await Wishlist.find({ userId: id }).populate("gameId");
    res.json(wishlist);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { wishlistItemId } = req.params;
  validateMongodbId(wishlistItemId);
  try {
    const wishlist = await Wishlist.deleteOne({ userId: id, _id: wishlistItemId });
    if (wishlist.deletedCount <= 0) throw new Error("Delete wishlist item unsuccessfully");
    res.json(wishlist);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addWishlist, getWishlist, deleteWishlist };
