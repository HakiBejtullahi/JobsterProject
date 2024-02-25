const BadRequestError = require('./bad-request');
const CustomAPIError = require('./custom-api');
const NotFoundError = require('./not-fouind');
const UnAuthError = require('./unauthenticated');

module.exports = {
  BadRequestError,
  CustomAPIError,
  NotFoundError,
  UnAuthError,
};
