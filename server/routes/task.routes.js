const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getTasks).post(authorize("admin", "manager"), createTask);
router.route("/:id").get(getTask).put(authorize("admin", "manager", "developer"), updateTask).delete(authorize("admin", "manager"), deleteTask);

module.exports = router;
