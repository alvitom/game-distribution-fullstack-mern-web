const mongoose = require("mongoose");
const { errorResponse } = require("./response");

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  return isValid;
};

const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~]).{6,20}$/;
  return passwordRegex.test(password);
};

const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username);
};

const validateOTP = (otp) => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

const validatePageAndLimit = (page, limit) => {
  const sanitizedPage = parseInt(page);
  const sanitizedLimit = parseInt(limit);

  if (Number.isNaN(sanitizedPage) || sanitizedPage < 1) {
    errorResponse(res, 400, "Invalid page parameter");
  }

  if (Number.isNaN(sanitizedLimit) || sanitizedLimit < 1) {
    errorResponse(res, 400, "Invalid limit parameter");
  }

  return { sanitizedPage, sanitizedLimit };
};

module.exports = { validateMongodbId, validateEmail, validatePassword, validateUsername, validateOTP, validatePageAndLimit };
