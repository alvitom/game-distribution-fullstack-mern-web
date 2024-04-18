const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createLanguage, getAllLanguages, getLanguage, updateLanguage, deleteLanguage } = require("../controllers/languageCtrl");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createLanguage);
router.get("/", getAllLanguages);
router.get("/:id", getLanguage);
router.put("/:id", authMiddleware, isAdmin, updateLanguage);
router.delete("/:id", authMiddleware, isAdmin, deleteLanguage);

module.exports = router;
