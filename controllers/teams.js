const Team = require("../models/Team");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");
const moment = require("moment");

const getAllTeams = async (req, res) => {
  const { search, status, quizNum, sort } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.team = { $regex: search, $options: "i" };
  }

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (quizNum && quizNum !== "all") {
    queryObject.quizNum = quizNum;
  }
  let result = Team.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const teams = await result;

  const totalTeams = await Team.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTeams / limit);
  const whole = await Team.find();

  res.status(StatusCodes.OK).json({ teams, totalTeams, numOfPages, whole });
};

const getTeam = async (req, res) => {
  console.log("get");
  const {
    params: { id: teamId },
  } = req;

  const team = await Team.findOne({
    _id: teamId,
  });
  if (!team) {
    throw new NotFoundError(`No Team with id ${teamId}`);
  }
  res.status(StatusCodes.OK).json({ team });
};

const createTeam = async (req, res) => {
  const team = await Team.create(req.body);
  res.status(StatusCodes.CREATED).json({ team });
};

const updateTeam = async (req, res) => {
  const {
    body: { status },
    params: { id: teamId },
  } = req;
  if (status === "") {
    throw new BadRequestError("Submitted not valid answer");
  }
  const team = await Team.findByIdAndUpdate({ _id: teamId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!team) {
    throw new NotFoundError(`No Team with id ${teamId}`);
  }
  res.status(StatusCodes.OK).json({ team });
};

const showStats = async (req, res) => {
  let stats = await Team.aggregate([{ $group: { _id: "$team", count: { $sum: 1 } } }]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    A: stats.A || 0,    
  };

  res.status(StatusCodes.OK).json({ defaultStats });
};

module.exports = { createTeam, getAllTeams, updateTeam, getTeam, showStats };
