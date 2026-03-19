const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, status);
};

module.exports = errorHandler;
