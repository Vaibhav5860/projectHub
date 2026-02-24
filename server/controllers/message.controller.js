const Conversation = require("../models/Conversation");
const Project = require("../models/Project");

// @desc    Get all conversations for current user
// @route   GET /api/messages/conversations
exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: req.user.id,
    })
      .populate("members", "name avatar status email role")
      .populate("project", "name color status");
    res.status(200).json({ success: true, count: conversations.length, data: conversations });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single conversation with messages
// @route   GET /api/messages/conversations/:id
exports.getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate("members", "name avatar status email role")
      .populate("messages.sender", "name avatar");
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

// @desc    Create conversation
// @route   POST /api/messages/conversations
exports.createConversation = async (req, res, next) => {
  try {
    const { type, name, members } = req.body;
    // Ensure current user is included
    const memberList = [...new Set([req.user.id, ...members])];
    const conversation = await Conversation.create({
      type: type || "direct",
      name: name || "",
      members: memberList,
    });
    res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message in conversation
// @route   POST /api/messages/conversations/:id/messages
exports.sendMessage = async (req, res, next) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ success: false, message: "Conversation not found" });
    }
    conversation.messages.push({
      sender: req.user.id,
      text: req.body.text,
    });
    await conversation.save();
    res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

// @desc    Get or create project conversation (auto-adds all project team members)
// @route   GET /api/messages/project/:projectId
exports.getProjectConversation = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("lead", "name avatar email role")
      .populate("team", "name avatar email role");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Gather all project members (lead + team), deduplicated
    const memberIds = new Set();
    if (project.lead) memberIds.add(project.lead._id.toString());
    (project.team || []).forEach((m) => memberIds.add(m._id.toString()));
    if (project.createdBy) memberIds.add(project.createdBy.toString());
    const memberArray = [...memberIds];

    // Find existing project conversation
    let conversation = await Conversation.findOne({ project: project._id, type: "project" })
      .populate("members", "name avatar status email role")
      .populate("messages.sender", "name avatar");

    if (!conversation) {
      // Create one automatically
      conversation = await Conversation.create({
        type: "project",
        name: project.name,
        project: project._id,
        members: memberArray,
      });
      conversation = await Conversation.findById(conversation._id)
        .populate("members", "name avatar status email role")
        .populate("messages.sender", "name avatar");
    } else {
      // Sync members — add any new team members
      let updated = false;
      memberArray.forEach((id) => {
        if (!conversation.members.some((m) => m._id.toString() === id)) {
          conversation.members.push(id);
          updated = true;
        }
      });
      if (updated) {
        await conversation.save();
        conversation = await Conversation.findById(conversation._id)
          .populate("members", "name avatar status email role")
          .populate("messages.sender", "name avatar");
      }
    }

    res.status(200).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message in project conversation
// @route   POST /api/messages/project/:projectId/messages
exports.sendProjectMessage = async (req, res, next) => {
  try {
    let conversation = await Conversation.findOne({ project: req.params.projectId, type: "project" });

    if (!conversation) {
      return res.status(404).json({ success: false, message: "Project conversation not found" });
    }

    conversation.messages.push({
      sender: req.user.id,
      text: req.body.text,
    });
    await conversation.save();

    conversation = await Conversation.findById(conversation._id)
      .populate("members", "name avatar status email role")
      .populate("messages.sender", "name avatar");

    res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};
