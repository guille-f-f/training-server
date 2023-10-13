import trainingModel from "../../models/training.model.js";

export const addTrainingToPlan = async (req, res) => {
  try {
    const { idPlan } = req.params;
    const { date, works, duration, pace } = req.body;

    const plan = await trainingModel.findById(idPlan);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    const newTraining = {
      date,
      works,
      duration,
      pace,
    };

    plan.trainings.push(newTraining);

    await plan.save();

    res.json({ message: "Training added to plan.", training: newTraining });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error on the server.", err });
  }
};
