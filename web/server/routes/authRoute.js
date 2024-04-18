const express = require("express");
const { registerUser, loginUser, loginAdmin, logout, getAllUsers, getUser, blockUser, unblockUser, changePassword, updateUser, deleteUser } = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/logout", logout);
router.get("/:id", authMiddleware, getUser);

router.put("/", authMiddleware, updateUser);
router.put("/password", authMiddleware, changePassword);
router.put("/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);

router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
