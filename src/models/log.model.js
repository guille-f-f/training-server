import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      // unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "PENDING_ROLE",
      enum: ["PENDING_ROLE", "ADMIN_ROLE", "USER_ROLE"],
    },
    trainingPlan: {
      type: mongoose.Types.ObjectId,
      ref: "TrainingPlan",
    },
    workouts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Workout",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Log", LogSchema);
