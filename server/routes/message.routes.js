const express = require("express");
const router = express.Router();
const {
  getConversations,
  getConversation,
  createConversation,
  sendMessage,
  getProjectConversation,
  sendProjectMessage,
} = require("../controllers/message.controller");
const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/conversations").get(getConversations).post(createConversation);
router.route("/conversations/:id").get(getConversation);
router.route("/conversations/:id/messages").post(sendMessage);

// Project-based chat routes
router.route("/project/:projectId").get(getProjectConversation);
router.route("/project/:projectId/messages").post(sendProjectMessage);

module.exports = router;
