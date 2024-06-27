const { errorResponse } = require("../utils/response");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  errorResponse(res, 500, "An unexpected error occurred");
};

module.exports = { notFound, errorHandler };
