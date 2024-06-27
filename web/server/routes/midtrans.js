const express = require("express");
const router = express.Router();
const { midtransNotification } = require("../controllers/midtrans");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/notification", authMiddleware, midtransNotification);

module.exports = router;
