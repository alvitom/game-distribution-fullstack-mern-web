const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const { validateMongodbId, validateEmail, validatePassword, validateOTP, validateUsername, validateFullname, validatePage, validateLimit } = require("../utils/validations");
const { generateOTP } = require("../utils/generateOTP");
const sendEmail = require("../utils/nodemailer");
const crypto = require("crypto");
const { errorResponse, successResponse } = require("../utils/response");
const { clearRefreshTokenCookie, createRefreshTokenCookie } = require("../utils/cookie");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    throw errorResponse(res, 400, "Email, password, and confirm password are required");
  }

  validateEmail(res, email);
  validatePassword(res, password);

  if (password !== confirmPassword) {
    throw errorResponse(res, 400, "Passwords do not match");
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw errorResponse(res, 400, "Email already exists");
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 1800000;

    const user = await User.create({ email, password, otp, otpExpires });

    const body = `Your OTP code is ${otp}. Please enter the code for verification`;
    const data = {
      to: email,
      subject: "Your OTP Code",
      text: body,
      htm: body,
    };

    sendEmail(data);

    setTimeout(async () => {
      await User.deleteOne({ email, isVerified: false });
    }, 1800000);

    successResponse(res, { id: user._id }, "OTP sent to email", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Registration failed: ${error.message}`);
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;
  validateMongodbId(res, id);
  validateOTP(res, otp);

  try {
    const user = await User.findById(id).select("+otp +otpExpires");

    if (!user) {
      throw errorResponse(res, 404, "User not found");
    }

    if (user.isVerified) {
      throw errorResponse(res, 400, "User is already verified");
    }

    if (Date.now() > user.otpExpires) {
      throw errorResponse(res, 400, "Expired OTP");
    }

    if (!(await user.isOTPMatched(otp))) {
      throw errorResponse(res, 400, "Invalid OTP");
    }

    await User.findByIdAndUpdate(id, { otp: null, otpExpires: null, isVerified: true });

    successResponse(res, null, "Verification successful", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Verification failed: ${error.message}`);
  }
});

