const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  read: { type: Boolean, default: false },
});

//Export the model
module.exports = mongoose.model("Notification", notificationSchema);
