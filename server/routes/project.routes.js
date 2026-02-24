const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getProjects).post(authorize("admin", "manager"), createProject);
router.route("/:id").get(getProject).put(authorize("admin", "manager"), updateProject).delete(authorize("admin"), deleteProject);

module.exports = router;
