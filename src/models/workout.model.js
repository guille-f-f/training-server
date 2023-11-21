import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  repetition: {
    type: String,
    required: true,
  },
});

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  exercises: [exerciseSchema],
});

export default mongoose.model("Workout", workoutSchema);