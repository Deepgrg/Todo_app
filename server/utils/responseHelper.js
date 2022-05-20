const successResponse = (res, status, message, data) => {
  const response = {};
  response.success = true;
  response.status = status || 200;
  response.message = message;
  response.data = data || null;

  res.status(status).json({
    success: response.success,
    status: response.status,
    message: response.message,
    data: response.data,
  });
};

module.exports = { successResponse };
