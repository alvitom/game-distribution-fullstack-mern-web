const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");
const validateMongodbId = require("../utils/validateMongodbId");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 1800000;

    user = new User({ email, password, otp, otpExpires });
    await user.save();

    const body = `Your OTP code is ${otp}. Please enter the code for verification`;
    const data = {
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
      htm: body,
    };
    sendEmail(data);
    setTimeout(async () => {
      const userToDelete = await User.findOne({ email, isVerified: false });
      if (userToDelete) {
        await User.deleteOne({ _id: userToDelete._id });
      }
    }, 1800000);
    res.status(200).json({ msg: "OTP sent to email", id: user._id });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const verifyOTP = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { otp } = req.body;
  try {
    const user = await User.findOne({ _id: id });
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ msg: "Verification success" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const addUserInformation = async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  const { username, fullname } = req.body;
  try {
    const findUsername = await User.findOne({ username });
    if (findUsername) return res.status(400).json({ msg: "Username already exists" });
    const token = generateToken(id);
    const user = await User.findByIdAndUpdate(
      id,
      {
        username,
        fullname,
        refreshToken: token,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ _id: user._id, username: user.username, email: user.email, fullname: user.fullname, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.isPasswordMatched(password))) {
      const refreshToken = generateRefreshToken(user._id);
      await User.findByIdAndUpdate(
        user.id,
        {
          refreshToken,
        },
        {
          new: true,
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Login Admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user.role !== "admin") throw new Error("Not permitted. You are not an admin");
  if (user && (await user.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(
      user.id,
      {
        refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      secure: true,
      sameSite: "none",
    });
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// Refresh Token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) throw new Error("There is something wrong with refresh token");
    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  });
});

// Logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const keyword = req.query.keyword;
    const skip = (page - 1) * limit;
    const query = {};

    if (keyword) {
      query.fullname = { $regex: keyword, $options: "i" };
    }

    const users = await User.find(query).skip(skip).limit(limit);
    const total = await User.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      users,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongodbId(id);
  const { password } = req.body;
  try {
    const user = await User.findById(id);
    if (password) {
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.json({
        message: "The field cannot be empty",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  const storeBaseURL = process.env.STORE_BASE_URL_DEV;
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Silahkan klik link ini untuk mereset password Anda. Link ini berlaku hingga 10 menit dari sekarang. <a href="${storeBaseURL}/reset-password/${token}">Klik Disini</a>`;
    const data = {
      to: email,
      subject: "Link Lupa Password",
      text: "Hey User",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ msg: "Token expired, please try again later" });
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({ _id: user._id, username: user.username, email: user.email, fullname: user.fullname });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(deleteUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { registerUser, verifyOTP, addUserInformation, loginUser, loginAdmin, handleRefreshToken, logout, getAllUsers, getUser, updateUser, blockUser, unblockUser, changePassword, forgotPasswordToken, resetPassword, deleteUser };
