import WorkoutModel from "../../models/workout.model.js";

export const getAllWorkouts = async (req, res) => {
  try {
    const workoutFound = await WorkoutModel.find();
    res.json(workoutFound);
  } catch (err) {
    res.status(500).json({ message: "Error on the server." });
  }
};
