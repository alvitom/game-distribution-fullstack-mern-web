const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createNews } = require("../controllers/newsCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createNews);

module.exports = router;
