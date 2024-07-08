const Transaction = require("../models/transactionModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const cron = require("node-cron");
const { validateMongodbId, validatePage, validateLimit } = require("../utils/validations");
const { successResponse, errorResponse } = require("../utils/response");
const { snap } = require("../utils/midtrans");
const sendEmail = require("../utils/nodemailer");

const createTransaction = asyncHandler(async (req, res) => {
  const { id, email } = req.user;
  const { items, serviceFee, total } = req.body;
  validateMongodbId(res, id);

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
      item_details: [
        ...items.map((item) => ({
          id: item._id,
          price: item.discount.isActive ? item.price - ((item.discount.percentage / 100) * item.price).toFixed(0) : item.price,
          name: item.title,
          quantity: 1,
        })),
        {
          id: "service_fee",
          price: serviceFee,
          name: "Service Fee",
          quantity: 1,
        },
      ],
    });

    await Transaction.create({
      userId: id,
      items,
      amountPaid: total,
      orderId,
    });

    await Cart.deleteMany({ userId: id, gameId: { $in: items.map((item) => item._id) } });

    const body = `Dear customer, your payment for the ${orderId} is currently pending. Please complete your payment to process your order. Thank you.`;
    const data = {
      to: email,
      subject: "Payment Pending",
      text: body,
      htm: body,
    };
    
    await sendEmail(data);

    successResponse(res, { transaction, orderId }, "Transaction created successfully", 201);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to create transaction: ${error.message}`);
  }
});

const getAllTransactionUsers = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;

  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const skip = (page - 1) * limit;
  try {
    const transactions = await Transaction.find().populate("userId").sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Transaction.countDocuments();
    const totalPages = Math.ceil(total / limit);

    successResponse(res, { transactions, total, page, totalPages }, "All transaction users fetched successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to fetch all transaction users: ${error.message}`);
  }
});

const getAllTransactions = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { page, limit } = req.query;

  validateMongodbId(res, id);

  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const skip = (page - 1) * limit;

  try {
    const transactions = await Transaction.find({ userId: id }).skip(skip).limit(limit).populate("items").sort({ createdAt: -1 });
    const total = await Transaction.countDocuments({ userId: id });
    const totalPages = Math.ceil(total / limit);

    successResponse(res, { transactions, total, page, totalPages }, "Transactions fetched successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to fetch transactions: ${error.message}`);
  }
});

const updateTransactionStatus = asyncHandler(async (req, res) => {
  try {
    const currentDate = new Date();
    const transactions = await Transaction.find({ status: "pending" })
      .populate("userId")
      .select("createdAt orderId status");

    transactions.forEach(async (transaction) => {
      const paymentDueDate = new Date(transaction.createdAt);
      paymentDueDate.setHours(paymentDueDate.getHours() + 24);

      if (currentDate > paymentDueDate) {
        transaction.status = "failed";
        await transaction.save();

        const body = `Your payment for ${transaction.orderId} has been failed.`;
        const data = {
          to: transaction.userId.email,
          subject: "Payment Failed",
          text: body,
          htm: body,
        };

        await sendEmail(data);
      }
    });
  } catch (error) {
    throw errorResponse(res, 500, `Failed to update transaction status: ${error.message}`);
  }
});

cron.schedule("0 0 * * *", async () => {
  updateTransactionStatus();
});

module.exports = { createTransaction, getAllTransactionUsers, getAllTransactions, updateTransactionStatus };
