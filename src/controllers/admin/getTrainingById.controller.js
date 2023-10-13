import trainingModel from "../../models/training.model.js";

export const getTrainingById = async (req, res) => {
  try {
    const { idPlan, idTraining } = req.params;

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
    
    res.json(training)

  } catch (err) {
    res.status(500).json({ message: "Error on the server." });
  }
};
