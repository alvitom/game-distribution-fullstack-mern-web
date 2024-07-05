const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { errorResponse } = require("../utils/response");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw errorResponse(res, 401, "Not authorized token expired, please login again");
    }
  } else {
    throw errorResponse(res, 401, "There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { username } = req.user;
  const user = await User.findOne({ username });
  if (user.role !== "admin") {
    throw errorResponse(res, 401, "You are not an admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
