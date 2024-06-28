const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const { validateMongodbId, validateEmail, validatePassword, validateOTP, validateUsername } = require("../utils/validations");
const { generateOTP } = require("../utils/generateOTP");
const sendEmail = require("../utils/nodemailer");
const crypto = require("crypto");
const { errorResponse, successResponse } = require("../utils/response");
const { clearRefreshTokenCookie, createRefreshTokenCookie } = require("../utils/cookie");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return errorResponse(res, 400, "Email, password, and confirm password are required");
  }

  if (!validateEmail(email)) {
    return errorResponse(res, 400, "Invalid email address");
  }

  if (password !== confirmPassword) {
    return errorResponse(res, 400, "Password and confirm password do not match");
  }

  if (password.length < 6 || password.length > 20) {
    return errorResponse(res, 400, "Password must be between 6 and 20 characters");
  }

  if (!validatePassword(password)) {
    return errorResponse(res, 400, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return errorResponse(res, 400, "Email already exists");
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
    errorResponse(res, 500, "Registration failed");
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  if (!otp) {
    return errorResponse(res, 400, "OTP is required");
  }

  if (!validateOTP(otp)) {
    return errorResponse(res, 400, "Invalid OTP");
  }

  try {
    const user = await User.findById(id).select("+otp +otpExpires");
    
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (user.isVerified) {
      return errorResponse(res, 400, "User is already verified");
    }

    if (Date.now() > user.otpExpires) {
      return errorResponse(res, 400, "Expired OTP");
    }

    if (!(await user.isOTPMatched(otp))) {
      return errorResponse(res, 400, "Invalid OTP");
    }

    await User.findByIdAndUpdate(id, { otp: null, otpExpires: null, isVerified: true });

    successResponse(res, null, "Verification successful", 200);
  } catch (error) {
    errorResponse(res, 500, "Verification failed");
  }
});

const addUserInformation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { username, fullname } = req.body;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  if (!username || !fullname) {
    return errorResponse(res, 400, "Username and fullname are required");
  }

  if (username.length < 3 || username.length > 20) {
    return errorResponse(res, 400, "Username must be between 3 and 20 characters");
  }

  if (fullname.length < 3 || fullname.length > 50) {
    return errorResponse(res, 400, "Fullname must be between 3 and 50 characters");
  }

  if (username.toLowerCase() === fullname.toLowerCase()) {
    return errorResponse(res, 400, "Username and fullname cannot be the same");
  }

  if (username.toLowerCase() === "admin" || fullname.toLowerCase() === "admin") {
    return errorResponse(res, 400, "Username and fullname cannot be 'admin'");
  }

  if (!validateUsername(username)) {
    return errorResponse(res, 400, "Username must contain only letters, numbers, and underscores");
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return errorResponse(res, 400, "Username already exists");
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
  } catch (err) {
    errorResponse(res, 500, "Failed to add user information");
  }
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, "Email and password are required");
  }

  if (!validateEmail(email) || !validatePassword(password)) {
    return errorResponse(res, 400, "Invalid email or password");
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isPasswordMatched(password))) {
      return errorResponse(res, 400, "Invalid email or password");
    }

    if (!user.isVerified) {
      return errorResponse(res, 400, "Please verify your email first");
    }

    if (user.isBlocked) {
      return errorResponse(res, 400, "Your account has been blocked");
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
  } catch (err) {
    errorResponse(res, 500, "Login failed");
  }
};

// Not updated
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, user, "User fetched successfully");
  } catch (error) {
    console.error("Error fetching user:", error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return errorResponse(res, 400, "Invalid user ID");
    }

    errorResponse(res, 500, "Failed to fetch user");
  }
});

