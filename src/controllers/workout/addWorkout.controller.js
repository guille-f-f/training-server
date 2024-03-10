import WorkoutModel from "../../models/workout.model.js";
import saveImage from "../../utils/renameImage.js";

export const addWorkout = async (req, res) => {
  try {
    saveImage(req.file);
    const workout = new WorkoutModel({
      ...req.body,
      image: req.file.originalname,
    });
    await workout.save();
    return res.json({
      message: "Workout saved successfully.",
      plan: workout,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Validation error", errors: err });
    }
    res.status(500).json({ message: "Error on the server", error: err.errors });
  }
};
