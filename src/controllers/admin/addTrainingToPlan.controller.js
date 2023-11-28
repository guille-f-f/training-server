import trainingModel from "../../models/training.model.js";
import { sortDates } from "../../utils/sortDate.js";

export const addTrainingToPlan = async (req, res) => {
  try {
    const { idPlan } = req.params;
    const { day, date, works, duration, pace } = req.body;
    const plan = await trainingModel.findById(idPlan);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }
    const newTraining = {
      day,
      date,
      works,
      duration,
      pace,
    };
    plan.trainings.push(newTraining);
    sortDates(plan.trainings);
    await plan.save();
    res.json({ message: "Training added to plan.", training: newTraining });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server.", err });
  }
};
