import trainingModel from "../../models/training.model.js";

export const updateTraining = async (req, res) => {
  try {
    const { idPlan, idTraining } = req.params;
    const { date, works, duration, pace } = req.body;

    const plan = await trainingModel.findById(idPlan);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    const training = plan.trainings.id(idTraining);

    if (!training) {
      return res
        .status(404)
        .json({ message: "Training not found in the plan." });
    }

    if (date) training.date = date;
    if (works) training.works = works;
    if (duration) training.duration = duration;
    if (pace) training.pace = pace;

    await plan.save();

    res.json({ message: "Training property updated.", training });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server." });
  }
};
