const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
    // e.g. "created project", "completed task", "updated task", "deleted project", "added member", "registered"
  },
  target: {
    type: String,
    required: true,
    // e.g. project name, task title, team name
  },
  targetModel: {
    type: String,
    enum: ["Project", "Task", "Team", "User"],
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-delete activities older than 30 days
activitySchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

module.exports = mongoose.model("Activity", activitySchema);
