import trainingModel from "../../models/training.model.js";

export const deleteTrainingFromPlan = async (req, res) => {
  try {
    const { idPlan, idTraining } = req.params;
    
    const plan = await trainingModel.findById(idPlan);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found." });
    }

    const initialTrainingsCount = plan.trainings.length;

    plan.trainings = plan.trainings.filter(
      (training) => training._id.toString() !== idTraining
    );

    if (plan.trainings.length === initialTrainingsCount) {
      return res
        .status(404)
        .json({ message: "Training not found in the plan." });
    }

    await plan.save();

    res.json({ message: "Training removed from the plan." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server" });
  }
};
