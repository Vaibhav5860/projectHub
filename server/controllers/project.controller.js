const Project = require("../models/Project");
const { logActivity } = require("./activity.controller");

// @desc    Get all projects
// @route   GET /api/projects
exports.getProjects = async (req, res, next) => {
  try {
    let filter = {};

    // Developers only see projects they're on or lead
    if (req.user.role === "developer") {
      filter = { $or: [{ lead: req.user.id }, { team: req.user.id }, { createdBy: req.user.id }] };
    }
    // Managers see projects they created, lead, or are on
    else if (req.user.role === "manager") {
      filter = { $or: [{ lead: req.user.id }, { team: req.user.id }, { createdBy: req.user.id }] };
    }
    // Admin sees all

    const projects = await Project.find(filter)
      .populate("lead", "name avatar")
      .populate("team", "name avatar");
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("lead", "name avatar email role")
      .populate("team", "name avatar email role");
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
exports.createProject = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const project = await Project.create(req.body);
    await logActivity(req.user.id, "created project", project.name, "Project", project._id);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    await logActivity(req.user.id, "updated project", project.name, "Project", project._id);
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    await logActivity(req.user.id, "deleted project", project.name, "Project", project._id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
