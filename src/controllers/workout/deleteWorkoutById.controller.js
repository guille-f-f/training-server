import WorkoutModel from "../../models/workout.model.js";

export const deleteWorkoutById = async (req, res) => {
  try {
    await WorkoutModel.findByIdAndDelete(req.params.idPlan);
    res.json({ message: "Delete workout sucessfully." });
  } catch (err) {
    res.status(500).json({ message: "Error on the server." });
  }
};
