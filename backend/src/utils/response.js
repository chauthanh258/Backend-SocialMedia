const sendSuccess = (res, data, message = 'Success', status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

const sendError = (res, error, status = 500) => {
  return res.status(status).json({
    success: false,
    error: typeof error === 'string' ? error : error.message || 'Internal Server Error'
  });
};

module.exports = {
  sendSuccess,
  sendError
};
