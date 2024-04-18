const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createGenre, getAllGenres, getGenre, updateGenre, deleteGenre } = require("../controllers/genreCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createGenre);
router.get("/", getAllGenres);
router.get("/:id", getGenre);
router.put("/:id", authMiddleware, isAdmin, updateGenre);
router.delete("/:id", authMiddleware, isAdmin, deleteGenre);

module.exports = router;
