import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    log: {
      type: mongoose.Types.ObjectId,
      ref: "Log",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
