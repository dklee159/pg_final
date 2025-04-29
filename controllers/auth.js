const Admin = require('../models/Admin');
const Player = require('../models/Player');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
  const admin = await Admin.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: admin.email,
      name: admin.name,
      token,
    },
  });
};

const registerPlayer = async (req, res) => {
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
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await admin.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  // compare password
  const token = admin.createJWT();
  res.status(StatusCodes.OK).json({
    admin: {
      email: admin.email,
      name: admin.name,
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

const updateAdmin = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequest('Please provide all values');
  }
  const admin = await Admin.findOne({ _id: req.admin.userId });

  admin.email = email;
  admin.name = name;

  await admin.save();
  const token = admin.createJWT();
  res.status(StatusCodes.OK).json({
    admin: {
      email: admin.email,
      name: admin.name,
      token,
    },
  });
};

module.exports = {
  register,
  login,
  updateAdmin,
  registerPlayer,
  loginPlayer,
};
