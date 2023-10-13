import trainingPlanModel from "../../models/training.model.js";

export const getPlainById = async (req, res) => {
  try {
    const plain = await trainingPlanModel.findById(req.params.id);
    console.log(req.params.id);
    if (!plain) return res.status(400).json({ message: "Plain undefined." });
    res.json(plain);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error on the server.", error: err });
  }
};
