const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var appSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  generalSettings: {
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" },
  },
  notificationSettings: {
    allowNotifications: { type: Boolean, default: true },
    notificationSound: { type: String, default: "default" },
  },
});

//Export the model
module.exports = mongoose.model("AppSettings", appSettingsSchema);
