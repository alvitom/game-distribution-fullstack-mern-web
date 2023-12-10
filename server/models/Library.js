const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  purchase_date: {
    type: Date,
  },
});

const Library = mongoose.model("libraries", librarySchema);

module.exports = Library;