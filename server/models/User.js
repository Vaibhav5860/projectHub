const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please add a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "developer"],
      required: [true, "Please select a role"],
    },
    department: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Online", "Away", "Offline"],
      default: "Offline",
    },
    timezone: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "English",
    },
    website: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      desktop: { type: Boolean, default: false },
      sound: { type: Boolean, default: true },
      taskAssigned: { type: Boolean, default: true },
      taskCompleted: { type: Boolean, default: true },
      taskComment: { type: Boolean, default: true },
      projectUpdate: { type: Boolean, default: true },
      teamJoin: { type: Boolean, default: true },
      mentionAlert: { type: Boolean, default: true },
      deadlineReminder: { type: Boolean, default: true },
      weeklyReport: { type: Boolean, default: false },
      monthlyReport: { type: Boolean, default: true },
      reminderTime: { type: String, default: '30 minutes before' },
    },
    settings: {
      general: {
        dateFormat: { type: String, default: 'MM/DD/YYYY' },
        timeFormat: { type: String, default: '12-hour' },
        startOfWeek: { type: String, default: 'Monday' },
        autoSave: { type: Boolean, default: true },
        showCompletedTasks: { type: Boolean, default: true },
        defaultTaskView: { type: String, default: 'List' },
        projectSortBy: { type: String, default: 'Last Modified' },
      },
      appearance: {
        fontSize: { type: Number, default: 14 },
        density: { type: String, default: 'Default' },
      },
      integrations: [
        {
          name: { type: String },
          connected: { type: Boolean, default: false },
          account: { type: String, default: '' },
        },
      ],
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
