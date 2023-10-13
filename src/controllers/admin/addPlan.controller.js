import planModel from "../../models/training.model.js";

export const addPlan = async (req, res) => {
  try {
    const training = new planModel({ ...req.body });

    await training.save();

    return res.json({
      message: "Training saved successfully.",
      plan: training,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Validation error", errors: err });
    }

    res.status(500).json({ message: "Error on the server", error: err.errors });
  }
};
