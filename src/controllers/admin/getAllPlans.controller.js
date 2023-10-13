import trainingModel from "../../models/training.model.js";

export const getAllPlans = async (req, res) => {
  try {
    const plansFound = await trainingModel.find();
    res.json(plansFound);
  } catch (err) {
    res.status(500).json({ message: "Error on the server." });
  }
};
