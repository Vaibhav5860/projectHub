const Activity = require("../models/Activity");

// @desc    Get recent activities
// @route   GET /api/activities
exports.getActivities = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const activities = await Activity.find()
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .limit(limit);
    res.status(200).json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    next(error);
  }
};

// Helper to log an activity (used by other controllers)
exports.logActivity = async (userId, action, target, targetModel, targetId) => {
  try {
    await Activity.create({ user: userId, action, target, targetModel, targetId });
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
};

// @desc    Get weekly activity stats (last 7 days grouped by day)
// @route   GET /api/activities/weekly
exports.getWeeklyStats = async (req, res, next) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const activities = await Activity.find({ createdAt: { $gte: sevenDaysAgo } });

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Build map for last 7 days
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayName = dayNames[d.getDay()];
      const dateStr = d.toISOString().slice(0, 10);
      weekData.push({ day: dayName, date: dateStr, tasks: 0, projects: 0, team: 0 });
    }

    // Count activities per day by type
    activities.forEach((a) => {
      const dateStr = a.createdAt.toISOString().slice(0, 10);
      const entry = weekData.find((w) => w.date === dateStr);
      if (entry) {
        if (a.targetModel === 'Task') entry.tasks++;
        else if (a.targetModel === 'Project') entry.projects++;
        else if (a.targetModel === 'Team') entry.team++;
      }
    });

    // Remove date field from response
    const result = weekData.map(({ day, tasks, projects, team }) => ({ day, tasks, projects, team }));
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
