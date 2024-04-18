const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const Cart = require("../models/cartModel");

const addCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { gameId } = req.body;
  try {
    const cart = await Cart.find({ userId: id });

    const existingItem = cart.find((item) => item?.gameId.toString() === gameId);

    if (existingItem) throw new Error("Game already in cart");

    const newCart = await Cart.create({ gameId, userId: id });

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const cart = await Cart.find({ userId: id }).populate("gameId");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { cartItemId } = req.params;
  validateMongodbId(cartItemId);
  try {
    const cart = await Cart.deleteOne({ userId: id, _id: cartItemId });
    if (cart.deletedCount <= 0) throw new Error("Delete cart item unsuccessfully");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addCartItem, getCartItem, deleteCartItem };
