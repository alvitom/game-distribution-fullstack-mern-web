const { errorResponse } = require("../utils/response");

const notFound = (req, res, next) => {
  errorResponse(res, 404, `Not Found : ${req.originalUrl}`);
};

const errorHandler = (error, req, res, next) => {
  errorResponse(res, 500, error.message);
};

module.exports = { notFound, errorHandler };
