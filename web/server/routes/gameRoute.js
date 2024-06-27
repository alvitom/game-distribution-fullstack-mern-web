const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createGame, getGame, updateGame, deleteGame, getAllGames, uploadImages, deleteImages, uploadMedia } = require("../controllers/gameCtrl");
const { upload, gameImgResize } = require("../middlewares/uploadImage");

router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 15 },
    { name: "videos", maxCount: 10 },
  ]),
  createGame
);
router.get("/", getAllGames);
router.get("/:title", getGame);
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  upload.fields([
    { name: "coverImages", maxCount: 1 },
    { name: "images", maxCount: 15 },
    { name: "videos", maxCount: 5 },
  ]),
  updateGame
);
router.delete("/:id", authMiddleware, isAdmin, deleteGame);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
