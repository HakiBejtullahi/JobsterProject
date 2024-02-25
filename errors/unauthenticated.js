const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnAuthError extends CustomAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnAuthError;
