const Task = require("../models/Task");
const { logActivity } = require("./activity.controller");

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.project) filter.project = req.query.project;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.assignee) filter.assignee = req.query.assignee;

    const tasks = await Task.find(filter)
      .populate("assignee", "name avatar")
      .populate("project", "name");
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignee", "name avatar email")
      .populate("project", "name");
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Create task
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;
    const task = await Task.create(req.body);
    await logActivity(req.user.id, "created task", task.title, "Task", task._id);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const oldTask = await Task.findById(req.params.id);
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    const action = req.body.status && req.body.status !== oldTask?.status
      ? (req.body.status === 'Completed' ? 'completed task' : `moved task to ${req.body.status}`)
      : 'updated task';
    await logActivity(req.user.id, action, task.title, "Task", task._id);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    await logActivity(req.user.id, "deleted task", task.title, "Task", task._id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
