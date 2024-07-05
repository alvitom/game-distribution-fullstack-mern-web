const mongoose = require("mongoose");
const { errorResponse } = require("./response");

const validateMongodbId = (res, id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid) {
    throw errorResponse(res, 400, "Invalid ID");
  }
};

const validateEmail = (res, email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    throw errorResponse(res, 400, "Invalid email");
  }
};

const validatePassword = (res, password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~]).{6,20}$/;

  if (!passwordRegex.test(password)) {
    throw errorResponse(res, 400, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
  }

  if (password.length < 6 || password.length > 20) {
    throw errorResponse(res, 400, "Password must be between 6 and 20 characters");
  }
};

const validateOTP = (res, otp) => {
  const otpRegex = /^\d{6}$/;

  if (!otpRegex.test(otp)) {
    throw errorResponse(res, 400, "Invalid OTP");
  }

  if (!otp) {
    throw errorResponse(res, 400, "OTP is required");
  }
};

const validateUsername = (res, username) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  if (!usernameRegex.test(username)) {
    throw errorResponse(res, 400, "Username can only contain letters, numbers, and underscores");
  }

  if (username.length < 3 || username.length > 20) {
    throw errorResponse(res, 400, "Username must be between 3 and 20 characters");
  }
};

const validateFullname = (res, fullname) => {
  if (fullname.length < 3 || fullname.length > 50) {
    throw errorResponse(res, 400, "Fullname must be between 3 and 50 characters");
  }
};

const validatePage = (res, page) => {
  const sanitizedPage = parseInt(page);

  if (Number.isNaN(sanitizedPage) || sanitizedPage < 1) {
    throw errorResponse(res, 400, "Invalid page parameter");
  }
};

const validateLimit = (res, limit) => {
  const sanitizedLimit = parseInt(limit);

  if (Number.isNaN(sanitizedLimit) || sanitizedLimit < 1) {
    throw errorResponse(res, 400, "Invalid limit parameter");
  }
};

module.exports = { validateMongodbId, validateEmail, validatePassword, validateOTP, validateUsername, validateFullname, validatePage, validateLimit };
