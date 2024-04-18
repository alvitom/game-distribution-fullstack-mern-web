const Game = require("../models/gameModel");
const Checkout = require("../models/checkoutModel");
const Transaction = require("../models/transactionModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createTransaction = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const checkout = await Checkout.findOne({ userId: id });
    let amountPaid = 0;
    amountPaid += checkout.total;
    let object = {};
    object.userId = id;
    object.items = checkout.items;
    object.amountPaid = amountPaid;
    const transaction = await Transaction.create(object);
    for (const item of checkout.items) {
      const gameId = item.gameId;
      await Cart.deleteOne({ userId: id, gameId });
      await Checkout.deleteOne({ userId: id });
    }
    res.json(transaction);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const transactions = await Transaction.find({ userId: id }).populate("items");
    res.json(transactions);
  } catch (error) {
    throw new Error(error);
  }
});

const getDetailTransaction = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { transactionId } = req.params;
  validateMongodbId(transactionId);
  try {
    const transaction = await Transaction.findOne({ userId: id, _id: transactionId }).populate("items");
    res.json(transaction);
  } catch (error) {
    throw new Error(error);
  }
});

const updateTransactionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { status } = req.body;
  try {
    const updateStatus = await Transaction.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );
    res.json(updateStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { createTransaction, getAllTransactions, getDetailTransaction, updateTransactionStatus };
