const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");
const { errorResponse, successResponse } = require("../utils/response");
const { verifySignature } = require("../utils/midtrans");

const midtransNotification = asyncHandler(async (req, res) => {
  try {
    const notification = req.body;
    const isVerified = verifySignature(notification);

    if (!isVerified) {
      errorResponse(res, 400, "Invalid signature");
    }

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;

    let status;

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      status = "success";
    } else if (transactionStatus === "pending") {
      status = "pending";
    } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "expire") {
      status = "failed";
    }

    await Transaction.findByIdAndUpdate(orderId, { status });

    successResponse(res, notification, "Notification processed successfully");
  } catch (error) {
    console.error("Error processing notification:", error);
    errorResponse(res, 500, "Failed to process notification");
  }
});

module.exports = { midtransNotification };
