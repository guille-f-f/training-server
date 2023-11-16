import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  exercises: [
    {
      exercise: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Workout", workoutSchema);
