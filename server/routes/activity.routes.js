const express = require("express");
const router = express.Router();
const { getActivities, getWeeklyStats } = require("../controllers/activity.controller");
const { protect } = require("../middleware/auth");

router.get("/weekly", protect, getWeeklyStats);
router.get("/", protect, getActivities);

module.exports = router;
