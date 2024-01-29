import WorkoutModel from "../../models/workout.model.js";
import saveImage from "../../utils/renameImage.js";
import deleteFile from "../../utils/deleteFile.js";

export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, repetition, exercises } = req.body;

    const workout = await WorkoutModel.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    saveImage(req.file);
    deleteFile(workout.image);

    if (title) workout.title = title;
    if (req.file) workout.image = req.file.originalname;
    if (repetition) workout.repetition = repetition;
    if (exercises) workout.exercises = exercises;

    await workout.save();

    res.json({ message: "Workout property updated.", workout });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server." });
  }
};
