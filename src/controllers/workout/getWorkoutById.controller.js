import WorkoutModel from "../../models/workout.model.js";

export const getWorkoutById = async (req, res) => {
  try {
    const workoutFound = await WorkoutModel.findById(req.params.idWorkout);
    console.log(workoutFound)
    res.json(workoutFound);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server", err });
  }
};
