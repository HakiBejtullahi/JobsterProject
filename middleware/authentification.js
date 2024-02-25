const user = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnAuthError } = require('../errors/');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthError('Must be logged in to procede further');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnAuthError(
      'Authentication error. Must be logged in to procede.'
    );
  }
};

module.exports = authMiddleware;
