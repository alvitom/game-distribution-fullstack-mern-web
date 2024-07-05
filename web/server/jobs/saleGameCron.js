const cron = require("node-cron");
const Game = require("../models/gameModel");
const { errorResponse, successResponse } = require("../utils/response");

module.exports = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const currentDate = new Date();
      await Game.updateMany({ discount: { endDate: { $lt: currentDate } } }, { $set: { discount: { isActive: false } } });
      successResponse(res, null, "Expired promotions updated successfully", 200);
    } catch (error) {
      throw errorResponse(res, 500, `Failed to update expired promotions: ${error.message}`);
    }
  });
};
