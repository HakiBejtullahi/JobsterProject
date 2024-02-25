const { StatusCodes } = require('http-status-codes');

class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
  }
}

module.exports = BadRequestError;
