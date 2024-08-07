const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");
const { errorResponse, successResponse } = require("../utils/response");
const sendEmail = require("../utils/nodemailer");

const midtransNotification = asyncHandler(async (req, res) => {
  try {
    const { email } = req.user;
    const notification = req.body;
    
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;

    let status;

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      status = "success";
      const body = `<p>Dear Customer,</p>
      <p>We are pleased to inform you that your payment for order <strong>${orderId}</strong> has been successfully processed. Thank you for your purchase!</p>
      <p>If you have any questions or need further assistance, please feel free to contact our support team.</p>`;
      const data = {
        to: email,
        subject: "Payment Successful",
        htm: body,
      };

      await sendEmail(data);
      
    } else if (transactionStatus === "pending") {
      status = "pending";
    } else if (transactionStatus === "deny" || transactionStatus === "cancel" || transactionStatus === "expire") {
      status = "failed";
    }

    await Transaction.findOneAndUpdate({ orderId }, { status, paymentType: notification.payment_type, transactionTime: new Date(notification.transaction_time), transactionId: notification.transaction_id });

    successResponse(res, notification, "Notification processed successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to process notification: ${error.message}`);
  }
});

module.exports = { midtransNotification };
