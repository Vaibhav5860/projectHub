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
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getTeams).post(authorize("admin", "manager"), createTeam);
router.route("/:id").get(getTeam).put(authorize("admin", "manager"), updateTeam).delete(authorize("admin"), deleteTeam);
router.route("/:id/members").post(authorize("admin", "manager"), addMember);
router.route("/:id/members/:memberId").delete(authorize("admin", "manager"), removeMember);

module.exports = router;
