const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
} = require("../controllers/team.controller");
const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getTeams).post(createTeam);
router.route("/:id").get(getTeam).put(updateTeam).delete(deleteTeam);
router.route("/:id/members").post(addMember);
router.route("/:id/members/:memberId").delete(removeMember);

module.exports = router;
