const cron = require("node-cron");
const Promotion = require("../models/promotionModel");
const { errorResponse, successResponse } = require("../utils/response");

module.exports = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const currentDate = new Date();
      await Promotion.updateMany({ endDate: { $lt: currentDate } }, { $set: { isActive: false } });
      successResponse(res, null, "Expired promotions updated successfully", 200);
    } catch (error) {
      errorResponse(res, 500, "Failed to update expired promotions");
    }
  });
};
