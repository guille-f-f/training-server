import trainingModel from "../../models/training.model.js";

export const updateTrainingVisibility = async (req, res) => {
  try {
    const { idPlan, idTraining } = req.params;

    console.log(req.params);
    const { visibility } = req.body;

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

    training.visibility = visibility;
    
    await plan.save();

    res.json({ message: "Training visibility updated.", training });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server." });
  }
};
