const express = require("express");
const router = express.Router();

const { createTeam, getAllTeams, updateTeam, getTeam, showStats } = require("../controllers/teams");
router.route("/").post(createTeam).get(getAllTeams);
router.route("/stats").get(showStats);
router.route("/:id").get(getTeam).patch(updateTeam);
module.exports = router;
