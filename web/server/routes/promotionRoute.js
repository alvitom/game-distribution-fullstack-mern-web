const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createPromotion, getAllPromotions, getDetailPromoGame, updatePromotion, deletePromotion } = require("../controllers/promotionCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createPromotion);
router.get("/", getAllPromotions);
router.get("/:id", getDetailPromoGame);
router.put("/:id", authMiddleware, isAdmin, updatePromotion);
router.delete("/:id", authMiddleware, isAdmin, deletePromotion);

module.exports = router;
