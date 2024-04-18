const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createGame, getGame, updateGame, deleteGame, getAllGames, uploadImages, deleteImages } = require("../controllers/gameCtrl");
const { uploadImage, gameImgResize } = require("../middlewares/uploadImage");

router.post("/", authMiddleware, isAdmin, createGame);
router.get("/", getAllGames);
router.get("/:id", getGame);
router.put("/upload-img/:id", authMiddleware, isAdmin, uploadImage.array("images", 15), gameImgResize, uploadImages);
router.put("/:id", authMiddleware, isAdmin, updateGame);
router.delete("/:id", authMiddleware, isAdmin, deleteGame);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
