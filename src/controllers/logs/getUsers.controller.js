import logModel from "../../models/log.model.js";

export const getUsers = async (_req, res) => {
  try {
    const users = await logModel
      .find()
      .populate("trainingPlan")
      .populate("workouts");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error on the server", error: err });
  }
};
