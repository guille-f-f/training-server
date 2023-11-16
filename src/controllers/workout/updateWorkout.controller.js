import WorkoutModel from "../../models/workout.model.js";

export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, exercises } = req.body;

    const workout = await WorkoutModel.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found." });
    }

    if (title) workout.title = title;
    if (exercises) workout.exercises = exercises;

    await workout.save();

    res.json({ message: "Workout property updated.", workout });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server." });
  }
};
