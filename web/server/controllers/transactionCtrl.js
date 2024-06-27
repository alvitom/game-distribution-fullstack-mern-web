const Transaction = require("../models/transactionModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validations");
const { successResponse, errorResponse } = require("../utils/response");
const snap = require("../utils/midtrans");
const sendEmail = require("../utils/nodemailer");

const createTransaction = asyncHandler(async (req, res) => {
  const { id, email } = req.user;
  const { items, total } = req.body;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  try {
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },
      customer_details: {
        user_id: id,
      },
      item_details: items.map((item) => ({
        id: item._id,
        price: item.price,
        name: item.title,
        quantity: 1,
      })),
    });

    await Transaction.create({
      userId: id,
      items,
      amountPaid: total,
      orderId,
    });

    
    await Cart.deleteMany({ userId: id, gameId: { $in: items.map((item) => item._id) } });

    const body = `Dear customer, your payment for the ${orderId} is currently pending. Please complete your payment to process your order. Thank you!`;
    const data = {
      to: email,
      subject: "Your payment is pending",
      text: body,
      htm: body,
    };
    sendEmail(data);

    successResponse(res, transaction, "Transaction created successfully", 201);
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, "Failed to create transaction");
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
