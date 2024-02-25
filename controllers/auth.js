const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnAuthError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(
      'Please provide an email and/or password to login.'
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthError('Please provide a valid email.');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthError('Please provide a valid password.');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
