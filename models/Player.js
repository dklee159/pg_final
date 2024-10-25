const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PlayerSchema = new mongoose.Schema({
  team: {
    type: String,
    required: [true, "Please provide team"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 1,
  },
});

PlayerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

PlayerSchema.methods.createJWT = function () {
  return jwt.sign({ playerId: this._id, team: this.team }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

PlayerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Player", PlayerSchema);
