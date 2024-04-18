const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addCheckoutItem, getCheckoutItem } = require("../controllers/checkoutCtrl");
const router = express.Router();

router.post("/", authMiddleware, addCheckoutItem);
router.get("/", authMiddleware, getCheckoutItem)

module.exports = router;
