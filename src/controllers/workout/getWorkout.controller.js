import WorkoutModel from "../../models/workout.model.js";

export const getWorkout = async (req, res) => {
  try {
    const workoutIds = req.body.workoutIds;

    const workoutsFound = await Promise.all(
      workoutIds.map((id) => {
        const workoutFound = WorkoutModel.findById(id);
        console.log(workoutFound)
        if (!workoutFound)
          return res.status(404).json({ message: "Workout not found" });
        return workoutFound;
      })
    );

    console.log(workoutsFound)

    res.json(workoutsFound);
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor." });
  }
};
