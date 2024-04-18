const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");
const Checkout = require("../models/checkoutModel");
const Game = require("../models/gameModel");
const Promotion = require("../models/promotionModel");

const addCheckoutItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { items } = req.body;
  try {
    let checkout = await Checkout.findOne({ userId: id });
    let games = [];
    let subtotal = 0;
    let discount = 0;
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      games.push(items[i]);
      const getPrice = await Game.findById(items[i]).select("price").exec();
      const getDiscount = await Promotion.findOne({ gameId: items[i] }).select("discount").exec();
      subtotal += getPrice.price;
      discount += getDiscount.discount;
      total = subtotal - (discount / 100) * subtotal;
    }

    if (!checkout) {
      checkout = new Checkout({
        items: games,
        subtotal,
        discount: (discount / 100) * subtotal,
        total,
        userId: id,
      });
    }

    await checkout.save();

    res.json(checkout);
  } catch (error) {
    throw new Error(error);
  }
});

const getCheckoutItem = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const checkout = await Checkout.findOne({ userId: id }).populate("items");
    res.json(checkout);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addCheckoutItem, getCheckoutItem };
