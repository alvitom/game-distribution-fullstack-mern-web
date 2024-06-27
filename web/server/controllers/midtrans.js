const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");
const { errorResponse, successResponse } = require("../utils/response");
const { verifySignature } = require("../utils/midtrans");
const sendEmail = require("../utils/nodemailer");

const midtransNotification = asyncHandler(async (req, res) => {
  try {
    const { email } = req.user;
    const notification = req.body;
    const isVerified = verifySignature(notification);

    // if (!isVerified) {
    //   errorResponse(res, 400, "Invalid signature");
    // }

    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;

    let status;

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      status = "success";
      const body = `Your payment for ${orderId} has been successful.`;
      const data = {
        to: email,
        subject: "Payment Successful",
        text: body,
        htm: body,
      };
      sendEmail(data);
    } else if (transactionStatus === "pending") {
      status = "pending";
    } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "expire") {
      status = "failed";
    }

    await Transaction.findOneAndUpdate({ orderId }, { status, paymentType: notification.payment_type, transactionTime: new Date(notification.transaction_time), transactionId: notification.transaction_id });

    successResponse(res, notification, "Notification processed successfully", 200);
  } catch (error) {
    console.error("Error processing notification:", error);
    errorResponse(res, 500, "Failed to process notification");
  }
});

module.exports = { midtransNotification };
