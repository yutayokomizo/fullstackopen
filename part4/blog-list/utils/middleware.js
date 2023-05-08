const jwt = require('jsonwebtoken');

const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Token expired',
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: error.message,
    });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const tokenData = jwt.verify(request.token, process.env.SECRET);
  if (!tokenData.id) {
    return response.status(401).json({ error: 'Invalid token' });
  }

  const user = await User.findById(tokenData.id);

  if (user) {
    request.user = user;
  }

  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
