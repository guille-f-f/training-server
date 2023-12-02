import trainingModel from "../../models/training.model.js";

export const updatePlan = async (req, res) => {
  try {
    const planFoundAndUpdate = await trainingModel.findByIdAndUpdate(
      { _id: req.params.idPlan },
      { ...req.body },
      { new: true }
    );
    res.json({ meesage: "Plan update succesfuly", planFoundAndUpdate });
  } catch (err) {
    res.status(500).json({ message: "Error on the server" });
  }
};
