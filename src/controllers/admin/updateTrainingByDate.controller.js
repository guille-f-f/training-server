import trainingModel from "../../models/training.model.js";
import { sortDates } from "../../utils/sortDate.js";

export const updateTraining = async (req, res) => {
  try {
    const { idPlan, idTraining } = req.params;
    const { day, date, works, duration, pace, note, visibility } = req.body;

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

    if (day) training.day = day;
    if (date) training.date = date;
    if (works) training.works = works;
    if (duration) training.duration = duration;
    if (pace) training.pace = pace;
    if (note) training.note = note;
    if (visibility) training.visibility = visibility;

    console.log(plan);

    sortDates(plan.trainings);
    await plan.save();

    res.json({ message: "Training property updated.", training });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server." });
  }
};
