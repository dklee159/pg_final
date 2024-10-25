const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    team: {
      type: String,
      enum: [
        "A"
      ],
      default: "A",
    },
    status: {
      type: String,
      enum: ["correct", "wrong"],
      default: "wrong",
    },
    quizNum: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
      default: "1",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Team", TeamSchema);
