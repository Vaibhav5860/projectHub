const Team = require("../models/Team");

// @desc    Get all teams
// @route   GET /api/teams
exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().populate("members.user", "name avatar email role status");
    res.status(200).json({ success: true, count: teams.length, data: teams });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single team
// @route   GET /api/teams/:id
exports.getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate(
      "members.user",
      "name avatar email role department status phone location"
    );
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};

// @desc    Create team
// @route   POST /api/teams
exports.createTeam = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const team = await Team.create(req.body);
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};

// @desc    Update team
// @route   PUT /api/teams/:id
exports.updateTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete team
// @route   DELETE /api/teams/:id
exports.deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Add member to team
// @route   POST /api/teams/:id/members
exports.addMember = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    team.members.push({ user: req.body.userId, role: req.body.role || "Member" });
    await team.save();
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove member from team
// @route   DELETE /api/teams/:id/members/:memberId
exports.removeMember = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }
    team.members = team.members.filter(
      (m) => m.user.toString() !== req.params.memberId
    );
    await team.save();
    res.status(200).json({ success: true, data: team });
  } catch (error) {
    next(error);
  }
};
