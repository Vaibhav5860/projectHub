const Conversation = require("../models/Conversation");

// @desc    Get all conversations for current user
// @route   GET /api/messages/conversations
exports.getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: req.user.id,
    }).populate("members", "name avatar status email role");
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
