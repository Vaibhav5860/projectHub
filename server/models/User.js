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
      default: "Member",
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
      taskUpdates: { type: Boolean, default: true },
      teamMessages: { type: Boolean, default: true },
      projectAlerts: { type: Boolean, default: true },
      weeklyDigest: { type: Boolean, default: false },
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
