const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

// Allowed origins from env or defaults
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:3000"]
  : ["http://localhost:5173", "http://localhost:3000"];

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// Track online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User comes online
  socket.on("user_online", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("users_online", Array.from(onlineUsers.keys()));
  });

  // Join conversation room
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
  });

  // Leave conversation room
  socket.on("leave_conversation", (conversationId) => {
    socket.leave(conversationId);
  });

  // Send message - broadcast to conversation room
  socket.on("send_message", (data) => {
    socket.to(data.conversationId).emit("receive_message", data);
  });

  // Typing indicator
  socket.on("typing", (data) => {
    socket.to(data.conversationId).emit("user_typing", data);
  });

  socket.on("stop_typing", (data) => {
    socket.to(data.conversationId).emit("user_stop_typing", data);
  });

  // Notify on project/task/team changes
  socket.on("data_changed", (data) => {
    socket.broadcast.emit("data_updated", data);
  });

  socket.on("disconnect", () => {
    // Remove user from online list
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("users_online", Array.from(onlineUsers.keys()));
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/teams", require("./routes/team.routes"));
app.use("/api/messages", require("./routes/message.routes"));
app.use("/api/activities", require("./routes/activity.routes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "ProjectHub API is running" });
});

// Error handler middleware
app.use(require("./middleware/errorHandler"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
