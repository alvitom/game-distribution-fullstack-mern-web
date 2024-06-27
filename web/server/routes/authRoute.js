const express = require("express");
const {
  registerUser,
  loginUser,
  loginAdmin,
  logout,
  getAllUsers,
  getUser,
  blockUser,
  unblockUser,
  changePassword,
  updateUser,
  deleteUser,
  forgotPasswordToken,
  handleRefreshToken,
  resetPassword,
  verifyOTP,
  addUserInformation,
  changeRole,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp/:id", verifyOTP);
router.post("/add-user-information/:id", addUserInformation);
router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/profile", authMiddleware, getUser);

router.put("/reset-password/:token", resetPassword);
router.put("/", authMiddleware, updateUser);
router.put("/change-password", authMiddleware, changePassword);
router.put("/block/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock/:id", authMiddleware, isAdmin, unblockUser);
router.put("/role/:id", authMiddleware, isAdmin, changeRole);

router.delete("/", authMiddleware, deleteUser);

module.exports = router;
