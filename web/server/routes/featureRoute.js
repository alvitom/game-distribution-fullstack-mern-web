const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createFeature, getAllFeatures, getFeature, updateFeature, deleteFeature } = require("../controllers/featureCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createFeature);
router.get("/", getAllFeatures);
router.get("/:id", getFeature);
router.put("/:id", authMiddleware, isAdmin, updateFeature);
router.delete("/:id", authMiddleware, isAdmin, deleteFeature);

module.exports = router;
