const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addCartItem, getCartItem, deleteCartItem } = require("../controllers/cartCtrl");
const router = express.Router();

router.post("/", authMiddleware, addCartItem);
router.get("/", authMiddleware, getCartItem);
router.delete("/:cartItemId", authMiddleware, deleteCartItem);

module.exports = router;
