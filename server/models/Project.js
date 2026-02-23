const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a project name"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "On Hold", "Completed"],
      default: "Todo",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: [
        "Design",
        "Development",
        "Backend",
        "Marketing",
        "Infrastructure",
        "Research",
        "Security",
      ],
      default: "Development",
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    budget: {
      type: Number,
      default: 0,
    },
    spent: {
      type: Number,
      default: 0,
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: "from-blue-500 to-cyan-400",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
