const { errorResponse } = require("../utils/response");

const notFound = (req, res, next) => {
  errorResponse(res, 404, `Not Found : ${req.originalUrl}`);
};

const errorHandler = (err, req, res, next) => {
  errorResponse(res, 500, "An unexpected error occurred");
};

module.exports = { notFound, errorHandler };
