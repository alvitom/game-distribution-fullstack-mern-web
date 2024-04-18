const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addWishlist, getWishlist, deleteWishlist } = require("../controllers/wishlistCtrl");
const router = express.Router();

router.post("/", authMiddleware, addWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/:wishlistItemId", authMiddleware, deleteWishlist);

module.exports = router;
