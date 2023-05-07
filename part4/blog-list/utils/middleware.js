const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: error.message,
    });
  }
  next(error);
};

module.exports = { errorHandler };
