const successResponse = (res, data, message, statusCode) => {
  res.status(statusCode).json({
    success: true,
    data,
    message,
    statusCode,
  });
};

const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
