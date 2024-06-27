const express = require("express");
const router = express.Router();
const { midtransNotification } = require("../controllers/midtrans");

router.post("/notification", midtransNotification);

module.exports = router;
