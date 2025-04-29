const User = require('../models/User');
const Player = require('../models/Player');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};

const registerPlayer = async (req, res) => {
  console.log(req.body);
  const player = await Player.create({ ...req.body });
  const token = player.createJWT();
  res.status(StatusCodes.CREATED).json({
    player: {
      team: player.team,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};

const loginPlayer = async (req, res) => {
  const { team, password } = req.body;

  if (!team || !password) {
    throw new BadRequestError('Please provide team and password');
  }
  const player = await Player.findOne({ team });
  if (!player) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await player.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = player.createJWT();
  res.status(StatusCodes.OK).json({
    player: {
      team: player.team,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequest('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};

module.exports = {
  register,
  login,
  updateUser,
  registerPlayer,
  loginPlayer,
};