// Not updated
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");

    if (!updatedUser) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, updatedUser, "User updated successfully");
  } catch (error) {
    errorResponse(res, 500, "Failed to update user");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  if (!newPassword || !currentPassword || !confirmPassword) {
    return errorResponse(res, 400, "Please provide all required fields.");
  }

  if (newPassword !== confirmPassword) {
    return errorResponse(res, 400, "New password and confirm password do not match.");
  }

  if (newPassword === currentPassword) {
    return errorResponse(res, 400, "New password cannot be the same as the current password.");
  }

  if (newPassword.length < 6 || newPassword.length > 20) {
    return errorResponse(res, 400, "Password must be between 6 and 20 characters long.");
  }

  if (!validatePassword(newPassword)) {
    return errorResponse(res, 400, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (!(await user.isPasswordMatched(currentPassword))) {
      return errorResponse(res, 400, "Current password is incorrect.");
    }

    user.password = newPassword;
    await user.save();

    clearRefreshTokenCookie(res);
    successResponse(res, user, "Password changed successfully. Please log in again.", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to change password");
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(res, 400, "Email is required");
  }

  if (!validateEmail(email)) {
    return errorResponse(res, 400, "Invalid email address");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 404, "User not found with this email");
    }

    if (user.isBlocked) {
      return errorResponse(res, 400, "Your account has been blocked");
    }

    const storeBaseURL = process.env.STORE_BASE_URL_DEV;
    const resetToken = await user.createPasswordResetToken();
    await user.save();

    const resetURL = `${storeBaseURL}/reset-password/${resetToken}`;
    const data = {
      to: email,
      subject: "Reset Password Link",
      text: `Hey User, click the link below to reset your password. This link will expire in 10 minutes. ${resetURL}`,
    };

    sendEmail(data);

    successResponse(res, { token: resetToken }, "Password reset link sent successfully. Please check your email to reset your password", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to send password reset link");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  if (!password || !confirmPassword) {
    return errorResponse(res, 400, "Password and confirm password are required");
  }

  if (password.length < 6 || password.length > 20) {
    return errorResponse(res, 400, "Password must be between 6 and 20 characters long");
  }

  if (password !== confirmPassword) {
    return errorResponse(res, 400, "Passwords do not match");
  }

  if (!validatePassword(password)) {
    return errorResponse(res, 400, "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const resetUser = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!resetUser) {
      return errorResponse(res, 400, "Invalid or expired token. Please try again.");
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
    errorResponse(res, 500, "Failed to reset password");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { refreshToken } = req.cookies;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  if (!refreshToken) {
    return errorResponse(res, 400, "No refresh token found");
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return errorResponse(res, 404, "User not found");
    }

    clearRefreshTokenCookie(res);
    successResponse(res, null, "User deleted successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to delete user");
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return errorResponse(res, 400, "No refresh token in cookies");
  }

  try {
    const user = await User.findOne({ refreshToken });

    if (!user || user.refreshToken !== refreshToken) {
      return errorResponse(res, 403, "Invalid refresh token");
    }

    const accessToken = generateToken(user._id);
    successResponse(res, { accessToken }, "Access token generated successfully", 200);
  } catch (err) {
    errorResponse(res, 500, "Failed to handle refresh token");
  }
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return errorResponse(res, 400, "No refresh token in cookies");
  }

  try {
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" }, { new: true });

    clearRefreshTokenCookie(res);
    successResponse(res, null, "Logout successful", 200);
  } catch (err) {
    errorResponse(res, 500, "Failed to logout");
  }
});

// Admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, 400, "Email and password are required");
  }

  if (!validateEmail(email) || !validatePassword(password)) {
    return errorResponse(res, 400, "Invalid email or password");
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isPasswordMatched(password))) {
      return errorResponse(res, 400, "Invalid email or password");
    }

    if (!user.isVerified) {
      return errorResponse(res, 400, "Please verify your email first");
    }

    if (user.isBlocked) {
      return errorResponse(res, 400, "Your account has been blocked");
    }

    if (user.role !== "admin") {
      return errorResponse(res, 403, "Not permitted. You are not an admin");
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
  } catch (err) {
    errorResponse(res, 500, "Login failed");
  }
};

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, keyword } = req.query;
  const sanitizedPage = parseInt(page);
  const sanitizedLimit = parseInt(limit);

  if (Number.isNaN(sanitizedPage) || sanitizedPage < 1) {
    return errorResponse(res, 400, "Invalid page parameter");
  }

  if (Number.isNaN(sanitizedLimit) || sanitizedLimit < 1) {
    return errorResponse(res, 400, "Invalid limit parameter");
  }

  const skip = (sanitizedPage - 1) * sanitizedLimit;
  const query = keyword ? { fullname: { $regex: keyword, $options: "i" } } : {};

  try {
    const users = await User.find(query).skip(skip).limit(sanitizedLimit).select("-password");
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / sanitizedLimit);

    successResponse(res, { users, total, page: sanitizedPage, totalPages }, "Users fetched successfully", 200);
  } catch (error) {
    errorResponse(res, 500, "Failed to fetch users");
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  try {
    const user = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).select("-password");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, null, "User blocked successfully", 200);
  } catch {
    errorResponse(res, 500, "Failed to block user");
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  try {
    const user = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).select("-password");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, null, "User unblocked successfully", 200);
  } catch {
    errorResponse(res, 500, "Failed to unblock user");
  }
});

const changeRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!validateMongodbId(id)) {
    return errorResponse(res, 400, "Invalid user ID");
  }

  if (!role) {
    return errorResponse(res, 400, "Role is required");
  }

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    successResponse(res, { _id: user._id, role: user.role }, "User role updated successfully", 200);
  } catch {
    errorResponse(res, 500, "Failed to update user role");
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
