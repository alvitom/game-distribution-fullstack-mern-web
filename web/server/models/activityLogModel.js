const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var activityLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    activityType: { type: String, required: true },
    additionalInfo: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("ActivityLog", activityLogSchema);