const addUserInformation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, fullname } = req.body;
  validateMongodbId(res, id);

  if (!username || !fullname) {
    throw errorResponse(res, 400, "Username and fullname are required");
  }

  validateUsername(res, username);
  validateFullname(res, fullname);

  if (username.toLowerCase() === fullname.toLowerCase()) {
    throw errorResponse(res, 400, "Username and fullname cannot be the same");
  }

  if (username.toLowerCase() === "admin" || fullname.toLowerCase() === "admin") {
    throw errorResponse(res, 400, "Username and fullname cannot be 'admin'");
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw errorResponse(res, 400, "Username already exists");
    }

    const token = generateToken(id);

    const user = await User.findByIdAndUpdate(
      id,
      { username, fullname, refreshToken: token },
      {
        new: true,
      }
    );

    createRefreshTokenCookie(res, token);

    successResponse(
      res,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        token,
      },
      "User information added successfully",
      200
    );
  } catch (error) {
    throw errorResponse(res, 500, `Failed to add user information: ${error.message}`);
  }
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw errorResponse(res, 400, "Email and password are required");
  }

  validateEmail(res, email);

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isPasswordMatched(password))) {
      throw errorResponse(res, 400, "Invalid email or password");
    }

    if (!user.isVerified) {
      throw errorResponse(res, 400, "Please verify your email first");
    }

    if (user.isBlocked) {
      throw errorResponse(res, 400, "Your account has been blocked");
    }

    const refreshToken = generateRefreshToken(user._id);
    await user.updateOne({ refreshToken });

    createRefreshTokenCookie(res, refreshToken);

    successResponse(
      res,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        token: generateToken(user._id),
      },
      "Login successful",
      200
    );
  } catch (error) {
    throw errorResponse(res, 500, `Login failed: ${error.message}`);
  }
};

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(res, id);

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      throw errorResponse(res, 404, "User not found");
    }

    successResponse(res, user, "User fetched successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to fetch user: ${error.message}`);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(res, id);

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");

    if (!updatedUser) {
      throw errorResponse(res, 404, "User not found");
    }

    successResponse(res, updatedUser, "User updated successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to update user: ${error.message}`);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { currentPassword, newPassword, confirmPassword } = req.body;
  validateMongodbId(res, id);

  if (!newPassword || !currentPassword || !confirmPassword) {
    throw errorResponse(res, 400, "Please provide all required fields.");
  }

  validatePassword(res, newPassword);
  validatePassword(res, confirmPassword);

  if (newPassword !== confirmPassword) {
    throw errorResponse(res, 400, "New password and confirm password do not match.");
  }

  if (newPassword === currentPassword) {
    throw errorResponse(res, 400, "New password cannot be the same as the current password.");
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      throw errorResponse(res, 404, "User not found");
    }

    if (!(await user.isPasswordMatched(currentPassword))) {
      throw errorResponse(res, 400, "Current password is incorrect.");
    }

    user.password = newPassword;
    await user.save();

    clearRefreshTokenCookie(res);
    successResponse(res, user, "Password changed successfully. Please log in again.", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to change password: ${error.message}`);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw errorResponse(res, 400, "Email is required");
  }

  validateEmail(res, email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw errorResponse(res, 404, "User not found with this email");
    }

    if (user.isBlocked) {
      throw errorResponse(res, 400, "Your account has been blocked");
    }

    const storeBaseURL = process.env.STORE_BASE_URL_STG;
    const resetToken = await user.createPasswordResetToken();
    await user.save();

    const resetURL = `${storeBaseURL}/reset-password/${resetToken}`;
    const data = {
      to: email,
      subject: "Reset Password Link",
      text: `Hey User, click the link below to reset your password. This link will expire in 10 minutes. ${resetURL}`,
    };

    awaitsendEmail(data);

    successResponse(res, { token: resetToken }, "Password reset link sent successfully. Please check your email to reset your password", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to send password reset link: ${error.message}`);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  if (!password || !confirmPassword) {
    throw errorResponse(res, 400, "Password and confirm password are required");
  }

  validatePassword(res, password);

  if (password !== confirmPassword) {
    throw errorResponse(res, 400, "Passwords do not match");
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const resetUser = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!resetUser) {
      throw errorResponse(res, 400, "Invalid or expired token. Please try again.");
    }

    resetUser.password = password;
    resetUser.passwordResetToken = undefined;
    resetUser.passwordResetExpires = undefined;

    await resetUser.save();

    successResponse(
      res,
      {
        _id: resetUser._id,
        username: resetUser.username,
        email: resetUser.email,
        fullname: resetUser.fullname,
      },
      "Password reset successful. Please login with your new password.",
      200
    );
  } catch (error) {
    throw errorResponse(res, 500, `Failed to reset password: ${error.message}`);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { refreshToken } = req.cookies;
  validateMongodbId(res, id);

  if (!refreshToken) {
    throw errorResponse(res, 400, "No refresh token found");
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw errorResponse(res, 404, "User not found");
    }

    clearRefreshTokenCookie(res);
    successResponse(res, null, "User deleted successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to delete user: ${error.message}`);
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw errorResponse(res, 400, "No refresh token in cookies");
  }

  try {
    const user = await User.findOne({ refreshToken });

    if (!user || user.refreshToken !== refreshToken) {
      throw errorResponse(res, 403, "Invalid refresh token");
    }

    const accessToken = generateToken(user._id);
    successResponse(res, { accessToken }, "Access token generated successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to handle refresh token: ${error.message}`);
  }
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw errorResponse(res, 400, "No refresh token in cookies");
  }

  try {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" }, { new: true });

    clearRefreshTokenCookie(res);
    successResponse(res, null, "Logout successful", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to logout: ${error.message}`);
  }
});

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw errorResponse(res, 400, "Email and password are required");
  }

  validateEmail(res, email);

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isPasswordMatched(password))) {
      throw errorResponse(res, 400, "Invalid email or password");
    }

    if (!user.isVerified) {
      throw errorResponse(res, 400, "Please verify your email first");
    }

    if (user.isBlocked) {
      throw errorResponse(res, 400, "Your account has been blocked");
    }

    if (user.role !== "admin") {
      throw errorResponse(res, 403, "Not permitted. You are not an admin");
    }

    const refreshToken = generateRefreshToken(user._id);
    await user.updateOne({ refreshToken });

    createRefreshTokenCookie(res, refreshToken);

    successResponse(
      res,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        token: generateToken(user._id),
      },
      "Login successful",
      200
    );
  } catch (error) {
    throw errorResponse(res, 500, `Login failed: ${error.message}`);
  }
};

const getAllUsers = asyncHandler(async (req, res) => {
  const { page, limit, keyword } = req.query;

  if (page) {
    validatePage(res, page);
  }

  if (limit) {
    validateLimit(res, limit);
  }

  const skip = (page - 1) * limit;
  const query = keyword ? { fullname: { $regex: keyword, $options: "i" } } : {};

  try {
    const users = await User.find(query).skip(skip).limit(limit).select("-password");
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    successResponse(res, { users, total, page, totalPages }, "Users fetched successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to fetch users: ${error.message}`);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const user = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).select("-password");

    if (!user) {
      throw errorResponse(res, 404, "User not found");
    }

    successResponse(res, null, "User blocked successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to block user: ${error.message}`);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(res, id);

  try {
    const user = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).select("-password");

    if (!user) {
      throw errorResponse(res, 404, "User not found");
    }

    successResponse(res, null, "User unblocked successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to unblock user: ${error.message}`);
  }
});

const changeRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  validateMongodbId(res, id);

  if (!role) {
    throw errorResponse(res, 400, "Role is required");
  }

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");

    if (!user) {
      throw errorResponse(res, 404, "User not found");
    }

    successResponse(res, { _id: user._id, role: user.role }, "User role updated successfully", 200);
  } catch (error) {
    throw errorResponse(res, 500, `Failed to update user role: ${error.message}`);
  }
});

module.exports = {
  registerUser,
  verifyOTP,
  addUserInformation,
  loginUser,
  loginAdmin,
  handleRefreshToken,
  logout,
  getAllUsers,
  getUser,
  updateUser,
  blockUser,
  unblockUser,
  changeRole,
  changePassword,
  forgotPasswordToken,
  resetPassword,
  deleteUser,
};
