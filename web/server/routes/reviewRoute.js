const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addReview, getAllReviews } = require("../controllers/reviewCtrl");
const router = express.Router();

router.post("/", authMiddleware, addReview);
router.get("/", authMiddleware, getAllReviews);

module.exports = router;
