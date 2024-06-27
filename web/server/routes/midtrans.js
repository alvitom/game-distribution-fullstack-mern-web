const express = require("express");
const router = express.Router();
const { midtransNotification } = require("../controllers/midtrans");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/notification", authMiddleware, midtransNotification);

module.exports = router;
