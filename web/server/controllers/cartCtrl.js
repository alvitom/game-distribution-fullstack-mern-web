const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validations");
const Cart = require("../models/cartModel");
const { errorResponse, successResponse } = require("../utils/response");

const addCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { gameId } = req.body;
  validateMongodbId(res, id);
  validateMongodbId(res, gameId);

  try {
    const existingCartItem = await Cart.find({ gameId, userId: id });

    if (existingCartItem.length > 0) {
      return errorResponse(res, 400, "Game already in cart");
    }

    const cart = await Cart.create({ gameId, userId: id });

    successResponse(res, cart, "Game added to cart successfully", 201);
  } catch (error) {
    errorResponse(res, 500, "Failed to add game to cart");
  }
});

const getCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(res, id);

  try {
    const cart = await Cart.find({ userId: id }).populate("gameId");

    const totalNetPrice = cart.reduce((acc, item) => {
      acc += item.gameId.price;
      return acc;
    }, 0);

    const totalPrice = cart.reduce((acc, item) => {
      acc += item.gameId.discount.isActive ? item.gameId.price - ((item.gameId.discount.percentage / 100) * item.gameId.price).toFixed(0) : item.gameId.price;
      return acc;
    }, 0);

    const totalDiscount = totalPrice - totalNetPrice;

    const serviceFee = 1000;

    const total = totalPrice + serviceFee;

    const cartLength = cart.length;
    successResponse(res, { cart, cartLength, totalNetPrice, totalPrice, totalDiscount, serviceFee, total }, "Cart fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch cart");
  }
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { cartItemId } = req.params;

  validateMongodbId(res, id);
  validateMongodbId(res, cartItemId);

  try {
    const cart = await Cart.deleteOne({ userId: id, _id: cartItemId });

    if (cart.deletedCount <= 0) {
      return errorResponse(res, 404, "Cart item not found");
    }

    const carts = await Cart.find({ userId: id }).populate("gameId");

    const totalPrice = carts.reduce((acc, item) => {
      acc += item.gameId.discount.isActive ? item.gameId.price - ((item.gameId.discount.percentage / 100) * item.gameId.price).toFixed(0) : item.gameId.price;
      return acc;
    }, 0);

    successResponse(res, { totalPrice }, "Cart item deleted successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to delete cart item");
  }
});

module.exports = { addCartItem, getCartItem, deleteCartItem };
